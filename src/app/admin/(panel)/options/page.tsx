import { asc } from "drizzle-orm";
import type { Metadata } from "next";
import { getDb } from "@/db";
import { formOptions } from "@/db/schema";
import { requireSuperadmin } from "@/lib/auth/dal";
import { OptionsBoard } from "./options-board";

export const metadata: Metadata = { title: "Form options" };

export default async function OptionsPage() {
  await requireSuperadmin();
  const rows = await getDb()
    .select({ id: formOptions.id, kind: formOptions.kind, label: formOptions.label, active: formOptions.active })
    .from(formOptions)
    .orderBy(asc(formOptions.sortOrder), asc(formOptions.id));
  return <OptionsBoard options={rows} />;
}
