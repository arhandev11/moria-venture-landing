import "server-only";
import type { SmeRow } from "@/db/schema";
import { smeImageUrl } from "@/lib/uploads";
import type { SmeListItem } from "./sme-table";

/** A database row as the SME form and list take it: numbers as the text the inputs show. */
export function toValues(sme: SmeRow): SmeListItem {
  const str = (n: number | null) => (n === null ? "" : String(n));
  return {
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
  };
}
