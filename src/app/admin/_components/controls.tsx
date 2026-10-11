"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { FOCUS } from "./ui";

/**
 * An on/off switch for one-click changes (publish, active, handled). It is a
 * button, so a click inside a clickable row stops here rather than opening
 * the row's dialog.
 */
export function Switch({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Read by screen readers; the row already says what it switches. */
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
        checked ? "bg-indigo-brand" : "bg-ink/20"
      } ${FOCUS}`}
    >
      <span
        aria-hidden
        className={`size-4 rounded-full bg-white shadow transition-transform motion-reduce:transition-none ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`}
      />
    </button>
  );
}

export type MenuItem = { label: string; onSelect: () => void; danger?: boolean };

/**
 * The "⋯" menu, for rare and destructive row actions only. The list is
 * placed with fixed positioning from the button's box, so a table's own
 * scroll container can never clip it.
 */
export function OverflowMenu({ items, label }: { items: MenuItem[]; label: string }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open || !button.current) return;
    const r = button.current.getBoundingClientRect();
    const below = r.bottom + 4 + items.length * 36 + 12 < window.innerHeight;
    setPos({
      top: below ? r.bottom + 4 : r.top - 4 - (items.length * 36 + 12),
      right: Math.max(8, window.innerWidth - r.right),
    });
    list.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
  }, [open, items.length]);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e.type === "pointerdown" && (list.current?.contains(e.target as Node) || button.current?.contains(e.target as Node))) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-ink/[0.06] hover:text-ink aria-expanded:bg-ink/[0.06] ${FOCUS}`}
      >
        <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="currentColor">
          <circle cx="3" cy="8" r="1.4" />
          <circle cx="8" cy="8" r="1.4" />
          <circle cx="13" cy="8" r="1.4" />
        </svg>
      </button>
      {open ? (
        <div
          ref={list}
          role="menu"
          aria-label={label}
          style={{ top: pos.top, right: pos.right }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            const els = [...(list.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? [])];
            const i = els.indexOf(document.activeElement as HTMLElement);
            if (e.key === "ArrowDown") els[(i + 1) % els.length]?.focus();
            if (e.key === "ArrowUp") els[(i - 1 + els.length) % els.length]?.focus();
          }}
          className="fixed z-40 min-w-[168px] rounded-lg border border-ink/10 bg-white p-1 shadow-lg"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                item.onSelect();
              }}
              className={`flex h-9 w-full items-center rounded-md px-3 text-left text-[13px] font-medium outline-none focus-visible:bg-ink/[0.06] ${
                item.danger ? "text-red-700 hover:bg-red-50" : "text-ink hover:bg-ink/[0.05]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}

/** A search box for filtering a list in place. */
export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="relative block w-full sm:w-[260px]">
      <span className="sr-only">{placeholder}</span>
      <svg viewBox="0 0 24 24" aria-hidden className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-md border border-ink/15 bg-white pl-8 pr-3 text-[13px] text-ink shadow-sm outline-none placeholder:text-ink/45 focus:border-indigo-brand focus:ring-3 focus:ring-indigo-brand/15"
      />
    </label>
  );
}

/** Text for screen readers only, announced politely when it changes. */
export function LiveRegion({ children }: { children: ReactNode }) {
  return (
    <p aria-live="polite" className="sr-only">
      {children}
    </p>
  );
}
