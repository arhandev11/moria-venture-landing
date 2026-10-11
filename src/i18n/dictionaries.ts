import "server-only";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/**
 * Loads a language's dictionary on the server. Each language is its own
 * chunk, imported only when a page in it renders, and none of it reaches the
 * browser except the slices a page hands to its client components.
 *
 * Also usable from Server Actions, which cannot read the route's language:
 * they take it from a hidden form field and pass it in here.
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/i18n/dictionaries/en").then((m) => m.default),
  id: () => import("@/i18n/dictionaries/id").then((m) => m.default),
  ar: () => import("@/i18n/dictionaries/ar").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> => loaders[locale]();
