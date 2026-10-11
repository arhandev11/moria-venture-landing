import Image from "next/image";
import {
  Button,
  Container,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { LocaleLink } from "@/i18n/locale-context";
import { lines } from "@/i18n/rich";
import { loadPage, metadataFor } from "@/i18n/server";

export const generateMetadata = ({ params }: PageProps<"/[lang]/for-businesses">) =>
  metadataFor(params, "/for-businesses", (d) => d.forBusinesses.meta);

// Display sizes measured off the 1440 render; the PNGs ship at 2x. The alt
// text is each company's own name, the same in every language.
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

export default async function ForBusinessesPage({ params }: PageProps<"/[lang]/for-businesses">) {
  const { dict } = await loadPage(params);
  const t = dict.forBusinesses;

  return (
    <>
      <PageHero
        title={lines(t.hero.title)}
        padding="pb-[100px] pt-[110px] lg:pb-[159px] lg:pt-[113px]"
        ledeGap="mt-[53px]"
        // The shared hero sets 55px above the buttons; the deck sits them closer.
        ledeClassName="max-w-[580px] text-[17.5px] leading-[29px] lg:-mb-[13px]"
        lede={t.hero.lede}
        actions={
          <>
            <Button href="#submit-pitch" tone="gold">
              {t.hero.apply}
            </Button>
            <Button href="/what-we-do" tone="outline">
              {t.hero.thesis}
            </Button>
          </>
        }
      />

      {/* Investment criteria */}
      <Section tone="cream">
        <Container className="pb-[160px] pt-[157px]">
          <SectionTitle>{t.criteria.title}</SectionTitle>
          <div className="mt-[83px] grid items-start gap-14 lg:grid-cols-[472px_minmax(0,1fr)] lg:gap-[80px]">
            <ImageSlot
              src="/assets/for-businesses/criteria.webp"
              alt={t.criteria.imageAlt}
              ratio="aspect-[944/1316]"
              rounded="rounded-lg"
            />
            <dl>
              {t.criteria.items.map((item) => (
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
          <SectionTitle>{t.beyondCapital.title}</SectionTitle>
          <ImageSlot
            className="mt-[84px]"
            src="/assets/for-businesses/how-we-help.webp"
            alt={t.beyondCapital.imageAlt}
            ratio="aspect-[2560/640]"
            rounded="rounded-lg"
          />

          <div className="mt-[80px] grid gap-10 lg:grid-cols-[minmax(0,419px)_minmax(0,1fr)] lg:gap-10">
            <div>
              <p className="-mt-[6px] text-[76px] font-bold leading-none text-indigo-brand">
                {t.beyondCapital.count}
              </p>
              <p className="mt-[16px] text-[13px] font-bold uppercase text-ink">
                {t.beyondCapital.countLabel}
              </p>
            </div>
            <dl>
              {t.beyondCapital.items.map((item) => (
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
          <SectionTitle>{t.process.title}</SectionTitle>
          <ImageSlot
            className="mt-[83px]"
            src="/assets/for-businesses/process.webp"
            alt={t.process.imageAlt}
            ratio="aspect-[2560/640]"
            rounded="rounded-lg"
          />
          <div className="mt-[80px]">
            {t.process.steps.map((step, i) => (
              <div
                key={step.title}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-[60px] gap-y-2 border-t-[2px] border-indigo-brand py-[39px] last:border-b-[2px] sm:grid-cols-[120px_minmax(0,350px)_minmax(0,660px)] sm:gap-x-0"
              >
                <span className="text-[44px] font-bold leading-none text-indigo-brand">
                  {String(i + 1).padStart(2, "0")}
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
          <SectionTitle className="lg:text-end">
            {t.backed.title}
          </SectionTitle>
          <ImageSlot
            className="mt-[68px]"
            src="/assets/for-businesses/portfolio.webp"
            alt={t.backed.imageAlt}
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
          <SectionTitle>{t.pitch.title}</SectionTitle>
          <p className="mt-[17px] max-w-[700px] text-[15.5px] leading-[24px] text-ink">
            {t.pitch.body}
          </p>
          {/* Taller than the shared Button and white-on-indigo, per the deck. */}
          <LocaleLink
            href="/contact"
            className="t-label mt-[18px] inline-flex h-[50px] w-[195px] items-center justify-center bg-indigo-brand text-white transition-colors hover:bg-indigo-brand/90"
          >
            {t.pitch.cta}
          </LocaleLink>
        </Container>
      </Section>
    </>
  );
}
