"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { verifyPassword } from "@/lib/auth/password";
import { homeFor } from "@/lib/auth/roles";
import { createSession, deleteSession } from "@/lib/auth/session";
import { clientIp, hit, reset } from "@/lib/rate-limit";
import { text } from "../_lib/form";
import type { FormState } from "../_lib/state";

const WINDOW = 15 * 60 * 1000;

/**
 * Email and password sign-in. Limited twice over: per address, so one
 * machine cannot sweep many accounts, and per email, so a spread-out attack
 * cannot grind one account. A success clears that email's count.
 */
export async function login(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = text(fd, "email").toLowerCase().slice(0, 255);
  const password = typeof fd.get("password") === "string" ? (fd.get("password") as string) : "";
  const values = { email };

  if (!email || !password) {
    return { message: "Enter your email and password.", values };
  }

  const byIp = hit(`login:ip:${await clientIp()}`, 20, WINDOW);
  const byEmail = hit(`login:email:${email}`, 5, WINDOW);
  if (!byIp.allowed || !byEmail.allowed) {
    const minutes = Math.ceil(Math.max(byIp.retryAfterMs, byEmail.retryAfterMs) / 60000);
    return { message: `Too many sign-in attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`, values };
  }

  const db = getDb();
  const [user] = await db
    .select({ id: adminUsers.id, role: adminUsers.role, passwordHash: adminUsers.passwordHash })
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (!(await verifyPassword(password.slice(0, 200), user?.passwordHash ?? null)) || !user) {
    return { message: "Email or password is incorrect.", values };
  }

  reset(`login:email:${email}`);
  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, user.id));
  await createSession(user.id);
  redirect(homeFor(user.role));
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
