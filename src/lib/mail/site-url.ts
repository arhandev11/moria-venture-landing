import "server-only";
import { headers } from "next/headers";

/**
 * The site's public origin, for links in emails. APP_URL wins. Without it,
 * development falls back to the request's own Host; production gets null
 * instead, because Host is whatever the client sent and a forged one would
 * put someone else's link in the team's inbox.
 */
export async function siteUrl(): Promise<string | null> {
  const configured = process.env.APP_URL?.trim();
  if (configured) {
    try {
      const url = new URL(configured);
      if (url.protocol === "https:" || url.protocol === "http:") return url.origin;
    } catch {}
    console.warn(`[mail] APP_URL "${configured}" is not an http(s) URL; emails go out without links`);
    return null;
  }
  if (process.env.NODE_ENV === "production") return null;

  const h = await headers();
  const host = h.get("host");
  return host ? `${h.get("x-forwarded-proto") ?? "http"}://${host}` : null;
}
