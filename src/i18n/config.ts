/**
 * The site's languages. Pure data and no imports, so the proxy, Server
 * Components and client components can all read it.
 *
 * English is the default and is served at the unprefixed URLs the site has
 * always had (/about); the others carry their code as the first segment
 * (/id/about, /ar/about). Internally every public page lives under
 * app/[lang], and the proxy rewrites unprefixed requests onto /en.
 */

export const locales = ["en", "id", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const hasLocale = (value: string | undefined | null): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

/** Text direction per language; only Arabic runs right to left. */
export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  id: "ltr",
  ar: "rtl",
};

/** What goes in <html lang> and in hreflang alternates. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  id: "id",
  ar: "ar",
};

/** Open Graph locale tags, for when the pages grow social cards. */
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
  ar: "ar_SA",
};

/**
 * Each language named in itself, which is how a reader looks for their own in
 * a switcher. Not translated on purpose.
 */
export const nativeName: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  ar: "العربية",
};

/** The switcher's compact label for the current language. */
export const shortName: Record<Locale, string> = {
  en: "EN",
  id: "ID",
  ar: "AR",
};

/**
 * Number formatting stays on Latin digits in every language: the deck's
 * figures are drawn that way, and Gulf finance copy commonly keeps them.
 * Indonesian still gets its own separators (1.234,5).
 */
export const numberLocale: Record<Locale, string> = {
  en: "en",
  id: "id",
  ar: "en",
};
