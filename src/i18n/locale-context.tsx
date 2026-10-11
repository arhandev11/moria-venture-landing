"use client";

import Link from "next/link";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";

const LocaleContext = createContext<Locale>(defaultLocale);

/**
 * Carries the page's language to client components below the [lang] layout,
 * so shared pieces (buttons, header, footers) can localise their links
 * without every caller threading `lang` through.
 */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);

/**
 * next/link that keeps the reader in their language: `/about` becomes
 * `/id/about` on an Indonesian page. Anchors, mail links, other sites and
 * already-localised paths pass through unchanged, so it can replace Link
 * anywhere on the public site.
 */
export function LocaleLink({
  href,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const locale = useLocale();
  return <Link href={localizeHref(locale, href)} {...rest} />;
}
