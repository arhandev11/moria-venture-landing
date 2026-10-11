import { count, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { logout } from "../actions/auth";
import { AdminNav } from "../_components/nav";

/**
 * The signed-in shell. Its check only decides what the shell shows: layouts
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
    <>
      <header className="border-b border-rule bg-white">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-6 px-4 md:px-6">
          <Link href="/admin" className="flex shrink-0 items-center gap-3">
            <Image src="/assets/brand/logo-wordmark.svg" alt="Moria Ventures" width={323} height={49} className="h-5 w-auto" />
            <span className="rounded bg-indigo-brand px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gold">
              Admin
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-3 text-[13px]">
            <Link href="/admin/account" className="hidden text-ink-muted hover:text-indigo-brand sm:block">
              {me.email}
            </Link>
            <form action={logout}>
              <button type="submit" className="font-semibold text-indigo-brand hover:underline">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <AdminNav unread={unread} />
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">{children}</div>
    </>
  );
}
