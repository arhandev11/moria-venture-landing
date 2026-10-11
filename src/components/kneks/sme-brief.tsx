"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { StarIcon, useShortlist } from "@/components/kneks/shortlist";
import { placeOf, type KneksLabels, type Sme } from "@/components/kneks/sme-explorer";
import { numberLocale, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { formatMoney } from "@/lib/money";
import { LEGAL_FORM_LABELS } from "@/lib/sme-fields";

/**
 * The deck's placeholder art: a pastel tint, the pine outline circles and
 * diamonds, and the Moria coin until the SME has an image of its own. The
 * card and the brief share it so an opened brief reads as the same company at
 * a larger size. An SME with an uploaded image shows that instead, cropped to
 * the same box.
 */
export function SmeTile({
  image,
  tint,
  className = "",
  mark = "size-14",
}: {
  image?: string | null;
  tint: string;
  className?: string;
  /** Size of the Moria coin shown when the SME has no image yet. */
  mark?: string;
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
      {/* No image yet: the Moria coin stands in, on the SME's tint. */}
      <span className="absolute inset-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brand/logo-coin.svg" alt="" aria-hidden className={`drop-shadow-sm ${mark}`} />
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
  locale,
  labels,
  onClose,
}: {
  sme: Sme | null;
  tint: string;
  locale: Locale;
  labels: KneksLabels;
  onClose: () => void;
}) {
  const t = labels.brief;
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
      className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[540px] overflow-y-auto overscroll-contain rounded-xl border border-kneks-line bg-white p-0 text-kneks-ink backdrop:bg-[rgb(11_61_58/0.72)]"
    >
      {sme ? (
        <div className="relative p-[23px] sm:p-[27px]">
          <SmeTile image={sme.image} tint={tint} className="h-[150px] sm:h-[170px]" mark="size-16" />
          <button
            type="button"
            onClick={close}
            aria-label={t.close}
            className="absolute inset-e-[33px] top-[33px] flex size-10 items-center justify-center rounded-full border border-kneks-line bg-white text-kneks-pine transition-colors hover:border-kneks-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kneks-gold sm:inset-e-[37px] sm:top-[37px]"
          >
            <svg viewBox="0 0 16 16" aria-hidden className="size-[14px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>

          <h3 id={titleId} className="mt-[23px] text-[26px] font-bold leading-[32px] text-kneks-ink">
            {sme.name}
          </h3>
          <p className="mt-[4px] text-[14px] leading-[20px] text-kneks-muted">
            {placeOf(sme)}
            {sme.city && sme.province ? `, ${sme.province}` : null}
          </p>
          <div className="mt-[16px] space-y-[12px] text-[16px] leading-[26px] text-kneks-ink">
            {sme.brief
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, i) => (
                // SME texts stay English on every locale; isolating them keeps
                // their punctuation on the right side of an Arabic page.
                <p key={i} className="whitespace-pre-line">
                  <bdi>{paragraph}</bdi>
                </p>
              ))}
          </div>

          <dl className="mt-[20px] grid gap-y-[12px] border-y border-kneks-line py-[18px] text-[15px] leading-[22px]">
            <Row label={t.readiness}>{sme.readiness}</Row>
            <Row label={t.stage}>{sme.stage}</Row>
            <Row label={t.ask}>
              {sme.ask ? <bdi>{formatMoney(sme.ask, numberLocale[locale], "full")}</bdi> : t.notDisclosed}
            </Row>
            <Row label={t.legalForm}>
              {sme.legalForm ? (t.legalForms[sme.legalForm] ?? LEGAL_FORM_LABELS[sme.legalForm]) : null}
            </Row>
            <Row label={t.supportingOrg}>{sme.supportingOrg}</Row>
            <Row label={t.equity}>{sme.valuationTerms}</Row>
            <Row label={t.useOfFunds}>{sme.useOfFunds}</Row>
            <Row label={t.traction}>{sme.metrics}</Row>
            <Row label={t.status}>
              {sme.status === "funded"
                ? sme.raised
                  ? format(t.fundedFrom, {
                      amount: formatMoney(sme.raised, numberLocale[locale], "full"),
                      investor: sme.investor,
                    })
                  : format(t.fundedBy, { investor: sme.investor })
                : t.inProgram}
            </Row>
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
            {starred ? t.remove : t.add}
          </button>
        </div>
      ) : null}
    </dialog>
  );
}

/** One term of the brief's list; a row with nothing to say is left out. */
function Row({ label, children }: { label: string; children: ReactNode }) {
  if (children === null || children === undefined || children === "") return null;
  return (
    <div className="grid gap-x-6 gap-y-[2px] sm:grid-cols-[150px_minmax(0,1fr)]">
      <dt className="text-kneks-muted">{label}</dt>
      <dd className="whitespace-pre-line break-words font-medium">
        <bdi>{children}</bdi>
      </dd>
    </div>
  );
}
