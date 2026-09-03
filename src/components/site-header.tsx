"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui";

const PORTFOLIO_MENU = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "For Businesses", href: "/for-businesses" },
  { label: "For Limited Partners", href: "/for-limited-partners" },
  { label: "Indonesia–Saudi Corridor", href: "/corridor" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule/60 bg-shell/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
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
            <TopLink href="/about">About</TopLink>
            <TopLink href="/what-we-do">What We Do</TopLink>
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-ink hover:text-indigo-brand"
              >
                Portfolio
                <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 fill-current">
                  <path d="M0 0h10L5 6z" />
                </svg>
              </button>
              <ul className="invisible absolute left-0 top-full w-64 border border-rule bg-shell py-2 opacity-0 shadow-sm transition group-hover:visible group-hover:opacity-100">
                {PORTFOLIO_MENU.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-[13px] text-ink hover:bg-cream hover:text-indigo-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <TopLink href="/contact">Contact Us</TopLink>
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
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-ink"
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

function TopLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink hover:text-indigo-brand"
    >
      {children}
    </Link>
  );
}
