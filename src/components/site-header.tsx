"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "@/i18n/language-switcher";
import { localizePath, splitLocale } from "@/i18n/paths";
import type { Dictionary } from "@/i18n/types";

type MenuItem = { label: string; href: string };

/**
 * The site's top bar. Every href is written as the English path and localised
 * once here; the page you are on is matched on the path with its language
 * stripped, which reads the same on the server (/en/about) and in the browser
 * (/about or /id/about).
 */
export function SiteHeader({
  locale,
  labels,
  switcherLabels,
}: {
  locale: Locale;
  labels: Dictionary["header"];
  switcherLabels: Dictionary["languageSwitcher"];
}) {
  const [open, setOpen] = useState(false);
  const pathname = splitLocale(usePathname()).path;
  const href = (path: string) => localizePath(locale, path);

  const portfolioMenu: MenuItem[] = [
    { label: labels.portfolioMenu.portfolio, href: "/portfolio" },
    { label: labels.portfolioMenu.forBusinesses, href: "/for-businesses" },
    { label: labels.portfolioMenu.forLimitedPartners, href: "/for-limited-partners" },
    { label: labels.portfolioMenu.corridor, href: "/corridor" },
  ];
  const partnersMenu: MenuItem[] = [{ label: labels.partnersMenu.kneks, href: "/kneks" }];

  return (
    <header className="sticky top-0 z-50 border-b border-rule/60 bg-shell/95 backdrop-blur">
      <Container>
        <div className="flex h-[68px] items-center justify-between">
          <Link href={href("/")} aria-label={labels.homeLabel}>
            <Image
              src="/assets/brand/logo-wordmark.svg"
              alt="Moria Ventures"
              width={323}
              height={49}
              priority
              className="h-6 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <TopLink path="/about" locale={locale} pathname={pathname}>{labels.about}</TopLink>
            <TopLink path="/what-we-do" locale={locale} pathname={pathname}>{labels.whatWeDo}</TopLink>
            <DropdownMenu label={labels.portfolio} items={portfolioMenu} locale={locale} pathname={pathname} />
            <DropdownMenu label={labels.partners} items={partnersMenu} locale={locale} pathname={pathname} />
            <TopLink path="/contact" locale={locale} pathname={pathname}>{labels.contact}</TopLink>
            <LanguageSwitcher locale={locale} labels={switcherLabels} />
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={labels.toggleNav}
            className="lg:hidden"
          >
            <svg viewBox="0 0 24 16" className="h-4 w-6 stroke-indigo-brand" strokeWidth={2}>
              {open ? (
                <path d="M2 2l20 12M22 2L2 14" />
              ) : (
                <path d="M0 1h24M0 8h24M0 15h24" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <nav className="border-t border-rule/60 bg-shell lg:hidden">
          <Container>
            <ul className="flex flex-col py-2">
              {[
                { label: labels.about, href: "/about" },
                { label: labels.whatWeDo, href: "/what-we-do" },
                ...portfolioMenu,
                ...partnersMenu,
                { label: labels.contact, href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`block py-3 text-[12px] font-bold uppercase tracking-[0.1em] ${pathname === item.href ? "text-indigo-brand" : "text-ink"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher
              locale={locale}
              labels={switcherLabels}
              variant="mobile"
              className="border-t border-rule/60 py-4"
            />
          </Container>
        </nav>
      ) : null}
    </header>
  );
}

/** The page you are on reads in indigo and underlined, as the deck draws it. */
const ACTIVE = "text-indigo-brand underline decoration-1 underline-offset-[5px]";
const TOP = "text-[11px] font-bold uppercase tracking-[0.1em]";

function TopLink({
  path,
  locale,
  pathname,
  children,
}: {
  path: string;
  locale: Locale;
  pathname: string;
  children: string;
}) {
  const active = pathname === path;
  return (
    <Link
      href={localizePath(locale, path)}
      aria-current={active ? "page" : undefined}
      className={`${TOP} ${active ? ACTIVE : "text-ink hover:text-indigo-brand"}`}
    >
      {children}
    </Link>
  );
}

function DropdownMenu({
  label,
  items,
  locale,
  pathname,
}: {
  label: string;
  items: MenuItem[];
  locale: Locale;
  pathname: string;
}) {
  const active = items.some((item) => item.href === pathname);
  return (
    <div className="group relative">
      <button
        type="button"
        className={`flex items-center gap-1 ${TOP} ${active ? ACTIVE : "text-ink hover:text-indigo-brand"}`}
      >
        {label}
        <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 fill-current">
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>
      <ul className="invisible absolute inset-s-0 top-full w-64 border border-rule bg-shell py-2 opacity-0 shadow-sm transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={localizePath(locale, item.href)}
              aria-current={item.href === pathname ? "page" : undefined}
              className={`block px-4 py-2 text-[13px] hover:bg-cream hover:text-indigo-brand ${item.href === pathname ? "text-indigo-brand" : "text-ink"}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
