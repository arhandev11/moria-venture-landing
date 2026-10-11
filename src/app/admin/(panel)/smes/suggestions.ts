import "server-only";
import { getDb } from "@/db";
import { smes } from "@/db/schema";
import { READINESS_OPTIONS, SME_SECTORS } from "@/lib/sme-fields";

/** The funding stages, in the order a company goes through them. A fixed list: stages are compared, not invented. */
export const SME_STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Growth"];

/** Cities offered before any SME uses them: the larger Indonesian ones, where programme SMEs tend to be. */
const BASE_CITIES = [
  "Aceh", "Ambon", "Balikpapan", "Banda Aceh", "Bandar Lampung", "Bandung", "Banjarmasin", "Batam", "Bekasi", "Bengkulu",
  "Bogor", "Cirebon", "Denpasar", "Depok", "Gorontalo", "Jakarta", "Jambi", "Jayapura", "Kendari", "Kupang", "Makassar",
  "Malang", "Manado", "Mataram", "Medan", "Padang", "Palembang", "Palu", "Pekanbaru", "Pontianak", "Samarinda", "Semarang",
  "Serang", "Solo", "Surabaya", "Tangerang", "Tasikmalaya", "Yogyakarta",
];

/** Indonesia's 38 provinces, in their Indonesian names as the curation data writes them. */
const BASE_PROVINCES = [
  "Aceh", "Bali", "Banten", "Bengkulu", "DI Yogyakarta", "DKI Jakarta", "Gorontalo", "Jambi", "Jawa Barat", "Jawa Tengah",
  "Jawa Timur", "Kalimantan Barat", "Kalimantan Selatan", "Kalimantan Tengah", "Kalimantan Timur", "Kalimantan Utara",
  "Kepulauan Bangka Belitung", "Kepulauan Riau", "Lampung", "Maluku", "Maluku Utara", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Papua", "Papua Barat", "Papua Barat Daya", "Papua Pegunungan", "Papua Selatan", "Papua Tengah", "Riau", "Sulawesi Barat",
  "Sulawesi Selatan", "Sulawesi Tengah", "Sulawesi Tenggara", "Sulawesi Utara", "Sumatera Barat", "Sumatera Selatan", "Sumatera Utara",
];

/**
 * The choices for the SME form's dropdowns. Sectors, cities, provinces and
 * readiness are a base list plus whatever SMEs already use, so spellings stay
 * consistent (each sector is a filter chip on /kneks); a new one can still be
 * typed in. Stages are the fixed list above.
 */
export async function smeSuggestions() {
  const rows = await getDb()
    .select({ sector: smes.sector, city: smes.city, province: smes.province, readiness: smes.readiness })
    .from(smes);
  const uniq = (list: (string | null)[]) =>
    [...new Set(list.map((s) => s?.trim() ?? "").filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const inUse = (list: (string | null)[], base: readonly string[]) => [...base, ...uniq(list).filter((s) => !base.includes(s))];
  return {
    sectors: uniq([...SME_SECTORS, ...rows.map((r) => r.sector)]),
    stages: SME_STAGES,
    cities: uniq([...BASE_CITIES, ...rows.map((r) => r.city)]),
    provinces: uniq([...BASE_PROVINCES, ...rows.map((r) => r.province)]),
    // Readiness keeps the curation summary's own order, then anything else in use.
    readiness: inUse(rows.map((r) => r.readiness), READINESS_OPTIONS),
  };
}
