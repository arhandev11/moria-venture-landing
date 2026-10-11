"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Picks the footer for the current route. Both footers are rendered on the
 * server and handed in, so only the choice between them runs here: the KNEKS
 * partnership page carries its own footer in place of the site's.
 */
export function FooterSlot({ site, kneks }: { site: ReactNode; kneks: ReactNode }) {
  return usePathname() === "/kneks" ? kneks : site;
}
