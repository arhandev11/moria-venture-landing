import { notFound } from "next/navigation";

/**
 * Any path under a language that names no page lands here and becomes that
 * language's 404, rendered inside its own layout by ../not-found.tsx. Without
 * it an unknown /id/… path would never reach the localised page.
 */
export const dynamicParams = true;

export default function Missing() {
  notFound();
}
