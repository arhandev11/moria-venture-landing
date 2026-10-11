import { asc, desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { getDb } from "@/db";
import { smes, successStories } from "@/db/schema";
import { requireStoryEditor } from "@/lib/auth/dal";
import { StoryTable } from "./story-table";
import { toValues } from "./to-values";

export const metadata: Metadata = { title: "Success stories" };

/** Open to both roles; the actions check the same list. */
export default async function StoriesPage() {
  await requireStoryEditor();
  const db = getDb();
  const [rows, smeRows] = await Promise.all([
    db
      .select({ story: successStories, smeName: smes.name, smePublished: smes.published })
      .from(successStories)
      .leftJoin(smes, eq(smes.id, successStories.smeId))
      .orderBy(asc(successStories.sortOrder), desc(successStories.publishedAt), desc(successStories.id)),
    db.select({ name: smes.name }).from(smes).orderBy(asc(smes.name)),
  ]);
  return (
    <StoryTable
      items={rows.map((r) => toValues(r.story, r.smeName === null ? null : { name: r.smeName, published: !!r.smePublished }))}
      smeNames={smeRows.map((r) => r.name)}
    />
  );
}
