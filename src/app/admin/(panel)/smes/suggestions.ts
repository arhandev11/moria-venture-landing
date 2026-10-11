import "server-only";
import { getDb } from "@/db";
import { smes } from "@/db/schema";

/** Values already in use, offered as suggestions so sectors stay consistent (they drive the filter chips). */
export async function smeSuggestions() {
  const rows = await getDb().select({ sector: smes.sector, stage: smes.stage, city: smes.city }).from(smes);
  const uniq = (list: string[]) => [...new Set(list)].sort((a, b) => a.localeCompare(b));
  return {
    sectors: uniq(rows.map((r) => r.sector)),
    stages: uniq(["Pre-seed", "Seed", "Series A", ...rows.map((r) => r.stage)]),
    cities: uniq(rows.map((r) => r.city)),
  };
}
