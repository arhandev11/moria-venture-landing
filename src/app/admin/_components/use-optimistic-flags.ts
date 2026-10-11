"use client";

import { useState } from "react";

/**
 * One-click switches show their new state at once and keep it until the
 * server's own data catches up. Overrides are dropped whenever the server's
 * flags change, never on a timer, so the switch cannot flicker back between
 * the action finishing and the refreshed list arriving, and an edit made
 * elsewhere (the edit dialog) is never masked by a stale override.
 */
export function useOptimisticFlags(server: { id: number; on: boolean }[]) {
  const key = server.map((s) => `${s.id}:${s.on ? 1 : 0}`).join(",");
  const [seen, setSeen] = useState(key);
  const [overrides, setOverrides] = useState<Record<number, boolean>>({});
  if (seen !== key) {
    setSeen(key);
    setOverrides({});
  }
  const fallback = new Map(server.map((s) => [s.id, s.on]));
  return {
    get: (id: number) => overrides[id] ?? fallback.get(id) ?? false,
    set: (id: number, on: boolean) => setOverrides((m) => ({ ...m, [id]: on })),
  };
}
