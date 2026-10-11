"use server";

import { eq, min } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { smes, successStories } from "@/db/schema";
import { authorizeAction, NOT_ALLOWED } from "@/lib/auth/dal";
import { STORY_EDITORS } from "@/lib/auth/roles";
import { revalidateKneks } from "@/lib/revalidate-kneks";
import { isIsoDate, SLUG, slugify, STORY_LIMITS } from "@/lib/story-fields";
import { deleteStoryImage, saveStoryImage } from "@/lib/uploads";
import { checked, id, idList, isDuplicate, text } from "../_lib/form";
import type { ActionResult, FormState } from "../_lib/state";

/**
 * Both roles write success stories (KNEKS fills them in). Every action checks
 * the role before it reads or writes anything.
 */
const EDITORS = STORY_EDITORS;

/** Text fields the form posts, with their limits. */
const TEXT_FIELDS = ["title", "slug", "excerpt", "body", "coverAlt", "sourceLine"] as const;
/** Posted as typed and refilled on a rejected form, but checked by their own rules. */
const OTHER_FIELDS = ["sme", "publishedAt"] as const;

/**
 * Everything that shows stories: /kneks in every language, every story page
 * in every language (a renamed, hidden or deleted story then renders as the
 * 404), the sitemap and the admin list.
 */
function refresh() {
  revalidateKneks();
  revalidatePath("/[lang]/kneks/stories/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/stories");
}

/**
 * Creates a story, or updates one when the form carries an id. Fields are
 * checked first and the cover saved only once they pass, so a rejected form
 * never leaves a stray file behind. The slug falls back to one made from the
 * title. The linked SME arrives as its name (names are unique) and is looked
 * up here. A new story goes to the top of the list.
 */
export async function saveStory(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!(await authorizeAction(EDITORS))) return { message: NOT_ALLOWED };
  const db = getDb();
  const storyId = id(fd);

  const values = Object.fromEntries([...TEXT_FIELDS, ...OTHER_FIELDS].map((key) => [key, text(fd, key)])) as Record<string, string>;
  values.isSample = checked(fd, "isSample") ? "on" : "";
  values.published = checked(fd, "published") ? "on" : "";
  const errors: Record<string, string> = {};

  for (const key of TEXT_FIELDS) {
    const limit = STORY_LIMITS[key];
    if (values[key].length > limit) errors[key] = `Keep this under ${limit.toLocaleString("en")} characters.`;
  }
  for (const key of ["title", "excerpt", "body"]) {
    if (!values[key]) errors[key] = "Required.";
  }

  // A typed slug is tidied the same way ("Halal Seafood!" becomes halal-seafood), so only an unusable one is refused.
  const slug = slugify(values.slug || values.title);
  if (!errors.slug) {
    if (!slug) errors.slug = values.slug || values.title ? "Use Latin letters or digits for the slug." : "Required.";
    else if (!SLUG.test(slug)) errors.slug = "Use lowercase letters, digits and single hyphens, like halal-seafood-journey.";
  }
  values.slug = slug;

  if (!values.publishedAt) errors.publishedAt = "Required.";
  else if (!isIsoDate(values.publishedAt)) errors.publishedAt = "Enter a valid date.";

  let smeId: number | null = null;
  if (values.sme) {
    const [sme] = await db.select({ id: smes.id }).from(smes).where(eq(smes.name, values.sme)).limit(1);
    if (sme) smeId = sme.id;
    else errors.sme = "Pick an SME from the list, or leave this empty.";
  }

  const upload = fd.get("cover");
  const hasUpload = upload instanceof File && upload.size > 0;
  if (Object.keys(errors).length) return { message: "Check the highlighted fields.", fieldErrors: errors, values };

  const [current] = storyId
    ? await db
        .select({ coverFile: successStories.coverFile, coverAsset: successStories.coverAsset })
        .from(successStories)
        .where(eq(successStories.id, storyId))
        .limit(1)
    : [undefined];
  if (storyId && !current) return { message: "That story no longer exists.", values };

  let coverFile = current?.coverFile ?? null;
  let coverAsset = current?.coverAsset ?? null;
  if (hasUpload) {
    const saved = await saveStoryImage(upload);
    if (!saved.ok) return { message: "Check the highlighted fields.", fieldErrors: { cover: saved.error }, values };
    coverFile = saved.file;
    coverAsset = null;
  } else if (checked(fd, "removeCover")) {
    coverFile = null;
    coverAsset = null;
  }

  const row = {
    slug,
    title: values.title,
    excerpt: values.excerpt,
    body: values.body,
    coverFile,
    coverAsset,
    coverAlt: values.coverAlt || null,
    smeId,
    sourceLine: values.sourceLine || null,
    publishedAt: values.publishedAt,
    isSample: values.isSample === "on",
    published: values.published === "on",
  } satisfies Partial<typeof successStories.$inferInsert>;

  try {
    if (storyId) {
      await db.update(successStories).set(row).where(eq(successStories.id, storyId));
    } else {
      const [{ top }] = await db.select({ top: min(successStories.sortOrder) }).from(successStories);
      await db.insert(successStories).values({ ...row, sortOrder: (top ?? 10) - 10 });
    }
  } catch (err) {
    if (hasUpload) await deleteStoryImage(coverFile);
    if (isDuplicate(err)) return { message: "Check the highlighted fields.", fieldErrors: { slug: "Another story already uses this slug." }, values };
    throw err;
  }

  // The old file goes only once the row no longer points at it.
  if (current?.coverFile && current.coverFile !== coverFile) await deleteStoryImage(current.coverFile);

  refresh();
  return { ok: true, message: storyId ? `Saved “${values.title}”.` : `Added “${values.title}”.` };
}

export async function deleteStory(fd: FormData): Promise<ActionResult> {
  if (!(await authorizeAction(EDITORS))) return { ok: false, message: NOT_ALLOWED };
  const storyId = id(fd);
  if (!storyId) return { ok: false, message: "Unknown story." };
  const db = getDb();
  const [row] = await db
    .select({ title: successStories.title, coverFile: successStories.coverFile })
    .from(successStories)
    .where(eq(successStories.id, storyId))
    .limit(1);
  if (!row) return { ok: false, message: "That story no longer exists." };
  await db.delete(successStories).where(eq(successStories.id, storyId));
  await deleteStoryImage(row.coverFile);
  refresh();
  return { ok: true, message: `Deleted “${row.title}”.` };
}

export async function toggleStoryPublished(fd: FormData): Promise<ActionResult> {
  if (!(await authorizeAction(EDITORS))) return { ok: false, message: NOT_ALLOWED };
  const storyId = id(fd);
  if (!storyId) return { ok: false, message: "Unknown story." };
  await getDb().update(successStories).set({ published: checked(fd, "published") }).where(eq(successStories.id, storyId));
  refresh();
  return { ok: true };
}

/**
 * Saves a whole new order at once, as the list's drag and drop and keyboard
 * moves produce it. The ids must be exactly the stories that exist, so a
 * stale tab cannot drop or duplicate a row.
 */
export async function reorderStories(ids: unknown): Promise<ActionResult> {
  if (!(await authorizeAction(EDITORS))) return { ok: false, message: NOT_ALLOWED };
  const order = idList(ids);
  if (!order) return { ok: false, message: "That order could not be read." };
  return getDb().transaction(async (tx) => {
    const rows = await tx.select({ id: successStories.id }).from(successStories);
    const known = new Set(rows.map((r) => r.id));
    if (order.length !== known.size || !order.every((x) => known.has(x))) {
      return { ok: false, message: "The list changed in the meantime. Reload and try again." };
    }
    for (const [i, storyId] of order.entries()) {
      await tx.update(successStories).set({ sortOrder: (i + 1) * 10 }).where(eq(successStories.id, storyId));
    }
    refresh();
    return { ok: true };
  });
}
