import { readSmeImage } from "@/lib/uploads";

/**
 * Serves uploaded SME images from UPLOAD_DIR. Names are random UUIDs that are
 * never reused (a replaced image gets a new name), so a long immutable cache
 * is safe. The name is checked against what we write before touching disk.
 */
export async function GET(_req: Request, ctx: RouteContext<"/media/smes/[file]">) {
  const { file } = await ctx.params;
  const image = await readSmeImage(file);
  if (!image) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(image.body), {
    headers: {
      "Content-Type": image.type,
      "Content-Length": String(image.body.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}
