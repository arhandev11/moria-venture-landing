import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { deleteSubmission, setSubmissionStatus } from "../../../actions/submissions";
import { SubmitButton } from "../../../_components/buttons";
import { Badge, Card, formatDate, PageHeader } from "../../../_components/ui";

export const metadata: Metadata = { title: "Investor request" };

export default async function SubmissionPage({ params }: PageProps<"/admin/submissions/[id]">) {
  await requireAdmin();
  const requestId = Number((await params).id);
  if (!Number.isSafeInteger(requestId) || requestId < 1) notFound();
  const [r] = await getDb().select().from(investorRequests).where(eq(investorRequests.id, requestId)).limit(1);
  if (!r) notFound();

  const rows: [string, React.ReactNode][] = [
    ["Email", <a key="e" href={`mailto:${r.email}`} className="font-semibold text-indigo-brand hover:underline">{r.email}</a>],
    ["Region", r.region],
    ["Ticket size", r.ticket],
    ["Shortlist", r.shortlist || "None"],
    ["Received", formatDate(r.createdAt)],
    ["Status", r.status === "new" ? <Badge key="s" tone="gold">New</Badge> : <Badge key="s" tone="grey">Handled{r.handledAt ? ` · ${formatDate(r.handledAt)}` : ""}</Badge>],
  ];

  return (
    <div className="max-w-[820px] space-y-6">
      <Link href="/admin/submissions" className="text-[13px] font-semibold text-indigo-brand hover:underline">
        ← All requests
      </Link>
      <PageHeader
        title={r.name}
        actions={
          <>
            <form action={setSubmissionStatus}>
              <input type="hidden" name="id" value={r.id} />
              <input type="hidden" name="status" value={r.status === "new" ? "handled" : "new"} />
              <SubmitButton tone={r.status === "new" ? "primary" : "secondary"}>
                {r.status === "new" ? "Mark handled" : "Mark as new"}
              </SubmitButton>
            </form>
            <form action={deleteSubmission}>
              <input type="hidden" name="id" value={r.id} />
              <SubmitButton tone="danger" confirm="Delete this request? This cannot be undone.">
                Delete
              </SubmitButton>
            </form>
          </>
        }
      />
      <Card>
        <dl className="grid grid-cols-[140px_minmax(0,1fr)] gap-x-4 gap-y-3 p-5 text-[14px]">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-ink-muted">{label}</dt>
              <dd className="break-words">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-rule p-5">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-indigo-brand">Message</h2>
          <p className="mt-2 whitespace-pre-wrap break-words text-[14px] leading-relaxed">{r.message || "No message."}</p>
        </div>
      </Card>
    </div>
  );
}
