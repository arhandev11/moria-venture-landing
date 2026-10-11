import "server-only";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { homeFor, SME_EDITORS, STORY_EDITORS, SUPERADMIN_ONLY, type AdminRole } from "./roles";
import { readSession } from "./session";

/**
 * The gate for every admin page, Server Action and route handler. The proxy
 * only checks that a cookie exists; this checks it against the database, and
 * is memoised per request so a page and its layout share one lookup.
 */
export const requireAdmin = cache(async () => {
  const session = await readSession();
  if (!session) redirect("/admin/login");
  return session;
});

/**
 * For pages and layouts: the signed-in admin if their role is one of
 * `roles`. Anyone else gets a 404, so a page a role may not open looks the
 * same as one that does not exist, or with `otherwise: "home"` is sent to
 * their own starting page (for the overview, which is everyone's landing).
 */
export async function requireRole(roles: readonly AdminRole[], { otherwise = "404" }: { otherwise?: "404" | "home" } = {}) {
  const me = await requireAdmin();
  if (!roles.includes(me.role)) {
    if (otherwise === "home") redirect(homeFor(me.role));
    notFound();
  }
  return me;
}

/** Pages only superadmins may open: requests, form options, admins. */
export function requireSuperadmin() {
  return requireRole(SUPERADMIN_ONLY);
}

/** Pages that edit the SMEs: open to both roles. */
export function requireSmeEditor() {
  return requireRole(SME_EDITORS);
}

/** Pages that edit the success stories: open to both roles. */
export function requireStoryEditor() {
  return requireRole(STORY_EDITORS);
}

/**
 * For Server Actions: the signed-in admin if their role may run the action,
 * otherwise null, and the action hands back a refusal before it reads or
 * writes anything. A missing session still goes to the login page.
 */
export async function authorizeAction(roles: readonly AdminRole[]) {
  const me = await requireAdmin();
  return roles.includes(me.role) ? me : null;
}

/** What an action refused by authorizeAction hands back. */
export const NOT_ALLOWED = "You do not have access to that.";
