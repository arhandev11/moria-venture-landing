import Image from "next/image";
import { PortfolioFilter, type Investment } from "@/components/portfolio-table";
import {
  Button,
  Container,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { formatNumber } from "@/i18n/format";
import { lines, rich } from "@/i18n/rich";
import { loadPage, metadataFor } from "@/i18n/server";

export const generateMetadata = ({ params }: PageProps<"/[lang]/portfolio">) =>
  metadataFor(params, "/portfolio", (d) => d.portfolio.meta);

/** The register as issued; project names stay as written in every language. */
const INVESTMENTS: (Omit<Investment, "amount"> & { amount: number })[] = [
  { no: 1, project: "Koperasi Penata BAC", type: "poFinancing", amount: 4800 },
  { no: 2, project: "KGB - ASG Mandiri", type: "projectFinancing", amount: 10600 },
  { no: 3, project: "KGB - ASG Pontang", type: "projectFinancing", amount: 3000 },
  { no: 4, project: "PT ISA", type: "projectFinancing", amount: 6100 },
  { no: 5, project: "KGB - ASG BRI", type: "projectFinancing", amount: 9000 },
  { no: 6, project: "Kitchen More", type: "poFinancing", amount: 9000 },
  { no: 9, project: "PT EMMA", type: "poFinancing", amount: 4200 },
  { no: 10, project: "Nusaqu", type: "poFinancing", amount: 17900 },
  { no: 11, project: "Duha", type: "poFinancing", amount: 6000 },
  { no: 12, project: "Duha 2", type: "khadamat", amount: 6000 },
  { no: 13, project: "Property Duha 3", type: "projectFinancing", amount: 55582 },
];

export default async function PortfolioPage({ params }: PageProps<"/[lang]/portfolio">) {
  const { lang, dict } = await loadPage(params);
  const t = dict.portfolio;
  const investments: Investment[] = INVESTMENTS.map((item) => ({
    ...item,
    amount: formatNumber(lang, item.amount),
  }));

  return (
    <>
      <PageHero
        title={t.hero.title}
        padding="pb-[100px] pt-[110px] lg:pb-[123px] lg:pt-[73px]"
        ledeGap="mt-[54px]"
        // Two labelled blocks, kept as inline runs so the hero still renders
        // one paragraph and the line reveal can walk it.
        ledeClassName="max-w-[620px] text-[17px] leading-[29px] lg:-mb-[14px]"
        lede={rich(t.hero.lede, {
          b: (text) => <strong className="font-semibold">{text}</strong>,
          br: () => <br />,
        })}
        actions={
          <>
            <Button href="/contact" tone="gold">
              {t.hero.requestDataRoom}
            </Button>
            <Button href="/for-businesses" tone="outline">
              {t.hero.applyForFunding}
            </Button>
          </>
        }
      />

      {/* Metrics over the boardroom shot; the asset ships already faded. */}
      <section className="relative overflow-hidden border-b border-[#9aa0a6] bg-shell">
        <Image
          src="/assets/portfolio/stats-bar.webp"
          alt=""
          aria-hidden
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <Container className="relative pb-[80px] pt-[80px]">
          <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-[302px_302px_302px_minmax(0,1fr)]">
            {t.stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`lg:h-[110px] lg:pt-[9px] ${
                  i === 0 ? "" : "border-s border-[#babec2] ps-6"
                }`}
              >
                <p className="text-[64px] font-bold leading-none tracking-[-0.02em] text-indigo-brand">
                  <bdi dir="ltr">{value}</bdi>
                </p>
                <p className="mt-[24px] text-[14px] font-bold uppercase leading-none tracking-[0.01em] text-ink">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PortfolioFilter investments={investments} labels={t.register} />

      {/* Sector allocation */}
      <Section tone="cream">
        <Container className="pb-[160px] pt-[157px]">
          <SectionTitle>{t.allocation.title}</SectionTitle>
          <ul className="mt-[83px]">
            {t.allocation.items.map(({ pct, name, count }) => (
              <li
                key={name}
                className="grid items-center gap-4 border-t border-hairline pb-[39px] pt-[44px] last:border-b sm:grid-cols-[minmax(0,410px)_minmax(0,1fr)] lg:ps-[351px]"
              >
                <p className="text-[71px] font-bold leading-none tracking-[-0.02em] text-indigo-brand">
                  <bdi dir="ltr">{pct}</bdi>
                </p>
                <div>
                  <p className="text-[21px] font-semibold text-ink">{name}</p>
                  <p className="mt-1 text-[14px] text-ink-muted">{count}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Case study */}
      <Section>
        <Container className="pb-[160px] pt-[157px]">
          <SectionTitle>{t.caseStudy.title}</SectionTitle>
          <dl className="mt-[84px]">
            {t.caseStudy.items.map(({ term, body }) => (
              <div
                key={term}
                className="grid items-center gap-3 border-t border-hairline py-[31.5px] last:border-b sm:grid-cols-[411px_minmax(0,510px)] sm:gap-0"
              >
                <dt className="text-[21px] font-semibold leading-[26px] text-ink">{term}</dt>
                <dd className="text-[16px] leading-[26px] text-ink">{body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Exits */}
      <section className="bg-gold">
        <Container className="pb-[160px] pt-[160px]">
          <ImageSlot
            src="/assets/portfolio/exits.webp"
            alt={t.exits.imageAlt}
            ratio="aspect-[1280/360]"
            rounded=""
          />
          <SectionTitle className="mt-[77px]">
            {t.exits.title}
          </SectionTitle>
          <ul className="mt-[84px]">
            {t.exits.items.map((exit) => (
              <li
                key={exit.name}
                className="grid items-center gap-3 border-t border-indigo-brand/20 py-[31.5px] last:border-b sm:grid-cols-[411px_minmax(0,510px)_minmax(0,1fr)] sm:gap-0"
              >
                <p className="text-[21px] font-semibold leading-[30px] text-indigo-brand">
                  {exit.name}
                </p>
                <p className="text-[16px] leading-[26px] text-indigo-brand/85">
                  {exit.body}
                </p>
                <p className="text-[15px] font-semibold text-indigo-brand sm:text-end">
                  {exit.year}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Join */}
      <Section tone="cream">
        <Container className="pb-[157px] pt-[160px]">
          <ImageSlot
            src="/assets/portfolio/join.webp"
            alt={t.join.imageAlt}
            ratio="aspect-[1280/360]"
            rounded=""
          />
          <SectionTitle className="mt-[77px]">
            {lines(t.join.title)}
          </SectionTitle>
          <div className="mt-[22px] flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[630px] text-[16px] leading-[26px] text-ink">
              {t.join.body}
            </p>
            <Button href="/contact" tone="gold">
              {t.join.cta}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
