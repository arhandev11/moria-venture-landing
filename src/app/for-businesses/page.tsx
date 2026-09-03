import type { Metadata } from "next";
import Link from "next/link";
import { Field, SubmitButton } from "@/components/form";
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
    "We back founders building category-defining companies across Indonesia and the Gulf.",
};

const CRITERIA = [
  {
    term: "Stage Focus",
    body: "Series A - B active expansion rounds, with highly validated product-market fit.",
  },
  {
    term: "Ticket Size",
    body: "$500,000 to $2,000,000 initial allocation, with dry powder reserved for follow-on participation.",
  },
  {
    term: "Core Sectors",
    body: "Fintech · Logistics · Agritech · SaaS · Halal Economy ecosystems utilizing strong structural advantages.",
  },
  {
    term: "Market Footprint",
    body: "Indonesia or GCC-centric operations, or clear readiness to bridge trade flows between both hubs.",
  },
  {
    term: "Structuring",
    body: "Strict Shariah-Compliant architecture, Murabaha Trade lines, or compliant convertible equity instruments.",
  },
];

const VALUE_ADDS = [
  {
    term: "Strategic Advisory",
    body: "Corporate structural design optimized for cross-border bilateral deployment loops.",
  },
  {
    term: "GCC Market Entry",
    body: "Fast-tracked operational licensing, localization, and regulatory sandboxing inside Saudi Arabia.",
  },
  {
    term: "Shariah Structuring",
    body: "Global Shariah board audit governance, removing compliance frictions for GCC allocators.",
  },
  {
    term: "Follow-on Capital",
    body: "Direct priority exposure pipeline into Gulf Sovereign and institutional investor frameworks.",
  },
  {
    term: "LP Network Access",
    body: "Direct joint-venture business matchmaking with powerful industrial groups in GCC and ASEAN.",
  },
  {
    term: "Operational Support",
    body: "Local corporate clearance, OJK/BI/CMA regulatory liaison management, and regional team scaling.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Initial Screening",
    body: "Staged evaluation of Shariah structural alignment, core unit-economics, and regional bridge viability.",
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

const BACKED = [
  ["NusaQu", "Shariah Fintech Infrastructure", "Active UAE / ID Corridors"],
  ["PT Dhuha", "Halal Logistics & Distribution", "Project Finance Engine Partner"],
  ["PT SIF Cocoa", "Sustainable Food Supply Chain", "GCC Sovereign Export Route"],
];

const FAQ = [
  {
    q: "Does my business need to be Shariah-compliant already?",
    a: "No. While we only invest in Shariah-aligned projects, we partner with companies to implement the right structures and governance frameworks.",
  },
  {
    q: "What ticket sizes do you invest?",
    a: "$100K-$500K for equity, $250K-$2M for project finance depending on transaction scope and structure.",
  },
  {
    q: "Do you invest outside Indonesia?",
    a: "Our primary markets are Indonesia and the GCC. We consider cross-border plays that bridge these two regions.",
  },
  {
    q: "How long does the process take?",
    a: "Initial screening takes 2 weeks. Full due diligence and IC presentation typically complete within 6-8 weeks.",
  },
  {
    q: "What makes Moria different from other VCs?",
    a: "We combine venture capital with project finance, enabling both long-horizon growth equity and short-cycle yield - plus deep GCC market access.",
  },
];

export default function ForBusinessesPage() {
  return (
    <>
      <PageHero
        title="For Businesses"
        padding="pb-[100px] pt-[110px] lg:pb-[159px] lg:pt-[130px]"
        ledeGap="mt-[50px]"
        ledeClassName="max-w-[690px] text-[17px] leading-[29px]"
        lede="We back founders building category-defining companies across Indonesia and the Gulf. Leverage our unique Shariah capital corridor to expand globally."
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
        <Container className="pb-[160px] pt-[169px]">
          <SectionTitle>Investment Criteria</SectionTitle>
          <div className="mt-[110px] grid gap-14 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:gap-[73px]">
            <ImageSlot
              src="/assets/for-businesses/founder-meeting.jpg"
              alt="A founder meeting in progress"
              ratio="aspect-[480/620]"
              rounded="rounded-lg"
            />
            <dl>
              {CRITERIA.map((item) => (
                <div
                  key={item.term}
                  className="grid gap-2 border-t border-rule py-[26px] last:border-b sm:grid-cols-[minmax(0,320px)_minmax(0,1fr)] sm:gap-8"
                >
                  <dt className="text-[19px] font-semibold text-indigo-brand">
                    {item.term}
                  </dt>
                  <dd className="text-[15px] leading-[24px] text-ink-muted">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Beyond capital */}
      <Section>
        <Container className="pb-[190px] pt-[169px]">
          <SectionTitle>Beyond Capital</SectionTitle>
          <ImageSlot
            className="mt-[88px]"
            src="/assets/for-businesses/strategy-room.jpg"
            alt="A strategy session"
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />

          <div className="mt-[83px] grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-10">
            <div>
              <p className="text-[84px] font-bold leading-none text-indigo-brand">
                06
              </p>
              <p className="t-eyebrow mt-[28px] text-ink/70">
                Structural Value Additions
              </p>
            </div>
            <dl>
              {VALUE_ADDS.map((item) => (
                <div
                  key={item.term}
                  className="grid gap-2 border-t border-rule py-[22px] last:border-b sm:grid-cols-[minmax(0,300px)_minmax(0,1fr)] sm:gap-8"
                >
                  <dt className="text-[19px] font-semibold text-indigo-brand">
                    {item.term}
                  </dt>
                  <dd className="text-[15px] leading-[24px] text-ink-muted">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <Container className="pb-[205px] pt-[170px]">
          <SectionTitle>Our Process</SectionTitle>
          <ImageSlot
            className="mt-[87px]"
            src="/assets/for-businesses/deal-desk.jpg"
            alt="The deal desk"
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />
          <div className="mt-[80px]">
            {PROCESS.map((step) => (
              <div
                key={step.n}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-[60px] border-t border-rule py-[30px] last:border-b sm:grid-cols-[80px_minmax(0,300px)_minmax(0,1fr)] sm:gap-x-10"
              >
                <span className="text-[41px] font-bold leading-none text-indigo-brand">
                  {step.n}
                </span>
                <h3 className="text-[19px] font-semibold text-indigo-brand">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-[24px] text-ink-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Companies backed */}
      <section className="bg-gold">
        <Container className="pb-[148px] pt-[129px]">
          <SectionTitle>Companies We&apos;ve Backed</SectionTitle>
          <ImageSlot
            className="mt-[72px]"
            src="/assets/for-businesses/site-visit.jpg"
            alt="A portfolio site visit"
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />
          <ul className="mt-[90px]">
            {BACKED.map(([name, sector, note]) => (
              <li
                key={name}
                className="grid items-center gap-3 border-t border-indigo-brand/25 py-[26px] last:border-b sm:grid-cols-3 sm:gap-10"
              >
                <p className="text-[21px] font-semibold text-indigo-brand">
                  {name}
                </p>
                <p className="t-eyebrow text-indigo-brand/80 sm:text-center">
                  {sector}
                </p>
                <p className="text-[17px] font-semibold text-indigo-brand sm:text-right">
                  {note}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Submit pitch */}
      <Section id="submit-pitch">
        <Container className="pb-[160px] pt-[161px]">
          <ImageSlot
            src="/assets/for-businesses/editorial-desk.jpg"
            alt="An editorial desk"
            ratio="aspect-[1250/239]"
            rounded="rounded-lg"
          />
          <SectionTitle className="mt-[89px]">Submit Your Pitch</SectionTitle>
          <p className="mt-[43px] max-w-[700px] text-[16px] leading-[26px] text-ink-muted">
            Fill out the institutional entry form below. Our cross-border
            evaluation committee processes requests weekly.
          </p>

          <form className="mt-[76px] max-w-[800px]">
            <div className="grid gap-x-10 gap-y-[33px] sm:grid-cols-2">
              <Field label="Company Name" placeholder="e.g. PT Tech Nusantara" />
              <Field label="Founder / Contact Name" placeholder="e.g. Faris Kuddah" />
              <Field
                label="Corporate Email"
                type="email"
                placeholder="founder@company.com"
              />
              <Field
                label="Primary Market Sector"
                placeholder="Fintech, Agritech, SaaS, etc."
              />
            </div>
            <Field
              className="mt-[33px]"
              label="Funding Stage & SP Total"
              placeholder="Pre-Series A, Series A, or specific Project Finance scale"
            />
            <Field
              className="mt-[33px]"
              label="Elevator Pitch"
              rows={4}
              placeholder="Describe your business, growth goals, and compliance alignment."
            />
            <SubmitButton className="mt-[43px]">Submit</SubmitButton>
          </form>

          <Link
            href="#"
            className="mt-[42px] inline-block text-[13px] font-semibold text-indigo-brand underline"
          >
            Download Investment Thesis (PDF)
          </Link>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="cream">
        <Container className="pb-[197px] pt-[169px]">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <dl className="mt-[110px]">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="grid gap-2 border-t border-rule py-[30px] last:border-b sm:grid-cols-[411px_minmax(0,1fr)] sm:gap-0"
              >
                <dt className="text-[19px] font-semibold text-indigo-brand">
                  {item.q}
                </dt>
                <dd className="text-[15px] leading-[24px] text-ink-muted">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
    </>
  );
}
