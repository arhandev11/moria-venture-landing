import type { Metadata } from "next";
import {
  Button,
  Container,
  Eyebrow,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Indonesia–Saudi Corridor",
  description:
    "Bridging Southeast Asia's largest economy with the Gulf's fastest-growing market.",
};

const STATS = [
  ["$23B+", "Bilateral Trade"],
  ["270M", "Muslim Consumers"],
  ["$3.2T", "Combined GDP"],
  ["60%", "Under 30 Pop."],
  ["7.2%", "Saudi GDP Growth"],
  ["5.0%", "Indo GDP Growth"],
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

const CASE_BLOCKS = [
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
        title={
          <>
            Indonesia–Saudi
            <br />
            Corridor
          </>
        }
        padding="pb-[100px] pt-[110px] lg:pb-[119px] lg:pt-[110px]"
        ledeGap="mt-[36px]"
        ledeClassName="max-w-[640px] text-[21px] leading-[32px]"
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

      {/* Full-bleed pairing of the two capitals */}
      <ImageSlot
        src="/assets/corridor/hero-split.jpg"
        alt="Jakarta and Riyadh at dusk"
        ratio="aspect-[1440/321]"
        rounded="rounded-none"
      />

      <Section>
        <Container className="pb-[70px] pt-[68px]">
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {STATS.map(([value, label]) => (
              <div key={label}>
                <p className="text-[63px] font-bold leading-none text-indigo-brand">
                  {value}
                </p>
                <p className="t-eyebrow mt-[15px] text-ink/70">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* The opportunity */}
      <Section tone="cream">
        <Container className="pb-[145px] pt-[141px]">
          <h2 className="text-[33px] font-bold leading-none text-indigo-brand">
            The Opportunity
          </h2>

          <ImageSlot
            className="mt-[82px]"
            src="/assets/corridor/opportunity.jpg"
            alt="A bilateral partnership meeting"
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />

          <div className="mt-[73px] grid gap-14 lg:grid-cols-[minmax(0,470px)_minmax(0,1fr)] lg:gap-[80px]">
            <div>
              <p className="text-[104px] font-bold leading-none text-indigo-brand">
                $3.2T
              </p>
              <p className="t-eyebrow mt-[16px] text-ink/70">
                Combined Corridor GDP Opportunity
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-[19px] font-semibold leading-[26px] text-ink">
                The corridor linking Indonesia and the Kingdom of Saudi Arabia
                represents one of the most powerful, underserved
                Shariah-compliant trade and investment pipelines in the global
                economy.
              </p>
              <p className="text-[16px] leading-[26px] text-ink-muted">
                Driven by Saudi Arabia&apos;s ambitious Vision 2030 and
                Indonesia&apos;s projection as a top-five global economy by
                2030, this corridor connects high-growth technological
                ecosystems in Southeast Asia with deep institutional liquidity
                in the GCC. Moria Ventures serves as the primary conduit
                ensuring compliant flow.
              </p>
              <p className="text-[16px] leading-[26px] text-ink-muted">
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
        <Container className="pb-[147px] pt-[149px]">
          <SectionTitle>How We Bridge</SectionTitle>
          <ImageSlot
            className="mt-[72px]"
            src="/assets/corridor/how-we-bridge.jpg"
            alt="A cross-border deal room"
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />
          <div className="mt-[66px] grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[57px]">
            {BRIDGE.map((item) => (
              <div key={item.n}>
                <p className="text-[51px] font-bold leading-none text-indigo-brand">
                  {item.n}
                </p>
                <h3 className="mt-[37px] text-[19px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-[16px] text-[14px] leading-[21px] text-ink-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partners */}
      <section className="bg-gold">
        <Container className="pb-[140px] pt-[150px]">
          <SectionTitle>Our Partners</SectionTitle>
          <ImageSlot
            className="mt-[68px]"
            src="/assets/corridor/partners.jpg"
            alt="A partner integration briefing"
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />
          <ul className="mt-[70px]">
            {PARTNERS.map(([name, body]) => (
              <li
                key={name}
                className="grid gap-2 border-t border-indigo-brand/25 py-[22px] last:border-b sm:grid-cols-[minmax(0,420px)_minmax(0,1fr)_auto] sm:items-center sm:gap-10"
              >
                <p className="text-[19px] font-semibold text-indigo-brand">
                  {name}
                </p>
                <p className="text-[15px] text-indigo-brand/85">{body}</p>
                <p className="t-eyebrow text-indigo-brand/70 sm:text-right">
                  Active Cooperation
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Corridor in action */}
      <Section>
        <Container className="pb-[145px] pt-[142px]">
          <Eyebrow>Corridor in Action</Eyebrow>
          <SectionTitle className="mt-[62px]">
            Scaling Shariah Fintech Across Regions
          </SectionTitle>

          <ImageSlot
            className="mt-[72px] lg:ml-[170px]"
            src="/assets/corridor/nusaqu.jpg"
            alt="The NusaQu product in use"
            ratio="aspect-[1110/319]"
            rounded="rounded-lg"
          />

          <div className="mt-[62px] grid gap-14 lg:grid-cols-[minmax(0,550px)_minmax(0,1fr)] lg:gap-[80px]">
            <div>
              <h3 className="text-[32px] font-bold leading-none text-indigo-brand">
                NusaQu Shariah Tech
              </h3>
              <p className="mt-[46px] max-w-[500px] text-[16px] leading-[26px] text-ink-muted">
                NusaQu, a pioneering Indonesian Shariah infrastructure platform,
                needed to secure Gulf institutional allocation to launch its
                regulatory pilot within Saudi Arabia.
              </p>
              <div className="mt-[51px] flex gap-[100px]">
                <div>
                  <p className="text-[52px] font-bold leading-none text-indigo-brand">
                    $4.5M
                  </p>
                  <p className="t-eyebrow mt-[14px] text-ink/70">
                    Capital Deployed
                  </p>
                </div>
                <div>
                  <p className="text-[52px] font-bold leading-none text-indigo-brand">
                    90 Days
                  </p>
                  <p className="t-eyebrow mt-[14px] text-ink/70">
                    CMA Sandbox Clearance
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-[30px]">
              {CASE_BLOCKS.map((block) => (
                <div key={block.label}>
                  <h4 className="text-[19px] font-semibold text-indigo-brand">
                    {block.label}
                  </h4>
                  <p className="mt-[10px] text-[14px] leading-[21px] text-ink-muted">
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
        <Container className="pb-[140px] pt-[141px]">
          <ImageSlot
            src="/assets/corridor/dual-entity.jpg"
            alt="The Jakarta and Riyadh desks"
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />
          <h2 className="mt-[65px] text-[33px] font-bold leading-none text-indigo-brand">
            Dual-Entity Advantage at Every Transaction
          </h2>
          <p className="mt-[28px] max-w-[1250px] text-[16px] leading-[26px] text-ink-muted">
            We maintain dedicated investment and operational task forces in both
            Jakarta and Riyadh, giving our LPs and portfolio companies
            on-the-ground access in both corridors.
          </p>
          <ul className="mt-[55px]">
            {CAPABILITIES.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-6 border-t border-rule py-[18px] last:border-b"
              >
                <span className="text-[17px] font-semibold text-ink">{item}</span>
                <span className="t-eyebrow text-indigo-brand">Capability</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* QRIS */}
      <Section tone="cream">
        <Container className="pb-[130px] pt-[177px]">
          <SectionTitle className="text-[30px] leading-[1.05] lg:text-[60px]">
            QRIS Cross-Border Payment Initiative
          </SectionTitle>
          <p className="mt-[30px] max-w-[1260px] text-[16px] leading-[26px] text-ink-muted">
            Moria Fund Global is actively facilitating the integration of Bank
            Indonesia&apos;s national QR payment standard (QRIS) into Saudi
            Arabia&apos;s payment ecosystem, enabling real-time cross-border
            merchant settlements.
          </p>

          <ImageSlot
            className="mt-[70px]"
            src="/assets/corridor/qris.jpg"
            alt="A QRIS merchant settlement terminal"
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />

          <Eyebrow className="mt-[66px] text-ink/70">
            The Infrastructure Bridge
          </Eyebrow>
          <p className="mt-[22px] max-w-[1220px] text-[16px] leading-[26px] text-ink-muted">
            QRIS links Indonesian merchants to GCC consumers, creating a
            seamless cross-border settlement layer that reduces friction,
            improves liquidity, and expands regional commerce.
          </p>

          <div className="mt-[59px] grid gap-10 sm:grid-cols-2 lg:w-2/3">
            <div>
              <p className="text-[104px] font-bold leading-none text-indigo-brand">
                $3.4B+
              </p>
              <p className="t-eyebrow mt-[17px] text-ink/70">
                Annual Bilateral Trade
              </p>
            </div>
            <div>
              <p className="text-[104px] font-bold leading-none text-indigo-brand">
                $120M
              </p>
              <p className="t-eyebrow mt-[17px] text-ink/70">
                Pipeline Target Allocation
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Explore */}
      <Section>
        <Container className="pb-[139px] pt-[149px]">
          <SectionTitle>Explore the Corridor</SectionTitle>
          <ImageSlot
            className="mt-[72px]"
            src="/assets/corridor/trade-map.jpg"
            alt="A corridor trade map"
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />

          <div className="mt-[82px] grid gap-14 md:grid-cols-2 md:gap-[57px]">
            <div>
              <h3 className="text-[24px] font-semibold text-indigo-brand">
                For Investors
              </h3>
              <p className="mt-[26px] max-w-[600px] text-[16px] leading-[26px] text-ink-muted">
                Access curated high-growth Shariah-compliant opportunities
                spanning fintech, sustainable supply chains, and consumer
                portals across the high-yield SEA-GCC corridor.
              </p>
              <div className="mt-[34px]">
                <Button href="/for-limited-partners" tone="gold">
                  Request LP Presentation
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-[24px] font-semibold text-indigo-brand">
                For Businesses
              </h3>
              <p className="mt-[26px] max-w-[600px] text-[16px] leading-[26px] text-ink-muted">
                Scale your Shariah tech stack internationally. Leverage our
                regulatory licenses, bank networks, and capital backing to
                launch successfully into Riyadh and the wider Gulf region.
              </p>
              <div className="mt-[34px]">
                <Button href="/for-businesses" tone="outline">
                  Apply for Corridor Access
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
