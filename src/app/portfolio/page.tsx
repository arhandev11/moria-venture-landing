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
  { no: 1, project: "Koperasi Penata BAC", type: "PO Financing", amount: "4,800" },
  { no: 2, project: "KGB - ASG Mandiri", type: "Project Financing", amount: "10,600" },
  { no: 3, project: "KGB - ASG Pontang", type: "Project Financing", amount: "3,000" },
  { no: 4, project: "PT ISA", type: "Project Financing", amount: "6,100" },
  { no: 5, project: "KGB - ASG BRI", type: "Project Financing", amount: "9,000" },
  { no: 6, project: "Kitchen More", type: "PO Financing", amount: "9,000" },
  { no: 9, project: "PT EMMA", type: "PO Financing", amount: "4,200" },
  { no: 10, project: "Nusaqu", type: "PO Financing", amount: "17,900" },
  { no: 11, project: "Duha", type: "PO Financing", amount: "6,000" },
  { no: 12, project: "Duha 2", type: "Khadamat", amount: "6,000" },
  { no: 13, project: "Property Duha 3", type: "Project Financing", amount: "55,582" },
];

const STATS = [
  ["15+", "Companies"],
  ["$25M+", "Deployed"],
  ["~40%", "Blended ROI"],
  ["2", "Markets"],
];

const ALLOCATION = [
  ["35%", "Tech Based Company", "6 Companies"],
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
    body: "Completed major Islamic Principle API integration with Bank Syariah Indonesia (BSI)",
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
        padding="pb-[100px] pt-[110px] lg:pb-[123px] lg:pt-[73px]"
        ledeGap="mt-[54px]"
        // Two labelled blocks, kept as inline runs so the hero still renders
        // one paragraph and the line reveal can walk it.
        ledeClassName="max-w-[620px] text-[17px] leading-[29px] lg:-mb-[14px]"
        lede={
          <>
            <strong className="font-semibold">Equity / Venture Builder</strong>
            <br />
            A portfolio of category-leading companies across fintech,
            logistics, and agritech. Built, not just funded.
            <br />
            <br />
            <strong className="font-semibold">Project Financing</strong>
            <br />
            Trusted by businesses across agriculture, property, F&amp;B, and
            FMCG moving capital through structured, asset-backed cycles.
          </>
        }
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
            {STATS.map(([value, label], i) => (
              <div
                key={label}
                className={`lg:h-[110px] lg:pt-[9px] ${
                  i === 0 ? "" : "border-l border-[#babec2] pl-6"
                }`}
              >
                <p className="text-[64px] font-bold leading-none tracking-[-0.02em] text-indigo-brand">
                  {value}
                </p>
                <p className="mt-[24px] text-[14px] font-bold uppercase leading-none tracking-[0.01em] text-ink">
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
        <Container className="pb-[160px] pt-[157px]">
          <SectionTitle>Sector Allocation</SectionTitle>
          <ul className="mt-[83px]">
            {ALLOCATION.map(([pct, name, count]) => (
              <li
                key={name}
                className="grid items-center gap-4 border-t border-hairline pb-[39px] pt-[44px] last:border-b sm:grid-cols-[minmax(0,410px)_minmax(0,1fr)] lg:pl-[351px]"
              >
                <p className="text-[71px] font-bold leading-none tracking-[-0.02em] text-indigo-brand">
                  {pct}
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
          <SectionTitle>Case Study Spotlight</SectionTitle>
          <dl className="mt-[84px]">
            {CASE_STUDY.map(([term, body]) => (
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
            alt="A gold arrow climbing upward"
            ratio="aspect-[1280/360]"
            rounded=""
          />
          <SectionTitle className="mt-[77px]">
            Exits &amp; Milestones
          </SectionTitle>
          <ul className="mt-[84px]">
            {EXITS.map((exit) => (
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
                <p className="text-[15px] font-semibold text-indigo-brand sm:text-right">
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
            alt="Two colleagues reviewing growth figures on a tablet"
            ratio="aspect-[1280/360]"
            rounded=""
          />
          <SectionTitle className="mt-[77px]">
            Want to Join Our
            <br />
            Portfolio?
          </SectionTitle>
          <div className="mt-[22px] flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[630px] text-[16px] leading-[26px] text-ink">
              We are actively selecting top-tier projects seeking compliant
              venture backing or fast-horizon project financing.
            </p>
            <Button href="/contact" tone="gold">
              Contact Us
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
