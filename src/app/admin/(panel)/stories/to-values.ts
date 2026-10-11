import "server-only";
import type { SuccessStoryRow } from "@/db/schema";
import { storyCoverUrl } from "@/lib/uploads";
import type { StoryListItem } from "./story-table";

/**
 * A database row (with its linked SME's name and published flag) as the
 * story form and list take it: every nullable field as the text its input
 * shows.
 */
export function toValues(story: SuccessStoryRow, sme: { name: string; published: boolean } | null): StoryListItem {
  return {
    id: story.id,
    title: story.title,
    slug: story.slug,
    excerpt: story.excerpt,
    body: story.body,
    coverAlt: story.coverAlt ?? "",
    sme: sme?.name ?? "",
    smeHidden: sme ? !sme.published : false,
    sourceLine: story.sourceLine ?? "",
    publishedAt: story.publishedAt,
    isSample: story.isSample,
    published: story.published,
    coverUrl: storyCoverUrl(story.coverFile, story.coverAsset),
  };
}
