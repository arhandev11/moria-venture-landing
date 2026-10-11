"use client";

import { useEffect, useId, useRef } from "react";
import { StarIcon, useShortlist } from "@/components/kneks/shortlist";
import type { Sme } from "@/components/kneks/sme-explorer";

/** The monogram on a tile: the first letters of the first two words. */
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

/**
 * The deck's placeholder art: a pastel tint, the pine outline circles and
 * diamonds, and the SME's initials. The card and the brief share it so an
 * opened brief reads as the same company at a larger size. An SME with an
 * uploaded image shows that instead, cropped to the same box.
 */
export function SmeTile({
  name,
  image,
  tint,
  className = "",
  monogram = "text-[39px]",
}: {
  name: string;
  image?: string | null;
  tint: string;
  className?: string;
  monogram?: string;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ backgroundColor: tint }}>
        {/* Uploads are served as-is from /media; the optimiser adds nothing for an image this size. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ backgroundColor: tint }}>
      <svg viewBox="0 0 232 140" aria-hidden className="absolute inset-0 size-full" fill="none" stroke="#0b3d3a" strokeOpacity={0.14}>
        <circle cx="172" cy="69" r="51.5" />
        <path d="M167 23l46 46-46 46-46-46z" />
        <circle cx="196" cy="35" r="17.5" strokeDasharray="3 3" />
        <path d="M18.5 94.5l18.5 18.5-18.5 18.5L0 113z" />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center font-normal tracking-[-0.01em] text-kneks-pine ${monogram}`}>
        {initials(name)}
      </span>
    </div>
  );
}

/**
 * An SME's brief, in a native modal dialog. showModal gives the focus trap,
 * Esc and the inert page for free; the backdrop click is the one dismissal
 * the platform does not yet do everywhere, so it is handled here.
 */
export function SmeBrief({
  sme,
  tint,
  onClose,
}: {
  sme: Sme | null;
  tint: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { names, toggle } = useShortlist();

  useEffect(() => {
    const el = dialog.current;
    if (sme && el && !el.open) el.showModal();
  }, [sme]);

  const close = () => dialog.current?.close();
  const starred = sme ? names.includes(sme.name) : false;

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      // Only a click that lands on the dialog box itself, not its content,
      // is a click on the backdrop: the content fills the box edge to edge.
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="m-auto w-[calc(100%-32px)] max-w-[540px] rounded-xl border border-kneks-line bg-white p-0 text-kneks-ink backdrop:bg-[rgb(11_61_58/0.72)]"
    >
      {sme ? (
        <div className="relative p-[23px] sm:p-[27px]">
          <SmeTile name={sme.name} image={sme.image} tint={tint} className="h-[150px] sm:h-[170px]" monogram="text-[48px]" />
          <button
            type="button"
            onClick={close}
            aria-label="Close brief"
            className="absolute right-[33px] top-[33px] flex size-10 items-center justify-center rounded-full border border-kneks-line bg-white text-kneks-pine transition-colors hover:border-kneks-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kneks-gold sm:right-[37px] sm:top-[37px]"
          >
            <svg viewBox="0 0 16 16" aria-hidden className="size-[14px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>

          <h3 id={titleId} className="mt-[23px] text-[26px] font-bold leading-[32px] text-kneks-ink">
            {sme.name}
          </h3>
          <p className="mt-[4px] text-[14px] leading-[20px] text-kneks-muted">
            {sme.sector} · {sme.city}
          </p>
          <p className="mt-[16px] text-[16px] leading-[26px] text-kneks-ink">{sme.brief}</p>

          <dl className="mt-[20px] grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-[10px] border-y border-kneks-line py-[18px] text-[15px] leading-[22px]">
            <dt className="text-kneks-muted">Stage</dt>
            <dd className="font-medium">{sme.stage}</dd>
            <dt className="text-kneks-muted">Ask</dt>
            <dd className="font-medium">USD {sme.askK}K</dd>
            <dt className="text-kneks-muted">Traction</dt>
            <dd className="font-medium">{sme.metrics}</dd>
            <dt className="text-kneks-muted">Status</dt>
            <dd className="font-medium">
              {sme.status === "funded"
                ? `Funded: USD ${sme.raisedK}K from ${sme.investor}`
                : "In the program"}
            </dd>
          </dl>

          <button
            type="button"
            onClick={() => {
              toggle(sme.name);
              close();
            }}
            className={`mt-[22px] flex h-[43px] items-center gap-[10px] rounded-md px-5 text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kneks-gold ${
              starred
                ? "border border-kneks-pine bg-white text-kneks-pine hover:bg-kneks-mist"
                : "bg-kneks-gold text-kneks-earth hover:bg-[#a87a20]"
            }`}
          >
            <StarIcon filled={starred} className="size-[16px]" />
            {starred ? "Remove from shortlist" : "Add to shortlist"}
          </button>
        </div>
      ) : null}
    </dialog>
  );
}
