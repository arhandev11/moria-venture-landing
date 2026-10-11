"use client";

import { useState } from "react";
import type { FormState } from "../_lib/state";

/**
 * A key for a form run by useActionState, new with every refused save. React
 * resets a form once its action has run; that reset puts uncontrolled fields
 * back to their defaults, but it also blanks controlled selects and radios
 * (a currency, a status, a role) while their state still holds the choice,
 * so the next save would send something other than what the form shows.
 * Remounting the form on this key instead refills every field from what came
 * back and lines the controlled ones up with their state again. A key made
 * from the returned values alone stays the same when the same form is
 * refused twice in a row (one image refused, then another), and the reset
 * then wins.
 */
export function useRefusalKey(state: FormState) {
  const [seen, setSeen] = useState(state);
  const [round, setRound] = useState(0);
  if (state !== seen) {
    setSeen(state);
    setRound(round + 1);
  }
  return state && !state.ok ? `refused-${round}` : "initial";
}
