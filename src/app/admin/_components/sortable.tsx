"use client";

import { unstable_rethrow } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { GripIcon } from "./icons";
import { FOCUS } from "./ui";

/**
 * Drag-to-reorder for a list of rows, on Pointer Events so mouse, pen and
 * touch share one path (the handle opts out of touch scrolling). Rows swap
 * live as the pointer crosses a neighbour's midpoint; letting go saves the
 * whole order in one call. Focused, the handle also takes Arrow Up/Down, for
 * keyboards and screen readers, and every move is announced.
 *
 * The order is optimistic: on a failed save it rolls back to the server's
 * and onError reports why.
 */
export function useSortable<T extends { id: number }>({
  items,
  save,
  nameOf,
  onError,
}: {
  items: T[];
  save: (ids: number[]) => Promise<{ ok: boolean; message?: string }>;
  nameOf: (item: T) => string;
  onError: (message: string) => void;
}) {
  const serverIds = items.map((item) => item.id);
  const serverKey = serverIds.join(",");
  const [order, setOrder] = useState(serverIds);
  const [seenKey, setSeenKey] = useState(serverKey);
  const [dragId, setDragId] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const rows = useRef(new Map<number, HTMLElement>());
  const drag = useRef<{ id: number; start: number[] } | null>(null);
  // The latest order for pointerup, which can land before a re-render binds fresh handlers.
  const latest = useRef(order);
  useEffect(() => {
    latest.current = order;
  }, [order]);

  // New data from the server (a save, an add, a delete) resets the order.
  if (seenKey !== serverKey) {
    setSeenKey(serverKey);
    setOrder(serverIds);
  }

  const byId = new Map(items.map((item) => [item.id, item]));
  const ordered = order.map((id) => byId.get(id)).filter((item): item is T => !!item);

  const announce = (id: number, ids: number[]) => {
    const item = byId.get(id);
    if (item) setAnnouncement(`${nameOf(item)} moved to position ${ids.indexOf(id) + 1} of ${ids.length}.`);
  };

  const commit = async (ids: number[], movedId: number) => {
    announce(movedId, ids);
    let result: { ok: boolean; message?: string };
    try {
      result = await save(ids);
    } catch (err) {
      // An expired session's redirect to the login page still goes through.
      unstable_rethrow(err);
      result = { ok: false };
    }
    if (!result.ok) {
      setOrder(serverIds);
      onError(result.message ?? "The new order could not be saved. It has been put back.");
    }
  };

  /** Where the dragged row belongs: after every other row whose middle is above the pointer. */
  const targetIndex = (id: number, y: number, ids: number[]) =>
    ids.filter((other) => {
      if (other === id) return false;
      const r = rows.current.get(other)?.getBoundingClientRect();
      return r ? r.top + r.height / 2 < y : false;
    }).length;

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>, id: number) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id, start: order };
    setDragId(id);
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const active = drag.current;
    if (!active) return;
    // Nudge the page along when the pointer nears an edge of the window.
    if (e.clientY < 48) window.scrollBy(0, -12);
    else if (e.clientY > window.innerHeight - 48) window.scrollBy(0, 12);
    setOrder((ids) => {
      const to = targetIndex(active.id, e.clientY, ids);
      if (ids.indexOf(active.id) === to) return ids;
      const next = ids.filter((x) => x !== active.id);
      next.splice(to, 0, active.id);
      return next;
    });
  };

  const finish = (cancelled: boolean) => {
    const active = drag.current;
    drag.current = null;
    setDragId(null);
    if (!active) return;
    if (cancelled) {
      setOrder(active.start);
      return;
    }
    const final = latest.current;
    if (final.join() !== active.start.join()) void commit(final, active.id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, id: number) => {
    if (drag.current) {
      if (e.key === "Escape") finish(true);
      return;
    }
    const delta = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;
    if (!delta) return;
    e.preventDefault();
    const from = order.indexOf(id);
    const to = from + delta;
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOrder(next);
    void commit(next, id);
  };

  return {
    ordered,
    dragId,
    announcement,
    /** Registers a row's element, so its position can be measured during a drag. */
    rowRef: (id: number) => (el: HTMLElement | null) => {
      if (el) rows.current.set(id, el);
      else rows.current.delete(id);
    },
    handle: (item: T, disabled = false) => (
      <button
        type="button"
        disabled={disabled}
        aria-label={`Reorder ${nameOf(item)}`}
        aria-describedby="sortable-help"
        onPointerDown={(e) => onPointerDown(e, item.id)}
        onPointerMove={onPointerMove}
        onPointerUp={() => finish(false)}
        onPointerCancel={() => finish(true)}
        onKeyDown={(e) => onKeyDown(e, item.id)}
        onClick={(e) => e.stopPropagation()}
        className={`flex size-7 touch-none select-none items-center justify-center rounded-md text-ink/40 hover:bg-ink/[0.06] hover:text-ink disabled:pointer-events-none disabled:opacity-30 ${
          dragId === item.id ? "cursor-grabbing bg-indigo-brand/10 text-indigo-brand" : "cursor-grab"
        } ${FOCUS}`}
      >
        <GripIcon />
      </button>
    ),
  };
}

/** The shared instructions every handle points at with aria-describedby. */
export function SortableHelp() {
  return (
    <p id="sortable-help" className="sr-only">
      Drag to reorder, or press Arrow Up or Arrow Down. Changes save straight away.
    </p>
  );
}
