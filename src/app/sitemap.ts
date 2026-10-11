import type { MetadataRoute } from "next";
import { htmlLang, locales } from "@/i18n/config";
import { localizePath, PUBLIC_PATHS } from "@/i18n/paths";
import { getPublishedStories } from "@/lib/stories-data";

/**
 * Admin story changes revalidate this too; the hour is the backstop, and a
 * build without the database lists the fixed pages only.
 */
export const revalidate = 3600;

/**
 * Every public page in every language, each listing its siblings so search
 * engines tie the three together, plus each published success story. Origin
 * from APP_URL.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = (process.env.APP_URL?.trim() || "http://localhost:3000").replace(/\/$/, "");
  const stories = await getPublishedStories();
  const paths = [...PUBLIC_PATHS, ...stories.map((story) => `/kneks/stories/${story.slug}`)];
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(
      locales.map((l) => [htmlLang[l], `${origin}${localizePath(l, path)}`]),
    );
    return locales.map((l) => ({
      url: `${origin}${localizePath(l, path)}`,
      alternates: { languages },
    }));
  });
}
