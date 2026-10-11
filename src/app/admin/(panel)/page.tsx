import { count, desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/db";
import { formOptions, investorRequests, smes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { Badge, Card, formatDate, PageHeader, TextLink } from "../_components/ui";

export const metadata: Metadata = { title: "Overview" };

export default async function AdminHome() {
  const me = await requireAdmin();
  const db = getDb();
  const [[{ n: smeTotal }], [{ n: smePublished }], [{ n: newRequests }], [{ n: optionCount }], latest] = await Promise.all([
    db.select({ n: count() }).from(smes),
    db.select({ n: count() }).from(smes).where(eq(smes.published, true)),
    db.select({ n: count() }).from(investorRequests).where(eq(investorRequests.status, "new")),
    db.select({ n: count() }).from(formOptions).where(eq(formOptions.active, true)),
    db.select().from(investorRequests).orderBy(desc(investorRequests.createdAt), desc(investorRequests.id)).limit(5),
  ]);

  const tiles = [
    { label: "New investor requests", value: newRequests, href: "/admin/submissions?status=new" },
    { label: "SMEs published", value: `${smePublished} / ${smeTotal}`, href: "/admin/smes" },
    { label: "Active form options", value: optionCount, href: "/admin/options" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title={`Welcome, ${me.name}`} description="The KNEKS partnership page and the requests it brings in." />

      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map((tile) => (
          <Link key={tile.label} href={tile.href} className="rounded-lg border border-rule bg-white p-5 transition-colors hover:border-indigo-brand">
            <p className="text-[30px] font-bold leading-none text-indigo-brand">{tile.value}</p>
            <p className="mt-2 text-[13px] text-ink-muted">{tile.label}</p>
          </Link>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between border-b border-rule px-5 py-3">
          <h2 className="text-[15px] font-bold">Latest requests</h2>
          <TextLink href="/admin/submissions">View all</TextLink>
        </div>
        {latest.length ? (
          <ul className="divide-y divide-rule">
            {latest.map((r) => (
              <li key={r.id}>
                <Link href={`/admin/submissions/${r.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 hover:bg-cream">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-[13px] text-ink-muted">{r.region} · {r.ticket}</span>
                  <span className="ml-auto flex items-center gap-3 text-[12px] text-ink-muted">
                    {r.status === "new" ? <Badge tone="gold">New</Badge> : <Badge tone="grey">Handled</Badge>}
                    {formatDate(r.createdAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-6 text-[14px] text-ink-muted">No requests yet.</p>
        )}
      </Card>

      <p className="text-[13px] text-ink-muted">
        Changes to SMEs and form options go live on{" "}
        <a href="/kneks" target="_blank" rel="noopener" className="font-semibold text-indigo-brand hover:underline">
          /kneks
        </a>{" "}
        as soon as they are saved.
      </p>
    </div>
  );
}
