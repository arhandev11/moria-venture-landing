"use server";

import { asc, eq, max } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { deleteSmeImage, saveSmeImage } from "@/lib/uploads";
import { checked, id, isDuplicate, reorder, text, whole } from "../_lib/form";
import type { FormState } from "../_lib/state";

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
  revalidatePath("/kneks");
  revalidatePath("/admin/smes");
}

/**
 * Creates an SME, or updates one when the form carries an id. Fields are
 * checked first and the image saved only once they pass, so a rejected form
 * never leaves a stray file behind.
 */
export async function saveSme(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
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
  redirect("/admin/smes");
}

export async function deleteSme(fd: FormData) {
  await requireAdmin();
  const smeId = id(fd);
  if (!smeId) return;
  const db = getDb();
  const [row] = await db.select({ imageFile: smes.imageFile }).from(smes).where(eq(smes.id, smeId)).limit(1);
  if (!row) return;
  await db.delete(smes).where(eq(smes.id, smeId));
  await deleteSmeImage(row.imageFile);
  refresh();
  redirect("/admin/smes");
}

export async function toggleSmePublished(fd: FormData) {
  await requireAdmin();
  const smeId = id(fd);
  if (!smeId) return;
  await getDb().update(smes).set({ published: checked(fd, "published") }).where(eq(smes.id, smeId));
  refresh();
}

export async function moveSme(fd: FormData) {
  await requireAdmin();
  const smeId = id(fd);
  const direction = text(fd, "direction") === "up" ? "up" : "down";
  if (!smeId) return;
  const db = getDb();
  await db.transaction(async (tx) => {
    const rows = await tx.select({ id: smes.id }).from(smes).orderBy(asc(smes.sortOrder), asc(smes.id));
    const next = reorder(rows, smeId, direction);
    if (!next) return;
    for (const row of next) await tx.update(smes).set({ sortOrder: row.sortOrder }).where(eq(smes.id, row.id));
  });
  refresh();
}
