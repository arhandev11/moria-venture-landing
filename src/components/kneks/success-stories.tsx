import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { localizePath } from "@/i18n/paths";
import type { Dictionary } from "@/i18n/types";
import { formatStoryDate, type PublicStorySummary } from "@/lib/stories-data";
import { parseStoryBody, type Inline } from "@/lib/story-markup";

/**
 * The success stories: the cards on /kneks and the pieces of a story's own
 * page. Server Components only; nothing here ships JavaScript.
 *
 * Story text is stored in English and shown as entered in every language, so
 * it is marked lang="en" dir="ltr": an Arabic page then still sets it left to
 * right with its punctuation where it belongs, while the labels around it
 * follow the page.
 */

type StoryLabels = Dictionary["kneks"]["stories"];

/** The page's band, deep blue to green (mirrored in RTL), for covers that have no image. */
const BAND =
  "bg-[linear-gradient(116deg,#156ba5,#1db45f)] rtl:bg-[linear-gradient(244deg,#156ba5,#1db45f)]";

export const storyHref = (locale: Locale, slug: string) => localizePath(locale, `/kneks/stories/${slug}`);

/** "→" (or "←" for `back`), mirrored in RTL so it always follows the reading direction. */
export function ArrowIcon({ className = "size-4", back = false }: { className?: string; back?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`shrink-0 rtl:-scale-x-100 ${className}`} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d={back ? "M13.5 8h-11M7 3.5L2.5 8 7 12.5" : "M2.5 8h11M9 3.5L13.5 8 9 12.5"} />
    </svg>
  );
}

export function SampleBadge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-kneks-gold bg-kneks-sand px-[9px] py-[3px] text-[12px] font-semibold leading-[16px] text-kneks-earth ${className}`}
    >
      {children}
    </span>
  );
}

/** "Fintech · SantriLink", or nothing when the story names no SME. */
export function storyEyebrow(story: Pick<PublicStorySummary, "sme">) {
  return story.sme ? [story.sme.name, story.sme.sector].filter(Boolean).join(" · ") : null;
}

/**
 * The cover in a 16:9 box: the image, or the band with the program's line
 * motif when there is none, so a row of cards keeps one rhythm.
 */
export function StoryCover({
  cover,
  alt,
  className = "",
  priority = false,
}: {
  cover: string | null;
  alt: string | null;
  className?: string;
  priority?: boolean;
}) {
  if (cover) {
    return (
      <div className={`relative aspect-video overflow-hidden rounded-lg bg-kneks-mist ${className}`}>
        {/* Uploads are served as-is from /media, like the SME images; the site assets are already WebP. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={alt ?? ""}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    );
  }
  return (
    <div aria-hidden className={`relative aspect-video overflow-hidden rounded-lg ${BAND} ${className}`}>
      <svg viewBox="0 0 320 180" className="absolute inset-0 size-full" fill="none" stroke="#fff" strokeOpacity={0.28} preserveAspectRatio="xMidYMid slice">
        <circle cx="236" cy="92" r="62" />
        <path d="M230 36l58 58-58 58-58-58z" />
        <circle cx="270" cy="44" r="22" strokeDasharray="3 3" />
        <path d="M34 120l22 22-22 22-22-22z" />
      </svg>
    </div>
  );
}

/** One story's card. The title is the link; it stretches over the whole card. */
function StoryCard({ story, locale, labels }: { story: PublicStorySummary; locale: Locale; labels: StoryLabels }) {
  const eyebrow = storyEyebrow(story);
  return (
    <article className="group relative flex flex-col rounded-xl border border-kneks-line bg-white p-[15px] transition-colors hover:border-kneks-pine">
      <div className="relative">
        <StoryCover cover={story.cover} alt={story.coverAlt} />
        {story.sample ? <SampleBadge className="absolute start-[10px] top-[10px]">{labels.sample}</SampleBadge> : null}
      </div>
      <div className="flex flex-1 flex-col px-[8px] pb-[8px] pt-[20px]">
        {eyebrow ? (
          // Left to right even on an Arabic page, so a long name is cut at its end, not its start.
          <p dir="ltr" className="truncate text-[12px] font-bold uppercase leading-[16px] tracking-[0.02em] text-kneks-pine rtl:text-right">
            {eyebrow}
          </p>
        ) : null}
        <h3 lang="en" dir="ltr" className="mt-[10px] text-start text-[20px] font-bold leading-[26px] text-kneks-ink">
          <Link
            href={storyHref(locale, story.slug)}
            aria-label={format(labels.readStoryAbout, { title: story.title })}
            className="after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-kneks-gold"
          >
            {story.title}
          </Link>
        </h3>
        <p lang="en" dir="ltr" className="mt-[10px] line-clamp-3 text-start text-[15px] leading-[24px] text-kneks-muted">
          {story.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-[20px] text-[13px] leading-[18px]">
          <time dateTime={story.publishedAt} className="text-kneks-muted">
            {formatStoryDate(locale, story.publishedAt)}
          </time>
          <span aria-hidden className="flex items-center gap-1.5 font-semibold text-kneks-pine transition-colors group-hover:text-kneks-blue">
            {labels.readStory}
            <ArrowIcon className="size-[14px] transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

/** How many cards /kneks shows; the rest stay reachable from the sitemap and their links. */
export const STORIES_ON_PAGE = 6;

/** The section's heading and cards. The page decides whether to show it at all. */
export function SuccessStories({
  stories,
  locale,
  labels,
}: {
  stories: PublicStorySummary[];
  locale: Locale;
  labels: StoryLabels;
}) {
  return (
    <>
      <p className="text-[12px] font-bold uppercase leading-[16px] tracking-[0.02em] text-kneks-pine">{labels.eyebrow}</p>
      <h2 className="mt-[13px] text-[30px] font-bold leading-[1.15] tracking-[-0.01em] text-kneks-ink lg:text-[38px] lg:leading-[44px]">
        {labels.title}
      </h2>
      <p className="mt-[12px] max-w-[640px] text-[16px] leading-[26px] text-kneks-muted">{labels.lede}</p>
      <div className="mt-[30px] grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stories.slice(0, STORIES_ON_PAGE).map((story) => (
          <StoryCard key={story.slug} story={story} locale={locale} labels={labels} />
        ))}
      </div>
    </>
  );
}

function InlineText({ nodes }: { nodes: Inline[] }) {
  return nodes.map((node, i) => {
    if (node.type === "text") return node.text;
    if (node.type === "bold") {
      return (
        <strong key={i} className="font-semibold text-kneks-ink">
          <InlineText nodes={node.children} />
        </strong>
      );
    }
    return (
      <a
        key={i}
        href={node.href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="font-medium text-kneks-blue underline decoration-kneks-blue/40 underline-offset-[3px] hover:decoration-kneks-blue"
      >
        <InlineText nodes={node.children} />
      </a>
    );
  });
}

/** A story's body, from its markup (see story-markup.ts) to elements. */
export function StoryBody({ body, className = "" }: { body: string; className?: string }) {
  return (
    <div lang="en" dir="ltr" className={`space-y-[22px] text-start text-[17px] leading-[29px] text-kneks-ink ${className}`}>
      {parseStoryBody(body).map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2 key={i} className="pt-[14px] text-[24px] font-bold leading-[32px] tracking-[-0.01em] text-kneks-ink">
              <InlineText nodes={block.children} />
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="list-disc space-y-[8px] ps-[22px] marker:text-kneks-gold">
              {block.items.map((item, j) => (
                <li key={j}>
                  <InlineText nodes={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            {block.lines.map((line, j) => (
              <span key={j}>
                {j > 0 ? <br /> : null}
                <InlineText nodes={line} />
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
