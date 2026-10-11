import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { AnimatedSupergraphic } from "@/components/animated-supergraphic";
import { HubMapBackdrop, HubMapProvider, HubPicker, type Hub } from "@/components/kneks/hub-map";
import { KneksLogo } from "@/components/kneks/kneks-logo";
import { RequestAccessForm, ShortlistCard } from "@/components/kneks/request-access";
import { ShortlistProvider } from "@/components/kneks/shortlist";
import { SmeExplorer } from "@/components/kneks/sme-explorer";
import { getFormOptions, getPublishedSmes } from "@/lib/kneks-data";

export const metadata: Metadata = {
  title: "KNEKS × Moria",
  description:
    "Moria Ventures works with KNEKS to put Islamic Principle-compliant Indonesian SMEs in front of investors and VCs from MENA and Southeast Asia.",
};

/**
 * SMEs and the access form's choices come from the database, managed in
 * /admin. Admin edits call revalidatePath('/kneks'); the hourly revalidate is
 * only a backstop, e.g. for a build that ran without the database and fell
 * back to the seed content.
 */
export const revalidate = 3600;

const SUPPORT = [
  "Business and Islamic Principle compliance coaching",
  "Investment readiness (financials, governance, pitch)",
  "Introductions to investors, VCs and funding partners",
  "Cross-border access via the Moria Ventures network",
];

const STEPS = [
  { title: "Apply", body: "Share your business profile." },
  { title: "Screen", body: "Business and Islamic Principle review." },
  { title: "Prepare", body: "Build financials and your pitch." },
  { title: "Pitch", body: "Meet aligned investors." },
  { title: "Get funded", body: "Close the round and grow." },
];
/** Which of the steps above the cohort is in now, counting from one. */
const CURRENT_STEP = 3;

// Positions are on the 1440 x 882 map artwork, measured from the deck. Jakarta
// is the home base every route runs to.
const HUBS: Hub[] = [
  {
    name: "Riyadh",
    x: 169,
    y: 377,
    blurb:
      "Riyadh and the wider GCC: family offices, funds and institutions seeking halal-aligned growth deals.",
  },
  {
    name: "Dubai",
    x: 305,
    y: 400,
    blurb:
      "Dubai: regional VCs and cross-border platforms that co-invest in emerging markets.",
  },
  {
    name: "Kuala Lumpur",
    x: 693,
    y: 583,
    blurb:
      "Kuala Lumpur: Islamic finance houses and strategic partners for regional expansion.",
  },
  {
    name: "Singapore",
    x: 717,
    y: 608,
    blurb:
      "Singapore: VCs and corporates looking for vetted Indonesian SMEs to co-invest and partner.",
  },
  {
    name: "Jakarta",
    x: 745,
    y: 685,
    home: true,
    blurb:
      "Jakarta: home base. Deal screening, Islamic Principle review and local execution with KNEKS.",
  },
];

/** The deck's band: deep blue at the top left running to green at the bottom right. */
const BAND = "bg-[linear-gradient(116deg,#156ba5,#1db45f)]";

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

export default async function KneksPage() {
  const [smes, options] = await Promise.all([getPublishedSmes(), getFormOptions()]);

  return (
    <ShortlistProvider>
      {/*
        Hero, on the site's own light ground like every other page's. The band
        crops the mark with a clip rather than a hidden overflow: hidden makes
        the band a scroll container, and the mark's scroll scrub would then
        follow the band, which never scrolls, instead of the page.
      */}
      <section className="relative overflow-clip bg-shell">
        {/* 468 x 881 at 1440, hung off the right edge and above the band as the deck crops it. */}
        <AnimatedSupergraphic
          className="absolute -right-[96px] -top-[96px] h-[480px] w-[255px] lg:-right-[84px] lg:-top-[198px] lg:h-[881px] lg:w-[468px]"
        />
        <Wrap data-hero-reveal className="relative pb-[60px] pt-[40px] lg:pb-[61px] lg:pt-[66px]">
          <div className="flex items-center">
            <Image
              src="/assets/brand/logo-wordmark.svg"
              alt="Moria Ventures"
              width={323}
              height={49}
              priority
              className="h-[30px] w-auto min-w-0"
            />
            <span aria-hidden className="ml-2 mr-[22px] text-[13px] text-ink">×</span>
            <KneksLogo plate={false} />
          </div>
          <h1 data-reveal-lines className="t-hero mt-6 uppercase text-indigo-brand lg:mt-[22px]">
            Indonesian SMEs,
            <br className="hidden sm:block" /> ready for
            <br className="hidden sm:block" /> global capital.
          </h1>
          <p data-reveal-lines className="mt-[29px] max-w-[505px] text-[16px] leading-[26px] text-ink lg:text-[18px] lg:leading-[29px]">
            Moria Ventures works with KNEKS to put Islamic Principle-compliant
            SMEs in front of investors and VCs from MENA and Southeast Asia.
          </p>
          <div className="mt-[26px] flex flex-wrap gap-3">
            <a
              href="#smes"
              className="flex h-[50px] items-center gap-2 bg-gold px-5 text-[14px] font-semibold text-kneks-earth transition-colors hover:bg-gold-deep"
            >
              Meet the SMEs
              <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M8 2.5v11M3.5 9L8 13.5 12.5 9" />
              </svg>
            </a>
            <a
              href="#request-access"
              className="flex h-[50px] items-center border-2 border-indigo-brand px-6 text-[14px] font-semibold uppercase text-indigo-brand transition-colors hover:bg-indigo-brand hover:text-gold"
            >
              Become an investor partner
            </a>
          </div>
          <p className="mt-[25px] text-[13px] leading-[18px] text-kneks-muted">
            Islamic Principle-aligned businesses. Cross-border opportunity.
          </p>
        </Wrap>
      </section>

      {/* What KNEKS does */}
      <section id="about-kneks" className={`scroll-mt-[68px] ${BAND} text-white`}>
        <Wrap className="grid gap-12 pb-[61px] pt-[60px] lg:grid-cols-[minmax(0,1fr)_562px] lg:gap-10">
          <div>
            <p className="text-[12px] font-bold uppercase leading-[16px] tracking-[0.02em]">
              The institutional foundation
            </p>
            <h2 className="mt-[19px] text-[32px] font-bold leading-[1.1] tracking-[-0.01em] lg:text-[40px] lg:leading-[44px]">
              What KNEKS does
            </h2>
            <div className="mt-[21px] max-w-[490px] space-y-[26px] text-[16px] leading-[26px]">
              <p>
                KNEKS leads Indonesia&apos;s push to grow its Islamic economy and
                Islamic finance, bringing government, industry and financial
                institutions together around halal value chains and Islamic
                Principle-based business.
              </p>
              <p>
                SMEs sit at the center; many are strong operators with limited
                access to capital, and this program closes that gap.
              </p>
            </div>
          </div>

          <div className="self-start rounded-xl border border-kneks-line bg-white px-[31px] pb-[33px] pt-[25px] lg:mt-[1px]">
            <h3 className="text-[22px] font-bold leading-[30px] text-kneks-ink lg:text-[24px]">
              How the program supports SMEs
            </h3>
            <ul className="mt-[19px] space-y-[26px] text-[16px] leading-[26px] text-kneks-ink">
              {SUPPORT.map((item) => (
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
          <h2 className={`${H2} text-kneks-ink`}>How the program works</h2>
          <ol className="mt-[28px] grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => {
              const current = i + 1 === CURRENT_STEP;
              return (
                <li
                  key={step.title}
                  aria-current={current ? "step" : undefined}
                  className={`rounded-xl border border-t-[3px] px-[19px] pb-5 pt-[19px] lg:min-h-[180px] lg:pb-0 ${
                    current
                      ? "border-kneks-gold bg-kneks-sand"
                      : "border-kneks-pine bg-white"
                  }`}
                >
                  <p className={`text-[30px] font-bold leading-[34px] ${current ? "text-kneks-pine" : "text-kneks-gold"}`}>
                    {i + 1}
                  </p>
                  <p className="mt-[16px] text-[18px] font-bold leading-[24px] text-kneks-ink">{step.title}</p>
                  <p className="mt-[2px] text-[13px] leading-[21px] text-kneks-muted">{step.body}</p>
                  {current ? (
                    <p className="mt-[1px] flex items-center gap-1 text-[12px] font-semibold leading-[20px] text-kneks-pine">
                      <span aria-hidden>✓</span> Current stage
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <p className="mt-[30px] text-[13px] leading-[18px] text-kneks-muted">
            Stage {CURRENT_STEP} of {STEPS.length}: {STEPS[CURRENT_STEP - 1].title}
          </p>
        </Wrap>
      </section>

      {/* SME pipeline */}
      <section id="smes" className="scroll-mt-[68px] bg-white">
        <Wrap className="pb-[61px] pt-[57px]">
          <SmeExplorer smes={smes} />
        </Wrap>
      </section>

      {/* Funded graduates */}
      <section className={BAND}>
        <Wrap className="pb-[60px] pt-[57px]">
          <h2 className={`${H2} text-white`}>Graduates who raised funding</h2>
          <p className="mt-[13px] text-[16px] leading-[26px] text-white/85">
            Two sample graduates illustrate the cross-border funding pathway.
          </p>

          <div className="mt-[30px] flex flex-col gap-5 lg:flex-row lg:items-center">
            <article className="rounded-xl border border-kneks-gold/70 bg-kneks-sand px-[31px] pb-[38px] pt-[25px] lg:w-[700px] lg:shrink-0">
              <h3 className="text-[22px] font-bold leading-[30px] text-kneks-earth">Aman Logistik</h3>
              <p className="mt-[20px] text-[44px] font-bold leading-[1.1] tracking-[-0.015em] text-kneks-earth lg:text-[56px] lg:leading-[64px]">
                USD 600K
              </p>
              <p className="mt-[20px] text-[16px] font-semibold leading-[26px] text-kneks-earth">
                Raised from a MENA family office
              </p>
              <p className="mt-[22px] text-[16px] leading-[26px] text-kneks-earth">
                Placeholder story: logistics services connecting Indonesian SMEs
                with regional supply chains.
              </p>
              <blockquote className="mt-[27px] border-l-2 border-kneks-earth pl-[18px]">
                <p className="text-[16px] italic leading-[24px] text-kneks-earth">
                  &ldquo;The program helped us prepare for conversations beyond our home market.&rdquo;
                </p>
                <footer className="mt-[14px] text-[12px] leading-[18px] text-kneks-earth">
                  Illustrative founder quote · placeholder
                </footer>
              </blockquote>
            </article>

            <article className="rounded-xl bg-white px-[28px] pb-[35px] pt-[26px] lg:flex-1">
              <h3 className="text-[22px] font-bold leading-[30px] text-kneks-earth">Sehat Herbal</h3>
              <p className="mt-[16px] text-[40px] font-bold leading-[48px] tracking-[-0.015em] text-kneks-gold">
                USD 200K
              </p>
              <p className="mt-[18px] text-[16px] font-semibold leading-[26px] text-kneks-earth">Southeast Asia VC</p>
              <blockquote className="mt-[27px] border-l-2 border-kneks-gold pl-[14px]">
                <p className="text-[16px] italic leading-[26px] text-kneks-pine">
                  &ldquo;A clearer investment story opened the door to new partners.&rdquo;
                </p>
                <footer className="mt-[14px] text-[12px] leading-[18px] text-kneks-gold">
                  Illustrative founder quote · placeholder
                </footer>
              </blockquote>
            </article>
          </div>

          <p className="mt-[27px] text-[13px] leading-[18px] text-white/90">
            Mockup only. Names, figures and quotes are placeholders.
          </p>
        </Wrap>
      </section>

      {/* Investor hubs */}
      <section
        id="investor-regions"
        className="relative scroll-mt-[68px] overflow-clip bg-kneks-mist pb-10 lg:h-[882px] lg:pb-0"
      >
        <HubMapProvider hubs={HUBS}>
          <HubMapBackdrop />
          <Wrap className="pt-16 lg:pt-[142px]">
            <h2 className="relative text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-kneks-earth lg:text-[56px] lg:leading-[64px]">
              Open to international investors
            </h2>
            <p className="relative mt-[18px] text-[18px] font-semibold leading-[26px] text-kneks-earth lg:text-[22px] lg:leading-[30px]">
              Tap a hub to see who we are looking for there.
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
              Your next step
            </p>
            <h2 className={`${H2} mt-[21px] text-kneks-ink lg:leading-[41px]`}>
              Request investor
              <br className="hidden lg:block" /> access
            </h2>
            <p className="mt-[25px] text-[16px] leading-[26px] text-kneks-muted">
              Tell us your region and ticket size. We will send the current SME
              list and set up an intro call.
            </p>
            <div className="mt-[25px]">
              <ShortlistCard />
            </div>
          </div>
          <RequestAccessForm
            regions={options.regions}
            tickets={options.tickets}
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
