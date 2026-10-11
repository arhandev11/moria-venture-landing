import { NextResponse, type NextRequest } from "next/server";
import { localeProxy } from "@/i18n/proxy";
import { SESSION_COOKIE } from "@/lib/auth/cookie";

/**
 * Two jobs, split by path.
 *
 * /admin: first pass over the admin area. No session cookie, straight to the
 * login page. It never touches the database, so it cannot tell a live session
 * from a stale one; every admin page, action and handler checks that itself
 * through requireAdmin(). It also marks the whole area noindex at the header
 * level.
 *
 * Everything else the matcher lets through is a public page, and gets its
 * language sorted out by localeProxy: English at the unprefixed URLs, /id and
 * /ar as they are.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const isLogin = pathname === "/admin/login";
    if (!isLogin && !request.cookies.has(SESSION_COOKIE)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return localeProxy(request);
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    // Public pages: everything but Next's own files, the admin area, uploaded
    // media, API routes and anything with a file extension (public/ assets,
    // favicon, sitemap.xml, robots.txt).
    "/((?!_next/|admin(?:/|$)|media/|api/|.*\\.\\w+$).*)",
  ],
};
