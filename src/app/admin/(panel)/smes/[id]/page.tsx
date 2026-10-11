import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { requireSmeEditor } from "@/lib/auth/dal";
import { SmePageForm } from "../sme-page-form";
import { smeSuggestions } from "../suggestions";
import { toValues } from "../to-values";

export const metadata: Metadata = { title: "Edit SME" };

export default async function EditSmePage({ params }: PageProps<"/admin/smes/[id]">) {
  await requireSmeEditor();
  const smeId = Number((await params).id);
  if (!Number.isSafeInteger(smeId) || smeId < 1) notFound();
  const [sme] = await getDb().select().from(smes).where(eq(smes.id, smeId)).limit(1);
  if (!sme) notFound();
  return <SmePageForm initial={toValues(sme)} suggestions={await smeSuggestions()} />;
}
