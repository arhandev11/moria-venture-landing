import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Field, SubmitButton } from "@/components/form";
import {
  Button,
  Container,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
  Supergraphic,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "For Limited Partners",
  description:
    "Institutional access to the Indonesia–GCC investment corridor, built on structured, Islamic finance-compliant deal architecture.",
};

const WHY: { term: ReactNode; body: string }[] = [
  {
    term: "Real Numbers, Not Projections",
    body: "Our portfolio has delivered a 40.5% blended investor ROI, tracked deal by deal across active portfolio companies including HerMoves, NusaQu, PT Dhuha, PT KGB, EV Bike and BeliAyam. Not a forecast — actual performance.",
  },
  {
    term: (
      <>
        Compliance Built In, <br className="hidden sm:inline" />
        Checked Constantly
      </>
    ),
    body: "Every deal is structured asset-backed and interest-free from the term sheet, not signed off after the fact. And we don't just structure it once — every portfolio company runs through ongoing shareholder monitoring, with risk tracked in real time, not just at close.",
  },
  {
    term: "We Catch What Other Decks Miss",
    body: "Before we invest, every model gets audited the way we'd want an LP to audit us — we've caught margin compression, mislabeled equity tranches, and valuation math errors in deals we reviewed. That discipline applies to our own numbers first.",
  },
  {
    term: "Two Engines, One Portfolio",
    body: "We don't just write equity checks and wait. Alongside long-term equity in early-stage market leaders, we run short-cycle project financing that returns and redeploys capital faster — so LPs get growth exposure and working liquidity in the same mandate, not a bet on one model.",
  },
];

/** The revised deck sets its small caps at 11px with no tracking, tighter than t-eyebrow. */
const EYEBROW = "text-[11px] font-bold uppercase leading-[14px]";

const METRICS = [
  ["~74%", "PO Finance ROI"],
  ["$1.2M", "Deployed Capital"],
  ["15+", "Active Investments"],
];

const FUND_TERMS = [
  ["Fund Size Target", "$5,000,000 USD"],
  ["Fund Term", "7 Years, with 2 × 1-Year Extension Options (GP Discretion)"],
  ["Investment Period", "3 Years from First Close"],
  ["Target First Close", "Early 2027"],
  ["Minimum LP Commitment", "50K USD"],
  ["GP Commitment", "2% of Fund"],
  ["Management Fee", "3.0% per annum"],
  ["Profit Share Structure", "20% Mudarib Share, after 8% Preferred Return to LPs"],
  ["Currency", "USD / SAR Structured"],
  ["Islamic Finance Structure", "Mudarabah, Musyarakah & Wakalah Architecture"],
];

const GULF = [
  {
    title: "Saudi CMA Licensing Compliance",
    body: "Rigorous operational alignment matching Capital Market Authority parameters for outbound sovereign private capital deployments.",
  },
  {
    title: "Fintech Saudi Acceleration",
    body: "Co-sponsored pathways built directly inside local sandboxes to fast-track incoming Indonesian tech ventures into Riyadh.",
  },
  {
    title: "SCBD to KAFD Axis",
    body: "Direct physical operations spanning Jakarta SCBD and Riyadh King Abdullah Financial District for immediate institutional pipeline sync.",
  },
];

const GULF_STATS = [
  ["100%", "Audited Islamic Principle Pipeline Compliant"],
  ["SAR 94M", "GCC Native Commitments Deployed"],
];

const FOCUS = [
  {
    name: "NusaQu",
    logo: { src: "/assets/logos/nusaqu.svg", width: 57, height: 17 },
    focus: "Agro",
    jurisdiction: "Indonesia",
    stage: "Project Financing",
  },
  {
    name: "PT Dhuha",
    logo: { src: "/assets/logos/dhuha.svg", width: 31, height: 37 },
    focus: "Property",
    jurisdiction: "Indonesia",
    stage: "Project Financing",
  },
  {
    name: "Hermoves",
    logo: { src: "/assets/logos/hermoves.png", width: 64, height: 15 },
    focus: "Woman Community tech back up",
    jurisdiction: "Indonesia",
    stage: "Pre Seed",
  },
];

function PhotoBand({ src, alt }: { src: string; alt: string }) {
  return <ImageSlot src={src} alt={alt} ratio="aspect-[1440/520]" rounded="rounded-none" />;
}

export default function ForLimitedPartnersPage() {
  return (
    <>
      <PageHero
        title="For Limited Partners"
        padding="pb-[100px] pt-[110px] lg:pb-[119px] lg:pt-[113px]"
        ledeGap="mt-[53px]"
        // PageHero fixes a 55px gap above the actions; the deck sits them 13px closer.
        ledeClassName="max-w-[690px] text-[18px] leading-[30px] lg:text-[20px] lg:leading-[32px] lg:mb-[-13px]"
        lede="Institutional access to the Indonesia–GCC investment corridor, built on structured, Islamic finance-compliant deal architecture. We pair disciplined underwriting with a six-stage investment process designed for consistent, risk-adjusted returns."
        actions={
          <>
            <Button href="#data-room" tone="gold">
              Register
            </Button>
            <Button href="#performance" tone="outline">
              View Track Record
            </Button>
          </>
        }
      />

      <PhotoBand src="/assets/lp/why-invest.webp" alt="The Moria team" />

      {/* Why invest */}
      <Section tone="cream">
        <Container className="pb-[161px] pt-[156px]">
          <SectionTitle>Why Invest With Moria</SectionTitle>
          <dl className="mt-[83px]">
            {WHY.map((item, i) => (
              <div
                key={i}
                className="grid gap-3 border-t border-rule pb-[33px] pt-[30px] last:border-b sm:grid-cols-[411px_minmax(0,712px)] sm:gap-0"
              >
                <dt className="text-[21px] font-semibold leading-[24px] text-indigo-brand lg:text-[23px]">
                  {item.term}
                </dt>
                <dd className="text-[16px] leading-[26px] text-ink">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <PhotoBand src="/assets/lp/track-record.webp" alt="A portfolio performance dashboard" />

      {/* Performance */}
      <Section id="performance">
        <Container className="pb-[160px] pt-[155px]">
          <SectionTitle>Performance Metrics</SectionTitle>
          <div className="mt-[78px] grid gap-12 lg:grid-cols-[561px_minmax(0,1fr)] lg:gap-0">
            {/* The blended figure is the headline, so it sits larger and lower than the trio. */}
            <div className="lg:pt-[31px]">
              <p className="text-[64px] font-bold leading-none tracking-[-0.02em] text-indigo-brand lg:text-[80px]">
                ~40%
              </p>
              <p className="mt-[18px] text-[13px] font-bold uppercase leading-[16px] text-ink">
                Blended ROI Across Strategies
              </p>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-[281px_280px_minmax(0,1fr)] sm:gap-0">
                {METRICS.map(([value, label]) => (
                  <div key={label}>
                    <p className="text-[44px] font-bold leading-none tracking-[-0.02em] text-indigo-brand">
                      {value}
                    </p>
                    <p className={`${EYEBROW} mt-[20px] text-ink`}>{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-[40px] border-t border-rule pt-[36px] text-[15px] italic text-ink">
                Detailed data and formal audit reviews are available in our
                confidential data room.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <PhotoBand src="/assets/lp/fund-structure.webp" alt="Fund documentation" />

      {/* Seed fund terms */}
      <Section tone="cream">
        <Container className="pb-[159px] pt-[156px]">
          <SectionTitle>Seed Fund</SectionTitle>
          <p className="mt-[15px] text-[18px] text-ink">
            Structural parameters for sovereign-compliant private allocations.
          </p>
          <dl className="mt-[77px]">
            {FUND_TERMS.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 border-t border-rule py-4 last:border-b sm:min-h-[66px] sm:grid-cols-[681px_minmax(0,1fr)] sm:items-center sm:gap-0 sm:py-0"
              >
                <dt className={`${EYEBROW} text-ink`}>{label}</dt>
                <dd className="text-[17px] font-semibold text-indigo-brand">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-[74px] text-[14px] italic text-ink">
            *Full limited partnership agreement terms are accessible upon formal
            data room clearance.
          </p>
        </Container>
      </Section>

      <PhotoBand src="/assets/lp/gcc-module.webp" alt="The Riyadh skyline at dusk" />

      {/* Gulf presence */}
      <section className="bg-gold">
        <Container className="pb-[163px] pt-[153px]">
          <SectionTitle>Gulf Presence</SectionTitle>
          <p className="mt-[22px] text-[18px] text-indigo-brand">
            Operational foundations linking GCC liquidity mandates directly with
            ASEAN tech leaders.
          </p>

          <div className="mt-[71px] grid gap-12 md:grid-cols-[minmax(0,677px)_minmax(0,1fr)] md:gap-0">
            <div className="space-y-[26px] md:pr-10">
              {GULF.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[20px] font-semibold text-indigo-brand">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-[630px] text-[16px] leading-[26px] text-indigo-brand">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-[45px] md:border-l md:border-white/30 md:pl-[73px] md:pt-[45px]">
              {GULF_STATS.map(([value, label]) => (
                <div key={label}>
                  <p className="text-[32px] font-bold leading-none text-indigo-brand">{value}</p>
                  <p className={`${EYEBROW} mt-[16px] text-indigo-brand`}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio focus */}
      <Section>
        <Container className="pb-[158px] pt-[154px]">
          <SectionTitle className="text-right">Portfolio Focus</SectionTitle>
          <div className="mt-[100px] overflow-x-auto lg:ml-[150px]">
            <table className="w-full min-w-[820px] table-fixed text-left">
              <colgroup>
                <col className="w-[101px]" />
                <col className="w-[204px]" />
                <col className="w-[399px]" />
                <col className="w-[246px]" />
                <col />
              </colgroup>
              <thead>
                <tr className={`${EYEBROW} border-b-2 border-rule text-ink`}>
                  <th colSpan={2} className="pb-[13px] font-bold">Asset Group</th>
                  <th className="pb-[13px] font-bold">Corridor Focus</th>
                  <th className="pb-[13px] font-bold">Jurisdiction</th>
                  <th className="pb-[13px] pr-[26px] text-right font-bold">Allocation Stage</th>
                </tr>
              </thead>
              <tbody>
                {FOCUS.map((row) => (
                  <tr key={row.name} className="border-b-2 border-rule">
                    <td className="py-[23px] align-middle">
                      <Image
                        src={row.logo.src}
                        alt={`${row.name} logo`}
                        width={row.logo.width}
                        height={row.logo.height}
                        className="block"
                        style={{ width: row.logo.width, height: row.logo.height }}
                      />
                    </td>
                    <td className="py-[23px] text-[23px] font-semibold leading-[26px] text-indigo-brand">
                      {row.name}
                    </td>
                    <td className="py-[23px] pl-[25px] text-[16px] text-ink">{row.focus}</td>
                    <td className="py-[23px] pl-[25px] text-[16px] text-ink">{row.jurisdiction}</td>
                    <td className={`${EYEBROW} py-[23px] text-right text-indigo-brand`}>{row.stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Data room request */}
      <section id="data-room" className="relative overflow-hidden bg-gold">
        <Supergraphic
          src="/assets/brand/supergraphic-data-room.svg"
          width={628}
          height={979}
          className="absolute right-0 top-0 hidden h-full w-auto lg:block"
        />
        <Container className="relative pb-[161px] pt-[156px]">
          <h2 className="t-section text-indigo-brand">Request Data Room Access</h2>
          <p className="mt-6 max-w-[800px] text-[18px] leading-[19px] text-indigo-brand">
            Qualified Institutional Investors and Sovereign Allocators may
            submit authentication parameters to initialize full regulatory
            clearance reviews.
          </p>

          <div className="mt-[76px] grid gap-12 lg:grid-cols-[628px_480px] lg:gap-[80px]">
            <form className="space-y-3">
              <Field tone="on-gold" size="lg" label="Full Name" placeholder="e.g. Tariq Bin Fahad" />
              <Field tone="on-gold" size="lg" label="Institution / Firm" placeholder="e.g. GCC Capital Advisory" />
              <Field tone="on-gold" size="lg" label="Business Email" type="email" placeholder="tariq@gcccapital.com" />
              <Field tone="on-gold" size="lg" label="Contact Phone" type="tel" placeholder="+966 50 000 0000" />
              <Field tone="on-gold" size="lg" label="Intended Ticket Size (USD)" placeholder="e.g. $5,000,000+" />
            </form>

            <div className="lg:pt-[24px]">
              <SubmitButton tone="indigo" size="lg" className="w-full">
                Submit Request
              </SubmitButton>
              <Link
                href="#"
                className="mt-[39px] flex h-[56px] items-center justify-center gap-3 border border-indigo-brand px-6 text-[15px] font-semibold text-indigo-brand transition-colors hover:bg-indigo-brand hover:text-gold"
              >
                <span className="underline underline-offset-2">
                  Download Moria Ventures Institutional One-Pager
                </span>
                <svg
                  aria-hidden
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M2.5 11v2.5h11V11" />
                </svg>
              </Link>
              <p className="mt-[40px] text-[14px] leading-[21px] text-indigo-brand">
                PT Moria Ventures Capital processes investor data strictly in
                compliance with global secure access firewalls. Verification
                latency typically spans 24-48 institutional business hours.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
