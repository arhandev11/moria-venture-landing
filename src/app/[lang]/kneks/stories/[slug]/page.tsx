import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowIcon,
  SampleBadge,
  StoryBody,
  StoryCover,
  storyEyebrow,
} from "@/components/kneks/success-stories";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { pageMetadata } from "@/i18n/metadata";
import { localizePath } from "@/i18n/paths";
import { loadPage } from "@/i18n/server";
import { formatStoryDate, getPublishedStories, getStoryBySlug } from "@/lib/stories-data";

/**
 * One success story, in every language: the story itself as entered
 * (English), the labels around it translated.
 *
 * Published stories are prerendered for each language at build; one
 * published later renders on its first visit (dynamicParams) and is cached
 * from then on. Admin edits call revalidatePath on this route's pattern, so
 * every story in every language refreshes; a story that was hidden or
 * deleted then renders as the 404. The hourly revalidate is the backstop.
 */
export const revalidate = 3600;
export const dynamicParams = true;

/** Runs once per language from the [lang] layout's params. */
export async function generateStaticParams() {
  return (await getPublishedStories()).map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/kneks/stories/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const story = await getStoryBySlug(slug);
  if (!story) return {};
  const t = (await getDictionary(lang)).kneks.stories;
  const title = format(t.metaTitle, { title: story.title });
  return {
    ...pageMetadata(lang, `/kneks/stories/${story.slug}`, { title, description: story.excerpt }),
    openGraph: {
      type: "article",
      title,
      description: story.excerpt,
      ...(story.cover ? { images: [{ url: story.cover, alt: story.coverAlt ?? "" }] } : {}),
    },
  };
}

export default async function StoryPage({ params }: PageProps<"/[lang]/kneks/stories/[slug]">) {
  const [{ lang, dict }, { slug }] = await Promise.all([loadPage(params), params]);
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const t = dict.kneks.stories;
  const kneks = localizePath(lang, "/kneks");
  const eyebrow = storyEyebrow(story);
  const date = formatStoryDate(lang, story.publishedAt);

  return (
    <article className="bg-shell">
      <div data-reveal-group className="mx-auto w-full max-w-[848px] px-6 pb-[72px] pt-[36px] lg:px-4 lg:pt-[48px]">
        <Link
          href={`${kneks}#stories`}
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-kneks-pine transition-colors hover:text-kneks-blue"
        >
          <ArrowIcon back />
          {t.back}
        </Link>

        <header className="mt-[30px]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {eyebrow ? (
              <p className="text-[12px] font-bold uppercase leading-[16px] tracking-[0.02em] text-kneks-pine">
                <bdi>{eyebrow}</bdi>
              </p>
            ) : null}
            {story.sample ? <SampleBadge>{t.sample}</SampleBadge> : null}
          </div>
          <h1
            lang="en"
            dir="ltr"
            className="mt-[16px] text-start text-[32px] font-bold leading-[1.15] tracking-[-0.015em] text-kneks-ink lg:text-[46px] lg:leading-[54px]"
          >
            {story.title}
          </h1>
          <p lang="en" dir="ltr" className="mt-[16px] text-start text-[18px] leading-[29px] text-kneks-muted">
            {story.excerpt}
          </p>
          <p className="mt-[18px] text-[14px] leading-[20px] text-kneks-muted">
            <time dateTime={story.publishedAt}>{format(t.published, { date })}</time>
            {story.sourceLine ? (
              <>
                <span aria-hidden className="mx-2">·</span>
                <bdi lang="en">{story.sourceLine}</bdi>
              </>
            ) : null}
          </p>
          {story.sample ? (
            <p className="mt-[20px] rounded-lg border border-kneks-gold/70 bg-kneks-sand px-[16px] py-[12px] text-[14px] leading-[22px] text-kneks-earth">
              {t.sampleNote}
            </p>
          ) : null}
          {t.englishOnly ? <p className="mt-[14px] text-[13px] leading-[18px] text-kneks-muted">{t.englishOnly}</p> : null}
        </header>

        {story.cover ? <StoryCover cover={story.cover} alt={story.coverAlt} priority className="mt-[34px] rounded-xl" /> : null}

        <StoryBody body={story.body} className="mt-[36px]" />

        {story.sme ? (
          <aside className="mt-[48px] rounded-xl border border-kneks-line bg-white px-[26px] pb-[26px] pt-[22px]">
            <h2 className="text-[20px] font-bold leading-[28px] text-kneks-ink">
              {format(t.aboutSme, { name: story.sme.name })}
            </h2>
            <p className="mt-[10px] text-[16px] leading-[26px] text-kneks-muted">
              {format(t.aboutSmeBody, { name: story.sme.name })}
            </p>
            {story.sme.sector ? (
              <p className="mt-[12px] text-[14px] leading-[20px] text-kneks-ink">
                <span className="font-semibold">{t.sector}:</span> <bdi>{story.sme.sector}</bdi>
              </p>
            ) : null}
            <Link
              href={`${kneks}#smes`}
              className="mt-[16px] inline-flex items-center gap-2 text-[14px] font-semibold text-kneks-pine transition-colors hover:text-kneks-blue"
            >
              {t.seeSmes}
              <ArrowIcon />
            </Link>
          </aside>
        ) : null}

        <section className="mt-[24px] rounded-xl bg-[linear-gradient(116deg,#156ba5,#1db45f)] px-[26px] pb-[28px] pt-[24px] text-white rtl:bg-[linear-gradient(244deg,#156ba5,#1db45f)]">
          <h2 className="text-[22px] font-bold leading-[30px]">{t.cta.title}</h2>
          <p className="mt-[10px] max-w-[560px] text-[16px] leading-[26px] text-white/90">{t.cta.body}</p>
          <Link
            href={`${kneks}#request-access`}
            className="mt-[20px] inline-flex h-[50px] items-center gap-2 bg-gold px-5 text-[14px] font-semibold text-kneks-earth transition-colors hover:bg-gold-deep"
          >
            {t.cta.button}
            <ArrowIcon />
          </Link>
        </section>
      </div>
    </article>
  );
}
