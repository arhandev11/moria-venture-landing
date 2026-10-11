"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { numberLocale } from "@/i18n/config";
import { formatNumber } from "@/i18n/format";
import type { Dictionary } from "@/i18n/types";
import type { pipelineStats } from "@/lib/kneks-data";
import { formatMoney, type Money } from "@/lib/money";

/** Length of the count-up: quicker than the prototype's 900ms, so no one waits on it. */
const COUNT_MS = 600;

/**
 * Counts `value` up from zero once it comes into view, like the deck's
 * prototype. The final figure is what renders on the server and before
 * hydration, so crawlers and readers without script see the real number;
 * readers who asked for reduced motion keep it as is.
 *
 * In the /kneks hero the tiles arrive through HeroReveal, faded out and
 * delayed. Counting while they are still invisible would waste the effect, so
 * the count waits out the staged ancestor's `--reveal-delay`.
 */
function useCountUp(value: number) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mounted = performance.now();
    let frame = 0;
    let timer = 0;
    const run = () => {
      let start: number | undefined;
      const step = (now: number) => {
        start ??= now;
        const p = Math.min((now - start) / COUNT_MS, 1);
        // Ease out, so the last digits settle rather than stop dead.
        setShown(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const staged = el.closest<HTMLElement>("[data-hero-pending], [data-hero-in]");
      const delay = staged ? parseFloat(staged.style.getPropertyValue("--reveal-delay")) || 0 : 0;
      setShown(0);
      // Only what is left of it: scrolled to long after load, it counts at once.
      timer = window.setTimeout(run, Math.max(0, delay - (performance.now() - mounted)));
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return [ref, shown] as const;
}

/** A plain count, grouped in the language's separators. */
function Count({ value, locale }: { value: number; locale: Locale }) {
  const [ref, shown] = useCountUp(value);
  return (
    <bdi ref={ref} dir="ltr">
      {formatNumber(locale, shown)}
    </bdi>
  );
}

/**
 * An amount with its currency set small before the figure ("USD 800K"), so
 * the code does not crowd a half-column tile.
 */
function Amount({ money, locale }: { money: Money; locale: Locale }) {
  const [ref, shown] = useCountUp(money.amount);
  const text = formatMoney({ ...money, amount: shown }, numberLocale[locale]);
  const at = text.search(/\d/);
  return (
    <bdi ref={ref} dir="ltr">
      {at > 0 ? (
        <>
          <span className="me-1 text-[0.45em] font-semibold tracking-normal">{text.slice(0, at).trim()}</span>
          {text.slice(at)}
        </>
      ) : (
        text
      )}
    </bdi>
  );
}

/**
 * The /kneks hero's figures, counted from the published SMEs (see
 * pipelineStats): a 2 x 2 grid of tiles and a note under it.
 *
 * Raised totals are kept per currency and never converted, so one currency
 * leads the tile (USD when there is any, as the deck labelled it) and any
 * others are listed small beneath. With nothing raised yet it reads USD 0.
 */
export function PipelineStats({
  stats,
  labels,
  locale,
  className = "",
}: {
  stats: ReturnType<typeof pipelineStats>;
  labels: Dictionary["kneks"]["hero"]["stats"];
  locale: Locale;
  className?: string;
}) {
  const lead = stats.raised.find((m) => m.currency === "USD") ?? stats.raised[0] ?? { currency: "USD", amount: 0 };
  const rest = stats.raised.filter((m) => m !== lead);

  const tiles = [
    { label: labels.smes, figure: <Count value={stats.smes} locale={locale} /> },
    { label: labels.funded, figure: <Count value={stats.funded} locale={locale} /> },
    {
      label: labels.raised,
      figure: <Amount money={lead} locale={locale} />,
      extra: rest.length ? (
        <p className="mt-1 text-[12px] leading-[16px] text-kneks-muted">
          {rest.map((m) => (
            <bdi key={m.currency} dir="ltr" className="me-2 inline-block">
              + {formatMoney(m, numberLocale[locale])}
            </bdi>
          ))}
        </p>
      ) : null,
    },
    { label: labels.sectors, figure: <Count value={stats.sectors} locale={locale} /> },
  ];

  return (
    <div className={className}>
      <dl className="grid grid-cols-2 gap-3 lg:gap-4">
        {tiles.map(({ label, figure, extra }) => (
          // Term (the label) first for the markup, the figure on top to the eye.
          <div
            key={label}
            className="flex flex-col-reverse justify-end rounded-xl border border-kneks-line bg-white px-5 py-5 lg:px-6 lg:py-6"
          >
            <dt className="mt-2 text-[14px] leading-[20px] text-kneks-ink">{label}</dt>
            <dd>
              <span className="block text-[40px] font-bold leading-none tracking-[-0.02em] text-indigo-brand lg:text-[44px]">
                {figure}
              </span>
              {extra}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[13px] leading-[18px] text-kneks-muted">{labels.note}</p>
    </div>
  );
}
