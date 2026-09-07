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
 * The deck ships this mark as a flat SVG and as a Lottie export
 * (`dates.lottie.json`, 19 shape layers over 137 frames). The JSON is ~1.4MB
 * because its base layer is an inlined PNG, so it only loads once the element is
 * near the viewport, and never when the visitor has asked for reduced motion.
 *
 * Playback is not on a clock: the playhead is tied to how far the mark has
 * travelled through the viewport, so scrolling down traces the outline on and
 * scrolling back up unwinds it, and it holds still whenever the reader does.
 *
 * The export draws only the gold outline, so the filled SVG sits underneath it
 * permanently and the trace runs over the top. Both fill the same box and both
 * preserve the artwork's aspect ratio, so the mark is always shown whole and the
 * two stay registered. Give the box the artwork's own proportion (344 x 648) to
 * avoid letterboxing.
 */
export function AnimatedSupergraphic({
  className = "",
  src = "/assets/homepage/dates.lottie.json",
  baseSrc = "/assets/brand/supergraphic-tall.svg",
  outlineOpacity = 0.35,
  range = [0.3, 0.95] as const,
}: {
  className?: string;
  src?: string;
  baseSrc?: string;
  /**
   * How strongly the traced outline reads over the filled mark. The deck keeps
   * it barely there, so the motion registers without the gold hairlines
   * competing with the headline they sit behind.
   */
  outlineOpacity?: number;
  /**
   * The stretch of the mark's trip through the viewport that the frames map
   * onto, as fractions of it. Starting late matters for the mark at the top of
   * the homepage, which is already part-way through its trip when the page
   * loads: without it the trace would arrive mostly complete and finish within
   * the first few hundred pixels of scroll.
   */
  range?: readonly [number, number];
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        setLoad(true);
      },
      { rootMargin: "300px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const interactions = useMemo(() => [lottieScrollScrub({ range })], [range]);

  return (
    <div ref={hostRef} aria-hidden className={`pointer-events-none ${className}`}>
      {/* The filled mark: the Lottie only traces the gold outline over it. */}
      <Image
        src={baseSrc}
        alt=""
        width={344}
        height={648}
        className="h-full w-full object-contain"
      />
      {load ? (
        <div className="absolute inset-0" style={{ opacity: outlineOpacity }}>
          <LottieInteractions interactions={interactions}>
            <Lottie src={src} autoplay={false} loop={false} className="h-full w-full" />
          </LottieInteractions>
        </div>
      ) : null}
    </div>
  );
}
