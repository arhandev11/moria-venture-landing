"use server";

import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/auth/password";
import { deleteOtherSessions } from "@/lib/auth/session";
import { id, isDuplicate, text } from "../_lib/form";
import type { ActionResult, FormState } from "../_lib/state";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function raw(fd: FormData, key: string) {
  const value = fd.get(key);
  return typeof value === "string" ? value : "";
}

export async function addAdmin(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const name = text(fd, "name");
  const email = text(fd, "email").toLowerCase();
  const password = raw(fd, "password");
  const values = { name, email };
  const errors: Record<string, string> = {};

  if (!name) errors.name = "Required.";
  else if (name.length > 120) errors.name = "Keep this under 120 characters.";
  if (!EMAIL.test(email) || email.length > 255) errors.email = "Enter a valid email.";
  const weak = passwordProblem(password);
  if (weak) errors.password = weak;
  if (Object.keys(errors).length) return { fieldErrors: errors, values };

  try {
    await getDb().insert(adminUsers).values({ name, email, passwordHash: await hashPassword(password) });
  } catch (err) {
    if (isDuplicate(err)) return { fieldErrors: { email: "An admin with this email already exists." }, values };
    throw err;
  }
  revalidatePath("/admin/users");
  return { ok: true, message: `${email} can now sign in.` };
}

/** Removes another admin. Their sessions go with them (cascade). */
export async function removeAdmin(fd: FormData): Promise<ActionResult> {
  const me = await requireAdmin();
  const userId = id(fd);
  if (!userId || userId === me.id) return { ok: false, message: "You cannot remove yourself." };
  const db = getDb();
  const [{ n }] = await db.select({ n: count() }).from(adminUsers);
  if (n <= 1) return { ok: false, message: "There must be at least one admin." };
  await db.delete(adminUsers).where(eq(adminUsers.id, userId));
  revalidatePath("/admin/users");
  return { ok: true, message: "Admin removed." };
}

/** Changes the signed-in admin's password and signs out their other sessions. */
export async function changePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const current = raw(fd, "current");
  const next = raw(fd, "password");
  const confirm = raw(fd, "confirm");
  const errors: Record<string, string> = {};

  const db = getDb();
  const [row] = await db.select({ hash: adminUsers.passwordHash }).from(adminUsers).where(eq(adminUsers.id, me.id)).limit(1);
  if (!(await verifyPassword(current.slice(0, 200), row?.hash ?? null))) errors.current = "That is not your current password.";
  const weak = passwordProblem(next);
  if (weak) errors.password = weak;
  else if (next !== confirm) errors.confirm = "The two new passwords do not match.";
  if (Object.keys(errors).length) return { fieldErrors: errors };

  await db.update(adminUsers).set({ passwordHash: await hashPassword(next) }).where(eq(adminUsers.id, me.id));
  await deleteOtherSessions(me.id, me.sessionId);
  return { ok: true, message: "Password changed. Your other sessions have been signed out." };
}
