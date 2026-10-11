import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/dal";
import { PageHeader } from "../../../_components/ui";
import { SmeForm } from "../sme-form";
import { smeSuggestions } from "../suggestions";

export const metadata: Metadata = { title: "Add SME" };

export default async function NewSmePage() {
  await requireAdmin();
  return (
    <div className="max-w-[820px] space-y-6">
      <PageHeader title="Add SME" />
      <SmeForm
        suggestions={await smeSuggestions()}
        initial={{
          name: "",
          sector: "",
          city: "",
          stage: "",
          status: "program",
          brief: "",
          askK: "",
          interestPct: "0",
          metrics: "",
          raisedK: "",
          investor: "",
          quote: "",
          sortOrder: "",
          published: true,
          imageUrl: null,
        }}
      />
    </div>
  );
}
