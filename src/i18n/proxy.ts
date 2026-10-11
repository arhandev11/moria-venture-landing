import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/i18n/config";

/**
 * The language half of src/proxy.ts. Every public page lives under
 * app/[lang]; this keeps English at the URLs it has always had.
 *
 * - `/en` or `/en/…` is redirected (308) to the unprefixed URL, so English
 *   has exactly one address and search engines never index two.
 * - `/id/…` and `/ar/…` pass straight through to their [lang] segment.
 * - Anything else is English: it is rewritten, invisibly, onto `/en/…`. A
 *   path that names no page still lands in [lang] and gets its 404 there.
 *
 * Server Actions post to the page's own URL, so the /kneks form at /kneks is
 * rewritten with its page and keeps working. NextResponse.rewrite carries the
 * RSC headers upstream, so client navigations and prefetches follow too.
 *
 * The caller decides which paths reach this: /admin, /media, /api, /_next
 * and files with an extension must not (see the matcher in src/proxy.ts).
 */
export function localeProxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (hasLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}
