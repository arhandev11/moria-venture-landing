import type { Metadata } from "next";
import { requireSmeEditor } from "@/lib/auth/dal";
import { EMPTY_SME } from "../sme-form";
import { SmePageForm } from "../sme-page-form";
import { smeSuggestions } from "../suggestions";

export const metadata: Metadata = { title: "Add SME" };

export default async function NewSmePage() {
  await requireSmeEditor();
  return <SmePageForm initial={EMPTY_SME} suggestions={await smeSuggestions()} />;
}
