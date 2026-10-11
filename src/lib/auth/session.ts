import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import { and, eq, gt, lt, ne } from "drizzle-orm";
import { cookies } from "next/headers";
import { getDb } from "@/db";
import { adminSessions, adminUsers, type AdminRole } from "@/db/schema";
import { SESSION_COOKIE, SESSION_COOKIE_PATH } from "./cookie";

const SESSION_DAYS = 7;

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters");
  }
  return value;
}

/** The row id for a cookie token: a keyed hash, so the table alone is useless. */
function sessionId(token: string) {
  return createHmac("sha256", secret()).update(token).digest("hex");
}

export type AdminIdentity = { id: number; email: string; name: string; role: AdminRole };

/** Opens a session for the user and sets the cookie. Server Actions only. */
export async function createSession(userId: number) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const db = getDb();
  await db.insert(adminSessions).values({ id: sessionId(token), userId, expiresAt });
  // Expired rows are swept here rather than on a timer; logins are rare enough.
  await db.delete(adminSessions).where(lt(adminSessions.expiresAt, new Date()));

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: SESSION_COOKIE_PATH,
    expires: expiresAt,
  });
}

/**
 * The signed-in admin, or null. Reads the database, so it is the real check.
 * The role comes from the user's row on every request rather than from the
 * cookie or the session row, so a role change applies at once, mid-session.
 */
export async function readSession(): Promise<(AdminIdentity & { sessionId: string }) | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || token.length > 100) return null;
  const id = sessionId(token);
  const [row] = await getDb()
    .select({ id: adminUsers.id, email: adminUsers.email, name: adminUsers.name, role: adminUsers.role })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminUsers.id, adminSessions.userId))
    .where(and(eq(adminSessions.id, id), gt(adminSessions.expiresAt, new Date())))
    .limit(1);
  return row ? { ...row, sessionId: id } : null;
}

export async function deleteSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await getDb().delete(adminSessions).where(eq(adminSessions.id, sessionId(token)));
  }
  store.delete({ name: SESSION_COOKIE, path: SESSION_COOKIE_PATH });
}

/** Signs a user out everywhere but the current session, e.g. after a password change. */
export async function deleteOtherSessions(userId: number, keepSessionId: string) {
  await getDb()
    .delete(adminSessions)
    .where(and(eq(adminSessions.userId, userId), ne(adminSessions.id, keepSessionId)));
}
