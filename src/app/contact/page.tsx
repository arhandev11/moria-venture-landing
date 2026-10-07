import type { Metadata } from "next";
import Link from "next/link";
import { Field, SubmitButton } from "@/components/form";
import {
  Container,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
  Supergraphic,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to our teams in Jakarta and Riyadh. We bridge institutional capital demands with high-growth Islamic Principle-compliant operations.",
};

const ROUTES = [
  {
    title: "For Investors & LPs",
    body: "Interested in allocating to our Islamic Principle bilateral fund corridor or requesting data room access?",
    cta: "Contact Investment Team",
    email: "investors@moriaventures.com",
  },
  {
    title: "For Businesses & Founders",
    body: "Looking for Islamic Principle-compliant growth capital, project financing, or GCC expansion support?",
    cta: "Contact Portfolio Team",
    email: "portfolio@moriaventures.com",
  },
];

const OFFICES = [
  { region: "Southeast Asia HQ", city: "Jakarta", photo: "/assets/contact/jakarta.webp" },
  { region: "GCC Regional HQ", city: "Riyadh", photo: "/assets/contact/riyadh.webp" },
];

const DIRECT_LINES = [
  { team: "Investor Relations", person: "Musab Bin Nosair", email: "ir@moriaglobal.com" },
  { team: "Media and Press", person: "Corporate Communications", email: "media@moriaglobal.com" },
  { team: "Portfolio Support", person: "Faris Achmad Kuddah", email: "ops@moriaglobal.com" },
  {
    team: "General Counsel",
    person: "Islamic Principle Audit & Regulatory Desk",
    email: "legal@moriaglobal.com",
  },
];

/** The deck's hairlines on this page are a cool grey, not the warm `rule`. */
const HAIRLINE = "border-hairline";

/**
 * The deck sets the second column 120px past the divider but the first only
 * 80px short of it, so the split is drawn explicitly at desktop width.
 */
const SPLIT = "grid gap-10 md:grid-cols-2 lg:grid-cols-[620px_minmax(0,1fr)] lg:gap-0";
const SPLIT_FIRST = "lg:pr-20";
const SPLIT_SECOND = `md:border-l md:pl-10 lg:pl-[119px] ${HAIRLINE}`;

const EYEBROW = "text-[12.5px] font-bold uppercase tracking-[0.02em]";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        padding="pb-[100px] pt-[110px] lg:pb-[123px] lg:pt-[73px]"
        ledeGap="mt-[28px]"
        ledeClassName="max-w-[720px] text-[21px] leading-[32px]"
        lede="Reach out to our teams in Jakarta and Riyadh. We bridge institutional capital demands with high-growth Islamic Principle-compliant operations."
      />

      {/* Routed paths */}
      <Section tone="cream">
        <Container className="pb-[116px] pt-[120px]">
          {/* Corners are baked into the artwork, so the slot stays square. */}
          <ImageSlot
            src="/assets/contact/routed-paths.webp"
            alt="The Moria reception"
            ratio="aspect-[1280/360]"
            rounded="rounded-none"
          />

          <SectionTitle className="mt-[74px]">Routed Paths</SectionTitle>

          <div className={`mt-[79px] ${SPLIT}`}>
            {ROUTES.map((route, i) => (
              <div key={route.title} className={i === 1 ? SPLIT_SECOND : SPLIT_FIRST}>
                <h3 className="text-[24px] font-semibold leading-[30px] text-indigo-brand">
                  {route.title}
                </h3>
                <p className="mt-[22px] text-[16px] leading-[26px] text-ink">
                  {route.body}
                </p>
                <p className={`mt-[25px] text-gold ${EYEBROW}`}>{route.cta}</p>
                <Link
                  href={`mailto:${route.email}`}
                  className="mt-[6px] inline-block text-[14px] text-ink hover:text-indigo-brand"
                >
                  {route.email}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Offices */}
      <Section tone="cream" className={`border-t ${HAIRLINE}`}>
        <Container className={`pb-[121px] pt-[120px] ${SPLIT}`}>
          {OFFICES.map((office, i) => (
            <div key={office.city} className={i === 1 ? SPLIT_SECOND : SPLIT_FIRST}>
              <ImageSlot
                src={office.photo}
                alt={`${office.city} skyline`}
                ratio="aspect-[9/4]"
                rounded="rounded-lg"
              />
              <p className={`mt-[37px] text-indigo-brand ${EYEBROW}`}>{office.region}</p>
              <h3 className="mt-[3px] text-[32px] font-bold leading-[38px] text-indigo-brand">
                {office.city}
              </h3>
            </div>
          ))}
        </Container>
      </Section>

      {/* General inquiries */}
      <Section className={`border-y ${HAIRLINE}`}>
        <Container className="pb-[119px] pt-[117px]">
          <SectionTitle>General Inquiries</SectionTitle>
          <p className="mt-[26px] max-w-[620px] text-[16px] leading-[24px] text-ink">
            Submit your investment criteria or business details. Our Islamic
            Principle compliance board and underwriting team review inquiries
            within 3 business days.
          </p>

          <form className="mt-[79px] max-w-[720px]">
            <div className="space-y-[26px]">
              <Field size="lg" label="Full Name" placeholder="e.g. Sarah Mansour" />
              <Field
                size="lg"
                label="Email Address"
                type="email"
                placeholder="e.g. sarah.m@company.com"
              />
              <Field
                size="lg"
                label="Phone Number"
                type="tel"
                placeholder="e.g. +62 812 3456 7890"
              />
            </div>
            <SubmitButton size="lg" className="mt-[31px]">
              Submit Inquiry
            </SubmitButton>
          </form>
        </Container>
      </Section>

      {/* Direct lines */}
      <section className="relative overflow-hidden bg-gold">
        <Supergraphic
          src="/assets/brand/supergraphic-direct-lines.svg"
          width={628}
          height={767}
          className="absolute right-0 top-0 hidden h-full w-auto md:block"
        />
        <Container className="relative pb-[117px] pt-[116px]">
          <h2 className="t-section text-indigo-brand">Direct Lines</h2>
          <p className="mt-[27px] max-w-[620px] text-[16px] leading-[24px] text-indigo-brand/70">
            Contact specific global execution teams directly for rapid
            resolution of operational, Islamic Principle compliance, or
            investor queries.
          </p>

          <div className="mt-[111px] grid gap-x-16 md:grid-cols-2">
            {DIRECT_LINES.map((line) => (
              <div key={line.team} className="border-b border-indigo-brand/20 pb-[28px] pt-[29px] first:pt-0 md:[&:nth-child(2)]:pt-0">
                <p className={`text-indigo-brand/60 ${EYEBROW}`}>{line.team}</p>
                <p className="mt-[15px] text-[22px] font-semibold leading-[28px] text-indigo-brand">
                  {line.person}
                </p>
                <Link
                  href={`mailto:${line.email}`}
                  className="mt-[4px] inline-block text-[15px] font-bold text-indigo-brand hover:underline"
                >
                  {line.email}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
