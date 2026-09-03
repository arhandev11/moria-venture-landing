import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "15+ companies across fintech, logistics, agritech, and the halal economy, bridging Indonesia and the GCC.",
};

const INVESTMENTS: Investment[] = [
  { company: "Ayoconnect", sector: "Fintech", stage: "Series B", geography: "Indonesia", group: "Fintech" },
  { company: "Bukukas", sector: "SME Finance", stage: "Series A", geography: "Indonesia", group: "Fintech" },
  { company: "Credibook", sector: "Digital Lending", stage: "Series A", geography: "Indonesia", group: "Fintech" },
  { company: "Dagangan", sector: "Rural Commerce", stage: "Series A", geography: "Indonesia", group: "Logistics" },
  { company: "Eden Farm", sector: "Agritech", stage: "Series B", geography: "Indonesia", group: "Agritech" },
  { company: "Fishlog", sector: "Supply Chain", stage: "Series A", geography: "Indonesia", group: "Logistics" },
  { company: "Verihubs", sector: "Identity / KYC", stage: "Series A", geography: "Indonesia", group: "SaaS" },
  { company: "Wallex", sector: "Cross-border Payments", stage: "Series A", geography: "Indonesia - GCC", group: "Fintech" },
];

const STATS = [
  ["15+", "Companies"],
  ["$25M+", "Deployed"],
  ["~40%", "Blended ROI"],
  ["2", "Markets"],
];

const ALLOCATION = [
  ["35%", "Fintech", "6 Companies"],
  ["20%", "Logistics & Supply Chain", "3 Companies"],
  ["15%", "Agritech", "2 Companies"],
  ["15%", "SaaS & Enterprise", "2 Companies"],
  ["15%", "Halal Economy Tech", "2 Companies"],
];

const CASE_STUDY = [
  [
    "Problem Statement",
    "Women in dense Indonesian metropolitan areas face persistent safety and accessibility challenges when moving around cities.",
  ],
  [
    "Solution",
    "HerMoves delivers a women-only ride-sharing platform with verified female drivers, real-time safety features, and customized comfort tiers.",
  ],
  ["Outcome", "3x rider growth in 6 months, expanded to 3 Indonesian cities."],
];

const EXITS = [
  {
    name: "PT Dhuha Logistics",
    body: "Acquired by GCC Maritime Group for cross-border halal supply network integration",
    year: "2024",
  },
  {
    name: "NusaQu Infra",
    body: "Completed major Shariah API integration with Bank Syariah Indonesia (BSI)",
    year: "2023",
  },
  {
    name: "HalalCommerce",
    body: "Merged with strategic Saudi Arabian sovereign investment vehicle",
    year: "2022",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="Portfolio"
        padding="pb-[100px] pt-[110px] lg:pb-[100px] lg:pt-[90px]"
        ledeGap="mt-[45px]"
        ledeClassName="max-w-[640px] text-[19px] leading-[29px]"
        lede="15+ companies across fintech, logistics, agritech, and the halal economy. PT Moria Global Ventures channels institutional Shariah-compliant capital into category leaders bridging Indonesia and the GCC."
        actions={
          <>
            <Button href="/contact" tone="gold">
              Request Data Room
            </Button>
            <Button href="/for-businesses" tone="outline">
              Apply for Funding
            </Button>
          </>
        }
      />

      {/* Metrics, laid over the faded boardroom shot as in the deck */}
      <section className="relative overflow-hidden bg-shell">
        <Image
          src="/assets/portfolio/boardroom.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-[0.14]"
        />
        <Container className="relative pb-[70px] pt-[80px]">
          <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {STATS.map(([value, label], i) => (
              <div
                key={label}
                className={
                  i === 0 ? "" : "border-l border-rule pl-8 sm:pl-12"
                }
              >
                <p className="text-[81px] font-bold leading-none text-indigo-brand">
                  {value}
                </p>
                <p className="mt-[28px] text-[13px] font-bold uppercase tracking-[0.12em] text-ink/70">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PortfolioFilter investments={INVESTMENTS} />

      {/* Sector allocation */}
      <Section tone="cream">
        <Container className="pb-[210px] pt-[169px]">
          <SectionTitle>Sector Allocation</SectionTitle>
          <ul className="mt-[130px]">
            {ALLOCATION.map(([pct, name, count]) => (
              <li
                key={name}
                className="grid items-center gap-4 border-t border-rule py-[36px] last:border-b sm:grid-cols-[minmax(0,352px)_minmax(0,1fr)] sm:gap-[89px]"
              >
                <p className="text-[52px] font-bold leading-none text-indigo-brand sm:text-right">
                  {pct}
                </p>
                <div>
                  <p className="text-[19px] font-semibold text-ink">{name}</p>
                  <p className="mt-2 text-[14px] text-ink-muted">{count}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Case study */}
      <Section>
        <Container className="pb-[197px] pt-[169px]">
          <SectionTitle>Case Study Spotlight</SectionTitle>
          <dl className="mt-[100px]">
            {CASE_STUDY.map(([term, body]) => (
              <div
                key={term}
                className="grid gap-3 border-t border-rule py-7 last:border-b sm:grid-cols-[413px_minmax(0,1fr)] sm:gap-0"
              >
                <dt className="text-[19px] font-semibold text-ink">{term}</dt>
                <dd className="text-[16px] leading-[26px] text-ink-muted">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Exits */}
      <section className="bg-gold">
        <Container className="pb-[198px] pt-[161px]">
          <ImageSlot
            src="/assets/portfolio/growth-arrow.jpg"
            alt="Upward growth arrow"
            ratio="aspect-[1280/359]"
            rounded="rounded-lg"
          />
          <SectionTitle className="mt-[89px]">
            Exits &amp; Milestones
          </SectionTitle>
          <ul className="mt-[90px]">
            {EXITS.map((exit) => (
              <li
                key={exit.name}
                className="grid gap-3 border-t border-indigo-brand/25 py-[32px] last:border-b sm:grid-cols-[minmax(0,340px)_minmax(0,1fr)_90px] sm:gap-10"
              >
                <p className="text-[19px] font-semibold text-indigo-brand">
                  {exit.name}
                </p>
                <p className="text-[16px] leading-[26px] text-indigo-brand/80">
                  {exit.body}
                </p>
                <p className="text-[16px] font-semibold text-indigo-brand sm:text-right">
                  {exit.year}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Join */}
      <Section tone="cream">
        <Container className="pb-[165px] pt-[100px]">
          <ImageSlot
            src="/assets/portfolio/advisory.jpg"
            alt="An advisory session in progress"
            ratio="aspect-[1280/430]"
            rounded="rounded-lg"
          />
          <div className="mt-[70px] grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div>
              <SectionTitle>
                Want to Join Our
                <br />
                Portfolio?
              </SectionTitle>
              <p className="mt-[44px] max-w-[620px] text-[16px] leading-[26px] text-ink-muted">
                We are actively selecting top-tier projects seeking compliant
                venture backing or fast-horizon project financing.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/for-businesses" tone="gold">
                Apply for Funding
              </Button>
              <Button href="/contact" tone="outline">
                Request Data Room
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
