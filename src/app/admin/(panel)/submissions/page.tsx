import { count, desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { Badge, BTN, Card, formatDate, PageHeader } from "../../_components/ui";

export const metadata: Metadata = { title: "Investor requests" };

const PER_PAGE = 50;
const FILTERS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "handled", label: "Handled" },
] as const;

export default async function SubmissionsPage({ searchParams }: PageProps<"/admin/submissions">) {
  await requireAdmin();
  const sp = await searchParams;
  const status = sp.status === "new" || sp.status === "handled" ? sp.status : "all";
  const page = Math.max(1, Number.parseInt(String(sp.page ?? "1"), 10) || 1);
  const where = status === "all" ? undefined : eq(investorRequests.status, status);

  const db = getDb();
  const [[{ n: total }], rows] = await Promise.all([
    db.select({ n: count() }).from(investorRequests).where(where),
    db
      .select()
      .from(investorRequests)
      .where(where)
      .orderBy(desc(investorRequests.createdAt), desc(investorRequests.id))
      .limit(PER_PAGE)
      .offset((page - 1) * PER_PAGE),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const href = (next: { status?: string; page?: number }) => {
    const q = new URLSearchParams();
    const s = next.status ?? status;
    if (s !== "all") q.set("status", s);
    if ((next.page ?? 1) > 1) q.set("page", String(next.page));
    const qs = q.toString();
    return `/admin/submissions${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Investor requests"
        description="Sent from “Request investor access” on /kneks. Newest first."
        actions={
          <a href={`/admin/submissions/export${status === "all" ? "" : `?status=${status}`}`} className={BTN.secondary}>
            Export CSV
          </a>
        }
      />

      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={href({ status: f.key, page: 1 })}
            aria-current={status === f.key ? "page" : undefined}
            className={`rounded-full border px-3 py-1 text-[13px] font-semibold ${
              status === f.key ? "border-indigo-brand bg-indigo-brand text-white" : "border-rule bg-white text-ink-muted hover:border-indigo-brand"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-[14px]">
          <thead className="border-b border-rule bg-cream text-[11px] uppercase tracking-[0.08em] text-ink-muted">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Received</th>
              <th className="px-4 py-2.5 font-semibold">Name</th>
              <th className="px-4 py-2.5 font-semibold">Region</th>
              <th className="px-4 py-2.5 font-semibold">Ticket size</th>
              <th className="px-4 py-2.5 font-semibold">Shortlist</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {rows.map((r) => (
              <tr key={r.id} className={`hover:bg-cream ${r.status === "new" ? "font-medium" : "text-ink-muted"}`}>
                <td className="whitespace-nowrap px-4 py-3 text-[13px]">{formatDate(r.createdAt)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/submissions/${r.id}`} className="font-semibold text-ink hover:text-indigo-brand">
                    {r.name}
                  </Link>
                  <p className="text-[12px] font-normal text-ink-muted">{r.email}</p>
                </td>
                <td className="px-4 py-3">{r.region}</td>
                <td className="px-4 py-3">{r.ticket}</td>
                <td className="max-w-[220px] truncate px-4 py-3 text-[13px]" title={r.shortlist}>
                  {r.shortlist || "—"}
                </td>
                <td className="px-4 py-3">
                  {r.status === "new" ? <Badge tone="gold">New</Badge> : <Badge tone="grey">Handled</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <p className="px-4 py-6 text-[14px] text-ink-muted">No requests here.</p> : null}
      </Card>

      {pages > 1 ? (
        <div className="flex items-center gap-3 text-[13px]">
          {page > 1 ? <Link href={href({ page: page - 1 })} className={BTN.secondary}>Newer</Link> : null}
          <span className="text-ink-muted">Page {page} of {pages}</span>
          {page < pages ? <Link href={href({ page: page + 1 })} className={BTN.secondary}>Older</Link> : null}
        </div>
      ) : null}
    </div>
  );
}
