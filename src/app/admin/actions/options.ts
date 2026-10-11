"use server";

import { and, eq, max } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { formOptions, OPTION_KINDS, type OptionKind } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { checked, id, idList, isDuplicate, text } from "../_lib/form";
import type { ActionResult, FormState } from "../_lib/state";

const LABEL_MAX = 120;

function refresh() {
  revalidatePath("/kneks");
  revalidatePath("/admin/options");
}

function asKind(kind: unknown): OptionKind | null {
  return typeof kind === "string" && (OPTION_KINDS as readonly string[]).includes(kind) ? (kind as OptionKind) : null;
}

function kindOf(fd: FormData): OptionKind | null {
  return asKind(text(fd, "kind"));
}

function checkLabel(label: string) {
  if (!label) return "Enter a label.";
  if (label.length > LABEL_MAX) return `Keep this under ${LABEL_MAX} characters.`;
  return null;
}

export async function addOption(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const kind = kindOf(fd);
  const label = text(fd, "label");
  if (!kind) return { message: "Unknown option list." };
  const problem = checkLabel(label);
  if (problem) return { fieldErrors: { label: problem }, values: { label } };

  const db = getDb();
  const [{ top }] = await db.select({ top: max(formOptions.sortOrder) }).from(formOptions).where(eq(formOptions.kind, kind));
  try {
    await db.insert(formOptions).values({ kind, label, sortOrder: (top ?? 0) + 10, active: true });
  } catch (err) {
    if (isDuplicate(err)) return { fieldErrors: { label: "That option already exists." }, values: { label } };
    throw err;
  }
  refresh();
  return { ok: true, message: `Added “${label}”.` };
}

export async function renameOption(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const optionId = id(fd);
  const label = text(fd, "label");
  if (!optionId) return { message: "Unknown option." };
  const problem = checkLabel(label);
  if (problem) return { fieldErrors: { label: problem }, values: { label } };
  try {
    await getDb().update(formOptions).set({ label }).where(eq(formOptions.id, optionId));
  } catch (err) {
    if (isDuplicate(err)) return { fieldErrors: { label: "That option already exists." }, values: { label } };
    throw err;
  }
  refresh();
  return { ok: true, message: "Saved." };
}

export async function toggleOption(fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const optionId = id(fd);
  if (!optionId) return { ok: false, message: "Unknown option." };
  await getDb().update(formOptions).set({ active: checked(fd, "active") }).where(eq(formOptions.id, optionId));
  refresh();
  return { ok: true };
}

/**
 * Saves a whole new order for one list (regions or ticket sizes) at once.
 * The ids must be exactly that list's options, so a stale tab cannot drop,
 * duplicate or smuggle in a row from the other list.
 */
export async function reorderOptions(kind: unknown, ids: unknown): Promise<ActionResult> {
  await requireAdmin();
  const list = asKind(kind);
  const order = idList(ids);
  if (!list || !order) return { ok: false, message: "That order could not be read." };
  return getDb().transaction(async (tx) => {
    const rows = await tx.select({ id: formOptions.id }).from(formOptions).where(eq(formOptions.kind, list));
    const known = new Set(rows.map((r) => r.id));
    if (order.length !== known.size || !order.every((x) => known.has(x))) {
      return { ok: false, message: "The list changed in the meantime. Reload and try again." };
    }
    for (const [i, optionId] of order.entries()) {
      await tx
        .update(formOptions)
        .set({ sortOrder: (i + 1) * 10 })
        .where(and(eq(formOptions.id, optionId), eq(formOptions.kind, list)));
    }
    refresh();
    return { ok: true };
  });
}

/**
 * Past requests keep the label they were sent with, so deleting an option
 * never rewrites the inbox; deactivating it is the gentler choice.
 */
export async function deleteOption(fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const optionId = id(fd);
  if (!optionId) return { ok: false, message: "Unknown option." };
  await getDb().delete(formOptions).where(eq(formOptions.id, optionId));
  refresh();
  return { ok: true, message: "Option deleted." };
}
