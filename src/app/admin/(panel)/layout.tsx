import { count, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { SUPERADMIN_ONLY } from "@/lib/auth/roles";
import { logout } from "../actions/auth";
import { AdminShell } from "../_components/shell";

/**
 * The signed-in frame. Its check only decides what the frame shows: layouts
 * do not re-run on client navigation, so every page and action below also
 * checks the role itself. The new-request count is only worked out for a
 * role that may see requests; anyone else is never sent the number.
 */
export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const me = await requireAdmin();
  let unread = 0;
  if (SUPERADMIN_ONLY.includes(me.role)) {
    [{ n: unread }] = await getDb().select({ n: count() }).from(investorRequests).where(eq(investorRequests.status, "new"));
  }

  return (
    <AdminShell user={{ name: me.name, email: me.email, role: me.role }} unread={unread} logout={logout}>
      {children}
    </AdminShell>
  );
}
