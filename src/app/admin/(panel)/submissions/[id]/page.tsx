import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { requireSuperadmin } from "@/lib/auth/dal";
import { RequestPage } from "../request-page";
import { toItem } from "../to-item";

export const metadata: Metadata = { title: "Investor request" };

export default async function SubmissionPage({ params }: PageProps<"/admin/submissions/[id]">) {
  await requireSuperadmin();
  const requestId = Number((await params).id);
  if (!Number.isSafeInteger(requestId) || requestId < 1) notFound();
  const [row] = await getDb().select().from(investorRequests).where(eq(investorRequests.id, requestId)).limit(1);
  if (!row) notFound();
  return <RequestPage request={toItem(row)} />;
}
