import Image from "next/image";
import Link from "next/link";
import { AnimatedSupergraphic } from "@/components/animated-supergraphic";
import { CtaBand } from "@/components/cta-band";
import {
  Button,
  Container,
  DefRow,
  Section,
  SectionTitle,
  Stat,
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
      {/*
        Hero, metrics and the two engines share one backdrop: the deck runs a
        single supergraphic down the right of all three rather than one per
        section, so it is anchored here and the sections above it stay
        transparent. The metrics band frosts its own backdrop so the mark reads
        softly through the numbers.
      */}
      <div className="relative overflow-hidden bg-shell">
        <AnimatedSupergraphic className="absolute right-0 top-0 h-[900px] w-[478px] opacity-50 sm:opacity-100 lg:h-[1700px] lg:w-[903px]" />

        {/* Hero */}
        <Section tone="none" className="relative">
          <Container className="pb-[140px] pt-[110px] lg:pb-[234px] lg:pt-[146px]">
            <Image
              src="/assets/brand/wordmark-hero.svg"
              alt="Moria Ventures"
              width={388}
              height={59}
              priority
              className="h-10 w-auto lg:h-[57px]"
            />
            {/* Line breaks are set to match the deck exactly. */}
            <h1 className="t-hero mt-[60px] uppercase text-indigo-brand">
              Shariah-Compliant
              <br />
              Capital. Connecting
              <br />
              Indonesia and the Gulf
            </h1>
            <p className="t-lede mt-14 max-w-[640px] text-ink-muted">
              <span className="font-semibold text-indigo-brand">
                PT Moria Global Ventures
              </span>{" "}
              operates at the intersection of high-growth Southeast Asian
              innovation and Middle Eastern capital reserves, unlocking
              institutional Shariah venture access.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
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
        <section className="relative border-y border-rule/60 bg-shell/55 backdrop-blur-[10px]">
          <Container className="pb-[68px] pt-[75px]">
            <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
              {STATS.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>
          </Container>
        </section>

        {/* Two engines */}
        <Section tone="none" className="relative">
          <Container className="pb-[100px] pt-[98px]">
            <div className="grid gap-16 lg:grid-cols-[minmax(0,660px)_minmax(0,1fr)] lg:gap-[80px]">
              {/* Both engines stack down the left, with the pair line beside them. */}
              <div className="space-y-[100px]">
                {ENGINES.map((engine) => (
                  <div key={engine.code}>
                    <p className="t-sub text-indigo-brand">{engine.code}</p>
                    <h2 className="mt-7 text-[19px] font-semibold text-ink">
                      {engine.name}
                    </h2>
                    <p className="mt-7 text-[16px] leading-[26px] text-ink-muted">
                      {engine.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="self-end text-[36px] font-bold leading-[1.06] tracking-[-0.02em] text-indigo-brand sm:text-[52px] lg:text-right lg:text-[72px]">
                Two Engines
                <br />
                One Mission
              </p>
            </div>
          </Container>
        </Section>
      </div>

      {/* Value proposition */}
      <Section tone="cream">
        <Container className="sect">
          <SectionTitle className="text-right">Value Proposition</SectionTitle>
          <dl className="mt-[86px] lg:ml-auto lg:w-[74.6%]">
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
        <Container className="sect">
          <SectionTitle>Indonesia — Saudi Arabia</SectionTitle>
          <div className="mt-[82px] grid gap-16 lg:grid-cols-2 lg:gap-[57px]">
            <div>
              <h3 className="text-[19px] font-semibold text-ink">
                A Trillion-Dollar Economic Corridor
              </h3>
              <p className="mt-10 max-w-[620px] text-[16px] leading-[26px] text-ink-muted">
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
              <p className="t-eyebrow text-ink/60">Strategic Eco-System Links</p>
              <ul className="mt-6 space-y-[14px]">
                {ECOSYSTEM.map((item) => (
                  <li key={item.name}>
                    <p className="text-[17px] font-semibold text-ink">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-[19px] text-ink-muted">
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
        <AnimatedSupergraphic className="absolute bottom-10 -left-[90px] h-[940px] w-[499px] opacity-80" />
        <Container className="relative sect">
          <SectionTitle className="text-right">Portfolio</SectionTitle>
          {/*
            The mark runs behind this table, so the panel frosts its own
            backdrop rather than sitting on the page colour: the line work stays
            legible through it without competing with the rows. The shadow is
            what stops the frosted edge reading as a cut through the artwork —
            it puts the panel above the mark rather than into it.
          */}
          <div className="mt-[90px] overflow-x-auto bg-white/40 px-6 py-2 shadow-[0_30px_80px_-30px_rgba(56,49,137,0.22)] backdrop-blur-[10px] lg:ml-auto lg:w-[81%]">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="t-eyebrow border-b-2 border-rule text-ink/60">
                  <th className="pb-4 font-bold">Company</th>
                  <th className="pb-4 font-bold">Sector</th>
                  <th className="pb-4 font-bold">Country</th>
                  <th className="pb-4 font-bold">Stage</th>
                </tr>
              </thead>
              <tbody>
                {PORTFOLIO.map(([company, sector, country, stage]) => (
                  <tr key={company} className="border-b border-rule/70">
                    <td className="t-title py-[19px] text-indigo-brand">
                      {company}
                    </td>
                    <td className="t-body py-[19px] text-ink-muted">{sector}</td>
                    <td className="t-body py-[19px] text-ink-muted">{country}</td>
                    <td className="t-eyebrow py-[19px] text-indigo-brand">
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
        <Container className="sect">
          <SectionTitle>Leadership</SectionTitle>
          <div className="mt-20 grid gap-x-[58px] gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((person) => (
              <article key={person.name}>
                <div className="relative aspect-[9/10] overflow-hidden rounded-lg bg-cream">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="mt-5 text-[22px] font-semibold leading-tight text-indigo-brand">
                  {person.name}
                </h3>
                <p className="mt-2 text-[14px] font-semibold text-ink">
                  {person.role}
                </p>
                <p className="mt-4 text-[13px] leading-[20px] text-ink-muted">
                  {person.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Insights */}
      <Section tone="cream">
        <Container className="sect">
          <SectionTitle className="text-right">Insights</SectionTitle>
          <ul className="mt-16 lg:ml-[124px]">
            {INSIGHTS.map((item) => (
              <li
                key={item.title}
                className="grid gap-3 border-t border-rule py-7 last:border-b sm:grid-cols-[302px_minmax(0,1fr)] sm:gap-0"
              >
                <p className="t-eyebrow text-ink/60">{item.kicker}</p>
                <div>
                  <Link
                    href="#"
                    className="text-[23px] font-semibold leading-tight text-indigo-brand hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-2 text-[13px] leading-[19px] text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Ready to invest in the future
            <br />
            of Shariah-compliant
            <br />
            innovation?
          </>
        }
      />
    </>
  );
}
