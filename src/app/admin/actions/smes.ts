"use server";

import { eq, max } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { authorizeAction, NOT_ALLOWED } from "@/lib/auth/dal";
import { SME_EDITORS } from "@/lib/auth/roles";
import { revalidateKneks } from "@/lib/revalidate-kneks";
import { deleteSmeImage, saveSmeImage } from "@/lib/uploads";
import { checked, id, idList, isDuplicate, text, whole } from "../_lib/form";
import type { ActionResult, FormState } from "../_lib/state";

const TEXT_FIELDS = {
  name: 120,
  sector: 60,
  city: 80,
  stage: 40,
  brief: 1000,
  metrics: 255,
  investor: 120,
  quote: 500,
} as const;

/** Everything that shows SMEs: the public page and the admin list. */
function refresh() {
  revalidateKneks();
  revalidatePath("/admin/smes");
}

/**
 * Creates an SME, or updates one when the form carries an id. Fields are
 * checked first and the image saved only once they pass, so a rejected form
 * never leaves a stray file behind.
 */
export async function saveSme(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!(await authorizeAction(SME_EDITORS))) return { message: NOT_ALLOWED };
  const db = getDb();
  const smeId = id(fd);

  const values = Object.fromEntries(
    [...Object.keys(TEXT_FIELDS), "status", "askK", "interestPct", "raisedK", "sortOrder"].map((key) => [key, text(fd, key)]),
  ) as Record<string, string>;
  values.published = checked(fd, "published") ? "on" : "";
  const errors: Record<string, string> = {};

  for (const [key, limit] of Object.entries(TEXT_FIELDS)) {
    if (values[key].length > limit) errors[key] = `Keep this under ${limit} characters.`;
  }
  for (const key of ["name", "sector", "city", "stage", "brief", "metrics"]) {
    if (!values[key]) errors[key] = "Required.";
  }

  const status = values.status === "funded" ? "funded" : "program";
  const askK = whole(fd, "askK");
  if (askK === null || askK < 1 || askK > 10_000_000) errors.askK = "Enter the ask in USD thousands, e.g. 300.";

  let interestPct: number | null = null;
  let raisedK: number | null = null;
  if (status === "program") {
    interestPct = whole(fd, "interestPct");
    if (interestPct === null || interestPct < 0 || interestPct > 100) errors.interestPct = "Enter a whole number from 0 to 100.";
  } else {
    raisedK = whole(fd, "raisedK");
    if (raisedK === null || raisedK < 0 || raisedK > 10_000_000) errors.raisedK = "Enter the amount raised in USD thousands.";
    if (!values.investor) errors.investor = "Required for a funded SME.";
  }

  const sortOrder = values.sortOrder === "" ? null : whole(fd, "sortOrder");
  if (values.sortOrder !== "" && sortOrder === null) errors.sortOrder = "Enter a whole number, or leave blank.";

  const upload = fd.get("image");
  const hasUpload = upload instanceof File && upload.size > 0;
  if (Object.keys(errors).length) return { message: "Check the highlighted fields.", fieldErrors: errors, values };

  const [current] = smeId
    ? await db.select({ imageFile: smes.imageFile }).from(smes).where(eq(smes.id, smeId)).limit(1)
    : [undefined];
  if (smeId && !current) return { message: "That SME no longer exists.", values };

  let imageFile = current?.imageFile ?? null;
  if (hasUpload) {
    const saved = await saveSmeImage(upload);
    if (!saved.ok) return { message: "Check the highlighted fields.", fieldErrors: { image: saved.error }, values };
    imageFile = saved.file;
  } else if (checked(fd, "removeImage")) {
    imageFile = null;
  }

  const row = {
    name: values.name,
    sector: values.sector,
    city: values.city,
    stage: values.stage,
    status,
    brief: values.brief,
    askK: askK!,
    metrics: values.metrics,
    interestPct,
    raisedK,
    investor: status === "funded" ? values.investor : null,
    quote: values.quote || null,
    imageFile,
    published: checked(fd, "published"),
  } as const;

  try {
    if (smeId) {
      await db
        .update(smes)
        .set({ ...row, ...(sortOrder !== null ? { sortOrder } : {}) })
        .where(eq(smes.id, smeId));
    } else {
      const [{ top }] = await db.select({ top: max(smes.sortOrder) }).from(smes);
      await db.insert(smes).values({ ...row, sortOrder: sortOrder ?? (top ?? 0) + 10 });
    }
  } catch (err) {
    if (hasUpload) await deleteSmeImage(imageFile);
    if (isDuplicate(err)) return { message: "Check the highlighted fields.", fieldErrors: { name: "Another SME already has this name." }, values };
    throw err;
  }

  // The old file goes only once the row no longer points at it.
  if (current?.imageFile && current.imageFile !== imageFile) await deleteSmeImage(current.imageFile);

  refresh();
  return { ok: true, message: smeId ? `Saved ${values.name}.` : `Added ${values.name}.` };
}

export async function deleteSme(fd: FormData): Promise<ActionResult> {
  if (!(await authorizeAction(SME_EDITORS))) return { ok: false, message: NOT_ALLOWED };
  const smeId = id(fd);
  if (!smeId) return { ok: false, message: "Unknown SME." };
  const db = getDb();
  const [row] = await db.select({ name: smes.name, imageFile: smes.imageFile }).from(smes).where(eq(smes.id, smeId)).limit(1);
  if (!row) return { ok: false, message: "That SME no longer exists." };
  await db.delete(smes).where(eq(smes.id, smeId));
  await deleteSmeImage(row.imageFile);
  refresh();
  return { ok: true, message: `Deleted ${row.name}.` };
}

export async function toggleSmePublished(fd: FormData): Promise<ActionResult> {
  if (!(await authorizeAction(SME_EDITORS))) return { ok: false, message: NOT_ALLOWED };
  const smeId = id(fd);
  if (!smeId) return { ok: false, message: "Unknown SME." };
  const published = checked(fd, "published");
  await getDb().update(smes).set({ published }).where(eq(smes.id, smeId));
  refresh();
  return { ok: true };
}

/**
 * Saves a whole new order at once, as the list's drag and drop and keyboard
 * moves produce it. The ids must be exactly the SMEs that exist, so a stale
 * tab cannot drop or duplicate a row.
 */
export async function reorderSmes(ids: unknown): Promise<ActionResult> {
  if (!(await authorizeAction(SME_EDITORS))) return { ok: false, message: NOT_ALLOWED };
  const order = idList(ids);
  if (!order) return { ok: false, message: "That order could not be read." };
  const db = getDb();
  return db.transaction(async (tx) => {
    const rows = await tx.select({ id: smes.id }).from(smes);
    const known = new Set(rows.map((r) => r.id));
    if (order.length !== known.size || !order.every((x) => known.has(x))) {
      return { ok: false, message: "The list changed in the meantime. Reload and try again." };
    }
    for (const [i, smeId] of order.entries()) {
      await tx.update(smes).set({ sortOrder: (i + 1) * 10 }).where(eq(smes.id, smeId));
    }
    refresh();
    return { ok: true };
  });
}
