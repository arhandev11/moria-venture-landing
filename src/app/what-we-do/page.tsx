import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import {
  AnchorNav,
  Container,
  DefRow,
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

const CRITERIA = [
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

function SpecList({ items }: { items: [string, string][] }) {
  return (
    <dl>
      {items.map(([label, value]) => (
        <div key={label} className="border-b border-rule py-4 first:border-t">
          <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60">
            {label}
          </dt>
          <dd className="display mt-1 text-indigo-brand text-[22px]">{value}</dd>
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
        lede="Two capital products. One venture-building platform. Shariah-compliant from screening to exit. Connecting Southeast Asian innovation with Gulf Cooperation Council markets."
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
        <Container className="py-20">
          <div className="text-right">
            <p className="display text-indigo-brand text-[34px]">01</p>
            <SectionTitle className="mt-2">Venture Capital</SectionTitle>
          </div>

          <ImageSlot
            className="mt-12"
            src="/assets/what-we-do/venture-capital.png"
            alt="Container port operations"
            ratio="aspect-[2560/1120]"
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="space-y-5 text-[13px] leading-relaxed text-ink-muted">
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
        <Container className="py-20">
          <p className="display text-indigo-brand text-[34px]">02</p>
          <SectionTitle className="mt-2">Project Finance</SectionTitle>

          <ImageSlot
            className="mt-12"
            src="/assets/what-we-do/project-finance.png"
            alt="Trade finance documentation"
            ratio="aspect-[2560/1120]"
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="space-y-5 text-[13px] leading-relaxed text-ink-muted">
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
        <Container className="py-20">
          <div className="text-right">
            <p className="display text-indigo-brand text-[34px]">03</p>
            <SectionTitle className="mt-2">Venture Building</SectionTitle>
          </div>

          <ImageSlot
            className="mt-12"
            src="/assets/what-we-do/venture-building.png"
            alt="Portfolio operators in a working session"
            ratio="aspect-[2560/1120]"
          />

          <dl className="mt-14 lg:ml-auto lg:w-[75%]">
            {VENTURE_BUILDING.map((item) => (
              <DefRow key={item.term} term={item.term}>
                {item.body}
              </DefRow>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 04 Investment Criteria */}
      <Section tone="cream" id="investment-criteria">
        <Container className="py-20">
          <p className="display text-indigo-brand text-[34px]">04</p>
          <SectionTitle className="mt-2">Investment Criteria</SectionTitle>

          <dl className="mt-12">
            {CRITERIA.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 border-t border-rule py-5 last:border-b sm:grid-cols-[260px_minmax(0,1fr)] sm:gap-10"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/70">
                  {label}
                </dt>
                <dd className="text-[13px] leading-relaxed text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
