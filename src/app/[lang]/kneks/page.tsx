import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { AnimatedSupergraphic } from "@/components/animated-supergraphic";
import { HubMapBackdrop, HubMapProvider, HubPicker, type Hub } from "@/components/kneks/hub-map";
import { KneksLogo } from "@/components/kneks/kneks-logo";
import { PipelineStats } from "@/components/kneks/pipeline-stats";
import { ProgramSteps } from "@/components/kneks/program-steps";
import { RequestAccessForm, ShortlistCard } from "@/components/kneks/request-access";
import { ShortlistProvider } from "@/components/kneks/shortlist";
import { SmeExplorer } from "@/components/kneks/sme-explorer";
import { SuccessStories } from "@/components/kneks/success-stories";
import { lines } from "@/i18n/rich";
import { loadPage, metadataFor } from "@/i18n/server";
import type { Dictionary } from "@/i18n/types";
import { getFormOptions, getPublishedSmes, pipelineStats } from "@/lib/kneks-data";
import { getPublishedStories } from "@/lib/stories-data";

export const generateMetadata = ({ params }: PageProps<"/[lang]/kneks">) =>
  metadataFor(params, "/kneks", (d) => d.kneks.meta);

/**
 * SMEs and the access form's choices come from the database, managed in
 * /admin, and are shown as stored (English) in every language. Admin edits
 * call revalidatePath('/[lang]/kneks', 'page'), refreshing all three; the
 * hourly revalidate is only a backstop, e.g. for a build that ran without the
 * database and fell back to the seed content.
 */
export const revalidate = 3600;

// Positions are on the 1440 x 882 map artwork, measured from the deck. Jakarta
// is the home base every route runs to. Names and blurbs are in the dictionary.
const HUBS: (Omit<Hub, "name" | "blurb"> & { key: keyof Dictionary["kneks"]["hubs"]["items"] })[] = [
  { key: "riyadh", x: 169, y: 377 },
  { key: "dubai", x: 305, y: 400 },
  { key: "kualaLumpur", x: 693, y: 583 },
  { key: "singapore", x: 717, y: 608 },
  { key: "jakarta", x: 745, y: 685, home: true },
];

/** The deck's band: deep blue at the top left running to green at the bottom right (mirrored in RTL). */
const BAND =
  "bg-[linear-gradient(116deg,#156ba5,#1db45f)] rtl:bg-[linear-gradient(244deg,#156ba5,#1db45f)]";

/**
 * The graduates' band: the same sweep, opened with Moria's indigo so the
 * funded section reads as Moria's own. Mirrored in RTL like BAND. White copy
 * sits at about 10:1 on the indigo end and 5:1 on the blue.
 */
const BAND_GRADUATES =
  "bg-[linear-gradient(116deg,#383189_0%,#156ba5_45%,#1db45f_100%)] rtl:bg-[linear-gradient(244deg,#383189_0%,#156ba5_45%,#1db45f_100%)]";

const H2 =
  "text-[30px] font-bold leading-[1.15] tracking-[-0.01em] lg:text-[38px] lg:leading-[44px]";

/** The deck's content column: 1120 wide, 160 in from each edge at 1440. */
function Wrap({ children, className = "", ...rest }: { children: ReactNode; className?: string } & ComponentProps<"div">) {
  return (
    <div data-reveal-group {...rest} className={`mx-auto w-full max-w-[1152px] px-6 lg:px-4 ${className}`}>
      {children}
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="mt-[5px] size-[15px] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M2.5 8.5l3.5 3.5 7.5-8.5" />
    </svg>
  );
}

export default async function KneksPage({ params }: PageProps<"/[lang]/kneks">) {
  const [{ lang, dict }, smes, options, stories] = await Promise.all([
    loadPage(params),
    getPublishedSmes(),
    getFormOptions(),
    getPublishedStories(),
  ]);
  const t = dict.kneks;
  const hubs: Hub[] = HUBS.map(({ key, ...hub }) => ({
    ...hub,
    name: key,
    label: t.hubs.items[key].name,
    blurb: t.hubs.items[key].blurb,
  }));

  return (
    <ShortlistProvider>
      {/*
        Hero, on the site's own light ground like every other page's. The band
        crops the mark with a clip rather than a hidden overflow: hidden makes
        the band a scroll container, and the mark's scroll scrub would then
        follow the band, which never scrolls, instead of the page.
      */}
      <section className="relative overflow-clip bg-shell">
        {/* 468 x 881 at 1440, hung off the end edge and above the band as the deck crops it. */}
        <AnimatedSupergraphic
          className="absolute -inset-e-[96px] -top-[96px] h-[480px] w-[255px] lg:-inset-e-[84px] lg:-top-[198px] lg:h-[881px] lg:w-[468px] rtl:-scale-x-100"
        />
        {/*
          Copy at the start, the pipeline's live figures in a column at the
          end, centred against it. The headline steps down from the deck's 80px
          beside the column so the Arabic, the longest at ~10.7px of width per px
          of size, still sets in three lines. Below lg the figures go under the
          copy. HeroReveal steps into the copy and brings the figures in as one
          block after the tagline.
        */}
        <Wrap
          data-hero-reveal
          className="relative grid gap-10 pb-[60px] pt-[40px] lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 lg:pb-[61px] lg:pt-[66px]"
        >
          <div>
            <div className="flex items-center">
              <Image
                src="/assets/brand/logo-wordmark.svg"
                alt="Moria Ventures"
                width={323}
                height={49}
                priority
                className="h-[30px] w-auto min-w-0"
              />
              <span aria-hidden className="ms-2 me-[22px] text-[13px] text-ink">×</span>
              <KneksLogo plate={false} alt={t.logoAlt} />
            </div>
            <h1 data-reveal-lines className="t-hero mt-6 uppercase text-indigo-brand lg:mt-[22px] lg:text-[length:clamp(38px,4.6vw,66px)]!">
              {lines(t.hero.title, "hidden sm:block")}
            </h1>
            <p data-reveal-lines className="mt-[29px] max-w-[505px] text-[16px] leading-[26px] text-ink lg:text-[18px] lg:leading-[29px]">
              {t.hero.lede}
            </p>
            <div className="mt-[26px] flex flex-wrap gap-3">
              <a
                href="#smes"
                className="flex h-[50px] items-center gap-2 bg-gold px-5 text-[14px] font-semibold text-kneks-earth transition-colors hover:bg-gold-deep"
              >
                {t.hero.meetSmes}
                <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M8 2.5v11M3.5 9L8 13.5 12.5 9" />
                </svg>
              </a>
              <a
                href="#request-access"
                className="flex h-[50px] items-center border-2 border-indigo-brand px-6 text-[14px] font-semibold uppercase text-indigo-brand transition-colors hover:bg-indigo-brand hover:text-gold"
              >
                {t.hero.becomePartner}
              </a>
            </div>
            <p className="mt-[25px] text-[13px] leading-[18px] text-kneks-muted">
              {t.hero.tagline}
            </p>
          </div>
          <PipelineStats stats={pipelineStats(smes)} labels={t.hero.stats} locale={lang} className="lg:self-center" />
        </Wrap>
      </section>

      {/* What KNEKS does */}
      <section id="about-kneks" className={`scroll-mt-[68px] ${BAND} text-white`}>
        <Wrap className="grid gap-12 pb-[61px] pt-[60px] lg:grid-cols-[minmax(0,1fr)_562px] lg:gap-10">
          <div>
            <p className="text-[12px] font-bold uppercase leading-[16px] tracking-[0.02em]">
              {t.about.eyebrow}
            </p>
            <h2 className="mt-[19px] text-[32px] font-bold leading-[1.1] tracking-[-0.01em] lg:text-[40px] lg:leading-[44px]">
              {t.about.title}
            </h2>
            <div className="mt-[21px] max-w-[490px] space-y-[26px] text-[16px] leading-[26px]">
              {t.about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="self-start rounded-xl border border-kneks-line bg-white px-[31px] pb-[33px] pt-[25px] lg:mt-[1px]">
            <h3 className="text-[22px] font-bold leading-[30px] text-kneks-ink lg:text-[24px]">
              {t.about.supportTitle}
            </h3>
            <ul className="mt-[19px] space-y-[26px] text-[16px] leading-[26px] text-kneks-ink">
              {t.about.support.map((item) => (
                <li key={item} className="flex gap-[8px]">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Wrap>
      </section>

      {/* How the program runs */}
      <section className="bg-kneks-mist">
        <Wrap className="pb-[60px] pt-[58px]">
          <h2 className={`${H2} text-kneks-ink`}>{t.program.title}</h2>
          <ProgramSteps labels={t.program} />
        </Wrap>
      </section>

      {/* SME pipeline */}
      <section id="smes" className="scroll-mt-[68px] bg-white">
        <Wrap className="pb-[61px] pt-[57px]">
          <SmeExplorer smes={smes} locale={lang} labels={t} />
        </Wrap>
      </section>

      {/* Success stories, managed in /admin; hidden while none is published. */}
      {stories.length ? (
        <section id="stories" className="scroll-mt-[68px] bg-kneks-mist">
          <Wrap className="pb-[61px] pt-[57px]">
            <SuccessStories stories={stories} locale={lang} labels={t.stories} />
          </Wrap>
        </section>
      ) : null}

      {/* Funded graduates */}
      <section className={BAND_GRADUATES}>
        <Wrap className="pb-[60px] pt-[57px]">
          <h2 className={`${H2} text-white`}>{t.graduates.title}</h2>
          <p className="mt-[13px] text-[16px] leading-[26px] text-white/85">
            {t.graduates.lede}
          </p>

          <div className="mt-[30px] flex flex-col gap-5 lg:flex-row lg:items-center">
            <article className="rounded-xl border border-kneks-gold/70 bg-kneks-sand px-[31px] pb-[38px] pt-[25px] lg:w-[700px] lg:shrink-0">
              <h3 className="text-[22px] font-bold leading-[30px] text-kneks-earth">{t.graduates.featured.name}</h3>
              <p className="mt-[20px] text-[44px] font-bold leading-[1.1] tracking-[-0.015em] text-kneks-earth lg:text-[56px] lg:leading-[64px]">
                <bdi dir="ltr">{t.graduates.featured.amount}</bdi>
              </p>
              <p className="mt-[20px] text-[16px] font-semibold leading-[26px] text-kneks-earth">
                {t.graduates.featured.source}
              </p>
              <p className="mt-[22px] text-[16px] leading-[26px] text-kneks-earth">
                {t.graduates.featured.story}
              </p>
              <blockquote className="mt-[27px] border-s-2 border-kneks-earth ps-[18px]">
                <p className="text-[16px] italic leading-[24px] text-kneks-earth">
                  {t.graduates.featured.quote}
                </p>
                <footer className="mt-[14px] text-[12px] leading-[18px] text-kneks-earth">
                  {t.graduates.quoteCaption}
                </footer>
              </blockquote>
            </article>

            <article className="rounded-xl bg-white px-[28px] pb-[35px] pt-[26px] lg:flex-1">
              <h3 className="text-[22px] font-bold leading-[30px] text-kneks-earth">{t.graduates.second.name}</h3>
              <p className="mt-[16px] text-[40px] font-bold leading-[48px] tracking-[-0.015em] text-kneks-gold">
                <bdi dir="ltr">{t.graduates.second.amount}</bdi>
              </p>
              <p className="mt-[18px] text-[16px] font-semibold leading-[26px] text-kneks-earth">{t.graduates.second.source}</p>
              <blockquote className="mt-[27px] border-s-2 border-kneks-gold ps-[14px]">
                <p className="text-[16px] italic leading-[26px] text-kneks-pine">
                  {t.graduates.second.quote}
                </p>
                <footer className="mt-[14px] text-[12px] leading-[18px] text-kneks-gold">
                  {t.graduates.quoteCaption}
                </footer>
              </blockquote>
            </article>
          </div>

          <p className="mt-[27px] text-[13px] leading-[18px] text-white/90">
            {t.graduates.disclaimer}
          </p>
        </Wrap>
      </section>

      {/* Investor hubs */}
      <section
        id="investor-regions"
        className="relative scroll-mt-[68px] overflow-clip bg-kneks-mist pb-10 lg:h-[882px] lg:pb-0"
      >
        <HubMapProvider hubs={hubs} labels={t.hubs}>
          <HubMapBackdrop />
          <Wrap className="pt-16 lg:pt-[142px]">
            <h2 className="relative text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-kneks-earth lg:text-[56px] lg:leading-[64px]">
              {t.hubs.title}
            </h2>
            <p className="relative mt-[18px] text-[18px] font-semibold leading-[26px] text-kneks-earth lg:text-[22px] lg:leading-[30px]">
              {t.hubs.lede}
            </p>
            <HubPicker />
          </Wrap>
        </HubMapProvider>
      </section>

      {/* Access request */}
      <section id="request-access" className="scroll-mt-[68px] bg-white">
        <Wrap className="grid gap-12 pb-[60px] pt-[62px] lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-[60px]">
          <div>
            <p className="text-[12px] font-bold uppercase leading-[16px] tracking-[0.02em] text-kneks-pine">
              {t.access.eyebrow}
            </p>
            <h2 className={`${H2} mt-[21px] text-kneks-ink lg:leading-[41px]`}>
              {lines(t.access.title, "hidden lg:block")}
            </h2>
            <p className="mt-[25px] text-[16px] leading-[26px] text-kneks-muted">
              {t.access.lede}
            </p>
            <div className="mt-[25px]">
              <ShortlistCard labels={t.shortlist} />
            </div>
          </div>
          <RequestAccessForm
            regions={options.regions}
            tickets={options.tickets}
            locale={lang}
            labels={t}
            smes={smes.map((sme) => ({
              name: sme.name,
              sector: sme.sector,
              city: sme.city,
              image: sme.image,
              funded: sme.status === "funded",
            }))}
          />
        </Wrap>
      </section>
    </ShortlistProvider>
  );
}
