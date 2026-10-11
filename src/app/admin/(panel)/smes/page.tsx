import { asc } from "drizzle-orm";
import type { Metadata } from "next";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { SmeTable } from "./sme-table";
import { smeSuggestions } from "./suggestions";
import { toValues } from "./to-values";

export const metadata: Metadata = { title: "SMEs" };

export default async function SmesPage({ searchParams }: PageProps<"/admin/smes">) {
  await requireAdmin();
  const [rows, suggestions, sp] = await Promise.all([
    getDb().select().from(smes).orderBy(asc(smes.sortOrder), asc(smes.id)),
    smeSuggestions(),
    searchParams,
  ]);
  return <SmeTable items={rows.map(toValues)} suggestions={suggestions} startWithNew={sp.new === "1"} />;
}
