/**
 * Length limits and the slug rules of a success story, shared by the schema's
 * column sizes, the admin form, its action and the public pages. Plain data
 * with no imports, so client components and scripts can load it.
 */

export const STORY_LIMITS = {
  slug: 120,
  title: 160,
  excerpt: 300,
  body: 20_000,
  coverAlt: 200,
  sourceLine: 200,
} as const;

/** Lowercase letters and digits in runs joined by single hyphens: what a story URL may hold. */
export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * A URL slug from a title: accents dropped, anything else that is not a
 * letter or digit becomes one hyphen. Empty when nothing usable is left
 * (a title in Arabic script, say), and the form then asks for one.
 */
export function slugify(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, STORY_LIMITS.slug)
    .replace(/-+$/, "");
}

/** A calendar date as the form and the database hold it. */
export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** True for a real calendar day written YYYY-MM-DD (no 2026-02-30). */
export function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}
