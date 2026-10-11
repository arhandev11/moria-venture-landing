"use server";

import { eq, max } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { authorizeAction, NOT_ALLOWED } from "@/lib/auth/dal";
import { SME_EDITORS } from "@/lib/auth/roles";
import { isSmeCurrency, parseWholeAmount, type SmeCurrency } from "@/lib/money";
import { revalidateKneks } from "@/lib/revalidate-kneks";
import { CURATION_STATUSES, isHttpUrl, LEGAL_FORMS, SME_TEXT_LIMITS, type SmeTextField } from "@/lib/sme-fields";
import { deleteSmeImage, saveSmeImage } from "@/lib/uploads";
import { checked, id, idList, isDuplicate, text, whole } from "../_lib/form";
import type { ActionResult, FormState } from "../_lib/state";

/** Text fields the form posts, with their limits. `status` and the numbers are read separately. */
const TEXT_FIELDS = [
  "name",
  "sector",
  "city",
  "province",
  "stage",
  "readiness",
  "brief",
  "metrics",
  "investor",
  "quote",
  "supportingOrg",
  "valuationTerms",
  "useOfFunds",
  "productCategory",
  "ceoName",
  "address",
  "potentialInvestors",
  "curationNotes",
  "pitchDeckUrl",
  "dataQualityNotes",
] as const satisfies readonly SmeTextField[];

/** Posted as typed and refilled on a rejected form, but checked by their own rules. */
const OTHER_FIELDS = ["status", "askAmount", "askCurrency", "interestPct", "raisedAmount", "raisedCurrency", "legalForm", "curationStatus", "sortOrder"] as const;

const BOTH_OR_NEITHER = "Enter both the amount and its currency, or neither.";

/** Everything that shows SMEs: the public page and the admin list. */
function refresh() {
  revalidateKneks();
  revalidatePath("/admin/smes");
}

/**
 * Reads an amount and its currency. Both are optional, but only together:
 * one without the other is an error on whichever is missing.
 */
function money(values: Record<string, string>, errors: Record<string, string>, amountKey: string, currencyKey: string) {
  const raw = values[amountKey];
  const code = values[currencyKey];
  if (!raw && !code) return { amount: null, currency: null };
  const amount = raw ? parseWholeAmount(raw) : null;
  if (raw && amount === null) errors[amountKey] = "Enter a whole amount above zero, like 15000000000 or 15,000,000,000.";
  if (code && !isSmeCurrency(code)) errors[currencyKey] = "Pick a currency from the list.";
  if (!raw) errors[amountKey] = BOTH_OR_NEITHER;
  if (!code) errors[currencyKey] = BOTH_OR_NEITHER;
  return amount !== null && isSmeCurrency(code) ? { amount, currency: code } : { amount: null, currency: null };
}

/**
 * Creates an SME, or updates one when the form carries an id. Fields are
 * checked first and the image saved only once they pass, so a rejected form
 * never leaves a stray file behind. Only name, sector and brief are required;
 * any other field left empty is stored as null. `source` and `sourceRef`
 * belong to the import and are never written here.
 */
export async function saveSme(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!(await authorizeAction(SME_EDITORS))) return { message: NOT_ALLOWED };
  const db = getDb();
  const smeId = id(fd);

  const values = Object.fromEntries([...TEXT_FIELDS, ...OTHER_FIELDS].map((key) => [key, text(fd, key)])) as Record<string, string>;
  values.published = checked(fd, "published") ? "on" : "";
  values.askCurrencyInferred = checked(fd, "askCurrencyInferred") ? "on" : "";
  const errors: Record<string, string> = {};

  for (const key of TEXT_FIELDS) {
    const limit = SME_TEXT_LIMITS[key];
    if (values[key].length > limit) errors[key] = `Keep this under ${limit.toLocaleString("en")} characters.`;
  }
  for (const key of ["name", "sector", "brief"]) {
    if (!values[key]) errors[key] = "Required.";
  }
  const orNull = (key: (typeof TEXT_FIELDS)[number]) => values[key] || null;

  const status = values.status === "funded" ? "funded" : "program";
  const ask = money(values, errors, "askAmount", "askCurrency");

  let interestPct: number | null = null;
  let raised: { amount: number | null; currency: SmeCurrency | null } = { amount: null, currency: null };
  if (status === "program") {
    if (values.interestPct) {
      interestPct = whole(fd, "interestPct");
      if (interestPct === null || interestPct < 0 || interestPct > 100) errors.interestPct = "Enter a whole number from 0 to 100, or leave blank.";
    }
  } else {
    raised = money(values, errors, "raisedAmount", "raisedCurrency");
    if (!values.investor) errors.investor = "Required for a funded SME.";
  }

  const legalForm = values.legalForm ? LEGAL_FORMS.find((f) => f === values.legalForm) : null;
  if (legalForm === undefined) errors.legalForm = "Pick a legal form from the list.";
  const curationStatus = values.curationStatus ? CURATION_STATUSES.find((c) => c === values.curationStatus) : null;
  if (curationStatus === undefined) errors.curationStatus = "Pick a curation status from the list.";

  if (values.pitchDeckUrl && !errors.pitchDeckUrl && !isHttpUrl(values.pitchDeckUrl)) {
    errors.pitchDeckUrl = "Enter a full link starting with https://.";
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
    city: orNull("city"),
    province: orNull("province"),
    stage: orNull("stage"),
    readiness: orNull("readiness"),
    status,
    brief: values.brief,
    askAmount: ask.amount,
    askCurrency: ask.currency,
    askCurrencyInferred: ask.amount !== null && values.askCurrencyInferred === "on",
    interestPct,
    metrics: orNull("metrics"),
    raisedAmount: raised.amount,
    raisedCurrency: raised.currency,
    investor: status === "funded" ? values.investor : null,
    quote: orNull("quote"),
    legalForm: legalForm ?? null,
    supportingOrg: orNull("supportingOrg"),
    valuationTerms: orNull("valuationTerms"),
    useOfFunds: orNull("useOfFunds"),
    imageFile,
    curationStatus: curationStatus ?? null,
    productCategory: orNull("productCategory"),
    ceoName: orNull("ceoName"),
    address: orNull("address"),
    potentialInvestors: orNull("potentialInvestors"),
    curationNotes: orNull("curationNotes"),
    pitchDeckUrl: orNull("pitchDeckUrl"),
    dataQualityNotes: orNull("dataQualityNotes"),
    published: checked(fd, "published"),
  } satisfies Partial<typeof smes.$inferInsert>;

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
