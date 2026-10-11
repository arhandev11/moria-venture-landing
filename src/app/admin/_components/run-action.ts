"use client";

import { unstable_rethrow } from "next/navigation";
import type { ActionResult } from "../_lib/state";

export const NO_ANSWER = "The server did not answer, so nothing was changed. Check your connection and try again.";

/**
 * Calls a one-shot admin action (a switch, a delete) and hands back its
 * result, or a failure when the request itself fails: a dropped connection,
 * or the server restarting during a deploy. Left to throw, that error lands
 * in the caller's transition and the whole page falls back to the error
 * screen. Next's own redirects (an expired session sent to the login page, a
 * self-demotion sent to the SMEs) are rethrown so they still happen.
 */
export async function runAction(call: () => Promise<ActionResult>): Promise<ActionResult> {
  try {
    return await call();
  } catch (err) {
    unstable_rethrow(err);
    return { ok: false, message: NO_ANSWER };
  }
}
