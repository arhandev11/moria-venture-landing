import Image from "next/image";
import { Container } from "@/components/ui";
import { LocaleLink } from "@/i18n/locale-context";
import type { Dictionary } from "@/i18n/types";

export function SiteFooter({ dict }: { dict: Dictionary["footer"] }) {
  const columns = [
    {
      title: dict.platform.title,
      links: [
        { label: dict.platform.about, href: "/about" },
        { label: dict.platform.whatWeDo, href: "/what-we-do" },
      ],
    },
    {
      title: dict.lpBiz.title,
      links: [
        { label: dict.lpBiz.lps, href: "/for-limited-partners" },
        { label: dict.lpBiz.businesses, href: "/for-businesses" },
        { label: dict.lpBiz.corridor, href: "/corridor" },
      ],
    },
    {
      title: dict.resources.title,
      links: [
        { label: dict.resources.insights, href: "#" },
        { label: dict.resources.careers, href: "#" },
        { label: dict.resources.contact, href: "/contact" },
      ],
    },
  ];
  const legal = [dict.legal.certification, dict.legal.privacy, dict.legal.terms];

  return (
    <footer className="bg-indigo-brand text-white">
      <Container className="py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,411px)_192px_194px_minmax(0,1fr)]">
          <div>
            <Image
              src="/assets/brand/logo-wordmark.svg"
              alt="Moria Ventures"
              width={323}
              height={49}
              className="h-[38px] w-auto"
            />
            <p className="mt-5 max-w-[380px] text-[13px] leading-[21px] text-white/80">
              {dict.tagline}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="t-eyebrow">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <LocaleLink
                      href={link.href}
                      className="text-[15px] text-white/85 hover:text-gold"
                    >
                      {link.label}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-[67px] flex flex-col gap-4 border-t border-white/20 pt-7 text-[13px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{dict.copyright}</p>
          <ul className="flex flex-wrap gap-8">
            {legal.map((item) => (
              <li key={item}>
                <LocaleLink href="#" className="hover:text-gold">
                  {item}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
