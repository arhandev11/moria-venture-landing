import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import {
  AnchorNav,
  Container,
  Eyebrow,
  ImageSlot,
  NumberedItem,
  Section,
  SectionTitle,
  Supergraphic,
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
      <Section className="relative overflow-hidden">
        <Supergraphic className="absolute -top-6 right-0 h-[380px] w-auto opacity-40 sm:opacity-100 lg:h-[440px]" />
        <Container className="relative py-16 lg:py-24">
          <h1 className="display max-w-4xl text-indigo-brand text-[38px] uppercase sm:text-[52px] lg:text-[62px]">
            About Moria Ventures
          </h1>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink-muted">
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
        <Container className="py-20">
          <Eyebrow>Who We Are</Eyebrow>
          <SectionTitle className="mt-5">
            Architects of Bilateral Growth
          </SectionTitle>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <ImageSlot
              src="/assets/about/jakarta.png"
              alt="Jakarta central business district"
              ratio="aspect-3/2"
            />
            <ImageSlot
              src="/assets/about/riyadh.png"
              alt="Riyadh skyline"
              ratio="aspect-3/2"
            />
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-[17px] font-semibold text-ink">
                Our Founding Story
              </h3>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">
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
              <h3 className="text-[17px] font-semibold text-ink">
                The Dual-Engine Mandate
              </h3>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">
                We leverage an institutional dual-allocation model. By running
                our Venture Capital Engine (long-horizon equity optimization in
                SE Asian technology) in tandem with our structured Project
                Finance Engine (short-cycle Murabaha/Musharakah supply-chain
                liquidity), we hedge macroeconomic fluctuations while capturing
                high-growth equity upsides.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Eyebrow>Key Milestones</Eyebrow>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MILESTONES.map(([year, text]) => (
                <div key={year} className="border-l border-rule pl-5 first:border-l-0 first:pl-0">
                  <p className="display text-indigo-brand text-[28px]">{year}</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Shariah governance */}
      <Section tone="cream" id="shariah-compliance" className="relative overflow-hidden">
        <Supergraphic
          src="/assets/brand/supergraphic-mark.svg"
          className="absolute left-1/2 top-16 h-[420px] w-auto -translate-x-1/2 opacity-80"
          width={384}
          height={392}
        />
        <Container className="relative py-24">
          <div className="text-center">
            <Eyebrow>Shariah Governance</Eyebrow>
            <SectionTitle className="mx-auto mt-8 max-w-3xl">
              Pure Compliance.
              <br />
              Applied End-to-End.
            </SectionTitle>
            <p className="mx-auto mt-6 max-w-2xl text-[13px] leading-relaxed text-ink-muted">
              Unlike traditional funds that limit Shariah compliance to the
              top-level fund wrapper, Moria actively audits and structures every
              underlying portfolio deployment.
            </p>
          </div>

          <div className="mt-16 grid gap-x-16 md:grid-cols-2">
            {GOVERNANCE.map((item) => (
              <NumberedItem key={item.n} n={item.n} title={item.title}>
                {item.body}
              </NumberedItem>
            ))}
          </div>
        </Container>
      </Section>

      {/* Executive board */}
      <Section id="leadership">
        <Container className="py-24">
          <div className="text-center">
            <Eyebrow>Executive Board</Eyebrow>
            <SectionTitle className="mx-auto mt-8 max-w-2xl">
              Decades of Cross-Border Stewardship
            </SectionTitle>
          </div>

          <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
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
                <h3 className="mt-5 text-[17px] font-semibold text-indigo-brand">
                  {person.name}
                </h3>
                <p className="mt-1 text-[12px] font-semibold text-ink">
                  {person.role}
                </p>
                <p className="mt-3 max-w-lg text-[12px] leading-relaxed text-ink-muted">
                  {person.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Holding group */}
      <Section tone="cream" id="holding-group">
        <Container className="py-20">
          <Eyebrow>Corporate Architecture</Eyebrow>
          <p className="display mt-5 text-gold text-[34px] sm:text-[42px]">
            moria holding
          </p>

          <ImageSlot
            className="mt-10"
            label="Moria Holding group photo"
            ratio="aspect-[1066/300]"
          />

          <div className="mt-14 grid gap-12 border-t border-rule pt-12 md:grid-cols-2 md:gap-16">
            <div>
              <Image
                src="/assets/brand/logo-wordmark.svg"
                alt="Moria Ventures"
                width={323}
                height={49}
                className="h-7 w-auto"
              />
              <ul className="mt-6 space-y-4">
                {VENTURES_ARM.map((line) => (
                  <li
                    key={line}
                    className="grid grid-cols-[10px_minmax(0,1fr)] gap-3 text-[13px] leading-relaxed text-ink-muted"
                  >
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 bg-ink" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:border-l md:border-rule md:pl-16">
              <p className="display text-indigo-brand text-[26px]">moria fund</p>
              <ul className="mt-6 space-y-4">
                {FUND_ARM.map((line) => (
                  <li key={line} className="text-[13px] leading-relaxed text-ink-muted">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 text-[11px] text-ink/60">
            * For detailed regional compliance setups, see our strategic
            partnerships on the Indonesia-Saudi Corridor ecosystem page.
          </p>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
