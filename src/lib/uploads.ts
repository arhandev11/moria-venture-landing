import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Uploaded images (SME photos, story covers) live outside public/: Next only
 * serves the public files that existed at build time, so uploads go to
 * UPLOAD_DIR/<kind> and come back out through the /media/<kind> route
 * handlers. Each kind is its own folder, so a name from one route can never
 * reach another kind's files.
 */

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

const TYPES = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
} as const;
type Ext = keyof typeof TYPES;

/** What we write, and so the only names we will ever read back. */
const NAME = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/;

export type UploadKind = "smes" | "stories";

function dirOf(kind: UploadKind) {
  const root = process.env.UPLOAD_DIR || "storage/uploads";
  return path.resolve(/* turbopackIgnore: true */ process.cwd(), root, kind);
}

/**
 * The type is read from the file's own first bytes, not the browser's
 * Content-Type or the file name, both of which the uploader controls.
 */
function sniff(bytes: Uint8Array): Ext | null {
  const at = (i: number, ...sig: number[]) => sig.every((b, j) => bytes[i + j] === b);
  if (at(0, 0xff, 0xd8, 0xff)) return "jpg";
  if (at(0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return "png";
  if (at(0, 0x52, 0x49, 0x46, 0x46) && at(8, 0x57, 0x45, 0x42, 0x50)) return "webp";
  return null;
}

export type SavedImage = { ok: true; file: string } | { ok: false; error: string };

export async function saveImage(kind: UploadKind, file: File): Promise<SavedImage> {
  if (file.size === 0) return { ok: false, error: "The image is empty." };
  if (file.size > MAX_IMAGE_BYTES) return { ok: false, error: "Images must be 2 MB or smaller." };
  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = sniff(bytes);
  if (!ext) return { ok: false, error: "Use a JPEG, PNG or WebP image." };

  const dir = dirOf(kind);
  await mkdir(dir, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  // Written under a temporary name and renamed, so a reader never sees half a file.
  const tmp = path.join(dir, `.${name}.tmp`);
  await writeFile(tmp, bytes);
  await rename(tmp, path.join(dir, name));
  return { ok: true, file: name };
}

export async function readImage(kind: UploadKind, name: string) {
  if (!NAME.test(name)) return null;
  try {
    const body = await readFile(path.join(dirOf(kind), name));
    return { body, type: TYPES[name.split(".").pop() as Ext] };
  } catch {
    return null;
  }
}

export async function deleteImage(kind: UploadKind, name: string | null) {
  if (!name || !NAME.test(name)) return;
  await unlink(path.join(dirOf(kind), name)).catch(() => {});
}

export const saveSmeImage = (file: File) => saveImage("smes", file);
export const readSmeImage = (name: string) => readImage("smes", name);
export const deleteSmeImage = (name: string | null) => deleteImage("smes", name);

export function smeImageUrl(name: string | null) {
  return name ? `/media/smes/${name}` : null;
}

export const saveStoryImage = (file: File) => saveImage("stories", file);
export const readStoryImage = (name: string) => readImage("stories", name);
export const deleteStoryImage = (name: string | null) => deleteImage("stories", name);

/**
 * A story cover's URL: the upload when there is one, else a site asset under
 * /assets/ (the seeded samples), else null for the placeholder tile. The
 * asset path is checked again here, so a hand-edited row cannot point the
 * page anywhere else.
 */
export function storyCoverUrl(file: string | null, asset: string | null) {
  if (file && NAME.test(file)) return `/media/stories/${file}`;
  if (asset && STORY_ASSET.test(asset)) return asset;
  return null;
}

/** A site image under /assets/: plain segments only, no "..", an image extension. */
export const STORY_ASSET = /^\/assets\/(?:[a-z0-9][a-z0-9_-]*\/)*[a-z0-9][a-z0-9._-]*\.(?:webp|jpe?g|png|avif|svg)$/i;
