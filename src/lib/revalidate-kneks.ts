import "server-only";
import { revalidatePath } from "next/cache";

/**
 * Refreshes the public /kneks page after its data changes. Both shapes are
 * named because the public site is moving under app/[lang]: the literal path
 * covers the page while it still lives at app/kneks, the route pattern every
 * language's copy once it lives at app/[lang]/kneks. revalidatePath only
 * marks a cache tag, so naming a route that does not exist yet is harmless.
 */
export function revalidateKneks() {
  revalidatePath("/kneks");
  revalidatePath("/[lang]/kneks", "page");
}
