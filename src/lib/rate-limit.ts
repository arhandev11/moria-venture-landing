import "server-only";
import { headers } from "next/headers";

/**
 * A fixed-window counter held in process memory. Enough to blunt password
 * guessing and form spam on a single server; it resets on restart and is not
 * shared between instances, so a multi-instance deploy would want Redis or a
 * table instead.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function hit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }
  bucket.count += 1;
  return { allowed: bucket.count <= limit, retryAfterMs: bucket.resetAt - now };
}

export function reset(key: string) {
  buckets.delete(key);
}

/**
 * The caller's address, as the reverse proxy in front of the app saw it:
 * X-Real-IP, else the last X-Forwarded-For hop (the one our proxy appended;
 * earlier hops are whatever the client claimed). With neither header every
 * caller shares one bucket, which errs on the side of limiting.
 */
export async function clientIp() {
  const h = await headers();
  const real = h.get("x-real-ip")?.trim();
  if (real) return real;
  const hops = h.get("x-forwarded-for")?.split(",").map((s) => s.trim()).filter(Boolean);
  return hops?.at(-1) ?? "unknown";
}
