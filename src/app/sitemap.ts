import type { MetadataRoute } from "next";
import { htmlLang, locales } from "@/i18n/config";
import { localizePath, PUBLIC_PATHS } from "@/i18n/paths";

/**
 * Every public page in every language, each listing its siblings so search
 * engines tie the three together. Origin from APP_URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = (process.env.APP_URL?.trim() || "http://localhost:3000").replace(/\/$/, "");
  return PUBLIC_PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      locales.map((l) => [htmlLang[l], `${origin}${localizePath(l, path)}`]),
    );
    return locales.map((l) => ({
      url: `${origin}${localizePath(l, path)}`,
      alternates: { languages },
    }));
  });
}
