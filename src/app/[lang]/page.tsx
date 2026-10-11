import Image from "next/image";
import { AnimatedSupergraphic } from "@/components/animated-supergraphic";
import { CtaBand } from "@/components/cta-band";
import { HeroSlider } from "@/components/hero-slider";
import { KneksLogo } from "@/components/kneks/kneks-logo";
import { LogoMarquee } from "@/components/logo-marquee";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { lines, rich } from "@/i18n/rich";
import { loadPage, metadataFor } from "@/i18n/server";
import type { Dictionary } from "@/i18n/types";

/** The homepage keeps the site's own title and description. */
export const generateMetadata = ({ params }: PageProps<"/[lang]">) =>
  metadataFor(params, "/", (d) => ({ description: d.site.description }));

/** One icon per engine, in the dictionary's order. */
const ENGINE_ICONS = [
  "/assets/homepage/icon-venture-capital.svg",
  "/assets/homepage/icon-short-cycle-yield.svg",
  "/assets/homepage/icon-venture-builder.svg",
];

// Colour versions on purpose: the homepage strip is the one place the
// portfolio shows in full brand colour.
const PORTFOLIO_LOGOS = [
  { src: "/assets/logos/moria-fund.svg", alt: "Moria Fund", width: 217, height: 43 },
  { src: "/assets/logos/nusaqu.svg", alt: "NusaQu", width: 100, height: 30 },
  { src: "/assets/logos/dhuha.svg", alt: "Dhuha", width: 51, height: 60 },
  { src: "/assets/logos/beliayam.png", alt: "BeliAyam", width: 139, height: 35 },
  { src: "/assets/logos/hermoves.png", alt: "HerMoves", width: 171, height: 40 },
];

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { dict } = await loadPage(params);
  const t = dict.home;

  return (
    <>
      {/*
        Hero, the founder's quote and the metrics share one backdrop: the deck
        runs a single supergraphic down the right of all three rather than one
        per block, so it is anchored here and the blocks above it stay
        transparent. The quote card and the metrics band frost their own
        backdrop so the mark reads softly through them. On a right-to-left
        page the mark runs down the left, mirrored.

        The crop is a clip, not a hidden overflow: hidden makes this box a
        scroll container, and the mark's scroll scrub then follows this box,
        which never scrolls, instead of the page.
      */}
      <div className="relative overflow-clip bg-shell">
        <AnimatedSupergraphic className="absolute inset-e-0 top-0 h-[900px] w-[478px] opacity-50 sm:opacity-100 lg:h-[1700px] lg:w-[903px] rtl:-scale-x-100" />

        {/*
          The hero slides between the firm itself and the KNEKS partnership.
          The first panel is transparent so the mark behind it shows through;
          the second carries its own ground and covers it.

          The hero fills the screen below the header and no more, so the type
          and the gaps between it scale with the screen's height as well as its
          width: a short laptop screen gets a smaller headline rather than a
          hero to scroll past.
        */}
        <HeroSlider
          labels={dict.heroSlider}
          slides={[
            {
              label: t.hero.slideLabel,
              content: (
                <Section tone="none" className="relative flex h-full flex-col justify-center">
                  <Container data-hero-reveal className="pb-[clamp(72px,10svh,112px)] pt-[clamp(16px,3svh,64px)]">
                    <Image
                      src="/assets/brand/wordmark-hero.svg"
                      alt="Moria Ventures"
                      width={388}
                      height={59}
                      priority
                      className="h-[min(40px,5svh)] w-auto lg:h-[min(57px,6.4svh)]"
                    />
                    {/* Line breaks are set to match the deck exactly. */}
                    <h1
                      data-reveal-lines
                      className="t-hero mt-[min(40px,4svh)] uppercase text-indigo-brand lg:mt-[min(41px,4.5svh)] text-[length:clamp(28px,min(max(5.56vw,min(38px,5svh)),9svh),80px)]!"
                    >
                      {lines(t.hero.title)}
                    </h1>
                    <p
                      data-reveal-lines
                      className="t-lede mt-[min(40px,4svh)] max-w-[640px] text-ink lg:mt-[min(52px,5.8svh)] text-[length:clamp(15px,min(max(1.46vw,16px),2.4svh),21px)]!"
                    >
                      {rich(t.hero.lede, {
                        b: (text) => <span className="font-semibold text-indigo-brand">{text}</span>,
                      })}
                    </p>
                    {/* Narrower buttons on a phone, so the pair shares one row. */}
                    <div className="mt-[min(48px,4.5svh)] flex flex-wrap gap-3 max-sm:[&>a]:px-5 sm:gap-4 lg:mt-[min(48px,5.3svh)]">
                      <Button href="/for-limited-partners" tone="indigo">
                        {dict.common.imInvestor}
                      </Button>
                      <Button href="/for-businesses" tone="outline">
                        {dict.common.imFounder}
                      </Button>
                    </div>
                  </Container>
                </Section>
              ),
            },
            {
              label: t.kneksSlide.slideLabel,
              dark: true,
              content: <KneksSlide t={t.kneksSlide} logoAlt={dict.kneks.logoAlt} />,
            },
          ]}
        />

        {/* Founder's quote */}
        <Container className="relative pb-[52px]">
          <figure className="mx-auto max-w-[868px] rounded-[24px] border border-white/90 bg-white/40 px-6 pb-[36px] pt-[34px] text-center backdrop-blur-[10px] sm:px-10">
            <blockquote className="mx-auto max-w-[730px] text-[18px] leading-[1.6] text-ink lg:text-[22px] lg:leading-[37.5px]">
              {t.quote.text}
            </blockquote>
            <figcaption className="mt-[39px] text-[15px] text-indigo-brand">
              {t.quote.attribution}
            </figcaption>
            <Image
              src="/assets/brand/logo-coin.svg"
              alt=""
              aria-hidden
              width={59}
              height={59}
              className="mx-auto mt-[34px] size-[58px]"
            />
          </figure>
        </Container>

        {/* Headline metrics */}
        <section className="relative border-y border-hairline bg-shell/55 backdrop-blur-[10px]">
          <Container className="py-[64px] lg:pb-[76px] lg:pt-[75px]">
            <dl className="mx-auto grid max-w-[1200px] grid-cols-2 gap-y-12 lg:grid-cols-4">
              {t.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse items-center text-center lg:border-s lg:border-[#d8dce0] lg:first:border-s-0"
                >
                  <dt className="mt-[23px] text-[11px] font-bold uppercase leading-none tracking-[0.02em] text-ink">
                    {stat.label}
                  </dt>
                  <dd className="text-[44px] font-bold leading-none tracking-[-0.02em] text-indigo-brand lg:text-[67px]">
                    <bdi dir="ltr">{stat.value}</bdi>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      </div>

      {/* Investment engines */}
      <Section tone="cream">
        <Container className="py-14 lg:pb-[96px] lg:pt-[91px]">
          <SectionTitle className="text-center">{t.engines.title}</SectionTitle>
          <div className="mx-auto mt-10 grid max-w-[1236px] lg:mt-[76px] gap-6 lg:grid-cols-3">
            {t.engines.items.map((engine, i) => (
              <article
                key={engine.name}
                className="rounded-xl bg-white px-8 pb-[30px] pt-[31px]"
              >
                <Image
                  src={ENGINE_ICONS[i]}
                  alt=""
                  aria-hidden
                  width={60}
                  height={100}
                  className="h-[100px] w-[60px]"
                />
                <h3 className="mt-[26px] text-[22px] font-semibold leading-[1.3] text-ink">
                  {engine.name}
                </h3>
                <p className="mt-[30px] text-[16px] leading-[26px] text-ink">
                  {engine.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Value proposition */}
      <Section className="border-t border-hairline">
        <Container className="py-14 lg:pb-[95px] lg:pt-[88px]">
          <SectionTitle className="text-center">{t.valueProps.title}</SectionTitle>
          <div className="mt-10 flex flex-col gap-12 lg:mt-[83px] lg:flex-row lg:items-stretch lg:justify-between">
            <div className="relative aspect-[458/852] w-[240px] shrink-0 self-center lg:ms-3 lg:self-auto lg:w-[303px]">
              {/* The corners are rounded in the image itself. */}
              <Image
                src="/assets/homepage/value-proposition.webp"
                alt={t.valueProps.imageAlt}
                fill
                sizes="303px"
                className="object-cover"
              />
            </div>
            <dl className="lg:w-[886px]">
              {t.valueProps.items.map((item) => (
                <div
                  key={item.term}
                  className="grid gap-3 border-t-[1.5px] border-[#b78d37]/70 pb-[34px] pt-[28px] last:border-b-[1.5px] sm:grid-cols-[302px_minmax(0,520px)] sm:gap-0"
                >
                  <dt className="text-[22px] font-semibold leading-[26px] text-indigo-brand">
                    {item.term}
                  </dt>
                  <dd className="text-[16px] leading-[26px] text-indigo-brand">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Corridor. The map hangs off the end edge but is never mirrored: it is geography. */}
      <Section tone="cream" className="relative overflow-hidden border-t border-hairline">
        <Image
          src="/assets/homepage/world-map.svg"
          alt=""
          aria-hidden
          width={767}
          height={382}
          className="pointer-events-none absolute inset-e-0 top-0 w-[60%] max-w-[767px] select-none lg:w-[767px]"
        />
        <Container className="relative py-16 lg:pb-[158px] lg:pt-[155px]">
          <SectionTitle>{t.corridor.title}</SectionTitle>
          <div className="mt-10 grid gap-16 lg:mt-[78px] lg:grid-cols-2 lg:gap-[57px]">
            <div>
              <h3 className="text-[20px] font-bold lg:text-[24px] leading-[1.2] text-ink">
                {t.corridor.subtitle}
              </h3>
              <p className="mt-[30px] max-w-[608px] text-[16px] leading-[26px] text-ink">
                {t.corridor.body}
              </p>
            </div>
            <div className="lg:pt-[3px]">
              <p className="text-[10px] font-bold uppercase leading-[1.4] tracking-[0.04em] text-ink">
                {t.corridor.linksLabel}
              </p>
              <ul className="mt-5 space-y-[20px]">
                {t.corridor.ecosystem.map((item) => (
                  <li key={item.name}>
                    <p className="text-[17px] font-bold leading-[22px] text-ink">
                      {item.name}
                    </p>
                    <p className="mt-[3px] text-[14px] leading-[20px] text-ink">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Portfolio */}
      <Section className="border-b border-hairline py-14 lg:pb-[133px] lg:pt-[76px]">
        <Container>
          <SectionTitle className="text-center">{t.portfolio.title}</SectionTitle>
        </Container>
        <LogoMarquee logos={PORTFOLIO_LOGOS} className="mt-10 lg:mt-[90px]" />
      </Section>

      <CtaBand dict={dict} />
    </>
  );
}

/**
 * The second hero panel: the KNEKS partnership. KNEKS's own account of itself
 * (kneks.go.id, Tentang Kami) is condensed into the lede and the three facts.
 */
function KneksSlide({
  t,
  logoAlt,
}: {
  t: Dictionary["home"]["kneksSlide"];
  logoAlt: string;
}) {
  return (
    // The blue holds through the first third so the copy, which sits at the
    // start edge, keeps its contrast; the green opens out behind the facts.
    // A right-to-left page turns the sweep around with the copy.
    <section className="flex h-full flex-col justify-center bg-[linear-gradient(116deg,#156ba5_30%,#1db45f)] text-white rtl:bg-[linear-gradient(244deg,#156ba5_30%,#1db45f)]">
      <Container className="grid gap-16 pb-[clamp(72px,10svh,112px)] pt-[clamp(16px,3svh,64px)] xl:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <div data-slide-rise className="flex items-center gap-4 sm:gap-5">
            <Image
              src="/assets/brand/wordmark-hero.svg"
              alt="Moria Ventures"
              width={388}
              height={59}
              className="h-6 w-auto min-w-0 object-contain object-left sm:h-8 lg:h-[min(44px,5svh)] rtl:object-right"
            />
            <span aria-hidden className="text-[18px] leading-none text-white lg:text-[22px]">
              ×
            </span>
            <KneksLogo alt={logoAlt} />
          </div>
          <h2
            data-slide-rise
            className="t-hero mt-[min(32px,3.6svh)] uppercase lg:mt-[min(41px,4.5svh)] text-[length:clamp(28px,min(max(5.56vw,min(38px,5svh)),9svh),80px)]!"
          >
            {lines(t.title, "hidden sm:block")}
          </h2>
          <p
            data-slide-rise
            className="t-lede mt-[min(40px,4svh)] max-w-[680px] lg:mt-[min(52px,5.8svh)] text-[length:clamp(15px,min(max(1.46vw,16px),2.4svh),21px)]!"
          >
            {rich(t.lede, { b: (text) => <span className="font-semibold">{text}</span> })}
          </p>
          <div data-slide-rise className="mt-[min(48px,4.5svh)] flex flex-wrap gap-3 max-sm:[&>a]:px-5 sm:gap-4 lg:mt-[min(48px,5.3svh)]">
            <Button href="/kneks" tone="gold">
              {t.explore}
            </Button>
            <a
              href="https://kneks.go.id/tentang-kami"
              target="_blank"
              rel="noreferrer"
              className="t-label inline-flex h-[47px] items-center justify-center gap-2 border border-white px-[34px] transition-colors hover:bg-white hover:text-[#156ba5]"
            >
              {t.about}
              <svg viewBox="0 0 16 16" aria-hidden className="size-3 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M4 12l8-8M6 4h6v6" />
              </svg>
            </a>
          </div>
        </div>

        {/*
          Only beside the copy, from xl up. Stacked under it they would make
          this panel, and so the whole hero, taller than the first.
        */}
        <dl data-slide-rise className="hidden gap-4 self-center xl:grid">
          {t.facts.map((fact) => (
            <div
              key={fact.value}
              className="rounded-xl border border-white/25 bg-white/10 px-6 py-5 backdrop-blur-[6px]"
            >
              <dt className="text-[28px] font-bold leading-[34px] tracking-[-0.01em] text-gold">
                {fact.value}
              </dt>
              <dd className="mt-2 text-[14px] leading-[21px]">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
