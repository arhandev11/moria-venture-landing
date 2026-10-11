import type { ReactNode } from "react";
import { CtaBand } from "@/components/cta-band";
import {
  AnchorNav,
  Container,
  ImageSlot,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { loadPage, metadataFor } from "@/i18n/server";

export const generateMetadata = ({ params }: PageProps<"/[lang]/what-we-do">) =>
  metadataFor(params, "/what-we-do", (d) => d.whatWeDo.meta);

/** Right-hand spec stack on the two capital-product sections. */
function SpecList({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="border-b border-rule">
      {items.map(({ label, value }) => (
        <div key={label} className="border-t border-rule pb-[17px] pt-[14px]">
          <dt className="text-[12px] font-bold uppercase leading-none text-ink">
            {label}
          </dt>
          <dd className="mt-[7px] text-[32px] font-semibold leading-[32px] text-indigo-brand">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Body copy beside the spec stack; the deck spaces the two sections' paragraphs differently. */
function ProductBody({
  children,
  spacing,
}: {
  children: ReactNode;
  spacing: string;
}) {
  return <div className={`${spacing} text-[17px] leading-[31px] text-ink`}>{children}</div>;
}

const PRODUCT_GRID =
  "mt-[64px] grid gap-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-[100px]";

export default async function WhatWeDoPage({ params }: PageProps<"/[lang]/what-we-do">) {
  const { dict } = await loadPage(params);
  const t = dict.whatWeDo;

  return (
    <>
      <PageHero
        title={t.hero.title}
        padding="pb-[100px] pt-[110px] lg:pb-[122px] lg:pt-[93px]"
        lede={t.hero.lede}
        ledeGap="mt-[52px]"
        ledeClassName="max-w-[680px] text-[24px] leading-[36px]"
      />

      <AnchorNav
        dividers={false}
        items={[
          { label: t.anchors.ventureCapital, href: "#venture-capital" },
          { label: t.anchors.projectFinance, href: "#project-finance" },
          { label: t.anchors.ventureBuilding, href: "#venture-building" },
          { label: t.anchors.criteria, href: "#investment-criteria" },
        ]}
      />

      {/* 01 Venture Capital */}
      <Section id="venture-capital">
        <Container className="pb-[119px] pt-[123px]">
          {/* The block hugs the end edge while its lines share a start edge. */}
          <div className="lg:ms-auto lg:w-fit">
            <p className="text-[77px] font-bold leading-none text-indigo-brand">01</p>
            <SectionTitle className="mt-[26px]">{t.ventureCapital.title}</SectionTitle>
          </div>

          <ImageSlot
            className="mt-[67px]"
            src="/assets/what-we-do/venture-capital.webp"
            alt={t.ventureCapital.imageAlt}
            ratio="aspect-[1280/560]"
            rounded="rounded-lg"
          />

          <div className={PRODUCT_GRID}>
            <ProductBody spacing="space-y-[31px]">
              {t.ventureCapital.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </ProductBody>
            <SpecList items={t.ventureCapital.specs} />
          </div>
        </Container>
      </Section>

      {/* 02 Project Finance */}
      <Section tone="cream" id="project-finance">
        <Container className="pb-[119px] pt-[117px]">
          <p className="text-[77px] font-bold leading-none text-indigo-brand">02</p>
          <SectionTitle className="mt-[20px]">{t.projectFinance.title}</SectionTitle>

          <ImageSlot
            className="mt-[67px]"
            src="/assets/what-we-do/project-finance.webp"
            alt={t.projectFinance.imageAlt}
            ratio="aspect-[1280/560]"
            rounded="rounded-lg"
          />

          <div className={PRODUCT_GRID}>
            <ProductBody spacing="space-y-[24px]">
              {t.projectFinance.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </ProductBody>
            <SpecList items={t.projectFinance.specs} />
          </div>
        </Container>
      </Section>

      {/* 03 Venture Building */}
      <Section id="venture-building">
        <Container className="pb-[119px] pt-[117px]">
          <div className="lg:ms-auto lg:w-fit">
            <p className="text-[77px] font-bold leading-none text-indigo-brand">03</p>
            <SectionTitle className="mt-[20px]">{t.ventureBuilding.title}</SectionTitle>
          </div>

          <ImageSlot
            className="mt-[67px]"
            src="/assets/what-we-do/venture-building.webp"
            alt={t.ventureBuilding.imageAlt}
            ratio="aspect-[1280/560]"
            rounded="rounded-lg"
          />

          <dl className="mt-[64px] lg:ms-[294px]">
            {t.ventureBuilding.items.map((item) => (
              <div
                key={item.term}
                className="grid gap-2 border-t border-rule pb-[31px] pt-[32px] last:border-b sm:grid-cols-[400px_minmax(0,1fr)] sm:gap-0"
              >
                <dt className="-mt-[6px] text-[24px] font-semibold leading-[30px] text-indigo-brand">
                  {item.term}
                </dt>
                <dd className="text-[16px] leading-[26px] text-ink">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 04 Investment Criteria */}
      <Section tone="cream" id="investment-criteria">
        <Container className="pb-[119px] pt-[117px]">
          <p className="text-[77px] font-bold leading-none text-indigo-brand">04</p>
          <SectionTitle className="mt-[21px]">{t.criteria.title}</SectionTitle>

          <dl className="mt-[66px]">
            {t.criteria.items.map(({ label, value }) => (
              <div
                key={label}
                className="grid gap-2 border-t border-rule pb-[26px] pt-[21px] last:border-b sm:grid-cols-[400px_minmax(0,1fr)] sm:gap-0"
              >
                <dt className="text-[12px] font-bold uppercase leading-[12px] text-ink">
                  {label}
                </dt>
                <dd className="text-[18px] leading-[18px] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* The deck sets this band 12px tighter on top than the shared default. */}
      <CtaBand dict={dict} />
    </>
  );
}
