import "server-only";
import { and, asc, desc, eq } from "drizzle-orm";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { cache } from "react";
import { getDb } from "@/db";
import { smes, successStories } from "@/db/schema";
import { SLUG } from "@/lib/story-fields";
import { storyCoverUrl } from "@/lib/uploads";

/**
 * Read side of the success stories on /kneks and their own pages. Only the
 * columns a visitor may see are selected, and a linked SME contributes its
 * public name and sector only, and only while that SME is itself published.
 *
 * Like kneks-data, a build with no reachable database still succeeds: the
 * list falls back to empty (the section hides, no story pages are
 * prerendered) with a warning, and runtime renders fill in once the database
 * answers. Outside a build a database error is thrown, so a regeneration that
 * fails keeps serving the last good page.
 */

export type PublicStorySummary = {
  slug: string;
  title: string;
  excerpt: string;
  /** URL of the cover, or null to draw the placeholder tile. */
  cover: string | null;
  coverAlt: string | null;
  /** YYYY-MM-DD, as entered. */
  publishedAt: string;
  sample: boolean;
  sme: { name: string; sector: string } | null;
};

export type PublicStory = PublicStorySummary & { body: string; sourceLine: string | null };

const SUMMARY_COLUMNS = {
  slug: successStories.slug,
  title: successStories.title,
  excerpt: successStories.excerpt,
  coverFile: successStories.coverFile,
  coverAsset: successStories.coverAsset,
  coverAlt: successStories.coverAlt,
  publishedAt: successStories.publishedAt,
  isSample: successStories.isSample,
  smeName: smes.name,
  smeSector: smes.sector,
};

const DETAIL_COLUMNS = { ...SUMMARY_COLUMNS, body: successStories.body, sourceLine: successStories.sourceLine };

/** A story's SME, joined only while that SME is itself published. */
const PUBLIC_SME = and(eq(smes.id, successStories.smeId), eq(smes.published, true));

function toSummary(row: {
  slug: string;
  title: string;
  excerpt: string;
  coverFile: string | null;
  coverAsset: string | null;
  coverAlt: string | null;
  publishedAt: string;
  isSample: boolean;
  smeName: string | null;
  smeSector: string | null;
}): PublicStorySummary {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    cover: storyCoverUrl(row.coverFile, row.coverAsset),
    coverAlt: row.coverAlt,
    publishedAt: row.publishedAt,
    sample: row.isSample,
    sme: row.smeName ? { name: row.smeName, sector: row.smeSector ?? "" } : null,
  };
}

async function orFallbackDuringBuild<T>(read: () => Promise<T>, fallback: T, what: string) {
  try {
    return await read();
  } catch (err) {
    if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) throw err;
    console.warn(`[stories] database unreachable during build; using fallback ${what}.`, (err as Error).message);
    return fallback;
  }
}

/** Published stories in the admin's order (newest date first among equals). */
export const getPublishedStories = cache(
  (): Promise<PublicStorySummary[]> =>
    orFallbackDuringBuild(
      async () =>
        (
          await getDb()
            .select(SUMMARY_COLUMNS)
            .from(successStories)
            .leftJoin(smes, PUBLIC_SME)
            .where(eq(successStories.published, true))
            .orderBy(asc(successStories.sortOrder), desc(successStories.publishedAt), desc(successStories.id))
        ).map(toSummary),
      [],
      "stories (none)",
    ),
);

/** One published story by its slug, or null for an unknown, malformed or hidden one. */
export const getStoryBySlug = cache(async (slug: string): Promise<PublicStory | null> => {
  if (!SLUG.test(slug) || slug.length > 120) return null;
  return orFallbackDuringBuild(
    async () => {
      const [row] = await getDb()
        .select(DETAIL_COLUMNS)
        .from(successStories)
        .leftJoin(smes, PUBLIC_SME)
        .where(and(eq(successStories.published, true), eq(successStories.slug, slug)))
        .limit(1);
      return row ? { ...toSummary(row), body: row.body, sourceLine: row.sourceLine } : null;
    },
    null,
    "story (none)",
  );
});

/** A YYYY-MM-DD date in the reader's language, on Latin digits like the rest of the site. */
export function formatStoryDate(locale: string, iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(`${locale}-u-nu-latn`, { dateStyle: "long", timeZone: "UTC" }).format(d);
}
