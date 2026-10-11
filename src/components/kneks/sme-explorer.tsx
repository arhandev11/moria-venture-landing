"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { StarIcon, useShortlist } from "@/components/kneks/shortlist";
import { SmeBrief, SmeTile } from "@/components/kneks/sme-brief";
import { numberLocale, type Locale } from "@/i18n/config";
import { format, formatPlural } from "@/i18n/format";
import type { Dictionary } from "@/i18n/types";
import { formatMoney, type Money } from "@/lib/money";
import type { LegalForm } from "@/lib/sme-fields";

/** The KNEKS page's dictionary, handed down to its client pieces. */
export type KneksLabels = Dictionary["kneks"];

export type Sme = {
  name: string;
  sector: string;
  city: string | null;
  province: string | null;
  stage: string | null;
  /** What the SME says it is ready for, e.g. "Investment / financing". */
  readiness: string | null;
  /** The description; paragraphs are separated by a blank line. */
  brief: string;
  /** The round the SME is raising, in its own currency; null when not disclosed. */
  ask: Money | null;
  legalForm: LegalForm | null;
  valuationTerms: string | null;
  useOfFunds: string | null;
  supportingOrg: string | null;
  /** Traction, as the brief's one-line summary. */
  metrics: string | null;
  /** An uploaded photo for the tile; without one the tile draws the initials. */
  image?: string | null;
} & (
  | {
      status: "program";
      /** Share of the ask investors have signalled interest in, 0–100; null hides the meter. */
      interest: number | null;
    }
  | {
      status: "funded";
      /** What the closed round raised, in its own currency. */
      raised: Money | null;
      investor: string;
    }
);

/** "Sector · City", falling back to the province, else the sector alone. */
export function placeOf(sme: { sector: string; city: string | null; province?: string | null }) {
  const place = sme.city || sme.province;
  return place ? `${sme.sector} · ${place}` : sme.sector;
}

/** Tile tints, cycled through the cards in the order the deck draws them. */
export const TINTS = ["#e0eae3", "#eee5d1", "#dde9df", "#dde8e8"];

/** One card and the gap after it: what an arrow press moves by. */
const STEP = 300;

/** The sector filter's own "show everything" value; never shown, so never translated. */
const ALL = "\u0000all";

/**
 * The pipeline row, its search and sector filter, and the brief it opens.
 * SME data comes from the database as stored (English); only the interface
 * around it is translated.
 */
export function SmeExplorer({
  smes,
  locale,
  labels,
}: {
  smes: Sme[];
  locale: Locale;
  labels: KneksLabels;
}) {
  const t = labels.explorer;
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState(ALL);
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [briefOf, setBriefOf] = useState<Sme | null>(null);
  /** The card button that opened the brief, so focus can go back to it. */
  const opener = useRef<HTMLButtonElement | null>(null);

  const tintOf = (sme: Sme) => TINTS[smes.indexOf(sme) % TINTS.length];

  const sectors = useMemo(
    () => [ALL, ...[...new Set(smes.map((sme) => sme.sector))].sort((a, b) => a.localeCompare(b))],
    [smes],
  );

  const shown = smes.filter((sme) => {
    if (sector !== ALL && sme.sector !== sector) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [sme.name, sme.sector, sme.city, sme.province].some((field) =>
      field?.toLowerCase().includes(q),
    );
  });
  const shownSectors = new Set(shown.map((sme) => sme.sector)).size;

  // The arrows go quiet at either end of the row. Filtering changes the row's
  // length, so the edges are re-read whenever the visible set changes too.
  // A right-to-left row starts at the right and scrolls into negative
  // scrollLeft, so the distance travelled is read as a magnitude.
  const readEdges = () => {
    const el = scroller.current;
    if (!el) return;
    const travelled = Math.abs(el.scrollLeft);
    setEdges({
      start: travelled <= 1,
      end: travelled + el.clientWidth >= el.scrollWidth - 1,
    });
  };
  useEffect(readEdges, [shown.length]);

  const move = (direction: 1 | -1) => {
    const forwards = document.documentElement.dir === "rtl" ? -1 : 1;
    scroller.current?.scrollBy({ left: direction * forwards * STEP, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-[30px] font-bold leading-[1.15] tracking-[-0.01em] text-kneks-ink lg:text-[38px] lg:leading-[44px]">
            {t.title}
          </h2>
          <p className="mt-[12px] text-[16px] leading-[26px] text-kneks-muted">
            {t.lede}
          </p>
        </div>
        <div className="mt-[20px] hidden gap-3 sm:flex">
          <ArrowButton label={t.previous} disabled={edges.start} onClick={() => move(-1)}>
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </ArrowButton>
          <ArrowButton label={t.next} disabled={edges.end} onClick={() => move(1)}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </ArrowButton>
        </div>
      </div>

      <div className="mt-[28px] flex flex-col gap-4 lg:flex-row lg:items-start">
        <label className="flex h-[49px] w-full shrink-0 items-center gap-3 rounded-lg border border-kneks-line bg-white px-[15px] focus-within:border-kneks-pine lg:w-[290px]">
          <svg viewBox="0 0 24 24" aria-hidden className="size-[18px] shrink-0 stroke-kneks-pine" fill="none" strokeWidth={2.2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <span className="sr-only">{t.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-[14px] text-kneks-ink outline-none placeholder:text-kneks-muted"
          />
        </label>

        {/* Fifteen-odd sectors: one swipeable line on phones, wrapping from sm up. */}
        <div
          className="-mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label={t.filterLabel}
        >
          {sectors.map((name) => {
            const active = name === sector;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                onClick={() => setSector(name)}
                className={`flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-[15px] text-[14px] font-medium transition-colors ${
                  active
                    ? "border-kneks-pine bg-kneks-pine text-white"
                    : "border-kneks-line bg-white text-kneks-muted hover:border-kneks-pine hover:text-kneks-pine"
                }`}
              >
                {active ? (
                  <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth={2.4}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                ) : null}
                {name === ALL ? t.all : name}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={readEdges}
        className="mt-[28px] flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shown.length ? (
          shown.map((sme) => (
            <SmeCard
              key={sme.name}
              sme={sme}
              tint={tintOf(sme)}
              locale={locale}
              labels={labels}
              onOpen={(button) => {
                opener.current = button;
                setBriefOf(sme);
              }}
            />
          ))
        ) : (
          <p className="flex h-[391px] w-full items-center justify-center rounded-xl border border-dashed border-kneks-line text-[15px] text-kneks-muted">
            {t.empty}
          </p>
        )}
      </div>

      <div className="mt-[30px] flex items-center justify-between text-[13px] leading-[18px] text-kneks-muted">
        <p>
          {formatPlural(locale, t.countSmes, shown.length)} ·{" "}
          {formatPlural(locale, t.countSectors, shownSectors)} · {t.curatedProfiles}
        </p>
        <p className="hidden sm:block">{t.scrollHint}</p>
      </div>

      <SmeBrief
        sme={briefOf}
        tint={briefOf ? tintOf(briefOf) : TINTS[0]}
        locale={locale}
        labels={labels}
        onClose={() => {
          setBriefOf(null);
          opener.current?.focus();
        }}
      />
    </>
  );
}

/**
 * A pipeline card. The whole card opens the brief through one stretched button
 * laid over it, while the star stays its own control raised above that button:
 * two siblings rather than a button inside a button.
 */
function SmeCard({
  sme,
  tint,
  locale,
  labels,
  onOpen,
}: {
  sme: Sme;
  tint: string;
  locale: Locale;
  labels: KneksLabels;
  onOpen: (button: HTMLButtonElement) => void;
}) {
  const t = labels.explorer;
  const { names, toggle } = useShortlist();
  const starred = names.includes(sme.name);
  const funded = sme.status === "funded";
  // Funded rows keep the full meter; a program row without a figure shows none.
  const interest = funded ? 100 : sme.interest === null ? null : Math.min(100, Math.max(0, sme.interest));
  const pill = sme.stage || sme.readiness;
  const money = funded ? sme.raised : sme.ask;
  const amount = money ? formatMoney(money, numberLocale[locale], "short") : null;

  return (
    <article className="group relative w-[280px] shrink-0 snap-start rounded-xl border border-kneks-line bg-white transition-colors hover:border-kneks-pine">
      <button
        type="button"
        onClick={(e) => onOpen(e.currentTarget)}
        aria-label={format(t.openBrief, { name: sme.name })}
        aria-haspopup="dialog"
        className="absolute inset-0 z-[1] rounded-xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-kneks-gold"
      />
      <svg viewBox="0 0 16 16" aria-hidden className="absolute inset-e-[15px] top-[15px] size-4 stroke-kneks-muted transition-colors group-hover:stroke-kneks-pine rtl:-scale-x-100" fill="none" strokeWidth={1.3}>
        <path d="M2 14L14 2M5 2h9v9" />
      </svg>

      <div className="p-[23px]">
        <SmeTile name={sme.name} image={sme.image} tint={tint} className="h-[140px]" />
        <h3 className="mt-[23px] text-[20px] font-bold leading-[26px] text-kneks-ink">
          {sme.name}
        </h3>
      </div>

      <div className="border-t border-[#e0eae3] px-[23px] pb-[23px] pt-[24px]">
        <p className="truncate text-[14px] leading-[20px] text-kneks-muted">
          {placeOf(sme)}
        </p>
        {funded && !amount ? null : (
          <p className="mt-[2px] text-[14px] leading-[20px] text-kneks-muted">
            {funded ? t.raised : t.ask}{" "}
            <bdi className={amount ? "font-semibold text-kneks-ink" : ""}>{amount ?? t.notDisclosed}</bdi>
          </p>
        )}
        <div className="mt-[6px] flex min-h-11 items-center justify-between gap-3">
          {funded ? (
            <span className="rounded-full border border-kneks-gold bg-kneks-sand px-[9px] py-[4px] text-[13px] font-semibold leading-[17px] text-kneks-earth">
              {t.funded}
            </span>
          ) : pill ? (
            <span className="min-w-0 truncate rounded-full bg-kneks-mist px-[10px] py-[5px] text-[13px] font-semibold leading-[17px] text-kneks-ink">
              {pill}
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => toggle(sme.name)}
            aria-pressed={starred}
            aria-label={format(starred ? labels.shortlist.remove : labels.shortlist.add, { name: sme.name })}
            className={`relative z-10 flex size-11 items-center justify-center rounded-full border-2 border-kneks-pine transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kneks-gold ${
              starred ? "bg-kneks-pine text-kneks-sand" : "bg-white text-kneks-pine hover:bg-kneks-mist"
            }`}
          >
            <StarIcon filled={starred} className="size-[22px]" />
          </button>
        </div>
        {interest === null ? null : (
          <>
            <div className="mt-[4px] h-[3px] rounded-full bg-[#e0e6e6]">
              <div className="h-full rounded-full bg-kneks-gold" style={{ width: `${interest}%` }} />
            </div>
            <p className="mt-[12px] text-[13px] leading-[18px] text-kneks-muted">
              {funded ? t.roundClosed : format(t.interest, { pct: interest })}
            </p>
          </>
        )}
      </div>
    </article>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border border-kneks-line bg-white text-kneks-pine transition-colors hover:border-kneks-pine disabled:opacity-40 disabled:hover:border-kneks-line"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}
