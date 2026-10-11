import "server-only";
import type { SmeRow } from "@/db/schema";
import { smeImageUrl } from "@/lib/uploads";
import type { SmeListItem } from "./sme-table";

/** How an import is named next to its row number, e.g. "HSDD 2026 · row 23". */
const SOURCE_NAMES: Record<string, string> = { "hsdd-2026": "HSDD 2026" };

/**
 * A database row as the SME form and list take it: every nullable field as
 * the text its input shows (null becomes ""), amounts as plain digits.
 */
export function toValues(sme: SmeRow): SmeListItem {
  const str = (n: number | null) => (n === null ? "" : String(n));
  const source = sme.source ? [SOURCE_NAMES[sme.source] ?? sme.source, sme.sourceRef === null ? null : `row ${sme.sourceRef}`].filter(Boolean).join(" · ") : null;
  return {
    id: sme.id,
    name: sme.name,
    sector: sme.sector,
    city: sme.city ?? "",
    province: sme.province ?? "",
    stage: sme.stage ?? "",
    readiness: sme.readiness ?? "",
    status: sme.status,
    brief: sme.brief,
    askAmount: str(sme.askAmount),
    askCurrency: sme.askCurrency ?? "",
    askCurrencyInferred: sme.askCurrencyInferred,
    interestPct: str(sme.interestPct),
    metrics: sme.metrics ?? "",
    raisedAmount: str(sme.raisedAmount),
    raisedCurrency: sme.raisedCurrency ?? "",
    investor: sme.investor ?? "",
    quote: sme.quote ?? "",
    legalForm: sme.legalForm ?? "",
    supportingOrg: sme.supportingOrg ?? "",
    valuationTerms: sme.valuationTerms ?? "",
    useOfFunds: sme.useOfFunds ?? "",
    curationStatus: sme.curationStatus ?? "",
    productCategory: sme.productCategory ?? "",
    ceoName: sme.ceoName ?? "",
    address: sme.address ?? "",
    potentialInvestors: sme.potentialInvestors ?? "",
    curationNotes: sme.curationNotes ?? "",
    pitchDeckUrl: sme.pitchDeckUrl ?? "",
    dataQualityNotes: sme.dataQualityNotes ?? "",
    source,
    sortOrder: str(sme.sortOrder),
    published: sme.published,
    imageUrl: smeImageUrl(sme.imageFile),
  };
}
