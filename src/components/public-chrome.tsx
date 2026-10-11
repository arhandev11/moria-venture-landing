"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders the site's own chrome (header, footer, reveal scripts) everywhere
 * but the admin area, which brings its own shell. Adds no element of its own,
 * so public pages render exactly as before.
 */
export function PublicOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname === "/admin" || pathname.startsWith("/admin/") ? null : children;
}
