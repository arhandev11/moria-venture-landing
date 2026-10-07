import Image from "next/image";
import { AnimatedSupergraphic } from "@/components/animated-supergraphic";
import { CtaBand } from "@/components/cta-band";
import { LogoMarquee } from "@/components/logo-marquee";
import { Button, Container, Section, SectionTitle } from "@/components/ui";

const STATS = [
  { value: "$25M+", label: "Deployed Capital" },
  { value: "~40%", label: "Blended ROI" },
  { value: "15+", label: "Portfolio Companies" },
  { value: "2", label: "Active Markets" },
];

const ENGINES = [
  {
    name: "Venture Capital",
    icon: "/assets/homepage/icon-venture-capital.svg",
    body: "Backing tomorrow's technology leaders in Southeast Asia through equity investment, with a 3–7 year horizon and hands-on support as portfolio companies scale into the Middle East and North Africa. We focus on Fintech, Logistics, Agritech, and Halal-tech, sectors where the region's next wave of growth is being built.",
  },
  {
    name: "Short-Cycle Yield",
    icon: "/assets/homepage/icon-short-cycle-yield.svg",
    body: "Structured, low-volatility liquidity injections using Murabaha, Istisna'a, and Musharakah structures. We manage PO financing and supply chain trade with tight 30–180 day maturity cycles, mitigating cross-border currency and operational risks via institutional escrow.",
  },
  {
    name: "Venture Builder",
    icon: "/assets/homepage/icon-venture-builder.svg",
    body: "Hands-on venture building that turns early-stage ideas into investment-ready companies. We work alongside founders on product, structure, and commercial strategy — de-risking the business before capital moves. Focus sectors: Fintech, AI, Islamic-tech, F&B, and Healthtech.",
  },
];

const VALUE_PROPS = [
  {
    term: "Islamic-Principles",
    body: "Every deployment operates under strict compliance models audited by globally recognized Islamic scholars. We eliminate riba, Gharar, and maysir without sacrificing yielding capabilities.",
  },
  {
    term: "Dual-Market Access",
    body: "Direct operational bridge between Southeast Asia's powerhouse economy (Indonesia) and the Gulf Cooperation Council (GCC). We assist enterprises in crossing borders seamlessly.",
  },
  {
    term: "Beyond Capital",
    body: "Our partners bring deep regulatory, institutional, and commercial relationships across both jurisdictions, enabling joint ventures, licensing pathways, and engagement with sovereign-level institutional capital.",
  },
  {
    term: "Proven Returns",
    body: "A disciplined return framework targeting consistent risk-adjusted performance through our dual-engine allocation — pairing high-upside venture equity with predictable short-cycle project yields.",
  },
];

const ECOSYSTEM = [
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

// Colour versions on purpose: the homepage strip is the one place the
// portfolio shows in full brand colour.
const PORTFOLIO_LOGOS = [
  { src: "/assets/logos/moria-fund.svg", alt: "Moria Fund", width: 217, height: 43 },
  { src: "/assets/logos/nusaqu.svg", alt: "NusaQu", width: 100, height: 30 },
  { src: "/assets/logos/dhuha.svg", alt: "Dhuha", width: 51, height: 60 },
  { src: "/assets/logos/beliayam.png", alt: "BeliAyam", width: 139, height: 35 },
  { src: "/assets/logos/hermoves.png", alt: "HerMoves", width: 171, height: 40 },
];

export default function HomePage() {
  return (
    <>
      {/*
        Hero, the founder's quote and the metrics share one backdrop: the deck
        runs a single supergraphic down the right of all three rather than one
        per block, so it is anchored here and the blocks above it stay
        transparent. The quote card and the metrics band frost their own
        backdrop so the mark reads softly through them.
      */}
      <div className="relative overflow-hidden bg-shell">
        <AnimatedSupergraphic className="absolute right-0 top-0 h-[900px] w-[478px] opacity-50 sm:opacity-100 lg:h-[1700px] lg:w-[903px]" />

        {/* Hero */}
        <Section tone="none" className="relative">
          <Container
            data-hero-reveal
            className="pb-[96px] pt-[64px] lg:pb-[194px] lg:pt-[78px]"
          >
            <Image
              src="/assets/brand/wordmark-hero.svg"
              alt="Moria Ventures"
              width={388}
              height={59}
              priority
              className="h-10 w-auto lg:h-[57px]"
            />
            {/* Line breaks are set to match the deck exactly. */}
            <h1 data-reveal-lines className="t-hero mt-10 uppercase text-indigo-brand lg:mt-[41px]">
              Compliant Capital.
              <br />
              Connecting the Gulf
              <br />
              and Indonesia
            </h1>
            <p data-reveal-lines className="t-lede mt-10 max-w-[640px] text-ink lg:mt-[52px]">
              <span className="font-semibold text-indigo-brand">
                PT Moria Ventures Capital
              </span>{" "}
              is an Islamic principles investment firm backing technology driven
              companies across Indonesia and the Gulf, connecting global
              investors with regional expertise and long term commitment to
              founders.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="/for-limited-partners" tone="indigo">
                I&apos;m an Investor
              </Button>
              <Button href="/for-businesses" tone="outline">
                I&apos;m a Founder
              </Button>
            </div>
          </Container>
        </Section>

        {/* Founder's quote */}
        <Container className="relative pb-[52px]">
          <figure className="mx-auto max-w-[868px] rounded-[24px] border border-white/90 bg-white/40 px-6 pb-[36px] pt-[34px] text-center backdrop-blur-[10px] sm:px-10">
            <blockquote className="mx-auto max-w-[730px] text-[18px] leading-[1.6] text-ink lg:text-[22px] lg:leading-[37.5px]">
              &ldquo;We didn&apos;t want to build a VC that just avoids haram. We
              wanted to build one where everything we touch, every company,
              every deal, every structure, is genuinely built the right
              way.&rdquo;
            </blockquote>
            <figcaption className="mt-[39px] text-[15px] text-indigo-brand">
              Husni Muhammad B, Managing Partner, Moria Ventures
            </figcaption>
            <Image
              src="/assets/brand/logo-coin.svg"
              alt=""
              aria-hidden
              width={59}
              height={59}
              className="mx-auto mt-[34px] size-[58px]"
            />
          </figure>
        </Container>

        {/* Headline metrics */}
        <section className="relative border-y border-hairline bg-shell/55 backdrop-blur-[10px]">
          <Container className="py-[64px] lg:pb-[76px] lg:pt-[75px]">
            <dl className="mx-auto grid max-w-[1200px] grid-cols-2 gap-y-12 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse items-center text-center lg:border-l lg:border-[#d8dce0] lg:first:border-l-0"
                >
                  <dt className="mt-[23px] text-[11px] font-bold uppercase leading-none tracking-[0.02em] text-ink">
                    {stat.label}
                  </dt>
                  <dd className="text-[44px] font-bold leading-none tracking-[-0.02em] text-indigo-brand lg:text-[67px]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      </div>

      {/* Investment engines */}
      <Section tone="cream">
        <Container className="py-14 lg:pb-[96px] lg:pt-[91px]">
          <SectionTitle className="text-center">Investment Engines</SectionTitle>
          <div className="mx-auto mt-10 grid max-w-[1236px] lg:mt-[76px] gap-6 lg:grid-cols-3">
            {ENGINES.map((engine) => (
              <article
                key={engine.name}
                className="rounded-xl bg-white px-8 pb-[30px] pt-[31px]"
              >
                <Image
                  src={engine.icon}
                  alt=""
                  aria-hidden
                  width={60}
                  height={100}
                  className="h-[100px] w-[60px]"
                />
                <h3 className="mt-[26px] text-[22px] font-semibold leading-[1.3] text-ink">
                  {engine.name}
                </h3>
                <p className="mt-[30px] text-[16px] leading-[26px] text-ink">
                  {engine.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Value proposition */}
      <Section className="border-t border-hairline">
        <Container className="py-14 lg:pb-[95px] lg:pt-[88px]">
          <SectionTitle className="text-center">Value Proposition</SectionTitle>
          <div className="mt-10 flex flex-col gap-12 lg:mt-[83px] lg:flex-row lg:items-stretch lg:justify-between">
            <div className="relative aspect-[458/852] w-[240px] shrink-0 self-center lg:ml-3 lg:self-auto lg:w-[303px]">
              {/* The corners are rounded in the image itself. */}
              <Image
                src="/assets/homepage/value-proposition.webp"
                alt="Jakarta skyline at dusk"
                fill
                sizes="303px"
                className="object-cover"
              />
            </div>
            <dl className="lg:w-[886px]">
              {VALUE_PROPS.map((item) => (
                <div
                  key={item.term}
                  className="grid gap-3 border-t-[1.5px] border-[#b78d37]/70 pb-[34px] pt-[28px] last:border-b-[1.5px] sm:grid-cols-[302px_minmax(0,520px)] sm:gap-0"
                >
                  <dt className="text-[22px] font-semibold leading-[26px] text-indigo-brand">
                    {item.term}
                  </dt>
                  <dd className="text-[16px] leading-[26px] text-indigo-brand">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Corridor */}
      <Section tone="cream" className="relative overflow-hidden border-t border-hairline">
        <Image
          src="/assets/homepage/world-map.svg"
          alt=""
          aria-hidden
          width={767}
          height={382}
          className="pointer-events-none absolute right-0 top-0 w-[60%] max-w-[767px] select-none lg:w-[767px]"
        />
        <Container className="relative py-16 lg:pb-[158px] lg:pt-[155px]">
          <SectionTitle>Indonesia — Saudi Arabia</SectionTitle>
          <div className="mt-10 grid gap-16 lg:mt-[78px] lg:grid-cols-2 lg:gap-[57px]">
            <div>
              <h3 className="text-[20px] font-bold lg:text-[24px] leading-[1.2] text-ink">
                A Trillion-Dollar Economic Corridor
              </h3>
              <p className="mt-[30px] max-w-[608px] text-[16px] leading-[26px] text-ink">
                As the world&apos;s largest Muslim-majority nation, Indonesia
                holds massive untapped consumer markets and highly active
                digital-native sectors. Saudi Arabia, driving Vision 2030,
                commands unmatched liquid capital reserves. Moria Ventures serves
                as the institutional gateway, ensuring fast,
                regulatory-compliant pipelines that connect sovereign-backed
                Middle Eastern mandates with Southeast Asian growth engines.
              </p>
            </div>
            <div className="lg:pt-[3px]">
              <p className="text-[10px] font-bold uppercase leading-[1.4] tracking-[0.04em] text-ink">
                Strategic Eco-System Links
              </p>
              <ul className="mt-5 space-y-[20px]">
                {ECOSYSTEM.map((item) => (
                  <li key={item.name}>
                    <p className="text-[17px] font-bold leading-[22px] text-ink">
                      {item.name}
                    </p>
                    <p className="mt-[3px] text-[14px] leading-[20px] text-ink">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Portfolio */}
      <Section className="border-b border-hairline py-14 lg:pb-[133px] lg:pt-[76px]">
        <Container>
          <SectionTitle className="text-center">Portfolio</SectionTitle>
        </Container>
        <LogoMarquee logos={PORTFOLIO_LOGOS} className="mt-10 lg:mt-[90px]" />
      </Section>

      <CtaBand />
    </>
  );
}
