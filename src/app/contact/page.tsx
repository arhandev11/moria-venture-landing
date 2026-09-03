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
    "Reach out to our teams in Jakarta and Riyadh. We bridge institutional capital demands with high-growth Shariah-compliant operations.",
};

const ROUTES = [
  {
    title: "For Investors & LPs",
    body: "Interested in allocating to our Shariah bilateral fund corridor or requesting data room access?",
    cta: "Contact Investment Team",
    email: "investors@moriaventures.com",
  },
  {
    title: "For Businesses & Founders",
    body: "Looking for Shariah-compliant growth capital, project financing, or GCC expansion support?",
    cta: "Contact Portfolio Team",
    email: "portfolio@moriaventures.com",
  },
];

const OFFICES = [
  {
    region: "Southeast Asia HQ",
    city: "Jakarta",
    photo: "/assets/contact/jakarta.jpg",
    address: [
      "Equity Tower, 49th Floor, SCBD",
      "Jl. Jend. Sudirman Kav. 52-53",
      "Jakarta Selatan 12190, Indonesia",
    ],
    phone: "+62 21 8062 4900",
    email: "jakarta@moriaglobal.com",
  },
  {
    region: "GCC Regional HQ",
    city: "Riyadh",
    photo: "/assets/contact/riyadh.jpg",
    address: [
      "King Abdullah Financial District",
      "King Fahd Road, Al Aqeeq",
      "Riyadh 13511, Kingdom of Saudi Arabia",
    ],
    phone: "+966 11 290 8800",
    email: "riyadh@moriaglobal.com",
  },
];

const DIRECT_LINES = [
  { team: "Investor Relations", person: "Musab Bin Nosair", email: "ir@moriaglobal.com" },
  { team: "Media and Press", person: "Corporate Communications", email: "media@moriaglobal.com" },
  { team: "Portfolio Support", person: "Faris Achmad Kuddah", email: "ops@moriaglobal.com" },
  { team: "General Counsel", person: "Shariah Audit & Regulatory Desk", email: "legal@moriaglobal.com" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        padding="pb-[100px] pt-[110px] lg:pb-[110px] lg:pt-[90px]"
        ledeGap="mt-[42px]"
        ledeClassName="max-w-[760px] text-[17px] leading-[29px]"
        lede="Reach out to our teams in Jakarta and Riyadh. We bridge institutional capital demands with high-growth Shariah-compliant operations."
      />

      {/* Routed paths */}
      <Section tone="cream">
        <Container className="pb-[150px] pt-[140px]">
          <ImageSlot src="/assets/contact/reception.jpg" alt="The Moria reception" ratio="aspect-[1280/319]" rounded="rounded-lg" />

          <SectionTitle className="mt-[110px]">Routed Paths</SectionTitle>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {ROUTES.map((route, i) => (
              <div
                key={route.title}
                className={i === 1 ? "md:border-l md:border-rule md:pl-10" : ""}
              >
                <h3 className="text-[21px] font-semibold text-indigo-brand">
                  {route.title}
                </h3>
                <p className="mt-4 max-w-md text-[16px] leading-[26px] text-ink-muted">
                  {route.body}
                </p>
                <p className="mt-6 t-eyebrow text-gold-deep">
                  {route.cta}
                </p>
                <Link
                  href={`mailto:${route.email}`}
                  className="mt-1 inline-block text-[16px] text-ink hover:text-indigo-brand"
                >
                  {route.email}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {OFFICES.map((office, i) => (
              <div
                key={office.city}
                className={i === 1 ? "md:border-l md:border-rule md:pl-10" : ""}
              >
                <ImageSlot
                  src={office.photo}
                  alt={`${office.city} skyline`}
                  ratio="aspect-[610/319]"
                />
                <p className="mt-6 t-eyebrow text-indigo-brand">
                  {office.region}
                </p>
                <h3 className="mt-2 text-[32px] font-bold leading-none text-indigo-brand">
                  {office.city}
                </h3>
                <address className="mt-5 space-y-1 text-[16px] not-italic leading-[26px] text-ink">
                  {office.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
                <p className="mt-5 text-[16px] font-semibold text-indigo-brand">
                  T: {office.phone}
                </p>
                <Link
                  href={`mailto:${office.email}`}
                  className="text-[16px] font-semibold text-indigo-brand hover:underline"
                >
                  E: {office.email}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* General inquiries */}
      <Section>
        <Container className="pb-[160px] pt-[160px]">
          <SectionTitle>General Inquiries</SectionTitle>
          <p className="mt-6 max-w-lg text-[16px] leading-[26px] text-ink-muted">
            Submit your investment criteria or business details. Our Shariah
            compliance board and underwriting team review inquiries within 3
            business days.
          </p>

          <form className="mt-12 max-w-xl space-y-6">
            <Field label="Full Name" placeholder="e.g. Sarah Mansour" />
            <Field
              label="Email Address"
              type="email"
              placeholder="e.g. sarah.m@company.com"
            />
            <Field label="Organization" placeholder="e.g. Al-Fahad Investments" />
            <Field
              label="Subject"
              placeholder="e.g. Limited Partner Inquiry - Fund II"
            />
            <Field
              label="Message"
              rows={5}
              placeholder="Provide details regarding asset allocation sizes or regulatory target alignment..."
            />
            <SubmitButton>Submit Inquiry</SubmitButton>
          </form>
        </Container>
      </Section>

      {/* Direct lines */}
      <section className="relative overflow-hidden bg-gold">
        <Supergraphic
          src="/assets/brand/supergraphic-hero.svg"
          className="absolute -right-32 -top-16 h-[160%] w-auto opacity-30 mix-blend-multiply"
        />
        <Container className="relative pb-[160px] pt-[150px]">
          <h2 className="t-section text-indigo-brand">Direct Lines</h2>
          <p className="mt-6 max-w-lg text-[16px] leading-[26px] text-indigo-brand/80">
            Contact specific global execution teams directly for rapid
            resolution of operational, Shariah compliance, or investor queries.
          </p>

          <div className="mt-14 grid gap-x-14 md:grid-cols-2">
            {DIRECT_LINES.map((line) => (
              <div
                key={line.team}
                className="border-b border-indigo-brand/25 py-7"
              >
                <p className="t-eyebrow text-indigo-brand/70">
                  {line.team}
                </p>
                <p className="mt-4 text-[17px] font-semibold text-indigo-brand">
                  {line.person}
                </p>
                <Link
                  href={`mailto:${line.email}`}
                  className="text-[16px] font-semibold text-indigo-brand hover:underline"
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
