/**
 * Who may use which part of the admin. Kept free of `server-only` and of
 * imports so the sidebar can hide what a role cannot open, and the schema
 * and seed script can load it as plain TS; the server still checks every
 * page, action and handler against these same lists through the DAL.
 */

/**
 * A superadmin runs everything; a kneks user only edits the SMEs and the
 * success stories on /kneks, and never sees investor requests, their emails
 * or other admins.
 */
export const ADMIN_ROLES = ["superadmin", "kneks"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

/** Everything: investor requests, form options, admins and the SMEs. */
export const SUPERADMIN_ONLY: readonly AdminRole[] = ["superadmin"];
/** The SME list on /kneks: both roles. */
export const SME_EDITORS: readonly AdminRole[] = ["superadmin", "kneks"];
/** The success stories on /kneks: both roles, since KNEKS writes them. */
export const STORY_EDITORS: readonly AdminRole[] = SME_EDITORS;

export const ROLE_LABELS: Record<AdminRole, string> = {
  superadmin: "Superadmin",
  kneks: "KNEKS",
};

export const ROLE_SUMMARIES: Record<AdminRole, string> = {
  superadmin: "Everything, including investor requests and other admins.",
  kneks: "Only the SMEs and success stories on the KNEKS page. No investor requests, no emails.",
};

export function isAdminRole(value: unknown): value is AdminRole {
  return (ADMIN_ROLES as readonly unknown[]).includes(value);
}

/** Where a role lands after signing in: the overview is about investor requests. */
export function homeFor(role: AdminRole) {
  return role === "superadmin" ? "/admin" : "/admin/smes";
}
