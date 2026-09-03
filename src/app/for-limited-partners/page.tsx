import type { Metadata } from "next";
import Link from "next/link";
import { Field, SubmitButton } from "@/components/form";
import {
  Button,
  Container,
  DefRow,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
  Stat,
  Supergraphic,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "For Limited Partners",
  description:
    "Direct, audited access to the high-yield Indonesia-GCC investment corridor.",
};

const WHY = [
  {
    term: "Shariah-First Architecture",
    body: "Every deployment operates under strict compliance models audited by globally recognized Shariah scholars. We eliminate riba, gharar, and maysir without sacrificing yielding capabilities.",
  },
  {
    term: "Dual-Engine Returns",
    body: "A mathematical framework targeting consistent risk-adjusted returns through the dual-engine allocation strategy, combining volatile VC high-upsides with short-term predictable project yields.",
  },
  {
    term: "Indonesia-GCC Corridor",
    body: "Direct operational bridge between Southeast Asia's powerhouse economy (Indonesia) and the Gulf Cooperation Council (GCC). We assist enterprises in crossing borders seamlessly.",
  },
  {
    term: "Operational Edge",
    body: "Our partners hold deep regulatory, institutional, and commercial relationships across both jurisdictions, facilitating joint ventures, licensing, and national-level sovereign wealth support.",
  },
];

const FUND_TERMS = [
  ["Fund Size Target", "$50,000,000 USD"],
  ["Investment Period", "3 Years from First Close"],
  ["Management Fee", "2.0% per annum"],
  ["Carried Interest", "20% with 8% Hurdle Rate"],
  ["Currency", "USD / SAR Structured"],
  ["Shariah Structure", "Mudarabah & Wakalah Architecture"],
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

const FOCUS = [
  ["NusaQu", "Shariah Fintech Infrastructure Integration", "Saudi Arabia / ID", "Pre-Series A"],
  ["PT Dhuha", "Halal Logistics and Regional Trade Finance", "Indonesia", "Project Finance"],
  ["PT SIF Cocoa", "Sustainable Global Agri-food Supply Chain", "Indonesia / GCC", "Series A"],
];

export default function ForLimitedPartnersPage() {
  return (
    <>
      <PageHero
        title="For Limited Partners"
        padding="pb-[100px] pt-[110px] lg:pb-[150px] lg:pt-[120px]"
        ledeGap="mt-[48px]"
        ledeClassName="max-w-[700px] text-[17px] leading-[29px]"
        lede="Direct, audited access to the high-yield Indonesia-GCC investment corridor. We combine structural Shariah compliance with rigorous institutional growth strategies."
        actions={
          <>
            <Button href="#data-room" tone="gold">
              Request Data Room Access
            </Button>
            <Button href="#performance" tone="outline">
              View Track Record
            </Button>
          </>
        }
      />

      <ImageSlot src="/assets/lp/team.jpg" alt="The Moria team" ratio="aspect-[1440/507]" rounded="rounded-none" />

      {/* Why invest */}
      <Section tone="cream">
        <Container className="pb-[150px] pt-[169px]">
          <SectionTitle>Why Invest With Moria</SectionTitle>
          <dl className="mt-[110px]">
            {WHY.map((item) => (
              <DefRow key={item.term} term={item.term}>
                {item.body}
              </DefRow>
            ))}
          </dl>
        </Container>
      </Section>

      <ImageSlot src="/assets/lp/dashboard.jpg" alt="A portfolio performance dashboard" ratio="aspect-[1440/507]" rounded="rounded-none" />

      {/* Performance */}
      <Section id="performance">
        <Container className="pb-[140px] pt-[150px]">
          <SectionTitle>Performance Metrics</SectionTitle>
          <div className="mt-[100px] grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start">
            <Stat value="~40%" label="Blended ROI Across Strategies" divider={false} />
            <div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                <Stat value="~74%" label="PO Finance ROI" divider={false} />
                <Stat value="$25M+" label="Deployed Capital" divider={false} />
                <Stat value="15+" label="Active Investments" divider={false} />
              </div>
              <p className="mt-10 border-t border-rule pt-6 text-[15px] italic text-ink-muted">
                Detailed data and formal audit reviews are available in our
                confidential data room.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <ImageSlot src="/assets/lp/fund-docs.jpg" alt="Fund documentation" ratio="aspect-[1440/507]" rounded="rounded-none" />

      {/* Seed fund terms */}
      <Section tone="cream">
        <Container className="pb-[160px] pt-[169px]">
          <SectionTitle>Seed Fund</SectionTitle>
          <p className="mt-6 text-[16px] text-ink-muted">
            Structural parameters for sovereign-compliant private allocations.
          </p>
          <dl className="mt-[110px]">
            {FUND_TERMS.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 border-t border-rule py-[22px] last:border-b sm:grid-cols-2 sm:gap-10"
              >
                <dt className="t-eyebrow text-ink/70">
                  {label}
                </dt>
                <dd className="text-[17px] font-semibold text-indigo-brand">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 text-[14px] italic text-ink/60">
            * Full limited partnership agreement terms are accessible upon
            formal data room clearance.
          </p>
        </Container>
      </Section>

      <ImageSlot src="/assets/lp/riyadh-dusk.jpg" alt="The Riyadh skyline at dusk" ratio="aspect-[1440/507]" rounded="rounded-none" />

      {/* Gulf presence */}
      <section className="bg-gold">
        <Container className="pb-[150px] pt-[150px]">
          <SectionTitle>Gulf Presence</SectionTitle>
          <p className="mt-7 text-[16px] text-indigo-brand/85">
            Operational foundations linking GCC liquidity mandates directly with
            ASEAN tech leaders.
          </p>

          <div className="mt-[90px] grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              {GULF.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[19px] font-semibold text-indigo-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[16px] leading-[26px] text-indigo-brand/85">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-10 md:border-l md:border-indigo-brand/25 md:pl-12">
              <div>
                <p className="text-[52px] font-bold leading-none text-indigo-brand">100%</p>
                <p className="mt-1 t-eyebrow text-indigo-brand/80">
                  Audited Shariah Pipeline Compliant
                </p>
              </div>
              <div>
                <p className="text-[52px] font-bold leading-none text-indigo-brand">SAR 94M</p>
                <p className="mt-1 t-eyebrow text-indigo-brand/80">
                  GCC Native Commitments Deployed
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio focus */}
      <Section>
        <Container className="pb-[150px] pt-[150px]">
          <SectionTitle className="text-right">Portfolio Focus</SectionTitle>
          <div className="mt-[100px] overflow-x-auto lg:ml-auto lg:w-[82%]">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="t-eyebrow border-b border-rule text-ink/60">
                  <th className="py-3 font-bold">Asset Group</th>
                  <th className="py-3 font-bold">Corridor Focus</th>
                  <th className="py-3 font-bold">Jurisdiction</th>
                  <th className="py-3 text-right font-bold">Allocation Stage</th>
                </tr>
              </thead>
              <tbody>
                {FOCUS.map(([name, focus, jurisdiction, stage]) => (
                  <tr key={name} className="border-b border-rule/70">
                    <td className="py-5 text-[19px] font-semibold text-indigo-brand">
                      {name}
                    </td>
                    <td className="py-[25px] text-[16px] text-ink-muted">{focus}</td>
                    <td className="py-[25px] text-[16px] text-ink-muted">
                      {jurisdiction}
                    </td>
                    <td className="t-eyebrow py-[25px] text-right text-indigo-brand">
                      {stage}
                    </td>
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
          src="/assets/brand/supergraphic-hero.svg"
          className="absolute -right-32 -top-16 h-[160%] w-auto opacity-30 mix-blend-multiply"
        />
        <Container className="relative pb-[170px] pt-[169px]">
          <h2 className="t-section text-indigo-brand">Request Data Room Access</h2>
          <p className="mt-6 max-w-2xl text-[16px] leading-[26px] text-indigo-brand/85">
            Qualified Institutional Investors and Sovereign Allocators may
            submit authentication parameters to initialize full regulatory
            clearance reviews.
          </p>

          <div className="mt-[80px] grid gap-12 lg:grid-cols-2">
            <form className="space-y-5">
              <Field tone="on-gold" label="Full Name" placeholder="e.g. Tariq Bin Fahad" />
              <Field tone="on-gold" label="Institution / Firm" placeholder="e.g. GCC Capital Advisory" />
              <Field tone="on-gold" label="Business Email" type="email" placeholder="tariq@gcccapital.com" />
              <Field tone="on-gold" label="Contact Phone" type="tel" placeholder="+966 50 000 0000" />
              <Field tone="on-gold" label="Intended Ticket Size (USD)" placeholder="e.g. $5,000,000+" />
            </form>

            <div>
              <SubmitButton tone="indigo" className="w-full">
                Submit Request
              </SubmitButton>
              <Link
                href="#"
                className="mt-6 inline-block text-[15px] font-semibold text-indigo-brand underline"
              >
                Download Moria Ventures Institutional One-Pager
              </Link>
              <p className="mt-6 max-w-md text-[15px] leading-[24px] text-indigo-brand/85">
                PT Moria Global Ventures processes investor data strictly in
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
