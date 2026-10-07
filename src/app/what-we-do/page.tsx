import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CtaBand } from "@/components/cta-band";
import {
  AnchorNav,
  Container,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Two capital products. One venture-building platform. Islamic Principle-compliant from screening to exit.",
};

const VENTURE_BUILDING = [
  {
    term: "Founder Development",
    body: "Deep, hands-on administrative guidance ensuring organizational efficiency, solid operational framework development, and scalable team building systems.",
  },
  {
    term: "Venture Building",
    body: "Direct physical, corporate, and sovereign bridge channels into Saudi Arabia, the UAE, and broader Gulf economic clusters to fast-track regional launches.",
  },
  {
    term: "Commercial Growth",
    body: "Comprehensive regulatory mapping and clearance protocols aligned across OJK and Bank Indonesia in Jakarta to the Capital Market Authority in Riyadh.",
  },
  {
    term: "Investment Readiness",
    body: "Rigorous model design under audited guidelines to eliminate riba, Gharar, and maysir structural risks from transaction flows, operations, and exits.",
  },
  {
    term: "Capital Access",
    body: "Direct linkage to private and state-sponsored venture ecosystems, regional corporate groups, and reliable technology scale partners.",
  },
  {
    term: "Portfolio Growth",
    body: "Ongoing advisory, regional market access, follow-on funding support, and board-level guidance — support doesn't end at investment.",
  },
];

const CRITERIA: [string, string][] = [
  ["Stage", "Seed, Pre-Series A, Series A, and short-cycle Supply Chain Trade"],
  [
    "Geography",
    "Southeast Asia (Indonesia) and Gulf Cooperation Council (Saudi Arabia / UAE)",
  ],
  [
    "Sectors",
    "Fintech Infrastructure, Halal Logistics & Distribution, Sustainable Food Supply Chains, Agritech platforms",
  ],
  [
    "Islamic Principle Compliance",
    "Strict ethical frameworks, certified non-riba transaction mechanics, vetted commercial execution",
  ],
  [
    "Check Size",
    "Varies by engine model ($100K-$500K Equity, transactional capacity scaling for trade finance allocation)",
  ],
  [
    "Strong Candidate Profile",
    "High-growth technology enterprises with validated revenue, seeking scaling expansion paths across the Indonesia-Saudi economic corridor.",
  ],
];

/** Right-hand spec stack on the two capital-product sections. */
function SpecList({ items }: { items: [string, string][] }) {
  return (
    <dl className="border-b border-rule">
      {items.map(([label, value]) => (
        <div key={label} className="border-t border-rule pb-[17px] pt-[14px]">
          <dt className="text-[12px] font-bold uppercase leading-none text-ink">
            {label}
          </dt>
          <dd className="mt-[7px] text-[32px] font-semibold leading-[32px] text-indigo-brand">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Body copy beside the spec stack; the deck spaces the two sections' paragraphs differently. */
function ProductBody({
  children,
  spacing,
}: {
  children: ReactNode;
  spacing: string;
}) {
  return <div className={`${spacing} text-[17px] leading-[31px] text-ink`}>{children}</div>;
}

const PRODUCT_GRID =
  "mt-[64px] grid gap-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-[100px]";

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        title="What We Do"
        padding="pb-[100px] pt-[110px] lg:pb-[122px] lg:pt-[93px]"
        lede="Two capital products. One venture-building platform. Islamic Principle-compliant from screening to exit. Connecting Southeast Asian innovation with Gulf Cooperation Council markets."
        ledeGap="mt-[52px]"
        ledeClassName="max-w-[680px] text-[24px] leading-[36px]"
      />

      <AnchorNav
        dividers={false}
        items={[
          { label: "01 / Venture Capital", href: "#venture-capital" },
          { label: "02 / Project Finance", href: "#project-finance" },
          { label: "03 / Venture Building", href: "#venture-building" },
          { label: "04 / Investment Criteria", href: "#investment-criteria" },
        ]}
      />

      {/* 01 Venture Capital */}
      <Section id="venture-capital">
        <Container className="pb-[119px] pt-[123px]">
          {/* The block hugs the right edge while its lines share a left edge. */}
          <div className="lg:ml-auto lg:w-fit">
            <p className="text-[77px] font-bold leading-none text-indigo-brand">01</p>
            <SectionTitle className="mt-[26px]">Venture Capital</SectionTitle>
          </div>

          <ImageSlot
            className="mt-[67px]"
            src="/assets/what-we-do/venture-capital.webp"
            alt="Jakarta city skyline"
            ratio="aspect-[1280/560]"
            rounded="rounded-lg"
          />

          <div className={PRODUCT_GRID}>
            <ProductBody spacing="space-y-[31px]">
              <p>
                Our Venture Capital engine invests equity in high-growth
                digital pioneers across Southeast Asia, with a focus on
                Indonesia — backing category-leading business models solving
                structural inefficiencies in tech-backed SMEs, commodity, and
                agriculture.
              </p>
              <p>
                Beyond capital, we&apos;re a bridge to the Gulf. We guide
                portfolio companies through international scaling — connecting
                them to Middle Eastern sovereign allocators, strategic corporate
                partners, and GCC commercial networks that drive sustained
                growth.
              </p>
            </ProductBody>
            <SpecList
              items={[
                ["Check Size", "$10K-$100K"],
                ["Horizon", "3-7 Years"],
                ["Structure", "Equity"],
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* 02 Project Finance */}
      <Section tone="cream" id="project-finance">
        <Container className="pb-[119px] pt-[117px]">
          <p className="text-[77px] font-bold leading-none text-indigo-brand">02</p>
          <SectionTitle className="mt-[20px]">Project Finance</SectionTitle>

          <ImageSlot
            className="mt-[67px]"
            src="/assets/what-we-do/project-finance.webp"
            alt="Trade finance documentation"
            ratio="aspect-[1280/560]"
            rounded="rounded-lg"
          />

          <div className={PRODUCT_GRID}>
            <ProductBody spacing="space-y-[24px]">
              <p>
                Our Project Finance division builds short-cycle, asset-backed
                transactions designed for predictable yields with minimized
                volatility, using structured liquidity paths matched to each
                deal.
              </p>
              <p>
                We focus on institutional escrow accounts, purchase order
                financing, and trade supply chains, systematically reducing
                operational and cross-border transaction risk. The result: short
                cycles built for velocity, delivering consistent, Islamic
                finance-compliant returns.
              </p>
            </ProductBody>
            <SpecList
              items={[
                ["Structure", "Murabaha / PO"],
                ["Cycle", "30-180 Days"],
                ["Avg ROI", "~40%"],
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* 03 Venture Building */}
      <Section id="venture-building">
        <Container className="pb-[119px] pt-[117px]">
          <div className="lg:ml-auto lg:w-fit">
            <p className="text-[77px] font-bold leading-none text-indigo-brand">03</p>
            <SectionTitle className="mt-[20px]">Venture Building</SectionTitle>
          </div>

          <ImageSlot
            className="mt-[67px]"
            src="/assets/what-we-do/venture-building.webp"
            alt="Portfolio operators in a working session"
            ratio="aspect-[1280/560]"
            rounded="rounded-lg"
          />

          <dl className="mt-[64px] lg:ml-[294px]">
            {VENTURE_BUILDING.map((item) => (
              <div
                key={item.term}
                className="grid gap-2 border-t border-rule pb-[31px] pt-[32px] last:border-b sm:grid-cols-[400px_minmax(0,1fr)] sm:gap-0"
              >
                <dt className="-mt-[6px] text-[24px] font-semibold leading-[30px] text-indigo-brand">
                  {item.term}
                </dt>
                <dd className="text-[16px] leading-[26px] text-ink">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 04 Investment Criteria */}
      <Section tone="cream" id="investment-criteria">
        <Container className="pb-[119px] pt-[117px]">
          <p className="text-[77px] font-bold leading-none text-indigo-brand">04</p>
          <SectionTitle className="mt-[21px]">Investment Criteria</SectionTitle>

          <dl className="mt-[66px]">
            {CRITERIA.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 border-t border-rule pb-[26px] pt-[21px] last:border-b sm:grid-cols-[400px_minmax(0,1fr)] sm:gap-0"
              >
                <dt className="text-[12px] font-bold uppercase leading-[12px] text-ink">
                  {label}
                </dt>
                <dd className="text-[18px] leading-[18px] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* The deck sets this band 12px tighter on top than the shared default. */}
      <CtaBand />
    </>
  );
}
