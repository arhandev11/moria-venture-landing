import "server-only";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { READINESS_OPTIONS, SME_SECTORS } from "@/lib/sme-fields";
import { INDONESIA_PROVINCES } from "./indonesia-regions";

/** The funding stages, in the order a company goes through them. A fixed list: stages are compared, not invented. */
export const SME_STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Growth"];

/**
 * The choices for the SME form's dropdowns. Sectors and readiness are a base
 * list plus whatever SMEs already use, so spellings stay consistent (each
 * sector is a filter chip on /kneks); a new one can still be typed in.
 * Provinces are the 38 in indonesia-regions.ts plus any other already in use,
 * so old data still shows; the city list follows the chosen province in the
 * form itself. Stages are the fixed list above.
 */
export async function smeSuggestions() {
  const rows = await getDb()
    .select({ sector: smes.sector, province: smes.province, readiness: smes.readiness })
    .from(smes);
  const uniq = (list: (string | null)[]) =>
    [...new Set(list.map((s) => s?.trim() ?? "").filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const inUse = (list: (string | null)[], base: readonly string[]) => [...base, ...uniq(list).filter((s) => !base.includes(s))];
  return {
    sectors: uniq([...SME_SECTORS, ...rows.map((r) => r.sector)]),
    stages: SME_STAGES,
    provinces: uniq([...INDONESIA_PROVINCES, ...rows.map((r) => r.province)]),
    // Readiness keeps the curation summary's own order, then anything else in use.
    readiness: inUse(rows.map((r) => r.readiness), READINESS_OPTIONS),
  };
}
