import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/paths";

/**
 * A page's localised title and description plus its hreflang alternates, for
 * generateMetadata. `path` is the page's English path, e.g. "/about".
 *
 * Relative alternates resolve against `metadataBase`, set once in the [lang]
 * layout from APP_URL.
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  meta: { title?: string; description: string },
): Metadata {
  return {
    ...(meta.title ? { title: meta.title } : {}),
    description: meta.description,
    alternates: alternatesFor(locale, path),
  };
}
