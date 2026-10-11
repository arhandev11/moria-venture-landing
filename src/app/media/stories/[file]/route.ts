import { readStoryImage } from "@/lib/uploads";

/**
 * Serves uploaded story covers from UPLOAD_DIR/stories, exactly as
 * /media/smes/[file] serves SME images: names are random UUIDs never reused,
 * so the long immutable cache is safe, and the name is checked against what
 * we write before touching disk.
 */
export async function GET(_req: Request, ctx: RouteContext<"/media/stories/[file]">) {
  const { file } = await ctx.params;
  const image = await readStoryImage(file);
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
