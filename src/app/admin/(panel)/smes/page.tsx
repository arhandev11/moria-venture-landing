import { asc } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { smeImageUrl } from "@/lib/uploads";
import { moveSme, toggleSmePublished } from "../../actions/smes";
import { SubmitButton } from "../../_components/buttons";
import { Badge, BTN, Card, PageHeader } from "../../_components/ui";

export const metadata: Metadata = { title: "SMEs" };

export default async function SmesPage() {
  await requireAdmin();
  const rows = await getDb().select().from(smes).orderBy(asc(smes.sortOrder), asc(smes.id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="SMEs"
        description="The pipeline cards under “SMEs in the program” on /kneks, in display order."
        actions={
          <Link href="/admin/smes/new" className={BTN.primary}>
            Add SME
          </Link>
        }
      />

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-[14px]">
          <thead className="border-b border-rule bg-cream text-[11px] uppercase tracking-[0.08em] text-ink-muted">
            <tr>
              <th className="w-[84px] px-4 py-2.5 font-semibold">Order</th>
              <th className="px-4 py-2.5 font-semibold">SME</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
              <th className="px-4 py-2.5 font-semibold">Ask</th>
              <th className="px-4 py-2.5 font-semibold">Interest / raised</th>
              <th className="px-4 py-2.5 font-semibold">Published</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {rows.map((sme, i) => (
              <tr key={sme.id} className={sme.published ? "" : "bg-ink/[0.02] text-ink-muted"}>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <form action={moveSme}>
                      <input type="hidden" name="id" value={sme.id} />
                      <input type="hidden" name="direction" value="up" />
                      <SubmitButton tone="icon" aria-label={`Move ${sme.name} up`} disabled={i === 0}>
                        ↑
                      </SubmitButton>
                    </form>
                    <form action={moveSme}>
                      <input type="hidden" name="id" value={sme.id} />
                      <input type="hidden" name="direction" value="down" />
                      <SubmitButton tone="icon" aria-label={`Move ${sme.name} down`} disabled={i === rows.length - 1}>
                        ↓
                      </SubmitButton>
                    </form>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {sme.imageFile ? (
                      // eslint-disable-next-line @next/next/no-img-element -- a tiny admin thumbnail; no need for the optimiser
                      <img src={smeImageUrl(sme.imageFile)!} alt="" className="size-9 rounded object-cover" />
                    ) : (
                      <span className="flex size-9 items-center justify-center rounded bg-indigo-brand/10 text-[12px] font-bold text-indigo-brand">
                        {sme.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                      </span>
                    )}
                    <div>
                      <Link href={`/admin/smes/${sme.id}`} className="font-semibold text-ink hover:text-indigo-brand">
                        {sme.name}
                      </Link>
                      <p className="text-[12px] text-ink-muted">
                        {sme.sector} · {sme.city} · {sme.stage}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {sme.status === "funded" ? <Badge tone="gold">Funded</Badge> : <Badge tone="indigo">In program</Badge>}
                </td>
                <td className="px-4 py-3 tabular-nums">USD {sme.askK.toLocaleString("en")}K</td>
                <td className="px-4 py-3 tabular-nums">
                  {sme.status === "funded" ? `USD ${(sme.raisedK ?? 0).toLocaleString("en")}K` : `${sme.interestPct ?? 0}%`}
                </td>
                <td className="px-4 py-3">
                  <form action={toggleSmePublished} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={sme.id} />
                    <input type="hidden" name="published" value={sme.published ? "false" : "true"} />
                    {sme.published ? <Badge tone="green">Live</Badge> : <Badge tone="grey">Hidden</Badge>}
                    <SubmitButton tone="secondary" className="h-7 px-2.5 text-[12px]">
                      {sme.published ? "Hide" : "Publish"}
                    </SubmitButton>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/smes/${sme.id}`} className={`${BTN.secondary} h-7 px-2.5 text-[12px]`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <p className="px-4 py-6 text-[14px] text-ink-muted">No SMEs yet.</p> : null}
      </Card>
    </div>
  );
}
