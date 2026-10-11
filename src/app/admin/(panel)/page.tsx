import { asc, count, desc, eq, gte, sql } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/db";
import { formOptions, investorRequests, smes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { BuildingIcon, DownloadIcon, InboxIcon, ListIcon, PlusIcon } from "../_components/icons";
import { Badge, btn, Card, CardHeader, EmptyState, formatDate, PageHeader, TABLE, TextLink } from "../_components/ui";

export const metadata: Metadata = { title: "Overview" };

const DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;
/** Jakarta is UTC+7 all year, so days are cut there without a zone table. */
const WIB_MS = 7 * 60 * 60 * 1000;

/** The last fourteen Jakarta days, oldest first, as YYYY-MM-DD. */
function lastDays(now: Date) {
  return Array.from({ length: DAYS }, (_, i) => new Date(now.getTime() + WIB_MS - (DAYS - 1 - i) * DAY_MS).toISOString().slice(0, 10));
}

export default async function AdminHome() {
  const me = await requireAdmin();
  const db = getDb();
  const now = new Date();
  const days = lastDays(now);
  const since = new Date(Date.parse(`${days[0]}T00:00:00Z`) - WIB_MS);
  const wibDay = sql<string>`DATE_FORMAT(CONVERT_TZ(${investorRequests.createdAt}, '+00:00', '+07:00'), '%Y-%m-%d')`;

  const [byStatus, [smeCounts], [{ n: optionCount }], perDay, latest] = await Promise.all([
    db.select({ status: investorRequests.status, n: count() }).from(investorRequests).groupBy(investorRequests.status),
    db.select({ total: count(), live: sql<number>`SUM(${smes.published})` }).from(smes),
    db.select({ n: count() }).from(formOptions).where(eq(formOptions.active, true)),
    db.select({ day: wibDay, n: count() }).from(investorRequests).where(gte(investorRequests.createdAt, since)).groupBy(wibDay),
    // New first, then newest: what needs a reply sits at the top.
    db.select().from(investorRequests).orderBy(asc(investorRequests.status), desc(investorRequests.createdAt), desc(investorRequests.id)).limit(6),
  ]);

  const fresh = byStatus.find((r) => r.status === "new")?.n ?? 0;
  const total = byStatus.reduce((sum, r) => sum + r.n, 0);
  const counts = new Map(perDay.map((r) => [r.day, Number(r.n)]));
  const series = days.map((day) => ({ day, n: counts.get(day) ?? 0 }));
  const fortnight = series.reduce((sum, d) => sum + d.n, 0);

  return (
    <div className="space-y-6">
      <PageHeader title={`Welcome back, ${me.name}`} description="Investor requests from the KNEKS page, and the pipeline they are browsing." />

      {/* What needs doing first: unanswered requests, and how many are arriving. */}
      <Card className="grid overflow-hidden md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <div className={`flex flex-col justify-between gap-5 p-6 ${fresh ? "bg-gold/[0.18]" : "bg-shell"}`}>
          <div>
            <p className="text-[13px] font-semibold text-ink">New requests</p>
            <p className="mt-2 text-[56px] font-bold leading-none tracking-[-0.02em] text-indigo-brand tabular-nums">{fresh}</p>
            <p className="mt-2 text-[13px] text-ink-muted">{fresh ? "Waiting for a reply." : "All caught up."}</p>
          </div>
          <Link href={fresh ? "/admin/submissions?status=new" : "/admin/submissions"} className={`${btn("primary")} self-start`}>
            <InboxIcon className="size-4" />
            {fresh ? "Review new requests" : "Open the inbox"}
          </Link>
        </div>
        <div className="p-6">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[13px] font-semibold text-ink">Requests, last 14 days</p>
            <p className="text-[13px] tabular-nums text-ink-muted">{fortnight} in total</p>
          </div>
          <Bars series={series} />
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi href="/admin/submissions" icon={<InboxIcon />} label="All requests" value={String(total)} />
        <Kpi href="/admin/smes" icon={<BuildingIcon />} label="SMEs live on the page" value={`${Number(smeCounts.live ?? 0)} of ${smeCounts.total}`} />
        <Kpi href="/admin/options" icon={<ListIcon />} label="Form options switched on" value={String(optionCount)} />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="overflow-hidden">
          <CardHeader title="Latest requests" hint="New ones first" action={<TextLink href="/admin/submissions">View all</TextLink>} />
          {latest.length ? (
            <div className="overflow-x-auto">
              <table className={TABLE.table}>
                <tbody>
                  {latest.map((r) => (
                    <tr key={r.id} className={TABLE.tr}>
                      <td className={TABLE.td}>
                        <Link href={`/admin/submissions/${r.id}`} className="font-semibold text-ink hover:text-indigo-brand focus-visible:outline-2 focus-visible:outline-indigo-brand">
                          {r.name}
                        </Link>
                        <p className="text-[12px] text-ink-muted">{r.region}, {r.ticket}</p>
                      </td>
                      <td className={`${TABLE.td} whitespace-nowrap text-[13px] text-ink-muted max-sm:hidden`}>{formatDate(r.createdAt)}</td>
                      <td className={`${TABLE.td} text-right`}>{r.status === "new" ? <Badge tone="gold">New</Badge> : <Badge tone="muted">Handled</Badge>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState icon={<InboxIcon />} title="No requests yet">
              Requests sent from the KNEKS page show up here.
            </EmptyState>
          )}
        </Card>

        <Card>
          <CardHeader title="Quick actions" />
          <div className="grid gap-2 p-4">
            <Link href="/admin/smes?new=1" className={`${btn("secondary")} justify-start`}>
              <PlusIcon className="size-4" />
              Add SME
            </Link>
            <Link href="/admin/submissions" className={`${btn("secondary")} justify-start`}>
              <InboxIcon className="size-4" />
              View requests
            </Link>
            {/* A file download from a route handler, so a plain link rather than client navigation. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/admin/submissions/export" className={`${btn("secondary")} justify-start`}>
              <DownloadIcon className="size-4" />
              Export requests as CSV
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Kpi({ href, icon, label, value }: { href: string; icon: React.ReactNode; label: string; value: string }) {
  return (
    <Link href={href} className="group rounded-xl border border-ink/10 bg-white p-5 shadow-[0_1px_2px_rgb(32_31_34/0.04)] transition-colors hover:border-indigo-brand/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-brand">
      <span className="flex items-center gap-2 text-[13px] text-ink-muted group-hover:text-indigo-brand">
        {icon}
        {label}
      </span>
      <span className="mt-3 block text-[28px] font-bold leading-none tabular-nums text-ink">{value}</span>
    </Link>
  );
}

/** Fourteen bars, today in gold. Read out as a sentence; the bars themselves are decoration. */
function Bars({ series }: { series: { day: string; n: number }[] }) {
  const peak = Math.max(1, ...series.map((d) => d.n));
  const label = (day: string) => new Date(`${day}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
  const total = series.reduce((sum, d) => sum + d.n, 0);
  return (
    <figure className="mt-5">
      <div role="img" aria-label={`${total} requests over the last 14 days, at most ${peak} in a day.`} className="flex h-[112px] items-end gap-1.5">
        {series.map((d, i) => (
          <div key={d.day} className="flex h-full flex-1 flex-col justify-end" title={`${label(d.day)}: ${d.n}`}>
            <div
              className={`w-full rounded-t-[3px] ${i === series.length - 1 ? "bg-gold" : d.n ? "bg-indigo-brand/80" : "bg-ink/[0.07]"}`}
              style={{ height: d.n ? `${Math.max(8, (d.n / peak) * 100)}%` : "4px" }}
            />
          </div>
        ))}
      </div>
      <figcaption className="mt-2 flex justify-between text-[12px] text-ink-muted">
        <span>{label(series[0].day)}</span>
        <span>Today</span>
      </figcaption>
    </figure>
  );
}
