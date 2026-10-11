import { defaultLocale, hasLocale, htmlLang, locales, type Locale } from "@/i18n/config";

/**
 * URL helpers shared by the proxy, the pages and the switcher. Pure, so they
 * run anywhere.
 */

/** Every public page, as its English (unprefixed) path. Feeds the sitemap. */
export const PUBLIC_PATHS = [
  "/",
  "/about",
  "/what-we-do",
  "/portfolio",
  "/for-businesses",
  "/for-limited-partners",
  "/contact",
  "/corridor",
  "/kneks",
] as const;

/**
 * Splits a pathname into its language and the path inside that language.
 * `/id/about` gives `{ locale: "id", path: "/about" }`; `/about` and the
 * internal `/en/about` both give English.
 *
 * Normalising both shapes of English matters for client code: a prerendered
 * page knows itself as `/en/about` on the server while the browser reads
 * `/about`, and comparing the stripped path keeps the two renders identical.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (hasLocale(first)) {
    const path = `/${rest.join("/")}`;
    return { locale: first, path: path === "/" ? "/" : path.replace(/\/$/, "") };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}

/** The path a page has in a given language: `/about` in `id` is `/id/about`. */
export function localizePath(locale: Locale, path: string): string {
  const clean = splitLocale(path).path;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Localises an href if it points inside the site, and leaves everything else
 * alone: in-page anchors (`#smes`), mail and phone links, other sites, and
 * the areas that stay English-only (/admin, /media). Safe to call twice.
 */
export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const tail = cut === -1 ? "" : href.slice(cut);
  if (/^\/(admin|media|api)(\/|$)/.test(path)) return href;
  return `${localizePath(locale, path)}${tail}`;
}

/**
 * hreflang alternates for one page, relative to metadataBase: every language
 * plus x-default, which points at English. Pass the result as
 * `metadata.alternates`.
 */
export function alternatesFor(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[htmlLang[l]] = localizePath(l, path);
  languages["x-default"] = localizePath(defaultLocale, path);
  return { canonical: localizePath(locale, path), languages };
}
