import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Container,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "For Businesses",
  description:
    "Equity for founders scaling toward exit, and short-cycle project financing for businesses that need working capital fast — structured around your business.",
};

const CRITERIA = [
  {
    term: "Category-Leading Business Models",
    body: "We back companies solving real structural inefficiencies — not incremental improvements. If the business model doesn't have a clear path to category leadership in its market, it's not a fit.",
  },
  {
    term: "SME-Focused",
    body: "We back small and medium enterprises with real operational traction — businesses solving structural inefficiencies in their market, not early-stage ideas still searching for a model.",
  },
  {
    term: "Islamic Finance-Compliant Structure",
    body: "Every deal must be structurable on asset-backed, interest-free terms. If the underlying business model can't be structured this way, it's outside our mandate regardless of return potential.",
  },
  {
    term: "Founder-Market Fit",
    body: "We invest in founders as much as businesses — leadership capable of executing through governance, scale, and the operational discipline institutional capital requires.",
  },
  {
    term: "Sector Focus",
    body: "Priority sectors include agriculture and commodities, property, food & beverage (F&B), and FMCG — where structural inefficiencies are largest, and our operational experience adds the most value beyond capital.",
  },
];

const VALUE_ADDS = [
  {
    term: "Governance & Institutional Readiness",
    body: "We build the governance, financial reporting, and due diligence infrastructure companies need to qualify for institutional capital — not just advice, actual structure.",
  },
  {
    term: "Cross-Border Market Access",
    body: "Direct introductions to Gulf sovereign allocators, strategic corporate partners, and GCC commercial networks — access most Indonesian businesses can't build on their own.",
  },
  {
    term: "Islamic Finance-Compliant Deal Structuring",
    body: "Every transaction structured on asset-backed, interest-free terms from the outset — not bolted on later. Compliance is built into the deal architecture itself.",
  },
  {
    term: "Operational Build-Out",
    body: "Hands-on support across product, branding, legal structuring, and operations — we work inside the business, not just advise it from outside.",
  },
  {
    term: "Ongoing Portfolio Management",
    body: "Support doesn't end at the term sheet. Continued advisory, board-level guidance, and follow-on funding support through the company's growth.",
  },
  {
    term: "Repeatable Investment Discipline",
    body: "Every deal runs through the same structured process from opportunity sourcing through exit — so value creation isn't dependent on any single deal or person.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Initial Screening",
    body: "Staged evaluation of Islamic Principle structural alignment, core unit-economics, and regional bridge viability.",
  },
  {
    n: "02",
    title: "Deep Dive",
    body: "Comprehensive technical due diligence, strategic unit stress-testing, and compliance alignment audit.",
  },
  {
    n: "03",
    title: "IC Presentation",
    body: "Bilateral Investment Committee validation drawing on expert insights from both Jakarta and GCC hubs.",
  },
  {
    n: "04",
    title: "Term Sheet",
    body: "Optimized non-dilutive liquidity or equity frameworks mapped seamlessly against scaling metrics.",
  },
  {
    n: "05",
    title: "Post-Investment",
    body: "Onboarding into our institutional corridor network, driving immediate sovereign-link synergies.",
  },
];

// Display sizes measured off the 1440 render; the PNGs ship at 2x.
const LOGOS = [
  { src: "/assets/logos/dhuha.svg", alt: "Dhuha", w: 108, h: 127 },
  { src: "/assets/logos/emma-tour.png", alt: "EMMA Tour & Travel", w: 135, h: 91 },
  { src: "/assets/logos/nusaqu-mono.png", alt: "nusaQu", w: 196, h: 60 },
  { src: "/assets/logos/beliayam-mono.png", alt: "beliayam.com", w: 241, h: 60 },
  {
    src: "/assets/logos/kubah-global-bisnis.png",
    alt: "Kubah Global Bisnis",
    w: 292,
    h: 41,
  },
];

export default function ForBusinessesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Two Ways We Back
            <br />
            Business Owners
          </>
        }
        padding="pb-[100px] pt-[110px] lg:pb-[159px] lg:pt-[113px]"
        ledeGap="mt-[53px]"
        // The shared hero sets 55px above the buttons; the deck sits them closer.
        ledeClassName="max-w-[580px] text-[17.5px] leading-[29px] lg:-mb-[13px]"
        lede="Whether you're building for the long run or need capital to move now, we structure it around your business, not the other way around. Equity for founders scaling toward exit. Short-cycle project financing for businesses that need working capital fast."
        actions={
          <>
            <Button href="#submit-pitch" tone="gold">
              Apply for Funding
            </Button>
            <Button href="/what-we-do" tone="outline">
              Our Thesis
            </Button>
          </>
        }
      />

      {/* Investment criteria */}
      <Section tone="cream">
        <Container className="pb-[160px] pt-[157px]">
          <SectionTitle>Investment Criteria</SectionTitle>
          <div className="mt-[83px] grid items-start gap-14 lg:grid-cols-[472px_minmax(0,1fr)] lg:gap-[80px]">
            <ImageSlot
              src="/assets/for-businesses/criteria.webp"
              alt="Founders reviewing deal documents across a desk"
              ratio="aspect-[944/1316]"
              rounded="rounded-lg"
            />
            <dl>
              {CRITERIA.map((item) => (
                <div
                  key={item.term}
                  className="grid gap-2 border-t border-hairline pb-[33px] pt-[30px] last:border-b sm:grid-cols-[minmax(0,352px)_minmax(0,1fr)] sm:gap-[12px]"
                >
                  <dt className="text-[20px] font-semibold leading-[20px] text-indigo-brand">
                    {item.term}
                  </dt>
                  <dd className="text-[16px] leading-[26px] text-ink">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Beyond capital */}
      <Section className="border-t border-hairline">
        <Container className="pb-[160px] pt-[157px]">
          <SectionTitle>Beyond Capital</SectionTitle>
          <ImageSlot
            className="mt-[84px]"
            src="/assets/for-businesses/how-we-help.webp"
            alt="The team in a working session around a proposal"
            ratio="aspect-[2560/640]"
            rounded="rounded-lg"
          />

          <div className="mt-[80px] grid gap-10 lg:grid-cols-[minmax(0,419px)_minmax(0,1fr)] lg:gap-10">
            <div>
              <p className="-mt-[6px] text-[76px] font-bold leading-none text-indigo-brand">
                06
              </p>
              <p className="mt-[16px] text-[13px] font-bold uppercase text-ink">
                Structural Value Additions
              </p>
            </div>
            <dl>
              {VALUE_ADDS.map((item) => (
                <div
                  key={item.term}
                  className="grid items-center gap-2 border-t border-hairline py-[23px] last:border-b sm:grid-cols-[minmax(0,320px)_minmax(0,1fr)] sm:gap-[20px]"
                >
                  <dt className="text-[20px] font-semibold leading-[20px] text-indigo-brand">
                    {item.term}
                  </dt>
                  <dd className="text-[14px] leading-[21px] text-ink">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="cream" className="border-t border-hairline">
        <Container className="pb-[160px] pt-[157px]">
          <SectionTitle>Our Process</SectionTitle>
          <ImageSlot
            className="mt-[83px]"
            src="/assets/for-businesses/process.webp"
            alt="A desk set out with a laptop and a project milestones calendar"
            ratio="aspect-[2560/640]"
            rounded="rounded-lg"
          />
          <div className="mt-[80px]">
            {PROCESS.map((step) => (
              <div
                key={step.n}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-[60px] gap-y-2 border-t-[2px] border-indigo-brand py-[39px] last:border-b-[2px] sm:grid-cols-[120px_minmax(0,350px)_minmax(0,660px)] sm:gap-x-0"
              >
                <span className="text-[44px] font-bold leading-none text-indigo-brand">
                  {step.n}
                </span>
                <h3 className="text-[25px] font-semibold text-indigo-brand">
                  {step.title}
                </h3>
                <p className="col-span-2 text-[16px] leading-[26px] text-ink sm:col-span-1">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Companies backed */}
      <Section>
        <Container className="pb-[120px] pt-[117px]">
          <SectionTitle className="lg:text-right">
            Companies We&apos;ve Backed
          </SectionTitle>
          <ImageSlot
            className="mt-[68px]"
            src="/assets/for-businesses/portfolio.webp"
            alt="The team on site at a portfolio property development"
            ratio="aspect-[2560/640]"
            rounded="rounded-lg"
          />
          <ul className="mt-[64px] flex flex-wrap items-center justify-center gap-x-12 gap-y-10 lg:justify-between lg:gap-x-0">
            {LOGOS.map((logo) => (
              <li key={logo.src}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  className="h-auto max-w-full"
                  style={{ width: logo.w }}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Submit pitch */}
      <Section tone="gold" id="submit-pitch">
        <Container className="pb-[160px] pt-[157px]">
          <SectionTitle>Submit Your Pitch</SectionTitle>
          <p className="mt-[17px] max-w-[700px] text-[15.5px] leading-[24px] text-ink">
            Fill out the institutional entry form below. Our cross-border
            evaluation committee processes requests weekly.
          </p>
          {/* Taller than the shared Button and white-on-indigo, per the deck. */}
          <Link
            href="/contact"
            className="t-label mt-[18px] inline-flex h-[50px] w-[195px] items-center justify-center bg-indigo-brand text-white transition-colors hover:bg-indigo-brand/90"
          >
            Contact Us
          </Link>
        </Container>
      </Section>
    </>
  );
}
