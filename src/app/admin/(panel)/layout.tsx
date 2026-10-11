import { count, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { logout } from "../actions/auth";
import { AdminShell } from "../_components/shell";

/**
 * The signed-in frame. Its check only decides what the frame shows: layouts
 * do not re-run on client navigation, so every page and action below also
 * calls requireAdmin() itself.
 */
export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const me = await requireAdmin();
  const [{ n: unread }] = await getDb()
    .select({ n: count() })
    .from(investorRequests)
    .where(eq(investorRequests.status, "new"));

  return (
    <AdminShell user={{ name: me.name, email: me.email }} unread={unread} logout={logout}>
      {children}
    </AdminShell>
  );
}
