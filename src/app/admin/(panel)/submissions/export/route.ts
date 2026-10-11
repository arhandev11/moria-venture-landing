import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { readSession } from "@/lib/auth/session";

/**
 * A spreadsheet-safe cell: quoted, inner quotes doubled, and anything a
 * spreadsheet would run as a formula (= + - @, or a leading tab/CR) defused
 * with a leading apostrophe. Visitors write these fields, so this matters.
 */
function cell(value: string | number | Date | null) {
  let s = value instanceof Date ? value.toISOString() : String(value ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  // A handler, not a page, so it answers 401 rather than redirecting.
  if (!(await readSession())) return new Response("Unauthorized", { status: 401 });

  const status = new URL(request.url).searchParams.get("status");
  const where = status === "new" || status === "handled" ? eq(investorRequests.status, status) : undefined;
  const rows = await getDb()
    .select()
    .from(investorRequests)
    .where(where)
    .orderBy(desc(investorRequests.createdAt), desc(investorRequests.id));

  const header = ["id", "received_at_utc", "status", "name", "email", "region", "ticket_size", "shortlist", "message", "handled_at_utc"];
  const lines = [
    header.map(cell).join(","),
    ...rows.map((r) =>
      [r.id, r.createdAt, r.status, r.name, r.email, r.region, r.ticket, r.shortlist, r.message, r.handledAt].map(cell).join(","),
    ),
  ];
  const stamp = new Date().toISOString().slice(0, 10);

  // The BOM makes Excel read the file as UTF-8 (en dashes in ticket sizes).
  return new Response(`﻿${lines.join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="investor-requests-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
