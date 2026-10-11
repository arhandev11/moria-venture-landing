import "server-only";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { SEED_SMES } from "@/lib/kneks-seed";

/** The funding stages, in the order a company goes through them. A fixed list: stages are compared, not invented. */
export const SME_STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Growth"];

/** Cities offered before any SME uses them: the larger Indonesian ones, where programme SMEs tend to be. */
const BASE_CITIES = [
  "Aceh", "Ambon", "Balikpapan", "Banda Aceh", "Bandar Lampung", "Bandung", "Banjarmasin", "Batam", "Bekasi", "Bengkulu",
  "Bogor", "Cirebon", "Denpasar", "Depok", "Gorontalo", "Jakarta", "Jambi", "Jayapura", "Kendari", "Kupang", "Makassar",
  "Malang", "Manado", "Mataram", "Medan", "Padang", "Palembang", "Palu", "Pekanbaru", "Pontianak", "Samarinda", "Semarang",
  "Serang", "Solo", "Surabaya", "Tangerang", "Tasikmalaya", "Yogyakarta",
];

/**
 * The choices for the SME form's dropdowns. Sectors and cities are what SMEs
 * already use plus a base list, so spellings stay consistent (each sector is
 * a filter chip on /kneks); a new one can still be typed in. Stages are the
 * fixed list above.
 */
export async function smeSuggestions() {
  const rows = await getDb().select({ sector: smes.sector, city: smes.city }).from(smes);
  const uniq = (list: string[]) => [...new Set(list.map((s) => s.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  return {
    sectors: uniq([...SEED_SMES.map((s) => s.sector), ...rows.map((r) => r.sector)]),
    stages: SME_STAGES,
    cities: uniq([...BASE_CITIES, ...rows.map((r) => r.city)]),
  };
}
