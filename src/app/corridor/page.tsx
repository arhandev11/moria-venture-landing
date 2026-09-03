import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import {
  Button,
  Container,
  Eyebrow,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
  Stat,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Indonesia–Saudi Corridor",
  description:
    "Bridging Southeast Asia's largest economy with the Gulf's fastest-growing market.",
};

const STATS = [
  { value: "$23B+", label: "Bilateral Trade" },
  { value: "270M", label: "Muslim Consumers" },
  { value: "$3.2T", label: "Combined GDP" },
  { value: "60%", label: "Under 30 Pop." },
  { value: "7.2%", label: "Saudi GDP Growth" },
  { value: "5.0%", label: "Indo GDP Growth" },
];

const BRIDGE = [
  {
    n: "01",
    title: "Market Entry Advisory",
    body: "Deploying market readiness blueprints, licensing support, and localize structuring framework to ensure seamless landing of leading SEA digital scale-ups in Saudi Arabia.",
  },
  {
    n: "02",
    title: "Capital Bridging",
    body: "Connecting institutional LPs and sovereign family offices in the Gulf directly to premium investment rounds, ensuring pure compliant equity structures.",
  },
  {
    n: "03",
    title: "Regulatory Navigation",
    body: "Liaising strategically with OJK, BI, and Saudi CMA to provide rigorous framework compliance, avoiding operational and transactional friction.",
  },
  {
    n: "04",
    title: "Network Access",
    body: "Unlocking direct executive pipelines to sovereign wealth operators, bank networks, leading regional distributors, and key economic ministries.",
  },
];

const PARTNERS = [
  ["Fintech Saudi", "Saudi CMA and Central Bank sandbox integration node."],
  ["Bank Syariah Indonesia (BSI)", "Retail and trade Shariah banking framework."],
  ["Saudi CMA (Licensed Alignments)", "Regulated fund flows and compliance frameworks."],
  [
    "Embassy of the Republic of Indonesia",
    "Diplomatic and G2G bilateral trade support in Riyadh.",
  ],
];

const CAPABILITIES = [
  "Direct OJK and CMA Regulatory Integration",
  "Bilateral Banking Relationships (BSI, local GCC banks)",
  "In-Country Due Diligence Teams",
  "Cross-Border Legal and Shariah Structuring",
];

export default function CorridorPage() {
  return (
    <>
      <PageHero
        title="Indonesia–Saudi Corridor"
        lede="Bridging Southeast Asia's largest economy with the Gulf's fastest-growing market."
        actionsInline
        actions={
          <>
            <Button href="/for-limited-partners" tone="gold">
              I&apos;m an Investor
            </Button>
            <Button href="/for-businesses" tone="outline">
              I&apos;m a Business
            </Button>
          </>
        }
      />

      <div className="grid md:grid-cols-2">
        <ImageSlot
          src="/assets/about/jakarta.png"
          alt="Jakarta"
          ratio="aspect-[16/9]"
          className="rounded-none"
        />
        <ImageSlot
          src="/assets/about/riyadh.png"
          alt="Riyadh"
          ratio="aspect-[16/9]"
          className="rounded-none"
        />
      </div>

      <Section className="border-b border-rule/60">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} divider={false} />
            ))}
          </div>
        </Container>
      </Section>

      {/* The opportunity */}
      <Section tone="cream">
        <Container className="py-20">
          <SectionTitle className="text-[26px] sm:text-[30px] lg:text-[32px]">
            The Opportunity
          </SectionTitle>

          <ImageSlot className="mt-12" label="Bilateral handshake" ratio="aspect-[1066/300]" />

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)]">
            <div>
              <p className="display text-indigo-brand text-[44px]">$3.2T</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/70">
                Combined Corridor GDP Opportunity
              </p>
            </div>
            <div className="space-y-5 lg:border-l lg:border-rule lg:pl-12">
              <p className="text-[15px] font-semibold leading-relaxed text-ink">
                The corridor linking Indonesia and the Kingdom of Saudi Arabia
                represents one of the most powerful, underserved
                Shariah-compliant trade and investment pipelines in the global
                economy.
              </p>
              <p className="text-[13px] leading-relaxed text-ink-muted">
                Driven by Saudi Arabia&apos;s ambitious Vision 2030 and
                Indonesia&apos;s projection as a top-five global economy by
                2030, this corridor connects high-growth technological
                ecosystems in Southeast Asia with deep institutional liquidity
                in the GCC. Moria Ventures serves as the primary conduit
                ensuring compliant flow.
              </p>
              <p className="text-[13px] leading-relaxed text-ink-muted">
                Through strategic alignment with sovereign entities, national
                banks, and regulatory bodies across both regions, we facilitate
                seamless market expansions, trade clearing, and capital
                allocations that respect Shariah compliance at every milestone.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* How we bridge */}
      <Section tone="cream" className="border-t border-rule/60">
        <Container className="py-20">
          <SectionTitle>How We Bridge</SectionTitle>
          <ImageSlot className="mt-12" label="Cross-border deal room" ratio="aspect-[1066/300]" />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {BRIDGE.map((item) => (
              <div key={item.n}>
                <p className="display text-indigo-brand text-[30px]">{item.n}</p>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partners */}
      <section className="bg-gold">
        <Container className="py-20">
          <SectionTitle>Our Partners</SectionTitle>
          <ImageSlot className="mt-12" label="Partner integration briefing" ratio="aspect-[1066/300]" />
          <ul className="mt-12">
            {PARTNERS.map(([name, body]) => (
              <li
                key={name}
                className="grid gap-2 border-t border-indigo-brand/25 py-5 last:border-b sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto] sm:items-center sm:gap-10"
              >
                <p className="text-[15px] font-semibold text-indigo-brand">
                  {name}
                </p>
                <p className="text-[12px] text-indigo-brand/85">{body}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-brand/70 sm:text-right">
                  Active Cooperation
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Case study */}
      <Section>
        <Container className="py-20">
          <Eyebrow>Corridor in Action</Eyebrow>
          <SectionTitle className="mt-6">
            Scaling Shariah Fintech Across Regions
          </SectionTitle>

          <ImageSlot className="mt-12" label="NusaQu product" ratio="aspect-[1066/300]" />

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="display text-indigo-brand text-[26px]">
                NusaQu Shariah Tech
              </h3>
              <p className="mt-5 max-w-md text-[13px] leading-relaxed text-ink-muted">
                NusaQu, a pioneering Indonesian Shariah infrastructure platform,
                needed to secure Gulf institutional allocation to launch its
                regulatory pilot within Saudi Arabia.
              </p>
              <div className="mt-8 flex gap-12">
                <Stat value="$4.5M" label="Capital Deployed" divider={false} />
                <Stat value="90 Days" label="CMA Sandbox Clearance" divider={false} />
              </div>
            </div>

            <div className="space-y-8 lg:border-l lg:border-rule lg:pl-12">
              {[
                {
                  label: "The Challenge",
                  body: "Regulatory sandboxes in Saudi Arabia require local backing, complex structural entity alignment, and highly precise capital compliance auditing to protect GCC allocators from compliance issues.",
                },
                {
                  label: "Our Solution",
                  body: "Moria Ventures structured a dual-SPV capital architecture between Jakarta and Riyadh. We partnered with local legal counsel in the GCC to clear CMA guidelines and secure pilot licenses via Fintech Saudi.",
                },
                {
                  label: "The Outcome",
                  body: "Successful regional pilot landing with full operational capability, unlocking access to 10M+ local users under Shariah compliant finance operations.",
                },
              ].map((block) => (
                <div key={block.label}>
                  <Eyebrow>{block.label}</Eyebrow>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Dual entity */}
      <Section>
        <Container className="pb-20">
          <ImageSlot label="Dual-entity offices" ratio="aspect-[1066/300]" />
          <h2 className="display mt-12 text-indigo-brand text-[24px] sm:text-[30px]">
            Dual-Entity Advantage at Every Transaction
          </h2>
          <p className="mt-4 max-w-4xl text-[13px] leading-relaxed text-ink-muted">
            We maintain dedicated investment and operational task forces in both
            Jakarta and Riyadh, giving our LPs and portfolio companies
            on-the-ground access in both corridors.
          </p>
          <ul className="mt-10">
            {CAPABILITIES.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-6 border-t border-rule py-5 last:border-b"
              >
                <span className="text-[14px] font-semibold text-ink">{item}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-brand">
                  Capability
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* QRIS */}
      <Section tone="cream">
        <Container className="py-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-deep">
            Proof of Execution
          </p>
          <SectionTitle className="mt-4">
            QRIS Cross-Border Payment Initiative
          </SectionTitle>
          <p className="mt-6 max-w-4xl text-[13px] leading-relaxed text-ink-muted">
            Moria Fund Global is actively facilitating the integration of Bank
            Indonesia&apos;s national QR payment standard (QRIS) into Saudi
            Arabia&apos;s payment ecosystem, enabling real-time cross-border
            merchant settlements.
          </p>

          <ImageSlot className="mt-12" label="QRIS merchant settlement" ratio="aspect-[1066/300]" />

          <Eyebrow className="mt-12">The Infrastructure Bridge</Eyebrow>
          <p className="mt-3 max-w-4xl text-[13px] leading-relaxed text-ink-muted">
            QRIS links Indonesian merchants to GCC consumers, creating a
            seamless cross-border settlement layer that reduces friction,
            improves liquidity, and expands regional commerce.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:w-2/3">
            <Stat value="$3.4B+" label="Annual Bilateral Trade" divider={false} />
            <Stat value="$120M" label="Pipeline Target Allocation" divider={false} />
          </div>
        </Container>
      </Section>

      {/* Explore */}
      <Section>
        <Container className="py-20">
          <SectionTitle>Explore the Corridor</SectionTitle>
          <ImageSlot className="mt-12" label="Corridor trade map" ratio="aspect-[1066/300]" />

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-[19px] font-semibold text-indigo-brand">
                For Investors
              </h3>
              <p className="mt-5 max-w-md text-[13px] leading-relaxed text-ink-muted">
                Access curated high-growth Shariah-compliant opportunities
                spanning fintech, sustainable supply chains, and consumer
                portals across the high-yield SEA-GCC corridor.
              </p>
              <div className="mt-8">
                <Button href="/for-limited-partners" tone="gold">
                  Request LP Presentation
                </Button>
              </div>
            </div>
            <div className="md:border-l md:border-rule md:pl-12">
              <h3 className="text-[19px] font-semibold text-indigo-brand">
                For Businesses
              </h3>
              <p className="mt-5 max-w-md text-[13px] leading-relaxed text-ink-muted">
                Scale your Shariah tech stack internationally. Leverage our
                regulatory licenses, bank networks, and capital backing to
                launch successfully into Riyadh and the wider Gulf region.
              </p>
              <div className="mt-8">
                <Button href="/for-businesses" tone="outline">
                  Apply for Corridor Access
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
