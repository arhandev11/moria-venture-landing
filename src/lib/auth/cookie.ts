/**
 * The admin session cookie's name and path. Kept apart from the session code
 * so the proxy can read it without pulling the database into its bundle.
 * Scoping the cookie to /admin keeps it off every public page request.
 */
export const SESSION_COOKIE = "mv_admin_session";
export const SESSION_COOKIE_PATH = "/admin";
