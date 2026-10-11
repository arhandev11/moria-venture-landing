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
import { format } from "@/i18n/format";
import { loadPage, metadataFor } from "@/i18n/server";

export const generateMetadata = ({ params }: PageProps<"/[lang]/contact">) =>
  metadataFor(params, "/contact", (d) => d.contact.meta);

/** Addresses per routed path, in the dictionary's order. */
const ROUTE_EMAILS = ["investors@moriaventures.com", "portfolio@moriaventures.com"];

/** Office photos, in the dictionary's order. */
const OFFICE_PHOTOS = ["/assets/contact/jakarta.webp", "/assets/contact/riyadh.webp"];

/** Addresses per direct line, in the dictionary's order. */
const DIRECT_EMAILS = [
  "ir@moriaglobal.com",
  "media@moriaglobal.com",
  "ops@moriaglobal.com",
  "legal@moriaglobal.com",
];

/** The deck's hairlines on this page are a cool grey, not the warm `rule`. */
const HAIRLINE = "border-hairline";

/**
 * The deck sets the second column 120px past the divider but the first only
 * 80px short of it, so the split is drawn explicitly at desktop width.
 */
const SPLIT = "grid gap-10 md:grid-cols-2 lg:grid-cols-[620px_minmax(0,1fr)] lg:gap-0";
const SPLIT_FIRST = "lg:pe-20";
const SPLIT_SECOND = `md:border-s md:ps-10 lg:ps-[119px] ${HAIRLINE}`;

const EYEBROW = "text-[12.5px] font-bold uppercase tracking-[0.02em]";

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { dict } = await loadPage(params);
  const t = dict.contact;
  const fields = t.inquiries.fields;

  return (
    <>
      <PageHero
        title={t.hero.title}
        padding="pb-[100px] pt-[110px] lg:pb-[123px] lg:pt-[73px]"
        ledeGap="mt-[28px]"
        ledeClassName="max-w-[720px] text-[21px] leading-[32px]"
        lede={t.hero.lede}
      />

      {/* Routed paths */}
      <Section tone="cream">
        <Container className="pb-[116px] pt-[120px]">
          {/* Corners are baked into the artwork, so the slot stays square. */}
          <ImageSlot
            src="/assets/contact/routed-paths.webp"
            alt={t.routed.imageAlt}
            ratio="aspect-[1280/360]"
            rounded="rounded-none"
          />

          <SectionTitle className="mt-[74px]">{t.routed.title}</SectionTitle>

          <div className={`mt-[79px] ${SPLIT}`}>
            {t.routed.routes.map((route, i) => (
              <div key={route.title} className={i === 1 ? SPLIT_SECOND : SPLIT_FIRST}>
                <h3 className="text-[24px] font-semibold leading-[30px] text-indigo-brand">
                  {route.title}
                </h3>
                <p className="mt-[22px] text-[16px] leading-[26px] text-ink">
                  {route.body}
                </p>
                <p className={`mt-[25px] text-gold ${EYEBROW}`}>{route.cta}</p>
                <Link
                  href={`mailto:${ROUTE_EMAILS[i]}`}
                  className="mt-[6px] inline-block text-[14px] text-ink hover:text-indigo-brand"
                >
                  {ROUTE_EMAILS[i]}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Offices */}
      <Section tone="cream" className={`border-t ${HAIRLINE}`}>
        <Container className={`pb-[121px] pt-[120px] ${SPLIT}`}>
          {t.offices.map((office, i) => (
            <div key={office.city} className={i === 1 ? SPLIT_SECOND : SPLIT_FIRST}>
              <ImageSlot
                src={OFFICE_PHOTOS[i]}
                alt={format(dict.common.skylineAlt, { city: office.city })}
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
          <SectionTitle>{t.inquiries.title}</SectionTitle>
          <p className="mt-[26px] max-w-[620px] text-[16px] leading-[24px] text-ink">
            {t.inquiries.lede}
          </p>

          <form className="mt-[79px] max-w-[720px]">
            <div className="space-y-[26px]">
              <Field size="lg" name="full-name" label={fields.fullName.label} placeholder={fields.fullName.placeholder} />
              <Field
                size="lg"
                name="email-address"
                label={fields.email.label}
                type="email"
                placeholder={fields.email.placeholder}
              />
              <Field
                size="lg"
                name="phone-number"
                label={fields.phone.label}
                type="tel"
                placeholder={fields.phone.placeholder}
              />
            </div>
            <SubmitButton size="lg" className="mt-[31px]">
              {t.inquiries.submit}
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
          className="absolute inset-e-0 top-0 hidden h-full w-auto md:block rtl:-scale-x-100"
        />
        <Container className="relative pb-[117px] pt-[116px]">
          <h2 className="t-section text-indigo-brand">{t.directLines.title}</h2>
          <p className="mt-[27px] max-w-[620px] text-[16px] leading-[24px] text-indigo-brand/70">
            {t.directLines.lede}
          </p>

          <div className="mt-[111px] grid gap-x-16 md:grid-cols-2">
            {t.directLines.lines.map((line, i) => (
              <div key={line.team} className="border-b border-indigo-brand/20 pb-[28px] pt-[29px] first:pt-0 md:[&:nth-child(2)]:pt-0">
                <p className={`text-indigo-brand/60 ${EYEBROW}`}>{line.team}</p>
                <p className="mt-[15px] text-[22px] font-semibold leading-[28px] text-indigo-brand">
                  {line.person}
                </p>
                <Link
                  href={`mailto:${DIRECT_EMAILS[i]}`}
                  className="mt-[4px] inline-block text-[15px] font-bold text-indigo-brand hover:underline"
                >
                  {DIRECT_EMAILS[i]}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
