import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PortfolioFilter, type Investment } from "@/components/portfolio-table";
import {
  Button,
  Container,
  DefRow,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
  Stat,
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

const ALLOCATION = [
  ["35%", "Fintech", "6 Companies"],
  ["20%", "Logistics & Supply Chain", "3 Companies"],
  ["15%", "Agritech", "2 Companies"],
  ["15%", "SaaS & Enterprise", "2 Companies"],
  ["15%", "Halal Economy Tech", "2 Companies"],
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

      <Section className="border-b border-rule/60">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <Stat value="15+" label="Companies" />
            <Stat value="$25M+" label="Deployed" />
            <Stat value="~40%" label="Blended ROI" />
            <Stat value="2" label="Markets" />
          </div>
        </Container>
      </Section>

      <PortfolioFilter investments={INVESTMENTS} />

      {/* Sector allocation */}
      <Section tone="cream">
        <Container className="py-20">
          <SectionTitle>Sector Allocation</SectionTitle>
          <ul className="mt-12">
            {ALLOCATION.map(([pct, name, count]) => (
              <li
                key={name}
                className="grid items-center gap-4 border-t border-rule py-8 last:border-b sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
              >
                <p className="display text-indigo-brand text-[36px] sm:text-right">
                  {pct}
                </p>
                <div className="sm:pl-16">
                  <p className="text-[15px] font-semibold text-ink">{name}</p>
                  <p className="mt-1 text-[12px] text-ink-muted">{count}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Case study */}
      <Section>
        <Container className="py-20">
          <SectionTitle>Case Study Spotlight</SectionTitle>
          <dl className="mt-12">
            <DefRow term="Problem Statement" termClassName="text-ink">
              Women in dense Indonesian metropolitan areas face persistent safety
              and accessibility challenges when moving around cities.
            </DefRow>
            <DefRow term="Solution" termClassName="text-ink">
              HerMoves delivers a women-only ride-sharing platform with verified
              female drivers, real-time safety features, and customized comfort
              tiers.
            </DefRow>
            <DefRow term="Outcome" termClassName="text-ink">
              3x rider growth in 6 months, expanded to 3 Indonesian cities.
            </DefRow>
          </dl>
        </Container>
      </Section>

      {/* Exits */}
      <section className="bg-gold">
        <Container className="py-20">
          <ImageSlot label="Growth illustration" ratio="aspect-[1066/300]" />
          <SectionTitle className="mt-14">Exits &amp; Milestones</SectionTitle>
          <ul className="mt-12">
            {EXITS.map((exit) => (
              <li
                key={exit.name}
                className="grid gap-3 border-t border-indigo-brand/25 py-7 last:border-b sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_80px] sm:gap-10"
              >
                <p className="text-[15px] font-semibold text-indigo-brand">
                  {exit.name}
                </p>
                <p className="text-[13px] leading-relaxed text-indigo-brand/80">
                  {exit.body}
                </p>
                <p className="text-[13px] font-semibold text-indigo-brand sm:text-right">
                  {exit.year}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Join */}
      <Section tone="cream">
        <Container className="py-20">
          <ImageSlot label="Advisory session" ratio="aspect-[1066/300]" />
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div>
              <SectionTitle>
                Want to Join Our
                <br />
                Portfolio?
              </SectionTitle>
              <p className="mt-6 max-w-lg text-[13px] leading-relaxed text-ink-muted">
                We are actively selecting top-tier projects seeking compliant
                venture backing or fast-horizon project financing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
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

      <CtaBand />
    </>
  );
}
