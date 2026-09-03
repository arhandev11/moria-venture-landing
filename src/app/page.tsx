import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import {
  Button,
  Container,
  DefRow,
  Section,
  SectionTitle,
  Stat,
  Supergraphic,
} from "@/components/ui";

const STATS = [
  { value: "$25M+", label: "Deployed Capital" },
  { value: "~40%", label: "Blended ROI" },
  { value: "15+", label: "Portfolio Companies" },
  { value: "2", label: "Active Markets" },
];

const ENGINES = [
  {
    code: "VC",
    name: "Venture Capital",
    body: "Equity-based investments targeting high-growth technological pioneers in Southeast Asia. We commit to a 3-7 year horizon, actively stewarding portfolio expansion into Middle Eastern and North African hubs. Key target sectors include Fintech, Logistics, Agritech, and Halal-compliance tech ecosystems.",
  },
  {
    code: "PF",
    name: "Project Finance",
    body: "Structured, low-volatility liquidity injections utilizing Murabaha, Istisna'a, and Musharakah architecture. We manage PO financing and supply chain trade liquidity with tight 30-180 day maturity cycles, mitigating cross-border currency and operational risks via institutional escrow.",
  },
];

const VALUE_PROPS = [
  {
    term: "Shariah-First",
    body: "Every deployment operates under strict compliance models audited by globally recognized Shariah scholars. We eliminate riba, Gharar, and maysir without sacrificing yielding capabilities.",
  },
  {
    term: "Dual-Market Access",
    body: "Direct operational bridge between Southeast Asia's powerhouse economy (Indonesia) and the Gulf Cooperation Council (GCC). We assist enterprises in crossing borders seamlessly.",
  },
  {
    term: "Beyond Capital",
    body: "Our partners hold deep regulatory, institutional, and commercial relationships across both jurisdictions, facilitating joint ventures, licensing, and national-level sovereign wealth support.",
  },
  {
    term: "Proven Returns",
    body: "A mathematical framework targeting consistent risk-adjusted returns through the dual-engine allocation strategy, combining volatile VC high-upsides with short-term predictable project yields.",
  },
];

const ECOSYSTEM = [
  {
    name: "BSI (Bank Syariah Indonesia)",
    body: "Consolidated national Shariah framework interface for retail and trade clearance.",
  },
  {
    name: "KNEKS",
    body: "Indonesian National Committee for Islamic Economy and Finance alignment.",
  },
  {
    name: "Fintech Saudi",
    body: "Saudi regulatory-sandbox acceleration integration pathway for regional entrants.",
  },
  {
    name: "Saudi CMA (Capital Market Authority)",
    body: "Strict institutional compliance alignment for sovereign allocation clearance.",
  },
];

const PORTFOLIO = [
  ["HerMoves", "Femtech & Wellness Log", "Indonesia", "Seed"],
  ["NusaQu", "Shariah Fintech Infrastructure", "Saudi Arabia / ID", "Pre-Series A"],
  ["PT Dhuha", "Halal Logistics & Distribution", "Indonesia", "Project Finance"],
  ["PT SIF Cocoa", "Sustainable Food Supply Chain", "Indonesia / GCC", "Series A"],
  ["BeliAyam", "Agritech Marketplace Platform", "Indonesia", "Seed"],
  ["Moria Fund Global", "Strategic GCC Sovereign Liquidity", "Saudi Arabia / UAE", "Macro Deployment"],
];

const LEADERSHIP = [
  {
    name: "Husni",
    role: "CEO & Managing Partner",
    photo: "/assets/team/husni.png",
    body: "Over 18 years driving bilateral investment flow between Jakarta and GCC markets. Architect of Moria's sovereign-access pipeline structure.",
  },
  {
    name: "Musab Mazen Bin Nosair",
    role: "Co-Founder / CEO Moria Fund",
    photo: "/assets/team/musab.png",
    body: "Veteran Saudi investment strategist overseeing GCC sovereign allocator alignments and Murabaha structured project portfolios.",
  },
  {
    name: "Faris Achmad Kuddah",
    role: "COO",
    photo: "/assets/team/faris.png",
    body: "Specialist in cross-border execution logistics, regulatory operations under OJK/BI frameworks, and enterprise scaling.",
  },
  {
    name: "Sandi S. Wibawa",
    role: "Head of Finance",
    photo: "/assets/team/sandi.png",
    body: "Oversees strict Shariah compliance auditing, capital call calculations, and treasury functions in active multi-currency setups.",
  },
];

const INSIGHTS = [
  {
    kicker: "Report — Feb 2025",
    title: "Fintech Saudi Summit: Positioning Indonesian Agritech for GCC Launch",
    body: "Analyzing cross-border regulatory setups and capital structures required to seed Southeast Asian platform technology into Riyadh.",
  },
  {
    kicker: "Thesis — Jan 2025",
    title: "The Mechanics of Shariah VC: Unlocking Non-Dilutive Murabaha Liquidity",
    body: "How Moria's dual-engine framework balances traditional venture risk with short-cycle commodity-backed liquidity lines.",
  },
  {
    kicker: "White Paper — Dec 2024",
    title: "Indonesia-GCC Trade Corridors: A Macroeconomic Vision of Halal Ecosystems",
    body: "Mapping capital reserves against high-growth consumer trends in Jakarta and the broader ASEAN Islamic landscape.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden">
        <Supergraphic className="absolute -top-10 right-0 h-[560px] w-auto opacity-40 sm:opacity-100 lg:h-[760px]" />
        <Container className="relative py-16 lg:py-24">
          <Image
            src="/assets/brand/wordmark-hero.svg"
            alt="Moria Ventures"
            width={388}
            height={59}
            priority
            className="h-9 w-auto lg:h-12"
          />
          <h1 className="display mt-8 max-w-4xl text-indigo-brand text-[38px] uppercase sm:text-[56px] lg:text-[68px]">
            Shariah-Compliant Capital. Connecting Indonesia and the Gulf
          </h1>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            <span className="font-semibold text-indigo-brand">
              PT Moria Global Ventures
            </span>{" "}
            operates at the intersection of high-growth Southeast Asian
            innovation and Middle Eastern capital reserves, unlocking
            institutional Shariah venture access.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/for-limited-partners" tone="indigo">
              I&apos;m an Investor
            </Button>
            <Button href="/for-businesses" tone="outline">
              I&apos;m a Business
            </Button>
          </div>
        </Container>
      </Section>

      {/* Headline metrics */}
      <Section className="border-y border-rule/60">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Two engines */}
      <Section className="relative overflow-hidden">
        <Supergraphic
          src="/assets/brand/supergraphic-wide.svg"
          className="absolute -left-24 top-24 h-[520px] w-auto opacity-80"
          width={628}
          height={556}
        />
        <Container className="relative py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {ENGINES.map((engine) => (
              <div key={engine.code}>
                <p className="display text-indigo-brand text-[38px]">
                  {engine.code}
                </p>
                <h2 className="mt-4 text-[17px] font-semibold text-ink">
                  {engine.name}
                </h2>
                <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-ink-muted">
                  {engine.body}
                </p>
              </div>
            ))}
          </div>
          <SectionTitle className="mt-24 text-right">
            Two Engines
            <br />
            One Mission
          </SectionTitle>
        </Container>
      </Section>

      {/* Value proposition */}
      <Section tone="cream">
        <Container className="py-20">
          <SectionTitle className="text-right">Value Proposition</SectionTitle>
          <dl className="mt-12 lg:ml-auto lg:w-[70%]">
            {VALUE_PROPS.map((item) => (
              <DefRow key={item.term} term={item.term} termClassName="text-ink">
                {item.body}
              </DefRow>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Corridor */}
      <Section tone="cream" className="border-t border-rule/60">
        <Container className="py-20">
          <SectionTitle>Indonesia — Saudi Arabia</SectionTitle>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-[17px] font-semibold text-ink">
                A Trillion-Dollar Economic Corridor
              </h3>
              <p className="mt-5 max-w-lg text-[13px] leading-relaxed text-ink-muted">
                As the world&apos;s largest Muslim-majority nation, Indonesia
                holds massive untapped consumer markets and highly active
                digital-native sectors. Saudi Arabia, driving Vision 2030,
                commands unmatched liquid capital reserves. Moria Ventures serves
                as the institutional gateway, ensuring fast,
                regulatory-compliant pipelines that connect sovereign-backed
                Middle Eastern mandates with Southeast Asian growth engines.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Strategic Eco-System Links
              </p>
              <ul className="mt-6 space-y-6">
                {ECOSYSTEM.map((item) => (
                  <li key={item.name}>
                    <p className="text-[14px] font-semibold text-ink">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Portfolio table */}
      <Section className="relative overflow-hidden">
        <Supergraphic
          src="/assets/brand/supergraphic-tall.svg"
          className="absolute -left-16 bottom-10 h-[520px] w-auto opacity-80"
          width={344}
          height={648}
        />
        <Container className="relative py-20">
          <SectionTitle className="text-right">Portfolio</SectionTitle>
          <div className="mt-12 overflow-x-auto lg:ml-auto lg:w-[72%]">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b-2 border-rule text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60">
                  <th className="py-3 font-bold">Company</th>
                  <th className="py-3 font-bold">Sector</th>
                  <th className="py-3 font-bold">Country</th>
                  <th className="py-3 font-bold">Stage</th>
                </tr>
              </thead>
              <tbody>
                {PORTFOLIO.map(([company, sector, country, stage]) => (
                  <tr key={company} className="border-b border-rule/70">
                    <td className="py-5 text-[16px] font-semibold text-indigo-brand">
                      {company}
                    </td>
                    <td className="py-5 text-[13px] text-ink-muted">{sector}</td>
                    <td className="py-5 text-[13px] text-ink-muted">{country}</td>
                    <td className="py-5 text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-brand">
                      {stage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section>
        <Container className="py-20">
          <SectionTitle>Leadership</SectionTitle>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((person) => (
              <article key={person.name}>
                <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-cream">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="mt-5 text-[16px] font-semibold text-indigo-brand">
                  {person.name}
                </h3>
                <p className="mt-1 text-[12px] font-semibold text-ink">
                  {person.role}
                </p>
                <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">
                  {person.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Insights */}
      <Section tone="cream">
        <Container className="py-20">
          <SectionTitle className="text-right">Insights</SectionTitle>
          <ul className="mt-12">
            {INSIGHTS.map((item) => (
              <li
                key={item.title}
                className="grid gap-3 border-t border-rule py-7 last:border-b sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-10"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60">
                  {item.kicker}
                </p>
                <div>
                  <Link
                    href="#"
                    className="text-[15px] font-semibold text-indigo-brand hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
