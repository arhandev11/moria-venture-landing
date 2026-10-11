import "server-only";
import { asc, eq } from "drizzle-orm";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { cache } from "react";
import { getDb } from "@/db";
import { formOptions, smes, type SmeRow } from "@/db/schema";
import { SEED_REGIONS, SEED_SMES, SEED_TICKETS, type SeedSme } from "@/lib/kneks-seed";
import { smeImageUrl } from "@/lib/uploads";

/**
 * Read side of the KNEKS page. Shapes rows into what the page's components
 * take, so nothing admin-only (ids aside, publish flags, file names) reaches
 * the client.
 *
 * /kneks is prerendered and refreshed by revalidatePath('/kneks') whenever an
 * admin changes SMEs or options. A build with no reachable database still
 * succeeds: these fall back to the seed content and log a warning, and the
 * page's time-based revalidate swaps in live data once the database answers.
 * Outside a build a database error is thrown, so a regeneration that fails
 * keeps serving the last good page instead of the fallback.
 */

export type PublicSme = {
  name: string;
  sector: string;
  city: string;
  stage: string;
  brief: string;
  askK: number;
  metrics: string;
  /** URL of the uploaded image, or null to draw the initials tile. */
  image: string | null;
  quote: string | null;
} & (
  | { status: "program"; interest: number }
  | { status: "funded"; raisedK: number; investor: string }
);

export type PublicFormOptions = { regions: string[]; tickets: string[] };

function toPublic(row: Pick<SmeRow, keyof SeedSme> & { imageFile: string | null }): PublicSme {
  const base = {
    name: row.name,
    sector: row.sector,
    city: row.city,
    stage: row.stage,
    brief: row.brief,
    askK: row.askK,
    metrics: row.metrics,
    image: smeImageUrl(row.imageFile),
    quote: row.quote,
  };
  return row.status === "funded"
    ? { ...base, status: "funded", raisedK: row.raisedK ?? row.askK, investor: row.investor ?? "" }
    : { ...base, status: "program", interest: Math.min(100, Math.max(0, row.interestPct ?? 0)) };
}

async function orFallbackDuringBuild<T>(read: () => Promise<T>, fallback: () => T, what: string) {
  try {
    return await read();
  } catch (err) {
    if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) throw err;
    console.warn(`[kneks] database unreachable during build; using seed ${what}.`, (err as Error).message);
    return fallback();
  }
}

/** Published SMEs in display order. */
export const getPublishedSmes = cache(
  (): Promise<PublicSme[]> =>
    orFallbackDuringBuild(
      async () => {
        const rows = await getDb()
          .select()
          .from(smes)
          .where(eq(smes.published, true))
          .orderBy(asc(smes.sortOrder), asc(smes.id));
        return rows.map(toPublic);
      },
      () => SEED_SMES.map((sme) => toPublic({ ...sme, imageFile: null })),
      "SMEs",
    ),
);

/** Active region and ticket-size choices for the access form, in display order. */
export const getFormOptions = cache(
  (): Promise<PublicFormOptions> =>
    orFallbackDuringBuild(
      async () => {
        const rows = await getDb()
          .select({ kind: formOptions.kind, label: formOptions.label })
          .from(formOptions)
          .where(eq(formOptions.active, true))
          .orderBy(asc(formOptions.sortOrder), asc(formOptions.id));
        return {
          regions: rows.filter((r) => r.kind === "region").map((r) => r.label),
          tickets: rows.filter((r) => r.kind === "ticket").map((r) => r.label),
        };
      },
      () => ({ regions: SEED_REGIONS, tickets: SEED_TICKETS }),
      "form options",
    ),
);

/** The hero's four figures, counted from the published SMEs. */
export function pipelineStats(list: PublicSme[]) {
  const funded = list.filter((sme) => sme.status === "funded");
  return {
    smes: list.length,
    funded: funded.length,
    raisedK: funded.reduce((sum, sme) => sum + sme.raisedK, 0),
    sectors: new Set(list.map((sme) => sme.sector)).size,
  };
}
