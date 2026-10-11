"use server";

import { and, asc, eq, max } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { formOptions, OPTION_KINDS, type OptionKind } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { checked, id, isDuplicate, reorder, text } from "../_lib/form";
import type { FormState } from "../_lib/state";

const LABEL_MAX = 120;

function refresh() {
  revalidatePath("/kneks");
  revalidatePath("/admin/options");
}

function kindOf(fd: FormData): OptionKind | null {
  const kind = text(fd, "kind");
  return (OPTION_KINDS as readonly string[]).includes(kind) ? (kind as OptionKind) : null;
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
  return { ok: true };
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

export async function toggleOption(fd: FormData) {
  await requireAdmin();
  const optionId = id(fd);
  if (!optionId) return;
  await getDb().update(formOptions).set({ active: checked(fd, "active") }).where(eq(formOptions.id, optionId));
  refresh();
}

export async function moveOption(fd: FormData) {
  await requireAdmin();
  const optionId = id(fd);
  const kind = kindOf(fd);
  const direction = text(fd, "direction") === "up" ? "up" : "down";
  if (!optionId || !kind) return;
  await getDb().transaction(async (tx) => {
    const rows = await tx
      .select({ id: formOptions.id })
      .from(formOptions)
      .where(eq(formOptions.kind, kind))
      .orderBy(asc(formOptions.sortOrder), asc(formOptions.id));
    const next = reorder(rows, optionId, direction);
    if (!next) return;
    for (const row of next) {
      await tx
        .update(formOptions)
        .set({ sortOrder: row.sortOrder })
        .where(and(eq(formOptions.id, row.id), eq(formOptions.kind, kind)));
    }
  });
  refresh();
}

/**
 * Past requests keep the label they were sent with, so deleting an option
 * never rewrites the inbox; deactivating it is the gentler choice.
 */
export async function deleteOption(fd: FormData) {
  await requireAdmin();
  const optionId = id(fd);
  if (!optionId) return;
  await getDb().delete(formOptions).where(eq(formOptions.id, optionId));
  refresh();
}
