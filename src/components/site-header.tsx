"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui";

const PORTFOLIO_MENU = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "For Businesses", href: "/for-businesses" },
  { label: "For Limited Partners", href: "/for-limited-partners" },
  { label: "Indonesia–Saudi Corridor", href: "/corridor" },
];

const PARTNERS_MENU = [{ label: "KNEKS", href: "/kneks" }];

type MenuItem = { label: string; href: string };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rule/60 bg-shell/95 backdrop-blur">
      <Container>
        <div className="flex h-[68px] items-center justify-between">
          <Link href="/" aria-label="Moria Ventures — home">
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
            <TopLink href="/about" pathname={pathname}>About</TopLink>
            <TopLink href="/what-we-do" pathname={pathname}>What We Do</TopLink>
            <DropdownMenu label="Portfolio" items={PORTFOLIO_MENU} pathname={pathname} />
            <DropdownMenu label="Partners" items={PARTNERS_MENU} pathname={pathname} />
            <TopLink href="/contact" pathname={pathname}>Contact Us</TopLink>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
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
                { label: "About", href: "/about" },
                { label: "What We Do", href: "/what-we-do" },
                ...PORTFOLIO_MENU,
                ...PARTNERS_MENU,
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`block py-3 text-[12px] font-bold uppercase tracking-[0.1em] ${pathname === item.href ? "text-indigo-brand" : "text-ink"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
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
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: string;
}) {
  const active = pathname === href;
  return (
    <Link
      href={href}
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
  pathname,
}: {
  label: string;
  items: MenuItem[];
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
      <ul className="invisible absolute left-0 top-full w-64 border border-rule bg-shell py-2 opacity-0 shadow-sm transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
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
