import Image from "next/image";
import Link from "next/link";
import { KneksLogo } from "@/components/kneks/kneks-logo";

const COLUMNS = [
  {
    title: "KNEKS official",
    links: [
      { label: "kneks.go.id", href: "https://kneks.go.id", external: true },
      { label: "About KNEKS", href: "#about-kneks" },
      { label: "News & activities", href: "https://kneks.go.id", external: true },
    ],
  },
  {
    title: "The program",
    links: [
      { label: "SMEs in the program", href: "#smes" },
      { label: "Investor regions", href: "#investor-regions" },
      { label: "Request access", href: "#request-access" },
    ],
  },
];

/** Official channels are still placeholders, so these lead nowhere yet. */
const CHANNELS = [
  {
    label: "Instagram",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="16.6" cy="7.4" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <>
        <path d="M6 10v8M6 6.2v.1M10 18v-8M10 13.5c0-2 1.3-3.6 3.2-3.6s3 1.3 3 3.6V18" />
      </>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <>
        <rect x="3.5" y="6" width="17" height="12" rx="3.5" />
        <path d="M10.5 9.6v4.8l4-2.4z" fill="currentColor" />
      </>
    ),
  },
];

/** The partnership's own footer: it replaces the site footer on /kneks. */
export function KneksFooter() {
  return (
    <footer className="bg-kneks-blue text-white">
      <div className="mx-auto w-full max-w-[1152px] px-4">
        <div className="flex flex-wrap items-center justify-end gap-3 pt-[60px]">
          <p className="mr-1 text-[13px] text-white/85">Official channels · placeholders</p>
          {CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href="#"
              aria-label={`${channel.label} (placeholder)`}
              className="flex size-11 items-center justify-center rounded-full border-2 border-white/90 transition-colors hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="size-[22px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                {channel.icon}
              </svg>
            </a>
          ))}
        </div>

        <div className="lg:px-6">
          <div className="mt-[58px] flex items-center gap-[22px]">
            <Image
              src="/assets/brand/logo-wordmark.svg"
              alt="Moria Ventures"
              width={323}
              height={49}
              className="h-[28px] w-auto"
            />
            <span aria-hidden className="text-[13px] text-white/90">×</span>
            <KneksLogo />
          </div>
          <p className="mt-[21px] text-[16px] leading-[26px]">
            Moria Ventures (PT Moria Ventures Capital) · Affiliated with KNEKS
          </p>

          <div className="mt-[40px] flex flex-wrap gap-x-[60px] gap-y-8">
            {COLUMNS.map((column) => (
              <div key={column.title} className="min-w-[123px]">
                <p className="text-[12px] uppercase leading-[18px] tracking-[0.02em] text-white/85">
                  {column.title}
                </p>
                <ul className="mt-[10px] space-y-[32px]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[15px] leading-[24px] hover:underline"
                        >
                          {link.label}
                          {link.label === "kneks.go.id" ? (
                            <svg viewBox="0 0 16 16" aria-hidden className="size-[13px]" fill="none" stroke="currentColor" strokeWidth={1.6}>
                              <path d="M4 12l8-8M6 4h6v6" />
                            </svg>
                          ) : null}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-[15px] leading-[24px] hover:underline">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-[63px] border-t border-white/60 pb-[80px] pt-[42px]">
            <p className="text-[14px] leading-[24px]">Mockup for design review</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
