"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FOCUS, INPUT } from "./ui";

/** Case- and accent-blind text, so "bogor" finds "Bogor" and "cafe" finds "Café". */
function fold(s: string) {
  return s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

/**
 * Where `query` sits in `text`, in `text`'s own character positions. Folding
 * can change a string's length (an accent is its own code point once split
 * off), so each folded character remembers which original one it came from.
 */
function matchRange(text: string, query: string): [number, number] | null {
  const q = fold(query);
  if (!q) return null;
  let folded = "";
  const from: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const f = fold(text[i]);
    folded += f;
    for (let k = 0; k < f.length; k++) from.push(i);
  }
  const at = folded.indexOf(q);
  if (at < 0) return null;
  return [from[at], from[at + q.length - 1] + 1];
}

function Highlight({ text, query }: { text: string; query: string }) {
  const range = matchRange(text, query);
  if (!range) return <>{text}</>;
  const [a, b] = range;
  return (
    <>
      {text.slice(0, a)}
      <mark className="bg-transparent font-semibold text-indigo-brand">{text.slice(a, b)}</mark>
      {text.slice(b)}
    </>
  );
}

type Item = { kind: "option"; value: string } | { kind: "create"; value: string };

const MAX_HEIGHT = 288;
const GAP = 4;

/**
 * A searchable select, after the WAI-ARIA 1.2 combobox pattern (an editable
 * input with a list popup). Focus or a click opens the list, typing filters
 * it, arrows move, Enter picks, Esc closes, Tab moves on. With `creatable`
 * a value that is not in the list can be used too: text that matches no
 * option is offered as `Use "…"`, and typed text is kept when the field is
 * left. Without it, leaving the field keeps an exact match or goes back.
 *
 * The chosen value travels in a hidden input under `name`, so the form and
 * its Server Action see exactly what a plain text field would have sent.
 *
 * The list is portalled out of the field (fields sit inside a <label>, which
 * would turn every click on an option into a click on the input) into the
 * dialog when there is one, with fixed positioning measured from the field:
 * it opens below, or above when there is more room there, and never past the
 * dialog's (or the window's) edge, scrolling inside itself instead.
 */
export function Combobox({
  name,
  label,
  options,
  defaultValue = "",
  creatable = false,
  required,
  maxLength,
  placeholder,
  invalid,
  onValueChange,
}: {
  name: string;
  /** The field's label, repeated as the list's accessible name. */
  label: string;
  options: readonly string[];
  defaultValue?: string;
  /** Offer `Use "…"` for text that matches no option. */
  creatable?: boolean;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  invalid?: boolean;
  onValueChange?: (value: string) => void;
}) {
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-opt-${i}`;
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const [value, setValue] = useState(defaultValue);
  const [text, setText] = useState(defaultValue);
  /** Null until the person types: an untouched field lists every option. */
  const [query, setQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  /** Whether the highlight was moved with the arrow keys, which Tab then accepts. */
  const arrowed = useRef(false);
  /**
   * The same value, text and query, written as they change. Blur can land in
   * the same tick as a Tab or Enter that just committed, before a re-render,
   * so settle() reads these rather than the render's own copies.
   */
  const live = useRef({ value: defaultValue, text: defaultValue, query: null as string | null });
  /** A press on the already focused field that selected its text. */
  const held = useRef(false);
  const [place, setPlace] = useState<{ left: number; width: number; top?: number; bottom?: number; maxHeight: number } | null>(null);
  const [host, setHost] = useState<Element | null>(null);

  const items = useMemo<Item[]>(() => {
    const q = query?.trim() ?? "";
    const all = value && !options.includes(value) ? [value, ...options] : [...options];
    const fq = fold(q);
    const hits = q ? all.filter((o) => fold(o).includes(fq)) : all;
    // Options that start with the text come first, each group in list order.
    if (q) hits.sort((a, b) => Number(!fold(a).startsWith(fq)) - Number(!fold(b).startsWith(fq)));
    const out: Item[] = hits.map((v) => ({ kind: "option", value: v }));
    if (creatable && q && !hits.length) out.push({ kind: "create", value: q });
    return out;
  }, [options, value, query, creatable]);

  const commit = (next: string) => {
    const before = live.current.value;
    live.current = { value: next, text: next, query: null };
    setValue(next);
    setText(next);
    setQuery(null);
    setOpen(false);
    setActive(-1);
    if (next !== before) onValueChange?.(next);
  };

  const show = (highlight?: number) => {
    setOpen(true);
    const selected = items.findIndex((it) => it.kind === "option" && it.value === value);
    setActive(highlight ?? (selected >= 0 ? selected : -1));
    arrowed.current = false;
  };

  /** Leaving the field: settle what was typed, as a select would. */
  const settle = () => {
    const { value: current, text: typed, query: asked } = live.current;
    if (asked === null) return setOpen(false);
    const t = typed.trim();
    const exact = options.find((o) => fold(o) === fold(t)) ?? (fold(current) === fold(t) ? current : undefined);
    if (!t) commit("");
    else if (exact !== undefined) commit(exact);
    else if (creatable) commit(t);
    else commit(current);
  };

  // Where the list goes, recomputed while open as the page or dialog scrolls.
  useLayoutEffect(() => {
    if (!open) return;
    const dialog = root.current?.closest("dialog") ?? null;
    setHost(dialog ?? document.body);
    const measure = () => {
      const field = root.current?.getBoundingClientRect();
      if (!field) return;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const box = dialog?.getBoundingClientRect() ?? { top: 0, bottom: vh };
      const top = Math.max(0, box.top);
      const bottom = Math.min(vh, box.bottom);
      // The field scrolled out of sight: the list has nothing to hang from.
      if (field.bottom < top || field.top > bottom) return setOpen(false);
      const below = bottom - field.bottom - GAP - 8;
      const above = field.top - top - GAP - 8;
      // Rows are 40px; an empty list shows one "No matches" line.
      const want = Math.min(MAX_HEIGHT, (list.current?.scrollHeight ?? Math.max(1, items.length) * 40 + 8) + 2);
      const down = below >= want || below >= above;
      setPlace({
        left: field.left,
        width: field.width,
        maxHeight: Math.max(96, Math.min(MAX_HEIGHT, down ? below : above)),
        ...(down ? { top: field.bottom + GAP } : { bottom: window.innerHeight - field.top + GAP }),
      });
    };
    measure();
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [open, items.length]);

  useEffect(() => {
    if (open && active >= 0) document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- optionId is derived from a stable id
  }, [open, active]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const last = items.length - 1;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        const down = e.key === "ArrowDown";
        if (!open) {
          show();
          if (e.altKey) return;
        }
        if (last < 0) return;
        arrowed.current = true;
        setActive((i) => (i < 0 ? (down ? 0 : last) : down ? Math.min(last, i + 1) : Math.max(0, i - 1)));
        return;
      }
      case "Home":
      case "End":
        if (!open || last < 0 || !e.ctrlKey) return;
        e.preventDefault();
        setActive(e.key === "Home" ? 0 : last);
        return;
      case "Enter":
        // Closed, Enter submits the form like any single-line field.
        if (!open) return;
        e.preventDefault();
        if (active >= 0 && items[active]) commit(items[active].value);
        else settle();
        return;
      case "Escape":
        // Open, Esc only closes the list (and keeps the dialog around it open).
        if (!open && query === null) return;
        e.preventDefault();
        e.stopPropagation();
        live.current = { ...live.current, text: live.current.value, query: null };
        setText(live.current.value);
        setQuery(null);
        setOpen(false);
        return;
      case "Tab":
        if (open && arrowed.current && active >= 0 && items[active]) commit(items[active].value);
        return;
    }
  };

  const hasText = text !== "" || value !== "";
  const q = query?.trim() ?? "";

  return (
    <div ref={root} className="relative">
      <input
        ref={input}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        aria-invalid={invalid || undefined}
        autoComplete="off"
        spellCheck={false}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        value={text}
        onFocus={(e) => {
          e.currentTarget.select();
          show();
        }}
        onMouseDown={(e) => {
          // Until something is typed the text is just the current value, so a
          // click on the focused field selects it all (instead of dropping a
          // caret in it) and typing starts a new search.
          if (live.current.query !== null) return;
          held.current = true;
          // Not focused yet: let the press focus it, and onFocus selects.
          if (document.activeElement !== e.currentTarget) return;
          e.preventDefault();
          e.currentTarget.select();
          if (!open) show();
        }}
        onMouseUp={(e) => {
          // A press past the end of the text drops the caret there on release.
          if (held.current) e.preventDefault();
          held.current = false;
        }}
        onClick={() => {
          if (!open) show();
        }}
        onChange={(e) => {
          live.current = { ...live.current, text: e.target.value, query: e.target.value };
          setText(e.target.value);
          setQuery(e.target.value);
          setOpen(true);
          arrowed.current = false;
          setActive(e.target.value.trim() ? 0 : -1);
        }}
        onBlur={settle}
        onKeyDown={onKeyDown}
        className={`${INPUT} ${hasText ? "pr-16" : "pr-9"}`}
      />
      <input type="hidden" name={name} value={value} />
      <div className="absolute inset-y-0 right-1 flex items-center">
        {hasText ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={`Clear ${label}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              commit("");
              input.current?.focus();
              show(-1);
            }}
            className={`flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-ink/[0.06] hover:text-ink ${FOCUS}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M7 7l10 10M17 7L7 17" />
            </svg>
          </button>
        ) : null}
        <span
          aria-hidden
          // The field sits in a <label>: without this a click here would also
          // land on the input and open the list it just closed.
          onClick={(e) => e.preventDefault()}
          onMouseDown={(e) => {
            e.preventDefault();
            if (open) setOpen(false);
            else {
              input.current?.focus();
              show();
            }
          }}
          className="flex size-7 cursor-pointer items-center justify-center text-ink-muted"
        >
          <svg viewBox="0 0 24 24" className={`size-4 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>

      {open && host && place
        ? createPortal(
            <div
              // Keeps focus in the input while the pointer works the list.
              onMouseDown={(e) => e.preventDefault()}
              style={{ left: place.left, width: place.width, top: place.top, bottom: place.bottom }}
              className="fixed z-50 overflow-hidden rounded-lg border border-ink/10 bg-white text-ink shadow-lg"
            >
              <ul
                ref={list}
                id={listId}
                role="listbox"
                aria-label={label}
                style={{ maxHeight: place.maxHeight }}
                className="overflow-y-auto overscroll-contain p-1"
              >
                {items.map((item, i) => {
                  const selected = item.kind === "option" && item.value === value;
                  return (
                    <li
                      key={`${item.kind}:${item.value}`}
                      id={optionId(i)}
                      role="option"
                      aria-selected={selected}
                      data-active={i === active || undefined}
                      onMouseMove={() => {
                        if (active !== i) {
                          arrowed.current = false;
                          setActive(i);
                        }
                      }}
                      onClick={() => commit(item.value)}
                      className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-[14px] ${
                        i === active ? "bg-indigo-brand/[0.07]" : ""
                      } ${item.kind === "create" ? "border-t border-ink/10 text-indigo-brand" : ""}`}
                    >
                      {item.kind === "create" ? (
                        <>
                          <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                          <span className="min-w-0 break-words">
                            Use “<span className="font-semibold">{item.value}</span>”
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="min-w-0 flex-1 break-words">
                            <Highlight text={item.value} query={q} />
                          </span>
                          {selected ? <Check /> : null}
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
              {items.length === 0 ? <p className="px-3.5 py-3 text-[13px] text-ink-muted">No matches</p> : null}
            </div>,
            host,
          )
        : null}
      <p aria-live="polite" className="sr-only">
        {open && query !== null ? (items.length ? `${items.length} result${items.length === 1 ? "" : "s"}` : "No matches") : ""}
      </p>
    </div>
  );
}

function Check(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0 text-indigo-brand" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
