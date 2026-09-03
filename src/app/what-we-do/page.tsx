import type { Metadata } from "next";
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
    "Two capital products. One venture-building platform. Shariah-compliant from screening to exit.",
};

const VENTURE_BUILDING = [
  {
    term: "Operational Support",
    body: "Deep, hands-on administrative guidance ensuring organizational efficiency, solid operational framework development, and scalable team building systems.",
  },
  {
    term: "GCC Market Access",
    body: "Direct physical, corporate, and sovereign bridge channels into Saudi Arabia, the UAE, and broader Gulf economic clusters to fast-track regional launches.",
  },
  {
    term: "Regulatory Navigation",
    body: "Comprehensive regulatory mapping and clearance protocols aligned across OJK and Bank Indonesia in Jakarta to the Capital Market Authority in Riyadh.",
  },
  {
    term: "Shariah Implementation",
    body: "Rigorous model design under audited guidelines to eliminate riba, Gharar, and maysir structural risks from transaction flows, operations, and exits.",
  },
  {
    term: "Network Access",
    body: "Direct linkage to private and state-sponsored venture ecosystems, regional corporate groups, and reliable technology scale partners.",
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
    "Shariah Compliance",
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
    <dl>
      {items.map(([label, value]) => (
        <div key={label} className="border-b border-rule pb-4 pt-[21px] first:pt-0">
          <dt className="t-eyebrow text-ink/60">{label}</dt>
          <dd className="mt-2 text-[31px] font-semibold leading-none text-indigo-brand">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        title="What We Do"
        padding="pb-[100px] pt-[110px] lg:pb-[110px] lg:pt-[110px]"
        lede="Two capital products. One venture-building platform. Shariah-compliant from screening to exit. Connecting Southeast Asian innovation with Gulf Cooperation Council markets."
        ledeGap="mt-[60px]"
        ledeClassName="max-w-[660px] text-[24px] leading-[36px]"
      />

      <AnchorNav
        items={[
          { label: "01 / Venture Capital", href: "#venture-capital" },
          { label: "02 / Project Finance", href: "#project-finance" },
          { label: "03 / Venture Building", href: "#venture-building" },
          { label: "04 / Investment Criteria", href: "#investment-criteria" },
        ]}
      />

      {/* 01 Venture Capital */}
      <Section id="venture-capital">
        <Container className="pb-[137px] pt-[133px]">
          <div className="text-right">
            <p className="text-[77px] font-bold leading-none text-indigo-brand">01</p>
            <SectionTitle className="mt-[27px]">Venture Capital</SectionTitle>
          </div>

          <ImageSlot
            className="mt-[56px]"
            src="/assets/what-we-do/venture-capital.png"
            alt="Container port operations"
            ratio="aspect-[1280/560]"
            rounded="rounded-lg"
          />

          <div className="mt-[60px] grid gap-14 lg:grid-cols-[minmax(0,586px)_minmax(0,1fr)] lg:gap-[295px]">
            <div className="space-y-6 text-[16px] leading-[26px] text-ink-muted">
              <p>
                Our Venture Capital engine targets equity-based investments in
                high-growth digital pioneers within Southeast Asia, particularly
                Indonesia. We prioritize category-leading business models that
                solve structural inefficiencies across fintech, logistics, and
                agritech.
              </p>
              <p>
                Beyond capital, we act as a bridge. We actively guide our
                portfolio companies through international scaling pathways,
                introducing them to critical Middle Eastern sovereign
                allocators, strategic corporate partners, and expanded GCC
                commercial networks to ensure sustained growth.
              </p>
            </div>
            <SpecList
              items={[
                ["Check Size", "$100K-$500K"],
                ["Horizon", "3-7 Years"],
                ["Structure", "Equity"],
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* 02 Project Finance */}
      <Section tone="cream" id="project-finance">
        <Container className="pb-[144px] pt-[127px]">
          <p className="text-[77px] font-bold leading-none text-indigo-brand">02</p>
          <SectionTitle className="mt-[27px]">Project Finance</SectionTitle>

          <ImageSlot
            className="mt-[56px]"
            src="/assets/what-we-do/project-finance.png"
            alt="Trade finance documentation"
            ratio="aspect-[1280/560]"
            rounded="rounded-lg"
          />

          <div className="mt-[60px] grid gap-14 lg:grid-cols-[minmax(0,586px)_minmax(0,1fr)] lg:gap-[295px]">
            <div className="space-y-6 text-[16px] leading-[26px] text-ink-muted">
              <p>
                Our Project Finance division implements short-cycle,
                asset-backed transaction architecture designed to provide
                predictable yields with minimized volatility. We construct
                custom liquidity paths using Murabaha, Istisna&apos;a, and
                Musharakah structures.
              </p>
              <p>
                By focusing heavily on institutional escrow accounts, purchase
                order financing, and trade supply chains, we systematically
                reduce operational and transaction-based cross-border risks. Our
                cycles are designed to maximize velocity and deliver consistent,
                compliant capital returns.
              </p>
            </div>
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
        <Container className="pb-[157px] pt-[127px]">
          <div className="text-right">
            <p className="text-[77px] font-bold leading-none text-indigo-brand">03</p>
            <SectionTitle className="mt-[27px]">Venture Building</SectionTitle>
          </div>

          <ImageSlot
            className="mt-[56px]"
            src="/assets/what-we-do/venture-building.png"
            alt="Portfolio operators in a working session"
            ratio="aspect-[1280/560]"
            rounded="rounded-lg"
          />

          <dl className="mt-[80px] lg:ml-[295px]">
            {VENTURE_BUILDING.map((item) => (
              <div
                key={item.term}
                className="grid gap-2 border-t border-rule py-6 last:border-b sm:grid-cols-[400px_minmax(0,1fr)] sm:gap-0"
              >
                <dt className="text-[22px] font-semibold text-indigo-brand">
                  {item.term}
                </dt>
                <dd className="text-[16px] leading-[26px] text-ink-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 04 Investment Criteria */}
      <Section tone="cream" id="investment-criteria">
        <Container className="pb-[122px] pt-[127px]">
          <p className="text-[77px] font-bold leading-none text-indigo-brand">04</p>
          <SectionTitle className="mt-[21px]">Investment Criteria</SectionTitle>

          <dl className="mt-[62px]">
            {CRITERIA.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 border-t border-rule py-[20px] last:border-b sm:grid-cols-[401px_minmax(0,1fr)] sm:gap-0"
              >
                <dt className="t-eyebrow text-ink/70">{label}</dt>
                <dd className="text-[15px] leading-[24px] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBand padding="pb-[130px] pt-[168px]" />
    </>
  );
}
