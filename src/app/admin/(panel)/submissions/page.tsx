import { count, desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { requireSuperadmin } from "@/lib/auth/dal";
import { RequestsTable } from "./requests-table";
import { toItem } from "./to-item";

export const metadata: Metadata = { title: "Investor requests" };

const PER_PAGE = 50;

export default async function SubmissionsPage({ searchParams }: PageProps<"/admin/submissions">) {
  await requireSuperadmin();
  const sp = await searchParams;
  const status = sp.status === "new" || sp.status === "handled" ? sp.status : "all";
  const page = Math.max(1, Number.parseInt(String(sp.page ?? "1"), 10) || 1);
  const where = status === "all" ? undefined : eq(investorRequests.status, status);

  const db = getDb();
  const [byStatus, rows] = await Promise.all([
    db.select({ status: investorRequests.status, n: count() }).from(investorRequests).groupBy(investorRequests.status),
    db
      .select()
      .from(investorRequests)
      .where(where)
      .orderBy(desc(investorRequests.createdAt), desc(investorRequests.id))
      .limit(PER_PAGE)
      .offset((page - 1) * PER_PAGE),
  ]);
  const counts = { all: 0, new: 0, handled: 0 };
  for (const row of byStatus) {
    counts[row.status] = row.n;
    counts.all += row.n;
  }

  return (
    <RequestsTable
      rows={rows.map(toItem)}
      status={status}
      counts={counts}
      page={page}
      pages={Math.max(1, Math.ceil(counts[status] / PER_PAGE))}
    />
  );
}
