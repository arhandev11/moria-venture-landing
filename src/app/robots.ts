import type { MetadataRoute } from "next";

/** Everything public is crawlable; the admin area is not, and says so in its headers too. */
export default function robots(): MetadataRoute.Robots {
  const origin = (process.env.APP_URL?.trim() || "http://localhost:3000").replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${origin}/sitemap.xml`,
  };
}
