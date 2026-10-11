import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
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
