import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSupergraphic } from "@/components/animated-supergraphic";
import { CtaBand } from "@/components/cta-band";
import {
  AnchorNav,
  Container,
  Eyebrow,
  ImageSlot,
  Section,
  SectionTitle,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "An institutional bridge of Shariah-compliant capital, scaling high-growth innovation between Indonesia and the GCC corridor.",
};

const MILESTONES = [
  ["2021", "Moria Ventures Founded in Jakarta"],
  ["2022", "GCC Corridor established & first Saudi LP alignment"],
  ["2023", "Project Finance Engine launched with BSI integration"],
  ["2024", "Active deployment surpasses $25M across 15+ companies"],
];

const GOVERNANCE = [
  {
    n: "01",
    title: "Scholarly Screening",
    body: "Rigorous initial filtering of target capital deployments against OJK-approved and global Shariah guidelines, thoroughly excluding usury (Riba), uncertainty (Gharar), and gambling (Maysir).",
  },
  {
    n: "02",
    title: "Bespoke Structuring",
    body: "Crafting customized Shariah contracts, including Murabaha, Musharakah, and Istisna'a mechanics, to guarantee high-integrity risk sharing and transparent capital yields.",
  },
  {
    n: "03",
    title: "Continuous Monitoring",
    body: "Real-time auditing of portfolio operational pipelines, working closely with strategic regulatory partners (KNEKS, CMA) to maintain uncompromised transactional purity.",
  },
  {
    n: "04",
    title: "Sovereign Certification",
    body: "Annual formal compliance reviews and sovereign clearance verification, unlocking GCC sovereign and institutional wealth allocations.",
  },
];

const BOARD = [
  {
    name: "Husni",
    role: "CEO & Managing Partner",
    photo: "/assets/team/wide-husni.png",
    body: "Over 18 years driving bilateral investment flow between Jakarta and GCC markets. Architect of Moria's sovereign-access pipeline structure.",
  },
  {
    name: "Musab Mazen Bin Nosair",
    role: "Co-Founder / CEO Moria Fund",
    photo: "/assets/team/wide-musab.png",
    body: "Veteran Saudi investment strategist overseeing GCC sovereign allocator alignments and Murabaha structured project portfolios.",
  },
  {
    name: "Faris Achmad Kuddah",
    role: "COO",
    photo: "/assets/team/wide-faris.png",
    body: "Specialist in cross-border execution logistics, regulatory operations under OJK/BI frameworks, and enterprise scaling.",
  },
  {
    name: "Sandi S. Wibawa",
    role: "Head of Finance",
    photo: "/assets/team/wide-sandi.png",
    body: "Oversees strict Shariah compliance auditing, capital call calculations, and treasury functions in active multi-currency setups.",
  },
];

const VENTURES_ARM = [
  "Venture Capital: High-growth equity targeting fintech, logistics, and halal agritech.",
  "Project Finance: Short-cycle low-volatility Murabaha and Musharakah trade liquidity.",
  "Operational bridge scaling Southeast Asian innovations directly into the GCC markets.",
];

const FUND_ARM = [
  "Digital financial infrastructure optimized for cross-border Shariah capital placement.",
  "Direct sovereign wealth advisory & strategic allocator alignment models in Riyadh.",
  "Multilateral currency and escrow hedging strategies mitigating operational trade risk.",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — 391px tall in the deck, with no actions. */}
      <Section className="relative overflow-hidden">
        <AnimatedSupergraphic className="absolute right-0 top-0 h-[300px] w-[159px] opacity-40 sm:opacity-100 lg:h-[470px] lg:w-[250px]" />
        <Container className="relative pb-[100px] pt-[70px] lg:pb-[110px] lg:pt-[90px]">
          <h1 className="t-hero uppercase text-indigo-brand">
            About Moria Ventures
          </h1>
          <p className="t-lede mt-[35px] max-w-[790px] text-ink-muted">
            An institutional bridge of Shariah-compliant capital, scaling
            high-growth innovation between Indonesia and the GCC corridor.
          </p>
        </Container>
      </Section>

      <AnchorNav
        items={[
          { label: "Who We Are", href: "#who-we-are" },
          { label: "Shariah Compliance", href: "#shariah-compliance" },
          { label: "Leadership", href: "#leadership" },
          { label: "Holding Group", href: "#holding-group" },
        ]}
      />

      {/* Who we are */}
      <Section id="who-we-are">
        <Container className="pb-[123px] pt-[121px]">
          <Eyebrow>Who We Are</Eyebrow>
          <SectionTitle className="mt-[36px]">
            Architects of Bilateral Growth
          </SectionTitle>

          <div className="mt-[66px] grid gap-[25px] md:grid-cols-2">
            <ImageSlot
              src="/assets/about/jakarta.jpg"
              alt="Jakarta central business district"
              ratio="aspect-3/2"
              rounded="rounded-lg"
            />
            <ImageSlot
              src="/assets/about/riyadh.jpg"
              alt="Riyadh skyline"
              ratio="aspect-3/2"
              rounded="rounded-lg"
            />
          </div>

          <div className="mt-[82px] grid gap-14 md:grid-cols-2 md:gap-[57px]">
            <div>
              <h3 className="text-[26px] font-semibold text-ink">
                Our Founding Story
              </h3>
              <p className="mt-[31px] text-[16px] leading-[26px] text-ink-muted">
                PT Moria Global Ventures was established to unlock structured,
                institutional corridors between the world&apos;s largest
                Muslim-majority nation, Indonesia, and the high-liquidity
                economic reserves of the Gulf Cooperation Council (GCC).
                Recognizing a profound systemic disconnect, we built the
                regulatory, operational, and Shariah-compliant gateways required
                to flow capital into market leaders.
              </p>
            </div>
            <div>
              <h3 className="text-[26px] font-semibold text-ink">
                The Dual-Engine Mandate
              </h3>
              <p className="mt-[31px] text-[16px] leading-[26px] text-ink-muted">
                We leverage an institutional dual-allocation model. By running
                our Venture Capital Engine (long-horizon equity optimization in
                SE Asian technology) in tandem with our structured Project
                Finance Engine (short-cycle Murabaha/Musharakah supply-chain
                liquidity), we hedge macroeconomic fluctuations while capturing
                high-growth equity upsides.
              </p>
            </div>
          </div>

          <div className="mt-[88px]">
            <Eyebrow className="text-ink/70">Key Milestones</Eyebrow>
            <div className="mt-[39px] grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {MILESTONES.map(([year, text]) => (
                <div
                  key={year}
                  className="border-l border-rule pl-6 first:border-l-0 first:pl-0"
                >
                  <p className="text-[26px] font-bold leading-none text-indigo-brand">
                    {year}
                  </p>
                  <p className="mt-4 text-[15px] leading-[21px] text-ink-muted">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Shariah governance */}
      <Section
        tone="cream"
        id="shariah-compliance"
        className="relative overflow-hidden"
      >
        <AnimatedSupergraphic className="absolute left-1/2 top-[60px] h-[560px] w-[297px] -translate-x-1/2 opacity-70" />
        <Container className="relative pb-[157px] pt-[121px]">
          <div className="text-center">
            <Eyebrow>Shariah Governance</Eyebrow>
            <SectionTitle className="mx-auto mt-[96px] max-w-[1000px]">
              Pure Compliance.
              <br />
              Applied End-to-End.
            </SectionTitle>
            <p className="mx-auto mt-[39px] max-w-[760px] text-[18px] leading-[29px] text-ink-muted">
              Unlike traditional funds that limit Shariah compliance to the
              top-level fund wrapper, Moria actively audits and structures every
              underlying portfolio deployment.
            </p>
          </div>

          <div className="mt-[90px] grid gap-x-[118px] gap-y-[30px] md:grid-cols-2">
            {GOVERNANCE.map((item) => (
              <div
                key={item.n}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-9 border-t border-rule pt-[17px]"
              >
                <span className="text-[69px] font-bold leading-none text-indigo-brand">
                  {item.n}
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold text-indigo-brand">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[26px] text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Executive board */}
      <Section id="leadership">
        <Container className="pb-[164px] pt-[121px]">
          <div className="text-center">
            <Eyebrow>Executive Board</Eyebrow>
            <SectionTitle className="mx-auto mt-[36px] max-w-[900px]">
              Decades of Cross-Border Stewardship
            </SectionTitle>
          </div>

          <div className="mt-[104px] grid gap-x-[57px] gap-y-[80px] md:grid-cols-2">
            {BOARD.map((person) => (
              <article key={person.name}>
                <div className="relative aspect-[1200/490] overflow-hidden rounded-lg bg-cream">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-[20px] text-[24px] font-semibold text-indigo-brand">
                  {person.name}
                </h3>
                <p className="mt-[16px] text-[16px] font-semibold text-ink">
                  {person.role}
                </p>
                <p className="mt-[16px] max-w-[600px] text-[14px] leading-[21px] text-ink-muted">
                  {person.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Holding group */}
      <Section tone="cream" id="holding-group">
        <Container className="pb-[176px] pt-[121px]">
          <Eyebrow>Corporate Architecture</Eyebrow>
          <p className="mt-[166px] flex items-center gap-4 text-[42px] font-bold leading-none text-gold">
            <Image
              src="/assets/brand/logo-mark.svg"
              alt=""
              width={46}
              height={49}
              className="h-[46px] w-auto"
            />
            moria holding
          </p>

          <ImageSlot
            className="mt-[78px]"
            src="/assets/about/holding-group.jpg"
            alt="The Moria Holding team"
            ratio="aspect-[1280/280]"
            rounded="rounded-lg"
          />

          <div className="mt-[30px] grid gap-14 border-t border-rule pt-[24px] md:grid-cols-2 md:gap-[57px]">
            <div>
              <Image
                src="/assets/brand/logo-wordmark.svg"
                alt="Moria Ventures"
                width={323}
                height={49}
                className="h-[30px] w-auto"
              />
              <ul className="mt-[30px] space-y-[8px]">
                {VENTURES_ARM.map((line) => (
                  <li
                    key={line}
                    className="grid grid-cols-[12px_minmax(0,1fr)] gap-5 text-[16px] leading-[24px] text-ink-muted"
                  >
                    <span aria-hidden className="mt-[9px] h-2 w-2 bg-ink" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="flex items-center gap-3 text-[32px] font-bold leading-none text-indigo-brand">
                <Image
                  src="/assets/brand/logo-mark.svg"
                  alt=""
                  width={46}
                  height={49}
                  className="h-[32px] w-auto"
                />
                moria fund
              </p>
              <ul className="mt-[30px] space-y-[8px]">
                {FUND_ARM.map((line) => (
                  <li
                    key={line}
                    className="text-[16px] leading-[24px] text-ink-muted"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-[30px] text-[13px] text-ink/60">
            * For detailed regional compliance setups, see our strategic
            partnerships on the Indonesia-Saudi Corridor ecosystem page.
          </p>
        </Container>
      </Section>

      <CtaBand
        padding="pb-[100px] pt-[128px]"
        title={
          <>
            Ready to invest in the future of
            <br />
            Shariah-compliant innovation?
          </>
        }
      />
    </>
  );
}
