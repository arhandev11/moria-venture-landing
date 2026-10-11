import {
  Button,
  Container,
  Eyebrow,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { lines } from "@/i18n/rich";
import { loadPage, metadataFor } from "@/i18n/server";

export const generateMetadata = ({ params }: PageProps<"/[lang]/corridor">) =>
  metadataFor(params, "/corridor", (d) => d.corridor.meta);

export default async function CorridorPage({ params }: PageProps<"/[lang]/corridor">) {
  const { dict } = await loadPage(params);
  const t = dict.corridor;

  return (
    <>
      <PageHero
        title={lines(t.hero.title)}
        padding="pb-[100px] pt-[110px] lg:pb-[119px] lg:pt-[110px]"
        ledeGap="mt-[36px]"
        ledeClassName="max-w-[640px] text-[21px] leading-[32px]"
        lede={t.hero.lede}
        actionsInline
        actions={
          <>
            <Button href="/for-limited-partners" tone="gold">
              {dict.common.imInvestor}
            </Button>
            <Button href="/for-businesses" tone="outline">
              {dict.common.imBusiness}
            </Button>
          </>
        }
      />

      {/* Full-bleed pairing of the two capitals */}
      <ImageSlot
        src="/assets/corridor/hero-split.jpg"
        alt={t.hero.imageAlt}
        ratio="aspect-[1440/321]"
        rounded="rounded-none"
      />

      <Section>
        <Container className="pb-[70px] pt-[68px]">
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {t.stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-[63px] font-bold leading-none text-indigo-brand">
                  <bdi dir="ltr">{value}</bdi>
                </p>
                <p className="t-eyebrow mt-[15px] text-ink/70">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* The opportunity */}
      <Section tone="cream">
        <Container className="pb-[145px] pt-[141px]">
          <h2 className="text-[33px] font-bold leading-none text-indigo-brand">
            {t.opportunity.title}
          </h2>

          <ImageSlot
            className="mt-[82px]"
            src="/assets/corridor/opportunity.jpg"
            alt={t.opportunity.imageAlt}
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />

          <div className="mt-[73px] grid gap-14 lg:grid-cols-[minmax(0,470px)_minmax(0,1fr)] lg:gap-[80px]">
            <div>
              <p className="text-[104px] font-bold leading-none text-indigo-brand">
                <bdi dir="ltr">{t.opportunity.figure}</bdi>
              </p>
              <p className="t-eyebrow mt-[16px] text-ink/70">
                {t.opportunity.figureLabel}
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-[19px] font-semibold leading-[26px] text-ink">
                {t.opportunity.lead}
              </p>
              {t.opportunity.body.map((p) => (
                <p key={p} className="text-[16px] leading-[26px] text-ink-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* How we bridge */}
      <Section tone="cream" className="border-t border-rule/60">
        <Container className="pb-[147px] pt-[149px]">
          <SectionTitle>{t.bridge.title}</SectionTitle>
          <ImageSlot
            className="mt-[72px]"
            src="/assets/corridor/how-we-bridge.jpg"
            alt={t.bridge.imageAlt}
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />
          <div className="mt-[66px] grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[57px]">
            {t.bridge.items.map((item, i) => (
              <div key={item.title}>
                <p className="text-[51px] font-bold leading-none text-indigo-brand">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-[37px] text-[19px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-[16px] text-[14px] leading-[21px] text-ink-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partners */}
      <section className="bg-gold">
        <Container className="pb-[140px] pt-[150px]">
          <SectionTitle>{t.partners.title}</SectionTitle>
          <ImageSlot
            className="mt-[68px]"
            src="/assets/corridor/partners.jpg"
            alt={t.partners.imageAlt}
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />
          <ul className="mt-[70px]">
            {t.partners.items.map(({ name, body }) => (
              <li
                key={name}
                className="grid gap-2 border-t border-indigo-brand/25 py-[22px] last:border-b sm:grid-cols-[minmax(0,420px)_minmax(0,1fr)_auto] sm:items-center sm:gap-10"
              >
                <p className="text-[19px] font-semibold text-indigo-brand">
                  {name}
                </p>
                <p className="text-[15px] text-indigo-brand/85">{body}</p>
                <p className="t-eyebrow text-indigo-brand/70 sm:text-end">
                  {t.partners.status}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Corridor in action */}
      <Section>
        <Container className="pb-[145px] pt-[142px]">
          <Eyebrow>{t.inAction.eyebrow}</Eyebrow>
          <SectionTitle className="mt-[62px]">
            {t.inAction.title}
          </SectionTitle>

          <ImageSlot
            className="mt-[72px] lg:ms-[170px]"
            src="/assets/corridor/nusaqu.jpg"
            alt={t.inAction.imageAlt}
            ratio="aspect-[1110/319]"
            rounded="rounded-lg"
          />

          <div className="mt-[62px] grid gap-14 lg:grid-cols-[minmax(0,550px)_minmax(0,1fr)] lg:gap-[80px]">
            <div>
              <h3 className="text-[32px] font-bold leading-none text-indigo-brand">
                {t.inAction.caseTitle}
              </h3>
              <p className="mt-[46px] max-w-[500px] text-[16px] leading-[26px] text-ink-muted">
                {t.inAction.caseBody}
              </p>
              <div className="mt-[51px] flex gap-12 sm:gap-[100px]">
                {t.inAction.stats.map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-[52px] font-bold leading-none text-indigo-brand">
                      <bdi dir="ltr">{value}</bdi>
                    </p>
                    <p className="t-eyebrow mt-[14px] text-ink/70">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-[30px]">
              {t.inAction.blocks.map((block) => (
                <div key={block.label}>
                  <h4 className="text-[19px] font-semibold text-indigo-brand">
                    {block.label}
                  </h4>
                  <p className="mt-[10px] text-[14px] leading-[21px] text-ink-muted">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Dual entity */}
      <Section>
        <Container className="pb-[140px] pt-[141px]">
          <ImageSlot
            src="/assets/corridor/dual-entity.jpg"
            alt={t.dualEntity.imageAlt}
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />
          <h2 className="mt-[65px] text-[33px] font-bold leading-none text-indigo-brand">
            {t.dualEntity.title}
          </h2>
          <p className="mt-[28px] max-w-[1250px] text-[16px] leading-[26px] text-ink-muted">
            {t.dualEntity.body}
          </p>
          <ul className="mt-[55px]">
            {t.dualEntity.capabilities.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-6 border-t border-rule py-[18px] last:border-b"
              >
                <span className="text-[17px] font-semibold text-ink">{item}</span>
                <span className="t-eyebrow text-indigo-brand">{t.dualEntity.tag}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* QRIS */}
      <Section tone="cream">
        <Container className="pb-[130px] pt-[177px]">
          <SectionTitle className="text-[30px] leading-[1.05] lg:text-[60px]">
            {t.qris.title}
          </SectionTitle>
          <p className="mt-[30px] max-w-[1260px] text-[16px] leading-[26px] text-ink-muted">
            {t.qris.body}
          </p>

          <ImageSlot
            className="mt-[70px]"
            src="/assets/corridor/qris.jpg"
            alt={t.qris.imageAlt}
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />

          <Eyebrow className="mt-[66px] text-ink/70">
            {t.qris.eyebrow}
          </Eyebrow>
          <p className="mt-[22px] max-w-[1220px] text-[16px] leading-[26px] text-ink-muted">
            {t.qris.bridgeBody}
          </p>

          <div className="mt-[59px] grid gap-10 sm:grid-cols-2 lg:w-2/3">
            {t.qris.stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-[104px] font-bold leading-none text-indigo-brand">
                  <bdi dir="ltr">{value}</bdi>
                </p>
                <p className="t-eyebrow mt-[17px] text-ink/70">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Explore */}
      <Section>
        <Container className="pb-[139px] pt-[149px]">
          <SectionTitle>{t.explore.title}</SectionTitle>
          <ImageSlot
            className="mt-[72px]"
            src="/assets/corridor/trade-map.jpg"
            alt={t.explore.imageAlt}
            ratio="aspect-[1280/319]"
            rounded="rounded-lg"
          />

          <div className="mt-[82px] grid gap-14 md:grid-cols-2 md:gap-[57px]">
            <div>
              <h3 className="text-[24px] font-semibold text-indigo-brand">
                {t.explore.investors.title}
              </h3>
              <p className="mt-[26px] max-w-[600px] text-[16px] leading-[26px] text-ink-muted">
                {t.explore.investors.body}
              </p>
              <div className="mt-[34px]">
                <Button href="/for-limited-partners" tone="gold">
                  {t.explore.investors.cta}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-[24px] font-semibold text-indigo-brand">
                {t.explore.businesses.title}
              </h3>
              <p className="mt-[26px] max-w-[600px] text-[16px] leading-[26px] text-ink-muted">
                {t.explore.businesses.body}
              </p>
              <div className="mt-[34px]">
                <Button href="/for-businesses" tone="outline">
                  {t.explore.businesses.cta}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
