import "server-only";
import { asc, eq } from "drizzle-orm";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { cache } from "react";
import { getDb } from "@/db";
import { formOptions, smes } from "@/db/schema";
import { SEED_REGIONS, SEED_TICKETS } from "@/lib/kneks-seed";
import { toMoney, type Money } from "@/lib/money";
import type { LegalForm } from "@/lib/sme-fields";
import { smeImageUrl } from "@/lib/uploads";

/**
 * Read side of the KNEKS page. Shapes rows into what the page's components
 * take, so nothing admin-only (ids aside, publish flags, file names) reaches
 * the client. SMEs are read through PUBLIC_COLUMNS only: the curation fields
 * kept for admins (CEO, address, investors, notes, pitch deck, source) never
 * leave the database on this path.
 *
 * /kneks is prerendered and refreshed by revalidatePath('/kneks') whenever an
 * admin changes SMEs or options. A build with no reachable database still
 * succeeds: SMEs fall back to an empty list and the form to the seed choices,
 * with a warning, and the page's time-based revalidate swaps in live data once
 * the database answers. Outside a build a database error is thrown, so a
 * regeneration that fails keeps serving the last good page instead.
 */

export type PublicSme = {
  name: string;
  sector: string;
  city: string | null;
  province: string | null;
  stage: string | null;
  readiness: string | null;
  brief: string;
  /** The round being raised, in its own currency; null when not disclosed. */
  ask: Money | null;
  legalForm: LegalForm | null;
  valuationTerms: string | null;
  useOfFunds: string | null;
  supportingOrg: string | null;
  metrics: string | null;
  /** URL of the uploaded image, or null to draw the initials tile. */
  image: string | null;
  quote: string | null;
} & (
  /** interest: share of the ask investors have signalled, 0–100; null hides the meter. */
  | { status: "program"; interest: number | null }
  | { status: "funded"; raised: Money | null; investor: string }
);

export type PublicFormOptions = { regions: string[]; tickets: string[] };

/** The only SME columns the public page may read. */
const PUBLIC_COLUMNS = {
  name: smes.name,
  sector: smes.sector,
  city: smes.city,
  province: smes.province,
  stage: smes.stage,
  readiness: smes.readiness,
  status: smes.status,
  brief: smes.brief,
  askAmount: smes.askAmount,
  askCurrency: smes.askCurrency,
  interestPct: smes.interestPct,
  metrics: smes.metrics,
  raisedAmount: smes.raisedAmount,
  raisedCurrency: smes.raisedCurrency,
  investor: smes.investor,
  quote: smes.quote,
  legalForm: smes.legalForm,
  supportingOrg: smes.supportingOrg,
  valuationTerms: smes.valuationTerms,
  useOfFunds: smes.useOfFunds,
  imageFile: smes.imageFile,
};

function selectPublished() {
  return getDb()
    .select(PUBLIC_COLUMNS)
    .from(smes)
    .where(eq(smes.published, true))
    .orderBy(asc(smes.sortOrder), asc(smes.id));
}

type PublicRow = Awaited<ReturnType<typeof selectPublished>>[number];

function toPublic(row: PublicRow): PublicSme {
  const base = {
    name: row.name,
    sector: row.sector,
    city: row.city,
    province: row.province,
    stage: row.stage,
    readiness: row.readiness,
    brief: row.brief,
    ask: toMoney(row.askAmount, row.askCurrency),
    legalForm: row.legalForm,
    valuationTerms: row.valuationTerms,
    useOfFunds: row.useOfFunds,
    supportingOrg: row.supportingOrg,
    metrics: row.metrics,
    image: smeImageUrl(row.imageFile),
    quote: row.quote,
  };
  return row.status === "funded"
    ? { ...base, status: "funded", raised: toMoney(row.raisedAmount, row.raisedCurrency), investor: row.investor ?? "" }
    : {
        ...base,
        status: "program",
        interest: row.interestPct === null ? null : Math.min(100, Math.max(0, row.interestPct)),
      };
}

async function orFallbackDuringBuild<T>(read: () => Promise<T>, fallback: () => T, what: string) {
  try {
    return await read();
  } catch (err) {
    if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) throw err;
    console.warn(`[kneks] database unreachable during build; using fallback ${what}.`, (err as Error).message);
    return fallback();
  }
}

/** Published SMEs in display order. */
export const getPublishedSmes = cache(
  (): Promise<PublicSme[]> =>
    orFallbackDuringBuild(
      async () => (await selectPublished()).map(toPublic),
      () => [],
      "SMEs (none)",
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

/**
 * The hero's figures, counted from the published SMEs. Amounts raised are
 * totalled per currency, one Money per currency in first-seen order: a sum
 * across currencies would mean nothing, and nothing is converted.
 */
export function pipelineStats(list: PublicSme[]) {
  const raised = new Map<Money["currency"], number>();
  let funded = 0;
  for (const sme of list) {
    if (sme.status !== "funded") continue;
    funded++;
    if (sme.raised) raised.set(sme.raised.currency, (raised.get(sme.raised.currency) ?? 0) + sme.raised.amount);
  }
  return {
    smes: list.length,
    funded,
    raised: [...raised].map(([currency, amount]): Money => ({ currency, amount })),
    sectors: new Set(list.map((sme) => sme.sector)).size,
  };
}
