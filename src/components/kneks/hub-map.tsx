"use client";

import Image from "next/image";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Hub = {
  name: string;
  /** Position on the 1440 x 882 map artwork. */
  x: number;
  y: number;
  blurb: string;
  /** The program's home base: where every route ends, drawn as the big marker. */
  home?: boolean;
};

type HubState = { hubs: Hub[]; selected: string; select: (name: string) => void };

const HubContext = createContext<HubState | null>(null);

function useHubs() {
  const state = useContext(HubContext);
  if (!state) throw new Error("Hub map parts must sit inside HubMapProvider");
  return state;
}

/**
 * Shares the chosen hub between the map, which spans the whole band, and the
 * chips and card, which sit in the content column. They live at different
 * levels of the section, so the choice is held above both.
 */
export function HubMapProvider({ hubs, children }: { hubs: Hub[]; children: ReactNode }) {
  const [selected, select] = useState(hubs[0].name);
  return <HubContext value={{ hubs, selected, select }}>{children}</HubContext>;
}

/** A gentle sag on each route, so they read as flight paths, not rulers. */
function route(hub: Hub, home: Hub) {
  const mx = (hub.x + home.x) / 2;
  const my = (hub.y + home.y) / 2;
  const dx = home.x - hub.x;
  const dy = home.y - hub.y;
  const length = Math.hypot(dx, dy) || 1;
  const sag = Math.min(40, length * 0.06);
  return `M${hub.x} ${hub.y} Q${mx - (dy / length) * sag} ${my + (dx / length) * sag} ${home.x} ${home.y}`;
}

/** Where a point of the 1440 x 882 artwork sits inside the stage. */
const at = (x: number, y: number, lift = 0) => ({
  left: `${(x / 1440) * 100}%`,
  top: `calc(${(y / 882) * 100}% - ${lift}px)`,
});

/**
 * The map and the hubs on it, filling the band edge to edge like a cover
 * background.
 *
 * Everything is drawn on one stage that stands for the deck's 1440 x 882
 * artwork, so the land, the routes and the dots share one coordinate system
 * and stay on their cities at any size. The stage is centred in the band; only
 * its width is chosen, as the largest of:
 * - the deck's own 1440px, or the band's width where that is narrower, so the
 *   map is 1:1 with the deck at 1440 and a narrower band still shows Riyadh;
 * - 1440 / 2114 of the band's width: the artwork holds land from x = -340 to
 *   1360, and the land reaching 1057 west of centre keeps both sides covered
 *   (east of it is open Pacific, which is the band's own colour);
 * - 1440 / 1094 of the band's height: land from y = -110 keeps the top covered.
 * It stops at 1.3x so on very wide screens the hubs never drift onto the card.
 *
 * Narrow screens keep the map as a backdrop and pick a hub from the chips.
 */
export function HubMapBackdrop() {
  const { hubs, selected, select } = useHubs();
  const home = hubs.find((hub) => hub.home);
  const away = hubs.filter((hub) => !hub.home);

  return (
    <div className="pointer-events-none absolute inset-0 [container-type:size]">
      <div className="absolute left-1/2 top-1/2 aspect-[1440/882] w-[min(max(min(1440px,100cqw),68.12cqw,131.63cqh),1872px)] -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/assets/kneks/map.svg"
          alt=""
          aria-hidden
          width={1700}
          height={1120}
          className="absolute max-w-none select-none"
          style={{
            left: `${(-340 / 1440) * 100}%`,
            top: `${(-110 / 882) * 100}%`,
            width: `${(1700 / 1440) * 100}%`,
            height: `${(1120 / 882) * 100}%`,
          }}
        />

        <div className="absolute inset-0 hidden lg:block">
          <svg viewBox="0 0 1440 882" aria-hidden className="absolute inset-0 size-full" fill="none">
            {home && away.map((hub) => (
              <path
                key={hub.name}
                d={route(hub, home)}
                stroke="#b8892b"
                strokeWidth={1.4}
                strokeDasharray="4 4"
                opacity={hub.name === selected ? 1 : 0.75}
              />
            ))}
          </svg>

          {away.map((hub) => {
            const active = hub.name === selected;
            return (
              <button
                key={hub.name}
                type="button"
                onClick={() => select(hub.name)}
                aria-pressed={active}
                aria-label={`${hub.name}: see who we are looking for there`}
                className="group pointer-events-auto absolute flex -translate-x-1/2 flex-col items-center"
                style={at(hub.x, hub.y, 24)}
              >
                <span className="text-[9px] font-bold leading-[15px] text-kneks-ink">
                  {hub.name}
                </span>
                <span
                  className={`mt-[3px] block size-3 rounded-full bg-kneks-pine transition-shadow ${
                    active
                      ? "shadow-[0_0_0_4px_rgba(184,137,43,0.35)]"
                      : "group-hover:shadow-[0_0_0_4px_rgba(11,61,58,0.15)]"
                  }`}
                />
              </button>
            );
          })}

          {home ? (
            <button
              type="button"
              onClick={() => select(home.name)}
              aria-pressed={home.name === selected}
              aria-label={`${home.name}, home base: see what we do there`}
              className="group pointer-events-auto absolute flex -translate-x-1/2 flex-col items-center"
              style={at(home.x, home.y, 56)}
            >
              <span className="text-[12px] font-bold leading-[19px] text-kneks-ink">{home.name}</span>
              <span className="text-[12px] leading-[19px] text-kneks-muted">Home base</span>
              <span
                className={`mt-[1px] flex size-[34px] items-center justify-center rounded-full border-2 border-kneks-gold bg-kneks-pine transition-shadow ${
                  home.name === selected
                    ? "shadow-[0_0_0_4px_rgba(184,137,43,0.35)]"
                    : "group-hover:shadow-[0_0_0_4px_rgba(11,61,58,0.15)]"
                }`}
              >
                <svg viewBox="0 0 16 16" aria-hidden className="size-[11px]" fill="none" stroke="white" strokeWidth={1.4}>
                  <path d="M2 14h12M3.5 14V7h9v7M2.5 7L8 3l5.5 4M6 10h4" />
                </svg>
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** The chips that stand in for the dots on narrow screens, and the card that describes the chosen hub. */
export function HubPicker() {
  const { hubs, selected, select } = useHubs();
  const current = hubs.find((hub) => hub.name === selected) ?? hubs[0];

  return (
    <>
      <div className="relative mt-8 flex flex-wrap gap-2 lg:hidden">
        {hubs.map((hub) => (
          <button
            key={hub.name}
            type="button"
            onClick={() => select(hub.name)}
            aria-pressed={hub.name === selected}
            className={`h-10 rounded-full border px-4 text-[14px] font-medium ${
              hub.name === selected
                ? "border-kneks-pine bg-kneks-pine text-white"
                : "border-kneks-line bg-white text-kneks-muted"
            }`}
          >
            {hub.name}
          </button>
        ))}
      </div>

      <div
        aria-live="polite"
        className="relative mt-6 flex flex-col gap-2 rounded-xl border border-kneks-line bg-white px-6 py-[21px] sm:flex-row sm:items-center sm:gap-[21px] lg:absolute lg:bottom-[50px] lg:left-1/2 lg:mt-0 lg:w-[1024px] lg:-translate-x-1/2"
      >
        <p className="flex shrink-0 items-center gap-2 text-[16px] font-semibold leading-[26px] text-kneks-pine">
          <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12.5l2.8 2.8L16.5 9.5" />
          </svg>
          {current.name} · Selected
        </p>
        <p className="text-[16px] leading-[26px] text-kneks-ink">{current.blurb}</p>
      </div>
    </>
  );
}
