import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "About Us", href: "/about" },
      { label: "What We Do", href: "/what-we-do" },
    ],
  },
  {
    title: "For LP & Biz",
    links: [
      { label: "For LPs", href: "/for-limited-partners" },
      { label: "For Businesses", href: "/for-businesses" },
      { label: "Corridor", href: "/corridor" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights & News", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const LEGAL = [
  "Shariah Board Certification",
  "Privacy Policy",
  "Terms of Service",
];

export function SiteFooter() {
  return (
    <footer className="bg-indigo-brand text-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Image
              src="/assets/brand/logo-wordmark.svg"
              alt="Moria Ventures"
              width={323}
              height={49}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-white/80">
              PT Moria Global Ventures bridging Southeast Asia and the Gulf
              Cooperation Council.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.12em]">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/85 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-[11px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 PT Moria Global Ventures. All rights reserved. Registered
            under OJK and Saudi CMA.
          </p>
          <ul className="flex flex-wrap gap-6">
            {LEGAL.map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-gold">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
