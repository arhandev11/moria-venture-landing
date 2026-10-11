"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

/** How long a slide holds before the next one comes in on its own. */
const HOLD_MS = 9000;
/** A touch has to travel this far sideways to count as a swipe. */
const SWIPE_PX = 60;

const REDUCED = "(prefers-reduced-motion: reduce)";
const watchReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export type Slide = {
  /** Read out by the dots, e.g. "Moria Ventures". */
  label: string;
  /** Whether the slide is drawn on a dark ground, so the controls flip to white. */
  dark?: boolean;
  content: ReactNode;
};

/**
 * Slides the homepage hero sideways between a handful of full-width panels.
 *
 * The panels sit side by side on one track and the track moves, so every panel
 * is as tall as the tallest and the band below never jumps. Panels out of view
 * are made inert, which keeps their links out of the tab order and away from
 * screen readers.
 *
 * It moves on by itself until the reader takes over: any press of an arrow,
 * a dot or a swipe stops the clock for good, and hovering or focusing inside
 * pauses it. Readers who have asked for reduced motion get no clock and no
 * sliding, only the switch.
 */
export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [stopped, setStopped] = useState(false);
  const still = useSyncExternalStore(
    watchReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const touchX = useRef<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const shown = useRef(index);

  useEffect(() => {
    if (still || stopped || held) return;
    const timer = window.setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, [index, still, stopped, held, slides.length]);

  // The incoming panel's copy rises in behind the slide, so the change reads as
  // new content rather than the same block shunted sideways. Only pieces marked
  // `data-slide-rise` move; the first panel has HeroReveal for that on load.
  // Comparing against the last panel shown keeps the development double-run of
  // effects from playing it on mount.
  useEffect(() => {
    if (shown.current === index) return;
    shown.current = index;
    if (still) return;
    const panel = track.current?.children[index];
    panel?.querySelectorAll<HTMLElement>("[data-slide-rise]").forEach((el, i) => {
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
  }, [index, still]);

  const go = (next: number) => {
    setStopped(true);
    setIndex((next + slides.length) % slides.length);
  };

  const dark = slides[index].dark;

  return (
    <div
      // Vertical pans stay with the page; sideways ones are left to the swipe
      // below, or the browser claims them and cancels the pointer mid-swipe.
      className="relative touch-pan-y overflow-clip"
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") touchX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (touchX.current === null) return;
        const dx = e.clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) >= SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
      }}
      onPointerCancel={() => {
        touchX.current = null;
      }}
    >
      <div
        ref={track}
        className={`flex ${still ? "" : "transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.label}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${slide.label}`}
            inert={i !== index}
            className="w-full shrink-0"
          >
            {slide.content}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 lg:bottom-[96px]">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-5 px-6 md:px-10 lg:px-20">
          <div className="pointer-events-auto flex gap-2">
            <SlideArrow label="Previous slide" dark={dark} onClick={() => go(index - 1)}>
              <path d="M15 6l-6 6 6 6" />
            </SlideArrow>
            <SlideArrow label="Next slide" dark={dark} onClick={() => go(index + 1)}>
              <path d="M9 6l6 6-6 6" />
            </SlideArrow>
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}: ${slide.label}`}
                aria-current={i === index}
                className="flex h-6 items-center"
              >
                <span
                  className={`block h-[6px] rounded-full transition-all duration-500 ${
                    i === index ? "w-8" : "w-[6px]"
                  } ${
                    dark
                      ? i === index ? "bg-white" : "bg-white/50"
                      : i === index ? "bg-indigo-brand" : "bg-indigo-brand/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideArrow({
  label,
  dark,
  onClick,
  children,
}: {
  label: string;
  dark?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex size-10 items-center justify-center rounded-full border transition-colors ${
        dark
          ? "border-white/60 text-white hover:bg-white/10"
          : "border-indigo-brand/30 text-indigo-brand hover:border-indigo-brand"
      }`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}
