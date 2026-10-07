import Image from "next/image";

export type MarqueeLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * A full-bleed strip of portfolio logos drifting slowly to the left.
 *
 * The set is rendered twice, back to back, and the track slides by exactly
 * half its own width before snapping back — at that point the second copy sits
 * where the first started, so the jump is invisible. Each logo carries its gap
 * as right padding rather than the track using `gap`, which keeps both halves
 * the same width and the loop seamless.
 *
 * Pure CSS, so it needs no client JavaScript: hovering pauses it, and readers
 * who have asked for reduced motion get the strip standing still.
 */
export function LogoMarquee({
  logos,
  gap = 60,
  duration = 40,
  className = "",
}: {
  logos: MarqueeLogo[];
  /** Space after each logo, in px. */
  gap?: number;
  /** Seconds for one full set to pass. */
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`group overflow-hidden ${className}`}>
      <style>{`@keyframes logo-marquee { to { transform: translateX(-50%); } }`}</style>
      <ul
        className="flex w-max items-center animate-[logo-marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) =>
          logos.map((logo) => (
            <li
              key={`${copy}-${logo.src}`}
              // The second copy only exists to close the loop.
              aria-hidden={copy === 1 || undefined}
              className="shrink-0"
              style={{ paddingRight: gap }}
            >
              <Image
                src={logo.src}
                alt={copy === 1 ? "" : logo.alt}
                width={logo.width}
                height={logo.height}
                className="block max-w-none"
                style={{ width: logo.width, height: logo.height }}
              />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
