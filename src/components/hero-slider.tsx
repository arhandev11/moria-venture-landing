"use client";

import {
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/** How long a slide holds before the next one comes in on its own. */
const HOLD_MS = 6000;
/** One slide's trip across, and a quicker one for steps queued behind it. */
const SLIDE_MS = 700;
const QUEUED_MS = 420;
const SLIDE_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
/** A touch has to travel this far sideways to count as a swipe. */
const SWIPE_PX = 60;

const REDUCED = "(prefers-reduced-motion: reduce)";
const watchReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const watchVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};

const wrap = (i: number, n: number) => ((i % n) + n) % n;

export type Slide = {
  /** Read out by the dots, e.g. "Moria Ventures". */
  label: string;
  /** Whether the slide is drawn on a dark ground, so the controls flip to white. */
  dark?: boolean;
  content: ReactNode;
};

/**
 * Slides the homepage hero sideways between a handful of full-width panels,
 * one screen tall.
 *
 * The panels share one grid cell, so the hero is as tall as the viewport (or
 * the tallest panel, if a very short screen cannot hold one) and the band below
 * never jumps. Only the panel leaving and the panel arriving move: the arriving
 * one is placed on the side it travels from, so "next" always runs leftwards
 * and "previous" rightwards, straight across the seam from the last slide to
 * the first, without clones of any panel in the page. Panels out of view are
 * hidden and inert, which keeps their links out of the tab order and away from
 * screen readers.
 *
 * It moves on by itself every few seconds and keeps doing so: an arrow, a dot
 * or a swipe only restarts the count. It holds while keyboard focus is inside,
 * so a reader tabbing through is not pulled away, and while the tab is in the
 * background. Readers who have asked for reduced motion get no clock and no
 * sliding, only the switch.
 */
export function HeroSlider({ slides }: { slides: Slide[] }) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  // Bumped by every manual move, so the clock restarts from the reader's turn.
  const [turn, setTurn] = useState(0);
  const [focused, setFocused] = useState(false);
  const still = useSyncExternalStore(
    watchReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const visible = useSyncExternalStore(
    watchVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );
  const running = !still && visible && !focused;

  const stage = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const touchX = useRef<number | null>(null);
  /** The panel on screen, or on its way there. */
  const shown = useRef(index);
  /** +1 when the last move ran leftwards (next), -1 rightwards. */
  const heading = useRef(1);
  const moving = useRef<Animation[]>([]);
  /** Steps asked for while a slide was still travelling. */
  const queued = useRef(0);
  /** Set while those queued steps play out, which they do more briskly. */
  const hurry = useRef(false);

  /** Moves by a number of slides; positive is forwards. */
  const step = (by: number) => {
    if (!by) return;
    if (moving.current.length) {
      queued.current += by;
      return;
    }
    heading.current = Math.sign(by);
    setIndex((i) => wrap(i + by, n));
  };

  const manual = (by: number) => {
    setTurn((t) => t + 1);
    step(by);
  };

  /** A dot counts from wherever the queued presses will leave the show. */
  const showSlide = (i: number) => manual(i - wrap(index + queued.current, n));

  const advance = useEffectEvent(() => step(1));

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(advance, HOLD_MS);
    // The active dot fills over the same stretch, so the wait is visible.
    const bar = fill.current?.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: HOLD_MS, easing: "linear" },
    );
    return () => {
      window.clearTimeout(timer);
      bar?.cancel();
    };
  }, [running, index, turn]);

  // A layout effect, so the outgoing panel is already animating by the time
  // the render that hid it reaches the screen.
  useLayoutEffect(() => {
    const from = shown.current;
    if (from === index) return;
    shown.current = index;
    const panels = stage.current?.children;
    if (!panels || still) return;

    const out = panels[from] as HTMLElement;
    const into = panels[index] as HTMLElement;
    const dir = heading.current;
    const timing = {
      duration: hurry.current ? QUEUED_MS : SLIDE_MS,
      easing: SLIDE_EASE,
    };
    moving.current = [
      // Hidden at rest, so it is held visible for the length of its exit.
      out.animate(
        [
          { transform: "none", visibility: "visible" },
          { transform: `translateX(${-dir * 100}%)`, visibility: "visible" },
        ],
        timing,
      ),
      into.animate(
        [{ transform: `translateX(${dir * 100}%)` }, { transform: "none" }],
        timing,
      ),
    ];

    // The incoming panel's copy rises in behind the slide, so the change reads
    // as new content rather than the same block shunted sideways. Only pieces
    // marked `data-slide-rise` move; the first panel has HeroReveal on load.
    into.querySelectorAll<HTMLElement>("[data-slide-rise]").forEach((el, i) => {
      el.animate(
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 1000,
          delay: 250 + i * 120,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "backwards",
        },
      );
    });

    Promise.all(moving.current.map((a) => a.finished)).then(
      () => {
        moving.current = [];
        // Presses that landed mid-slide are played out once it settles. Whole
        // laps change nothing, so only the remainder is travelled.
        const ahead = queued.current;
        queued.current = 0;
        const rest = Math.sign(ahead) * (Math.abs(ahead) % n);
        hurry.current = !!rest;
        if (rest) {
          heading.current = Math.sign(rest);
          setIndex((i) => wrap(i + rest, n));
        }
      },
      () => {
        moving.current = [];
      },
    );
  }, [index, still, n]);

  useEffect(
    () => () => {
      for (const a of moving.current) a.cancel();
    },
    [],
  );

  const dark = slides[index].dark;

  return (
    <div
      // Vertical pans stay with the page; sideways ones are left to the swipe
      // below, or the browser claims them and cancels the pointer mid-swipe.
      className="relative touch-pan-y overflow-clip"
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onFocus={(e) => {
        // Only keyboard focus holds the clock; a click leaves focus on the
        // arrow it pressed, and that must not stop the show.
        if (e.target.matches(":focus-visible")) setFocused(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") touchX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (touchX.current === null) return;
        const dx = e.clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) >= SWIPE_PX) manual(dx < 0 ? 1 : -1);
      }}
      onPointerCancel={() => {
        touchX.current = null;
      }}
    >
      {/* The header is 68px plus its 1px rule. */}
      <div ref={stage} className="grid min-h-[calc(100svh-69px)]">
        {slides.map((slide, i) => (
          <div
            key={slide.label}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}: ${slide.label}`}
            inert={i !== index}
            className={`[grid-area:1/1] ${i === index ? "" : "invisible"}`}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/*
        Below lg the arrows flank the dots at the foot, clear of the copy; from
        lg they move out to the side edges, which the content's 80px gutter
        keeps clear.
      */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center gap-3 pb-5 lg:pb-6">
        <SlideArrow label="Previous slide" dark={dark} side="left" onClick={() => manual(-1)}>
          <path d="M15 6l-6 6 6 6" />
        </SlideArrow>
        <div
          className={`pointer-events-auto flex h-10 items-center rounded-full px-2 backdrop-blur-sm transition-colors duration-500 ${
            dark ? "bg-black/15" : "bg-white/75 shadow-[0_2px_10px_rgba(56,49,137,0.12)]"
          }`}
        >
          {slides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => showSlide(i)}
              aria-label={`Show slide ${i + 1}: ${slide.label}`}
              aria-current={i === index}
              className="flex h-6 items-center px-1"
            >
              <span
                className={`relative block h-[6px] overflow-hidden rounded-full transition-[width,background-color] duration-500 motion-reduce:transition-none ${
                  i === index ? "w-8" : "w-[6px]"
                } ${
                  dark
                    ? i === index ? "bg-white/40" : "bg-white/60"
                    : i === index ? "bg-indigo-brand/25" : "bg-indigo-brand/35"
                }`}
              >
                {i === index ? (
                  <span
                    ref={fill}
                    className={`absolute inset-0 origin-left ${dark ? "bg-white" : "bg-indigo-brand"}`}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>
        <SlideArrow label="Next slide" dark={dark} side="right" onClick={() => manual(1)}>
          <path d="M9 6l6 6-6 6" />
        </SlideArrow>
      </div>
    </div>
  );
}

function SlideArrow({
  label,
  dark,
  side,
  onClick,
  children,
}: {
  label: string;
  dark?: boolean;
  side: "left" | "right";
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`pointer-events-auto flex size-10 shrink-0 items-center justify-center rounded-full backdrop-blur-sm transition-colors duration-300 lg:absolute lg:top-1/2 lg:size-12 lg:-translate-y-1/2 ${
        side === "left" ? "lg:left-4" : "lg:right-4"
      } ${
        dark
          ? "bg-white/15 text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] ring-1 ring-white/55 hover:bg-white hover:text-[#156ba5]"
          : "bg-white text-indigo-brand shadow-[0_6px_20px_rgba(56,49,137,0.16)] ring-1 ring-indigo-brand/15 hover:bg-indigo-brand hover:text-gold"
      }`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-[18px] lg:size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}
