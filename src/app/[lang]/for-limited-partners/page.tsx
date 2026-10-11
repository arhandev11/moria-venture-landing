import Image from "next/image";
import { Field, SubmitButton } from "@/components/form";
import {
  Button,
  Container,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
  Supergraphic,
} from "@/components/ui";
import { format } from "@/i18n/format";
import { LocaleLink } from "@/i18n/locale-context";
import { lines } from "@/i18n/rich";
import { loadPage, metadataFor } from "@/i18n/server";

export const generateMetadata = ({ params }: PageProps<"/[lang]/for-limited-partners">) =>
  metadataFor(params, "/for-limited-partners", (d) => d.forLimitedPartners.meta);

/** The revised deck sets its small caps at 11px with no tracking, tighter than t-eyebrow. */
const EYEBROW = "text-[11px] font-bold uppercase leading-[14px]";

/** Company names and marks; the row's other cells come from the dictionary, in this order. */
const FOCUS = [
  { name: "NusaQu", logo: { src: "/assets/logos/nusaqu.svg", width: 57, height: 17 } },
  { name: "PT Dhuha", logo: { src: "/assets/logos/dhuha.svg", width: 31, height: 37 } },
  { name: "Hermoves", logo: { src: "/assets/logos/hermoves.png", width: 64, height: 15 } },
];

function PhotoBand({ src, alt }: { src: string; alt: string }) {
  return <ImageSlot src={src} alt={alt} ratio="aspect-[1440/520]" rounded="rounded-none" />;
}

export default async function ForLimitedPartnersPage({
  params,
}: PageProps<"/[lang]/for-limited-partners">) {
  const { dict } = await loadPage(params);
  const t = dict.forLimitedPartners;
  const fields = t.dataRoom.fields;

  return (
    <>
      <PageHero
        title={t.hero.title}
        padding="pb-[100px] pt-[110px] lg:pb-[119px] lg:pt-[113px]"
        ledeGap="mt-[53px]"
        // PageHero fixes a 55px gap above the actions; the deck sits them 13px closer.
        ledeClassName="max-w-[690px] text-[18px] leading-[30px] lg:text-[20px] lg:leading-[32px] lg:mb-[-13px]"
        lede={t.hero.lede}
        actions={
          <>
            <Button href="#data-room" tone="gold">
              {t.hero.register}
            </Button>
            <Button href="#performance" tone="outline">
              {t.hero.trackRecord}
            </Button>
          </>
        }
      />

      <PhotoBand src="/assets/lp/why-invest.webp" alt={t.photos.whyInvest} />

      {/* Why invest */}
      <Section tone="cream">
        <Container className="pb-[161px] pt-[156px]">
          <SectionTitle>{t.why.title}</SectionTitle>
          <dl className="mt-[83px]">
            {t.why.items.map((item, i) => (
              <div
                key={i}
                className="grid gap-3 border-t border-rule pb-[33px] pt-[30px] last:border-b sm:grid-cols-[411px_minmax(0,712px)] sm:gap-0"
              >
                <dt className="text-[21px] font-semibold leading-[24px] text-indigo-brand lg:text-[23px]">
                  {lines(item.term, "hidden sm:inline")}
                </dt>
                <dd className="text-[16px] leading-[26px] text-ink">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <PhotoBand src="/assets/lp/track-record.webp" alt={t.photos.trackRecord} />

      {/* Performance */}
      <Section id="performance">
        <Container className="pb-[160px] pt-[155px]">
          <SectionTitle>{t.performance.title}</SectionTitle>
          <div className="mt-[78px] grid gap-12 lg:grid-cols-[561px_minmax(0,1fr)] lg:gap-0">
            {/* The blended figure is the headline, so it sits larger and lower than the trio. */}
            <div className="lg:pt-[31px]">
              <p className="text-[64px] font-bold leading-none tracking-[-0.02em] text-indigo-brand lg:text-[80px]">
                <bdi dir="ltr">{t.performance.headline.value}</bdi>
              </p>
              <p className="mt-[18px] text-[13px] font-bold uppercase leading-[16px] text-ink">
                {t.performance.headline.label}
              </p>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-[281px_280px_minmax(0,1fr)] sm:gap-0">
                {t.performance.metrics.map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-[44px] font-bold leading-none tracking-[-0.02em] text-indigo-brand">
                      <bdi dir="ltr">{value}</bdi>
                    </p>
                    <p className={`${EYEBROW} mt-[20px] text-ink`}>{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-[40px] border-t border-rule pt-[36px] text-[15px] italic text-ink">
                {t.performance.note}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <PhotoBand src="/assets/lp/fund-structure.webp" alt={t.photos.fundStructure} />

      {/* Seed fund terms */}
      <Section tone="cream">
        <Container className="pb-[159px] pt-[156px]">
          <SectionTitle>{t.seedFund.title}</SectionTitle>
          <p className="mt-[15px] text-[18px] text-ink">
            {t.seedFund.lede}
          </p>
          <dl className="mt-[77px]">
            {t.seedFund.terms.map(({ label, value }) => (
              <div
                key={label}
                className="grid gap-2 border-t border-rule py-4 last:border-b sm:min-h-[66px] sm:grid-cols-[681px_minmax(0,1fr)] sm:items-center sm:gap-0 sm:py-0"
              >
                <dt className={`${EYEBROW} text-ink`}>{label}</dt>
                <dd className="text-[17px] font-semibold text-indigo-brand">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-[74px] text-[14px] italic text-ink">
            {t.seedFund.footnote}
          </p>
        </Container>
      </Section>

      <PhotoBand src="/assets/lp/gcc-module.webp" alt={t.photos.gcc} />

      {/* Gulf presence */}
      <section className="bg-gold">
        <Container className="pb-[163px] pt-[153px]">
          <SectionTitle>{t.gulf.title}</SectionTitle>
          <p className="mt-[22px] text-[18px] text-indigo-brand">
            {t.gulf.lede}
          </p>

          <div className="mt-[71px] grid gap-12 md:grid-cols-[minmax(0,677px)_minmax(0,1fr)] md:gap-0">
            <div className="space-y-[26px] md:pe-10">
              {t.gulf.items.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[20px] font-semibold text-indigo-brand">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-[630px] text-[16px] leading-[26px] text-indigo-brand">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-[45px] md:border-s md:border-white/30 md:ps-[73px] md:pt-[45px]">
              {t.gulf.stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[32px] font-bold leading-none text-indigo-brand">
                    <bdi dir="ltr">{value}</bdi>
                  </p>
                  <p className={`${EYEBROW} mt-[16px] text-indigo-brand`}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio focus */}
      <Section>
        <Container className="pb-[158px] pt-[154px]">
          <SectionTitle className="text-end">{t.focus.title}</SectionTitle>
          <div className="mt-[100px] overflow-x-auto lg:ms-[150px]">
            <table className="w-full min-w-[820px] table-fixed text-left rtl:text-right">
              <colgroup>
                <col className="w-[101px]" />
                <col className="w-[204px]" />
                <col className="w-[399px]" />
                <col className="w-[246px]" />
                <col />
              </colgroup>
              <thead>
                <tr className={`${EYEBROW} border-b-2 border-rule text-ink`}>
                  <th colSpan={2} className="pb-[13px] font-bold">{t.focus.columns.assetGroup}</th>
                  <th className="pb-[13px] font-bold">{t.focus.columns.corridorFocus}</th>
                  <th className="pb-[13px] font-bold">{t.focus.columns.jurisdiction}</th>
                  <th className="pb-[13px] pe-[26px] text-end font-bold">{t.focus.columns.allocationStage}</th>
                </tr>
              </thead>
              <tbody>
                {FOCUS.map((row, i) => (
                  <tr key={row.name} className="border-b-2 border-rule">
                    <td className="py-[23px] align-middle">
                      <Image
                        src={row.logo.src}
                        alt={format(dict.common.logoAlt, { name: row.name })}
                        width={row.logo.width}
                        height={row.logo.height}
                        className="block"
                        style={{ width: row.logo.width, height: row.logo.height }}
                      />
                    </td>
                    <td className="py-[23px] text-[23px] font-semibold leading-[26px] text-indigo-brand">
                      {row.name}
                    </td>
                    <td className="py-[23px] ps-[25px] text-[16px] text-ink">{t.focus.rows[i].focus}</td>
                    <td className="py-[23px] ps-[25px] text-[16px] text-ink">{t.focus.rows[i].jurisdiction}</td>
                    <td className={`${EYEBROW} py-[23px] text-end text-indigo-brand`}>{t.focus.rows[i].stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Data room request */}
      <section id="data-room" className="relative overflow-hidden bg-gold">
        <Supergraphic
          src="/assets/brand/supergraphic-data-room.svg"
          width={628}
          height={979}
          className="absolute inset-e-0 top-0 hidden h-full w-auto lg:block rtl:-scale-x-100"
        />
        <Container className="relative pb-[161px] pt-[156px]">
          <h2 className="t-section text-indigo-brand">{t.dataRoom.title}</h2>
          <p className="mt-6 max-w-[800px] text-[18px] leading-[19px] text-indigo-brand">
            {t.dataRoom.lede}
          </p>

          <div className="mt-[76px] grid gap-12 lg:grid-cols-[628px_480px] lg:gap-[80px]">
            <form className="space-y-3">
              <Field tone="on-gold" size="lg" name="full-name" label={fields.fullName.label} placeholder={fields.fullName.placeholder} />
              <Field tone="on-gold" size="lg" name="institution-firm" label={fields.institution.label} placeholder={fields.institution.placeholder} />
              <Field tone="on-gold" size="lg" name="business-email" label={fields.email.label} type="email" placeholder={fields.email.placeholder} />
              <Field tone="on-gold" size="lg" name="contact-phone" label={fields.phone.label} type="tel" placeholder={fields.phone.placeholder} />
              <Field tone="on-gold" size="lg" name="intended-ticket-size-usd-" label={fields.ticket.label} placeholder={fields.ticket.placeholder} />
            </form>

            <div className="lg:pt-[24px]">
              <SubmitButton tone="indigo" size="lg" className="w-full">
                {t.dataRoom.submit}
              </SubmitButton>
              <LocaleLink
                href="#"
                className="mt-[39px] flex h-[56px] items-center justify-center gap-3 border border-indigo-brand px-6 text-[15px] font-semibold text-indigo-brand transition-colors hover:bg-indigo-brand hover:text-gold"
              >
                <span className="underline underline-offset-2">
                  {t.dataRoom.download}
                </span>
                <svg
                  aria-hidden
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M2.5 11v2.5h11V11" />
                </svg>
              </LocaleLink>
              <p className="mt-[40px] text-[14px] leading-[21px] text-indigo-brand">
                {t.dataRoom.privacy}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
