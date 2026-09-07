"use client";

import {
  Lottie,
  LottieInteractions,
  lottieScrollScrub,
} from "lottie-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * The line-work supergraphic, drawn by scrolling.
 *
 * The export is self-contained: eighteen stroked shape layers trace the gold
 * line work on, and an image layer underneath fades the filled shapes in from
 * frame 33. Frame 0 is therefore blank, which is the point — none of the mark
 * exists until the reader scrolls it into being. Nothing may be painted behind
 * it, or there is no blank to start from.
 *
 * Playback is not on a clock: the playhead is tied to how far the mark has
 * travelled through the viewport, so scrolling down draws it and scrolling back
 * up unwinds it, and it holds still whenever the reader does.
 *
 * The JSON is ~1.4MB because that image layer is inlined, so it only loads once
 * the element is near the viewport. Readers who have asked for reduced motion
 * get the flat SVG instead: no load, no motion, but the page keeps its mark.
 *
 * Give the box the artwork's own proportion (344 x 648) to avoid letterboxing.
 */
export function AnimatedSupergraphic({
  className = "",
  src = "/assets/homepage/dates.lottie.json",
  stillSrc = "/assets/brand/supergraphic-tall.svg",
  opacity = 0.4,
  range = [0.42, 0.98] as const,
}: {
  className?: string;
  src?: string;
  /** Shown in place of the animation when motion is unwelcome. */
  stillSrc?: string;
  /** How strongly the mark reads against the page behind it. */
  opacity?: number;
  /**
   * The stretch of the mark's trip through the viewport that the frames map
   * onto, as fractions of it. Starting late matters for the mark at the top of
   * the homepage, which is already part-way through its trip when the page
   * loads: without it the mark would arrive part-drawn instead of blank.
   */
  range?: readonly [number, number];
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"idle" | "animate" | "still">("idle");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Both paths wait for the element to come near, so the decision is made in
    // one place and neither the animation nor the still is fetched up front.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        setMode(
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "still"
            : "animate",
        );
      },
      { rootMargin: "300px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const interactions = useMemo(() => [lottieScrollScrub({ range })], [range]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {mode === "animate" ? (
        <LottieInteractions interactions={interactions}>
          <Lottie src={src} autoplay={false} loop={false} className="h-full w-full" />
        </LottieInteractions>
      ) : null}
      {mode === "still" ? (
        <Image
          src={stillSrc}
          alt=""
          width={344}
          height={648}
          className="h-full w-full object-contain"
        />
      ) : null}
    </div>
  );
}
