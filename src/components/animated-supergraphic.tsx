"use client";

import { Lottie, type LottieHandle } from "lottie-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * The line-work supergraphic, animated.
 *
 * The deck ships this mark as a flat SVG and as a Lottie export
 * (`dates.lottie.json`, 19 shape layers over 137 frames) — the same artwork
 * either way. The JSON is ~1.4MB because its base layer is an inlined PNG, so
 * it only loads once the element is near the viewport, and never when the
 * visitor has asked for reduced motion.
 *
 * The export draws only the gold outline, so the filled SVG sits underneath it
 * permanently and the animation traces over the top. Both fill the same box and
 * both preserve the artwork's aspect ratio, so the mark is always shown whole
 * and the two stay registered. Give the box the artwork's own proportion
 * (344 x 648) to avoid letterboxing.
 *
 * Playback ping-pongs: it draws through to the last frame, then back to the
 * first, and keeps alternating. The turn goes through the imperative handle
 * rather than through state — re-rendering on every boundary restarts the
 * animation, which reads as a stutter.
 */
export function AnimatedSupergraphic({
  className = "",
  src = "/assets/homepage/dates.lottie.json",
  baseSrc = "/assets/brand/supergraphic-tall.svg",
  speed = 0.45,
}: {
  className?: string;
  src?: string;
  baseSrc?: string;
  /** Playback rate; the export runs ~2.3s a pass, which is too brisk for ambient motion. */
  speed?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieHandle>(null);
  const directionRef = useRef<"forward" | "reverse">("forward");
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        setPlay(true);
      },
      { rootMargin: "300px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Ping-pong has to hang off `complete` with looping switched off. With `loop`
  // on, the engine wraps to the far end by itself and only then does the
  // handler run, which leaves the playhead already at the end of the new
  // direction — so it completes again immediately and the two fight, one frame
  // at a time. Letting it stop, then turning it round and playing on from where
  // it stopped, is the whole trick.
  const onComplete = useCallback(() => {
    directionRef.current =
      directionRef.current === "forward" ? "reverse" : "forward";
    lottieRef.current?.setDirection(directionRef.current);
    lottieRef.current?.play();
  }, []);

  const subscriptions = useMemo(() => ({ complete: onComplete }), [onComplete]);

  return (
    <div ref={hostRef} aria-hidden className={`pointer-events-none ${className}`}>
      {/* The filled mark: the Lottie only draws the gold outline over it. */}
      <Image
        src={baseSrc}
        alt=""
        width={344}
        height={648}
        className="h-full w-full object-contain"
      />
      {play ? (
        <div className="absolute inset-0">
          <Lottie
            src={src}
            autoplay
            loop={false}
            speed={speed}
            lottieRef={lottieRef}
            subscriptions={subscriptions}
            className="h-full w-full"
          />
        </div>
      ) : null}
    </div>
  );
}
