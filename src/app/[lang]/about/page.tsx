import Image from "next/image";
import { AnimatedSupergraphic } from "@/components/animated-supergraphic";
import { CtaBand } from "@/components/cta-band";
import {
  AnchorNav,
  Container,
  Eyebrow,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { lines, rich } from "@/i18n/rich";
import { loadPage, metadataFor } from "@/i18n/server";

export const generateMetadata = ({ params }: PageProps<"/[lang]/about">) =>
  metadataFor(params, "/about", (d) => d.about.meta);

/** Names and portraits stay as they are in every language; roles and bios are translated. */
const BOARD: {
  name: string;
  /** Left out where no portrait has been shot yet; the card keeps its shape. */
  photo?: string;
}[] = [
  { name: "Husni Muhammad", photo: "/assets/team/wide-husni.png" },
  { name: "Riko Mersandro", photo: "/assets/team/wide-riko.png" },
  { name: "Faris Achmad Kuddah", photo: "/assets/team/wide-faris.png" },
  { name: "Musab Mazen Bin Nosair", photo: "/assets/team/wide-musab.png" },
];

/** Portrait crop as drawn in the deck: 580 x 246 at 1440. */
const PORTRAIT_RATIO = "aspect-[580/246]";

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { dict } = await loadPage(params);
  const t = dict.about;

  return (
    <>
      {/* Hero — 452px tall in the deck. The mark is drawn far larger than the
          band and cropped by it, so only its upper sweep shows, bleeding off
          the right edge (the left, mirrored, on a right-to-left page). */}
      <PageHero
        title={t.hero.title}
        padding="pb-[100px] pt-[70px] lg:pb-[122px] lg:pt-[74px]"
        ledeGap="mt-[35px] lg:mt-[44px]"
        ledeClassName="max-w-[790px] text-[16px] leading-[26px] md:text-[18px] md:leading-[28px] lg:text-[20px] lg:leading-[30px]"
        markClassName="absolute inset-e-0 top-0 h-[300px] w-[159px] opacity-40 sm:opacity-100 lg:-inset-e-[87px] lg:-top-[258px] lg:h-[885px] lg:w-[470px] rtl:-scale-x-100"
        lede={t.hero.lede}
      />

      <AnchorNav
        items={[
          { label: t.anchors.whoWeAre, href: "#who-we-are" },
          {
            label: t.anchors.compliance,
            href: "#islamic-principle-compliance",
          },
          { label: t.anchors.leadership, href: "#leadership" },
        ]}
      />

      {/* Who we are */}
      <Section id="who-we-are">
        <Container className="pb-[118px] pt-[118px]">
          <Eyebrow>{t.whoWeAre.eyebrow}</Eyebrow>
          <SectionTitle className="mt-[21px]">
            {t.whoWeAre.title}
          </SectionTitle>

          {/* The deck draws the pair at 637 and 631 wide with a 12px seam. */}
          <div className="mt-[84px] grid gap-[12px] md:grid-cols-[637fr_631fr]">
            <ImageSlot
              src="/assets/about/jakarta.webp"
              alt={t.whoWeAre.jakartaAlt}
              ratio="aspect-[637/420]"
              rounded="rounded-none"
            />
            <ImageSlot
              src="/assets/about/riyadh.webp"
              alt={t.whoWeAre.riyadhAlt}
              ratio="aspect-[631/420]"
              rounded="rounded-none"
            />
          </div>

          <div className="mt-[71px] grid gap-14 md:grid-cols-2 md:gap-[48px]">
            <div>
              <h3 className="text-[26px] font-semibold text-ink">
                {t.whoWeAre.storyTitle}
              </h3>
              <p className="mt-[17px] text-[16px] leading-[26px] text-ink">
                {t.whoWeAre.story}
              </p>
            </div>
            <div>
              <h3 className="text-[26px] font-semibold text-ink">
                {t.whoWeAre.mandateTitle}
              </h3>
              <p className="mt-[17px] text-[16px] leading-[26px] text-ink">
                {t.whoWeAre.mandate}
              </p>
            </div>
          </div>

          <div className="mt-[80px]">
            <Eyebrow>{t.whoWeAre.milestonesEyebrow}</Eyebrow>
            {/* Hairlines sit 32px ahead of each later column's text, so the
                first column is the narrower one. */}
            <div className="mt-[32px] grid gap-8 sm:grid-cols-2 lg:grid-cols-[296fr_328fr_328fr_328fr] lg:gap-0">
              {t.whoWeAre.milestones.map(({ year, text }) => (
                <div
                  key={year}
                  className="lg:border-s lg:border-rule lg:ps-8 lg:first:border-s-0 lg:first:ps-0"
                >
                  <p className="text-[26px] font-bold leading-none text-indigo-brand">
                    {year}
                  </p>
                  <p className="mt-[11px] text-[14px] leading-[20px] text-ink">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Islamic principle governance */}
      <Section
        tone="cream"
        id="islamic-principle-compliance"
        className="relative overflow-clip"
      >
        {/* Only the lower sweep of the mark shows: it starts above the band
            and is cropped by it, on the right beside the title block. */}
        <AnimatedSupergraphic className="absolute -inset-e-[60px] top-0 h-[560px] w-[297px] lg:-top-[480px] lg:inset-e-[20px] lg:h-[989px] lg:w-[525px] rtl:-scale-x-100" />
        <Container className="relative pb-[120px] pt-[118px]">
          <Eyebrow>{t.governance.eyebrow}</Eyebrow>
          <SectionTitle className="mt-[21px]">
            {lines(t.governance.title)}
          </SectionTitle>
          <p className="mt-[26px] max-w-[760px] text-[18px] leading-[29px] text-ink">
            {t.governance.lede}
          </p>

          <div className="mt-[82px] grid md:grid-cols-2 md:gap-x-[32px]">
            {t.governance.items.map((item, i) => (
              // Rows share their hairlines: every item draws its own bottom
              // rule, the first row also draws the top one. The deck sets the
              // second row lower inside its band than the first.
              <div
                key={item.title}
                className="grid grid-cols-[72px_minmax(0,1fr)] border-b border-rule pb-[32px] pt-[27px] first:border-t md:grid-cols-[120px_minmax(0,1fr)] md:[&:nth-child(2)]:border-t md:[&:nth-child(n+3)]:pt-[59px]"
              >
                <span className="text-[40px] font-bold leading-[0.8] text-indigo-brand md:mt-[6px] md:text-[47px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[20px] font-semibold leading-[24px] text-indigo-brand">
                    {item.title}
                  </h3>
                  <p className="mt-[7px] text-[16px] leading-[26px] text-ink">
                    {rich(item.body, { br: () => <br /> })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section id="leadership">
        <Container className="pb-[120px] pt-[118px]">
          <div className="text-center">
            <Eyebrow>{t.leadership.eyebrow}</Eyebrow>
            <SectionTitle className="mx-auto mt-[21px] max-w-[900px]">
              {t.leadership.title}
            </SectionTitle>
          </div>

          <div className="mt-[124px] grid gap-y-[80px] border-b border-rule pb-[40px] md:grid-cols-2 md:gap-x-[120px] md:gap-y-[160px]">
            {BOARD.map((person, i) => (
              <article key={person.name}>
                {person.photo ? (
                  <div
                    className={`relative ${PORTRAIT_RATIO} overflow-hidden rounded-lg bg-cream`}
                  >
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 580px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ImageSlot
                    label={t.leadership.portraitPlaceholder}
                    ratio={PORTRAIT_RATIO}
                    rounded="rounded-lg"
                  />
                )}
                <h3 className="mt-[7px] text-[24px] font-semibold text-indigo-brand">
                  {person.name}
                </h3>
                <p className="mt-[8px] text-[16px] font-semibold text-ink">
                  {t.leadership.board[i].role}
                </p>
                <p className="mt-[12px] text-[14px] leading-[21px] text-ink">
                  {t.leadership.board[i].body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand dict={dict} />
    </>
  );
}
