"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { authorizeAction, NOT_ALLOWED, requireAdmin } from "@/lib/auth/dal";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/auth/password";
import { homeFor, isAdminRole, ROLE_LABELS, SUPERADMIN_ONLY } from "@/lib/auth/roles";
import { deleteOtherSessions } from "@/lib/auth/session";
import { id, isDuplicate, text } from "../_lib/form";
import type { ActionResult, FormState } from "../_lib/state";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function raw(fd: FormData, key: string) {
  const value = fd.get(key);
  return typeof value === "string" ? value : "";
}

type Db = ReturnType<typeof getDb>;
type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];

/**
 * The superadmins, locked until the transaction ends. Two superadmins
 * demoting or removing each other at once then queue up behind each other,
 * and the second sees the first's change, so the last one always stays.
 */
async function lockSuperadmins(tx: Tx) {
  const rows = await tx.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.role, "superadmin")).for("update");
  return rows.map((r) => r.id);
}

/** Only superadmins add admins, and every new admin is given a role on purpose. */
export async function addAdmin(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!(await authorizeAction(SUPERADMIN_ONLY))) return { message: NOT_ALLOWED };
  const name = text(fd, "name");
  const email = text(fd, "email").toLowerCase();
  const password = raw(fd, "password");
  const role = text(fd, "role");
  const values = { name, email, role };
  const errors: Record<string, string> = {};

  if (!name) errors.name = "Required.";
  else if (name.length > 120) errors.name = "Keep this under 120 characters.";
  if (!EMAIL.test(email) || email.length > 255) errors.email = "Enter a valid email.";
  const weak = passwordProblem(password);
  if (weak) errors.password = weak;
  if (!isAdminRole(role)) errors.role = "Choose a role.";
  if (Object.keys(errors).length || !isAdminRole(role)) return { fieldErrors: errors, values };

  try {
    await getDb().insert(adminUsers).values({ name, email, role, passwordHash: await hashPassword(password) });
  } catch (err) {
    if (isDuplicate(err)) return { fieldErrors: { email: "An admin with this email already exists." }, values };
    throw err;
  }
  revalidatePath("/admin/users");
  return { ok: true, message: `${email} can now sign in as ${ROLE_LABELS[role]}.` };
}

/**
 * Removes another admin. Their sessions go with them (cascade). Removing
 * yourself is refused outright; the last-superadmin check guards the rest.
 */
export async function removeAdmin(fd: FormData): Promise<ActionResult> {
  const me = await authorizeAction(SUPERADMIN_ONLY);
  if (!me) return { ok: false, message: NOT_ALLOWED };
  const userId = id(fd);
  if (!userId) return { ok: false, message: "Unknown admin." };
  if (userId === me.id) return { ok: false, message: "You cannot remove yourself." };

  const result = await getDb().transaction(async (tx): Promise<ActionResult> => {
    const superadmins = await lockSuperadmins(tx);
    if (superadmins.length <= 1 && superadmins.includes(userId)) {
      return { ok: false, message: "There must be at least one superadmin." };
    }
    const [gone] = await tx.delete(adminUsers).where(eq(adminUsers.id, userId));
    return gone.affectedRows ? { ok: true, message: "Admin removed." } : { ok: false, message: "That admin no longer exists." };
  });
  revalidatePath("/admin/users");
  return result;
}

/**
 * Changes what an admin may do. It applies on their very next request: the
 * session reads the role from this row each time, so nobody has to sign in
 * again. The last superadmin cannot be demoted, by themselves or anyone.
 */
export async function setAdminRole(fd: FormData): Promise<ActionResult> {
  const me = await authorizeAction(SUPERADMIN_ONLY);
  if (!me) return { ok: false, message: NOT_ALLOWED };
  const userId = id(fd);
  const role = text(fd, "role");
  if (!userId) return { ok: false, message: "Unknown admin." };
  if (!isAdminRole(role)) return { ok: false, message: "Choose a role." };

  const result = await getDb().transaction(async (tx): Promise<ActionResult & { name?: string }> => {
    const superadmins = await lockSuperadmins(tx);
    const [user] = await tx.select({ name: adminUsers.name, role: adminUsers.role }).from(adminUsers).where(eq(adminUsers.id, userId)).limit(1);
    if (!user) return { ok: false, message: "That admin no longer exists." };
    if (user.role === role) return { ok: true, name: user.name };
    if (role !== "superadmin" && superadmins.length <= 1 && superadmins.includes(userId)) {
      return { ok: false, message: "There must be at least one superadmin. Make someone else a superadmin first." };
    }
    await tx.update(adminUsers).set({ role }).where(eq(adminUsers.id, userId));
    return { ok: true, name: user.name };
  });
  if (!result.ok) return result;

  revalidatePath("/admin", "layout");
  // A superadmin who made themselves a KNEKS user can no longer see this page.
  if (userId === me.id && role !== "superadmin") redirect(homeFor(role));
  return { ok: true, message: `${result.name} is now ${ROLE_LABELS[role]}.` };
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
