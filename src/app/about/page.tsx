import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { AnimatedSupergraphic } from "@/components/animated-supergraphic";
import { CtaBand } from "@/components/cta-band";
import {
  AnchorNav,
  Container,
  Eyebrow,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "An Islamic finance-based venture capital firm for the Indonesia–Gulf corridor, pairing early-stage equity with short-cycle project financing. Every deal is asset-backed and interest-free from the first term sheet.",
};

const MILESTONES = [
  ["2021", "Moria Ventures Founded in Jakarta"],
  ["2022", "GCC Corridor established & first Saudi LP alignment"],
  ["2023", "Project Finance Engine launched with BSI integration"],
  ["2024", "Active deployment surpasses $25M across 15+ companies"],
];

const GOVERNANCE: { n: string; title: string; body: ReactNode }[] = [
  {
    n: "01",
    title: "Independent Sharia Advisory Board",
    body: (
      <>
        All investment contracts, fund structures, and term sheets are reviewed
        and certified before any capital is deployed.
        <br />
        (Board appointments in progress — Q2 2026)
      </>
    ),
  },
  {
    n: "02",
    title: "Musharakah Equity Partnerships",
    body: "Equity investments are structured as genuine profit-and-loss sharing partnerships, not interest-bearing instruments — true alignment between investor, fund, and founder.",
  },
  {
    n: "03",
    title: "Murabaha Instruments",
    body: "Project finance uses cost-plus trade (Murabaha). All transactions are linked to real, tangible economic activity.",
  },
  {
    n: "04",
    title: "MUI & AAOIFI Alignment",
    body: "Our framework aligns with MUI accounting standards and global AAOIFI principles — qualifying the fund for Islamic capital mandates and ethical impact LP pools.",
  },
];

const BOARD: {
  name: string;
  role: string;
  /** Left out where no portrait has been shot yet; the card keeps its shape. */
  photo?: string;
  body: string;
}[] = [
  {
    name: "Husni Muhammad",
    role: "CEO & Managing Partner",
    photo: "/assets/team/wide-husni.png",
    body: "Over 18 years driving bilateral investment flow between Jakarta and GCC markets. Architect of Moria's sovereign-access pipeline structure.",
  },
  {
    name: "Riko Mersandro",
    role: "Head of Finance & Risk Analysis",
    body: "Oversees strict Islamic Principle compliance auditing, capital call calculations, and treasury functions in active multi-currency setups.",
  },
  {
    name: "Faris Achmad Kuddah",
    role: "General Partner",
    photo: "/assets/team/wide-faris.png",
    body: "Specialist in cross-border execution logistics, regulatory operations under OJK/BI frameworks, and enterprise scaling.",
  },
  {
    name: "Musab Mazen Bin Nosair",
    role: "General Partner",
    photo: "/assets/team/wide-musab.png",
    body: "Veteran Saudi investment strategist overseeing GCC sovereign allocator alignments and Murabaha structured project portfolios.",
  },
];

/** Portrait crop as drawn in the deck: 580 x 246 at 1440. */
const PORTRAIT_RATIO = "aspect-[580/246]";

export default function AboutPage() {
  return (
    <>
      {/* Hero — 452px tall in the deck. The mark is drawn far larger than the
          band and cropped by it, so only its upper sweep shows, bleeding off
          the right edge. */}
      <PageHero
        title="About Moria Ventures"
        padding="pb-[100px] pt-[70px] lg:pb-[122px] lg:pt-[74px]"
        ledeGap="mt-[35px] lg:mt-[44px]"
        ledeClassName="max-w-[790px] text-[16px] leading-[26px] md:text-[18px] md:leading-[28px] lg:text-[20px] lg:leading-[30px]"
        markClassName="absolute right-0 top-0 h-[300px] w-[159px] opacity-40 sm:opacity-100 lg:-right-[87px] lg:-top-[258px] lg:h-[885px] lg:w-[470px]"
        lede={
          <>
            Moria Ventures is an Islamic finance-based venture capital firm
            built for the Indonesia–Gulf corridor, running a dual engine of
            equity in early-stage companies and short-cycle project financing
            that puts capital back to work faster. Every deal is asset-backed
            and interest-free structured that way from the first term sheet,
            not certified after the fact.
          </>
        }
      />

      <AnchorNav
        items={[
          { label: "Who We Are", href: "#who-we-are" },
          {
            label: "Islamic Principle Compliance",
            href: "#islamic-principle-compliance",
          },
          { label: "Leadership", href: "#leadership" },
        ]}
      />

      {/* Who we are */}
      <Section id="who-we-are">
        <Container className="pb-[118px] pt-[118px]">
          <Eyebrow>Who We Are</Eyebrow>
          <SectionTitle className="mt-[21px]">
            Architects of Bilateral Growth
          </SectionTitle>

          {/* The deck draws the pair at 637 and 631 wide with a 12px seam. */}
          <div className="mt-[84px] grid gap-[12px] md:grid-cols-[637fr_631fr]">
            <ImageSlot
              src="/assets/about/jakarta.webp"
              alt="Jakarta central business district"
              ratio="aspect-[637/420]"
              rounded="rounded-none"
            />
            <ImageSlot
              src="/assets/about/riyadh.webp"
              alt="Riyadh skyline"
              ratio="aspect-[631/420]"
              rounded="rounded-none"
            />
          </div>

          <div className="mt-[71px] grid gap-14 md:grid-cols-2 md:gap-[48px]">
            <div>
              <h3 className="text-[26px] font-semibold text-ink">
                Our Founding Story
              </h3>
              <p className="mt-[17px] text-[16px] leading-[26px] text-ink">
                Moria Ventures Capital was built to open a corridor that
                didn&apos;t exist: structured, institutional capital flow
                between Indonesia, the world&apos;s largest Muslim-majority
                market, and the deep liquidity reserves of the GCC. We built the
                regulatory, operational, and Islamic finance-compliant
                infrastructure to move that capital directly into market
                leaders.
              </p>
            </div>
            <div>
              <h3 className="text-[26px] font-semibold text-ink">
                The Dual-Engine Mandate
              </h3>
              <p className="mt-[17px] text-[16px] leading-[26px] text-ink">
                Moria Ventures runs on two engines, not one: equity investment
                in early-stage companies built for the long run, and
                short-cycle project financing that returns and redeploys faster
                than a traditional fund cycle. Together, they let us serve both
                ends of the corridor — patient capital for founders building
                ahead, and fast capital for businesses that need it now.
              </p>
            </div>
          </div>

          <div className="mt-[80px]">
            <Eyebrow>Key Milestones</Eyebrow>
            {/* Hairlines sit 32px ahead of each later column's text, so the
                first column is the narrower one. */}
            <div className="mt-[32px] grid gap-8 sm:grid-cols-2 lg:grid-cols-[296fr_328fr_328fr_328fr] lg:gap-0">
              {MILESTONES.map(([year, text]) => (
                <div
                  key={year}
                  className="lg:border-l lg:border-rule lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
                >
                  <p className="text-[26px] font-bold leading-none text-indigo-brand">
                    {year}
                  </p>
                  <p className="mt-[11px] text-[14px] leading-[20px] text-ink">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Islamic principle governance */}
      <Section
        tone="cream"
        id="islamic-principle-compliance"
        className="relative overflow-clip"
      >
        {/* Only the lower sweep of the mark shows: it starts above the band
            and is cropped by it, on the right beside the title block. */}
        <AnimatedSupergraphic className="absolute -right-[60px] top-0 h-[560px] w-[297px] lg:-top-[480px] lg:right-[20px] lg:h-[989px] lg:w-[525px]" />
        <Container className="relative pb-[120px] pt-[118px]">
          <Eyebrow>Islamic Principle Governance</Eyebrow>
          <SectionTitle className="mt-[21px]">
            Pure Compliance.
            <br />
            Applied End-to-End.
          </SectionTitle>
          <p className="mt-[26px] max-w-[760px] text-[18px] leading-[29px] text-ink">
            Unlike traditional funds that limit Islamic Principle compliance to
            the top-level fund wrapper, Moria actively audits and structures
            every underlying portfolio deployment.
          </p>

          <div className="mt-[82px] grid md:grid-cols-2 md:gap-x-[32px]">
            {GOVERNANCE.map((item) => (
              // Rows share their hairlines: every item draws its own bottom
              // rule, the first row also draws the top one. The deck sets the
              // second row lower inside its band than the first.
              <div
                key={item.n}
                className="grid grid-cols-[72px_minmax(0,1fr)] border-b border-rule pb-[32px] pt-[27px] first:border-t md:grid-cols-[120px_minmax(0,1fr)] md:[&:nth-child(2)]:border-t md:[&:nth-child(n+3)]:pt-[59px]"
              >
                <span className="text-[40px] font-bold leading-[0.8] text-indigo-brand md:mt-[6px] md:text-[47px]">
                  {item.n}
                </span>
                <div>
                  <h3 className="text-[20px] font-semibold leading-[24px] text-indigo-brand">
                    {item.title}
                  </h3>
                  <p className="mt-[7px] text-[16px] leading-[26px] text-ink">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section id="leadership">
        <Container className="pb-[120px] pt-[118px]">
          <div className="text-center">
            <Eyebrow>The People Behind It</Eyebrow>
            <SectionTitle className="mx-auto mt-[21px] max-w-[900px]">
              Decades of Cross-Border Stewardship
            </SectionTitle>
          </div>

          <div className="mt-[124px] grid gap-y-[80px] border-b border-rule pb-[40px] md:grid-cols-2 md:gap-x-[120px] md:gap-y-[160px]">
            {BOARD.map((person) => (
              <article key={person.name}>
                {person.photo ? (
                  <div
                    className={`relative ${PORTRAIT_RATIO} overflow-hidden rounded-lg bg-cream`}
                  >
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 580px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ImageSlot
                    label="Portrait to come"
                    ratio={PORTRAIT_RATIO}
                    rounded="rounded-lg"
                  />
                )}
                <h3 className="mt-[7px] text-[24px] font-semibold text-indigo-brand">
                  {person.name}
                </h3>
                <p className="mt-[8px] text-[16px] font-semibold text-ink">
                  {person.role}
                </p>
                <p className="mt-[12px] text-[14px] leading-[21px] text-ink">
                  {person.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
