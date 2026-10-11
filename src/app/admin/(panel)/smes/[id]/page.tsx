import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { smeImageUrl } from "@/lib/uploads";
import { deleteSme } from "../../../actions/smes";
import { SubmitButton } from "../../../_components/buttons";
import { PageHeader } from "../../../_components/ui";
import { SmeForm } from "../sme-form";
import { smeSuggestions } from "../suggestions";

export const metadata: Metadata = { title: "Edit SME" };

export default async function EditSmePage({ params }: PageProps<"/admin/smes/[id]">) {
  await requireAdmin();
  const smeId = Number((await params).id);
  if (!Number.isSafeInteger(smeId) || smeId < 1) notFound();
  const [sme] = await getDb().select().from(smes).where(eq(smes.id, smeId)).limit(1);
  if (!sme) notFound();

  const str = (n: number | null) => (n === null ? "" : String(n));

  return (
    <div className="max-w-[820px] space-y-6">
      <PageHeader
        title={sme.name}
        description={`${sme.sector} · ${sme.city}`}
        actions={
          <form action={deleteSme}>
            <input type="hidden" name="id" value={sme.id} />
            <SubmitButton tone="danger" confirm={`Delete ${sme.name}? This cannot be undone.`} pendingLabel="Deleting…">
              Delete SME
            </SubmitButton>
          </form>
        }
      />
      <SmeForm
        suggestions={await smeSuggestions()}
        initial={{
          id: sme.id,
          name: sme.name,
          sector: sme.sector,
          city: sme.city,
          stage: sme.stage,
          status: sme.status,
          brief: sme.brief,
          askK: str(sme.askK),
          interestPct: str(sme.interestPct),
          metrics: sme.metrics,
          raisedK: str(sme.raisedK),
          investor: sme.investor ?? "",
          quote: sme.quote ?? "",
          sortOrder: str(sme.sortOrder),
          published: sme.published,
          imageUrl: smeImageUrl(sme.imageFile),
        }}
      />
    </div>
  );
}
