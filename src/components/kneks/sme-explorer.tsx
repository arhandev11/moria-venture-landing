"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { StarIcon, useShortlist } from "@/components/kneks/shortlist";

export type Sme = {
  name: string;
  initials: string;
  sector: string;
  city: string;
  stage: string;
  /** Share of the round investors have signalled interest in, 0–100. */
  interest: number;
};

/** Tile tints, cycled through the cards in the order the deck draws them. */
const TINTS = ["#e0eae3", "#eee5d1", "#dde9df", "#dde8e8"];

/** One card and the gap after it: what an arrow press moves by. */
const STEP = 300;

export function SmeExplorer({ smes }: { smes: Sme[] }) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const sectors = useMemo(
    () => ["All", ...new Set(smes.map((sme) => sme.sector))],
    [smes],
  );

  const shown = smes.filter((sme) => {
    if (sector !== "All" && sme.sector !== sector) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [sme.name, sme.sector, sme.city].some((field) =>
      field.toLowerCase().includes(q),
    );
  });
  const shownSectors = new Set(shown.map((sme) => sme.sector)).size;

  // The arrows go quiet at either end of the row. Filtering changes the row's
  // length, so the edges are re-read whenever the visible set changes too.
  const readEdges = () => {
    const el = scroller.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  };
  useEffect(readEdges, [shown.length]);

  const move = (direction: 1 | -1) =>
    scroller.current?.scrollBy({ left: direction * STEP, behavior: "smooth" });

  return (
    <>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-[30px] font-bold leading-[1.15] tracking-[-0.01em] text-kneks-ink lg:text-[38px] lg:leading-[44px]">
            SMEs in the program
          </h2>
          <p className="mt-[12px] text-[16px] leading-[26px] text-kneks-muted">
            Explore the sample pipeline by sector, city and funding stage.
          </p>
        </div>
        <div className="mt-[20px] hidden gap-3 sm:flex">
          <ArrowButton label="Previous SMEs" disabled={edges.start} onClick={() => move(-1)}>
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </ArrowButton>
          <ArrowButton label="Next SMEs" disabled={edges.end} onClick={() => move(1)}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </ArrowButton>
        </div>
      </div>

      <div className="mt-[28px] flex flex-col gap-4 lg:flex-row lg:items-center">
        <label className="flex h-[49px] w-full shrink-0 items-center gap-3 rounded-lg border border-kneks-line bg-white px-[15px] focus-within:border-kneks-pine lg:w-[290px]">
          <svg viewBox="0 0 24 24" aria-hidden className="size-[18px] shrink-0 stroke-kneks-pine" fill="none" strokeWidth={2.2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <span className="sr-only">Search SMEs</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, sector, city"
            className="w-full bg-transparent text-[14px] text-kneks-ink outline-none placeholder:text-kneks-muted"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by sector">
          {sectors.map((name) => {
            const active = name === sector;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                onClick={() => setSector(name)}
                className={`flex h-11 items-center gap-1.5 rounded-full border px-[15px] text-[14px] font-medium transition-colors ${
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
                {name}
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
            <SmeCard key={sme.name} sme={sme} tint={TINTS[smes.indexOf(sme) % TINTS.length]} />
          ))
        ) : (
          <p className="flex h-[391px] w-full items-center justify-center rounded-xl border border-dashed border-kneks-line text-[15px] text-kneks-muted">
            No SMEs match that search.
          </p>
        )}
      </div>

      <div className="mt-[30px] flex items-center justify-between text-[13px] leading-[18px] text-kneks-muted">
        <p>
          {shown.length} SME{shown.length === 1 ? "" : "s"} · {shownSectors} sector
          {shownSectors === 1 ? "" : "s"} · Sample profiles
        </p>
        <p className="hidden sm:block">Scroll to explore →</p>
      </div>
    </>
  );
}

function SmeCard({ sme, tint }: { sme: Sme; tint: string }) {
  const { names, toggle } = useShortlist();
  const starred = names.includes(sme.name);

  return (
    <article className="relative w-[280px] shrink-0 snap-start rounded-xl border border-kneks-line bg-white">
      <svg viewBox="0 0 16 16" aria-hidden className="absolute right-[15px] top-[15px] size-4 stroke-kneks-muted" fill="none" strokeWidth={1.3}>
        <path d="M2 14L14 2M5 2h9v9" />
      </svg>

      <div className="p-[23px]">
        <div className="relative h-[140px] overflow-hidden rounded-lg" style={{ backgroundColor: tint }}>
          <svg viewBox="0 0 232 140" aria-hidden className="absolute inset-0 size-full" fill="none" stroke="#0b3d3a" strokeOpacity={0.14}>
            <circle cx="172" cy="69" r="51.5" />
            <path d="M167 23l46 46-46 46-46-46z" />
            <circle cx="196" cy="35" r="17.5" strokeDasharray="3 3" />
            <path d="M18.5 94.5l18.5 18.5-18.5 18.5L0 113z" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[39px] font-normal tracking-[-0.01em] text-kneks-pine">
            {sme.initials}
          </span>
        </div>
        <h3 className="mt-[23px] text-[20px] font-bold leading-[26px] text-kneks-ink">
          {sme.name}
        </h3>
      </div>

      <div className="border-t border-[#e0eae3] px-[23px] pb-[23px] pt-[24px]">
        <p className="text-[14px] leading-[20px] text-kneks-muted">
          {sme.sector} · {sme.city}
        </p>
        <div className="mt-[6px] flex items-center justify-between">
          <span className="rounded-full bg-kneks-mist px-[10px] py-[5px] text-[13px] font-semibold leading-[17px] text-kneks-ink">
            {sme.stage}
          </span>
          <button
            type="button"
            onClick={() => toggle(sme.name)}
            aria-pressed={starred}
            aria-label={starred ? `Remove ${sme.name} from shortlist` : `Add ${sme.name} to shortlist`}
            className={`flex size-11 items-center justify-center rounded-full border-2 border-kneks-pine transition-colors ${
              starred ? "bg-kneks-pine text-kneks-sand" : "text-kneks-pine hover:bg-kneks-mist"
            }`}
          >
            <StarIcon filled={starred} className="size-[22px]" />
          </button>
        </div>
        <div className="mt-[4px] h-[3px] rounded-full bg-[#e0e6e6]">
          <div className="h-full rounded-full bg-kneks-gold" style={{ width: `${sme.interest}%` }} />
        </div>
        <p className="mt-[12px] text-[13px] leading-[18px] text-kneks-muted">
          Investor interest: {sme.interest}% of ask (sample)
        </p>
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
      <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}
