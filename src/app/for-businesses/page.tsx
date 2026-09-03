import type { Metadata } from "next";
import Link from "next/link";
import { Field, SubmitButton } from "@/components/form";
import {
  Button,
  Container,
  DefRow,
  Eyebrow,
  ImageSlot,
  NumberedItem,
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
        <Container className="py-20">
          <SectionTitle>Investment Criteria</SectionTitle>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
            <ImageSlot label="Founder meeting" ratio="aspect-3/4" />
            <dl>
              {CRITERIA.map((item) => (
                <DefRow key={item.term} term={item.term}>
                  {item.body}
                </DefRow>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Beyond capital */}
      <Section>
        <Container className="py-20">
          <SectionTitle>Beyond Capital</SectionTitle>
          <ImageSlot className="mt-12" label="Strategy session" ratio="aspect-[1066/300]" />

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
            <div>
              <p className="display text-indigo-brand text-[42px]">06</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/70">
                Structural Value Additions
              </p>
            </div>
            <dl>
              {VALUE_ADDS.map((item) => (
                <DefRow key={item.term} term={item.term}>
                  {item.body}
                </DefRow>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <Container className="py-20">
          <SectionTitle>Our Process</SectionTitle>
          <ImageSlot className="mt-12" label="Deal desk" ratio="aspect-[1066/300]" />
          <div className="mt-14">
            {PROCESS.map((step) => (
              <NumberedItem key={step.n} n={step.n} title={step.title}>
                {step.body}
              </NumberedItem>
            ))}
          </div>
        </Container>
      </Section>

      {/* Companies backed */}
      <section className="bg-gold">
        <Container className="py-20">
          <SectionTitle>Companies We&apos;ve Backed</SectionTitle>
          <ImageSlot className="mt-12" label="Portfolio site visit" ratio="aspect-[1066/300]" />
          <ul className="mt-12">
            {BACKED.map(([name, sector, note]) => (
              <li
                key={name}
                className="grid items-center gap-3 border-t border-indigo-brand/25 py-6 last:border-b sm:grid-cols-3 sm:gap-10"
              >
                <p className="text-[17px] font-semibold text-indigo-brand">
                  {name}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-brand/80 sm:text-center">
                  {sector}
                </p>
                <p className="text-[15px] font-semibold text-indigo-brand sm:text-right">
                  {note}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Submit pitch */}
      <Section id="submit-pitch">
        <Container className="py-20">
          <ImageSlot label="Editorial desk" ratio="aspect-[1066/300]" />
          <SectionTitle className="mt-14">Submit Your Pitch</SectionTitle>
          <p className="mt-6 max-w-lg text-[13px] leading-relaxed text-ink-muted">
            Fill out the institutional entry form below. Our cross-border
            evaluation committee processes requests weekly.
          </p>

          <form className="mt-12 max-w-3xl">
            <div className="grid gap-6 sm:grid-cols-2">
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
              className="mt-6"
              label="Funding Stage & SP Total"
              placeholder="Pre-Series A, Series A, or specific Project Finance scale"
            />
            <Field
              className="mt-6"
              label="Elevator Pitch"
              rows={4}
              placeholder="Describe your business, growth goals, and compliance alignment."
            />
            <SubmitButton className="mt-8">Submit</SubmitButton>
          </form>

          <Link
            href="#"
            className="mt-6 inline-block text-[12px] font-semibold text-indigo-brand underline"
          >
            Download Investment Thesis (PDF)
          </Link>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="cream">
        <Container className="py-20">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <dl className="mt-12">
            {FAQ.map((item) => (
              <DefRow key={item.q} term={item.q}>
                {item.a}
              </DefRow>
            ))}
          </dl>
          <Eyebrow className="mt-10 text-ink/50">
            Answers reflect the current fund cycle
          </Eyebrow>
        </Container>
      </Section>
    </>
  );
}
