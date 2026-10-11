import type { ComponentProps } from "react";
import type { Dictionary } from "@/i18n/types";

/** Card and type colours for each ground the facts sit on. */
const TONES = {
  // Glass over the homepage slide's blue-to-green sweep.
  dark: {
    card: "border-white/25 bg-white/10 backdrop-blur-[6px]",
    value: "text-gold",
    label: "",
  },
  // The /kneks hero's light ground: the page's own white cards and hairline,
  // with the value in the headline's indigo.
  light: {
    card: "border-kneks-line bg-white",
    value: "text-indigo-brand",
    label: "text-kneks-ink",
  },
} as const;

/**
 * The three KNEKS facts (founding, chairs, pillars), as cards: dark on the
 * homepage's KNEKS slide, light for anywhere on the site's own ground. The
 * copy lives with the slide in the dictionary. Layout (grid, gaps, when it
 * shows) is the caller's, through `className`.
 */
export function KneksFacts({
  facts,
  tone,
  className = "",
  ...rest
}: {
  facts: Dictionary["home"]["kneksSlide"]["facts"];
  tone: keyof typeof TONES;
} & ComponentProps<"dl">) {
  const colours = TONES[tone];
  return (
    <dl {...rest} className={className}>
      {facts.map((fact) => (
        <div key={fact.value} className={`rounded-xl border px-6 py-5 ${colours.card}`}>
          <dt className={`text-[28px] font-bold leading-[34px] tracking-[-0.01em] ${colours.value}`}>
            {fact.value}
          </dt>
          <dd className={`mt-2 text-[14px] leading-[21px] ${colours.label}`}>{fact.label}</dd>
        </div>
      ))}
    </dl>
  );
}
