"use client";

import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { CoinIcon, useShortlist } from "@/components/kneks/shortlist";
import { SmeTile } from "@/components/kneks/sme-brief";
import { placeOf, TINTS, type KneksLabels } from "@/components/kneks/sme-explorer";
import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { submitInvestorRequest } from "@/lib/actions/investor-request";
import {
  HONEYPOT_FIELD,
  LOCALE_FIELD,
  REQUEST_LIMITS,
  type InvestorRequestResult,
} from "@/lib/investor-request";

/** What the form's SME picker needs of each published SME. */
export type SmeOption = {
  name: string;
  sector: string;
  city: string | null;
  province?: string | null;
  image: string | null;
  funded: boolean;
};

/** From this many SMEs up, the picker gets a filter box above its list. */
const FILTER_FROM = 9;

/**
 * The shortlist half of a rejected result, read loosely: the action reports
 * `fieldErrors.shortlist` and echoes `values.shortlist`, and the shared types
 * are owned on the server side.
 */
function shortlistResult(result: InvestorRequestResult | null) {
  if (!result || result.ok) return { error: undefined, sent: undefined };
  const error = (result.fieldErrors as Partial<Record<string, string>>).shortlist;
  const raw = (result.values as Record<string, unknown>).shortlist;
  const sent = Array.isArray(raw)
    ? raw.filter((name): name is string => typeof name === "string")
    : typeof raw === "string"
      ? raw.split(",").map((name) => name.trim()).filter(Boolean)
      : undefined;
  return { error, sent };
}

const FIELD =
  "w-full rounded-md border border-kneks-line bg-white px-[13px] text-[15px] text-kneks-ink outline-none transition-colors placeholder:text-kneks-muted focus:border-kneks-pine aria-[invalid=true]:border-[#b3261e]";

/** The investor's starred SMEs, carried into the access request. */
export function ShortlistCard({ labels }: { labels: KneksLabels["shortlist"] }) {
  const { names, toggle } = useShortlist();

  return (
    <div className="rounded-xl border border-kneks-line bg-kneks-mist px-[23px] pb-[25px] pt-[21px]">
      <p className="flex items-center gap-[10px] text-[20px] font-bold leading-[30px] text-kneks-ink">
        <CoinIcon className="size-[22px]" />
        {labels.title}
      </p>
      {names.length ? (
        <ul className="mt-[10px] flex flex-wrap gap-2">
          {names.map((name) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => toggle(name)}
                aria-label={format(labels.remove, { name })}
                className="flex h-8 items-center gap-1.5 rounded-full border border-kneks-line bg-white ps-3 pe-2.5 text-[14px] font-medium text-kneks-ink hover:border-kneks-pine"
              >
                {name}
                <span aria-hidden className="text-kneks-muted">×</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-[10px] text-[16px] leading-[26px] text-kneks-muted">{labels.empty}</p>
      )}
      <p className="mt-[14px] text-[13px] leading-[18px] text-kneks-muted">
        {labels.hint}
      </p>
    </div>
  );
}

/**
 * The access request. Sent to a Server Action that checks every field again
 * and stores it for the team's inbox in /admin; the shortlist rides along as a
 * hidden field. Field errors come back inline, and a sent request swaps the
 * form for a confirmation.
 *
 * The page's language rides along as a hidden field too, since a Server
 * Action cannot read the route's; the action answers in that language. The
 * region and ticket choices are the admin's labels, shown as stored.
 */
export function RequestAccessForm({
  regions,
  tickets,
  smes,
  locale,
  labels,
}: {
  regions: string[];
  tickets: string[];
  smes: SmeOption[];
  locale: Locale;
  labels: KneksLabels;
}) {
  const t = labels.form;
  const { names, replace } = useShortlist();
  // A rejected request puts the shortlist back to what was sent. It lives in
  // the shared shortlist rather than the form, so the form's remount below
  // would not lose it anyway; this covers the server trimming it.
  const [state, action, pending] = useActionState(
    async (previous: InvestorRequestResult | null, formData: FormData) => {
      const result = await submitInvestorRequest(previous, formData);
      const { sent } = shortlistResult(result);
      if (sent) replace(sent.filter((name) => smes.some((sme) => sme.name === name)));
      return result;
    },
    null,
  );
  const failed = state && !state.ok ? state : null;
  const errors = failed?.fieldErrors ?? {};
  const values = failed?.values ?? {};
  const picker = useRef<HTMLFieldSetElement>(null);
  const [pickMissing, setPickMissing] = useState(false);
  // Only shown while nothing is picked: choosing an SME answers it.
  const pickError = names.length
    ? undefined
    : pickMissing
      ? labels.errors.shortlist
      : shortlistResult(state).error;

  if (state?.ok) return <RequestSent shortlist={names} labels={t.sent} />;

  return (
    // React clears a form once its action settles; keying on what came back
    // remounts the fields with those values, so a rejected form keeps its text.
    // noValidate leaves the checking to the server, whose messages show inline.
    <form
      key={failed ? JSON.stringify(values) : "fresh"}
      action={action}
      noValidate
      onSubmit={(e) => {
        // The one check made before sending: with no SME picked the request
        // has nothing to ask about. Preventing the submit also skips the action.
        if (names.length) return;
        e.preventDefault();
        setPickMissing(true);
        picker.current?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.focus();
      }}
      className="relative grid gap-x-5 gap-y-[27px] sm:grid-cols-2"
    >
      <input type="hidden" name="shortlist" value={names.join(", ")} />
      <input type="hidden" name={LOCALE_FIELD} value={locale} />
      <Field label={t.name.label} error={errors.name}>
        <input
          name="name"
          autoComplete="name"
          placeholder={t.name.placeholder}
          maxLength={REQUEST_LIMITS.name}
          defaultValue={values.name}
          aria-invalid={!!errors.name}
          className={`${FIELD} h-[49px]`}
        />
      </Field>
      <Field label={t.email.label} error={errors.email}>
        <input
          name="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          placeholder={t.email.placeholder}
          maxLength={REQUEST_LIMITS.email}
          defaultValue={values.email}
          aria-invalid={!!errors.email}
          className={`${FIELD} h-[49px] rtl:text-right`}
        />
      </Field>
      <Field label={t.region.label} error={errors.region}>
        <Select name="region" placeholder={t.region.placeholder} options={regions} value={values.region} invalid={!!errors.region} />
      </Field>
      <Field label={t.ticket.label} error={errors.ticket}>
        <Select name="ticket" placeholder={t.ticket.placeholder} options={tickets} value={values.ticket} invalid={!!errors.ticket} />
      </Field>
      <SmePicker ref={picker} smes={smes} labels={t} error={pickError} onPick={() => setPickMissing(false)} />
      <Field label={t.message.label} wide error={errors.message}>
        <textarea
          name="message"
          rows={4}
          placeholder={t.message.placeholder}
          maxLength={REQUEST_LIMITS.message}
          defaultValue={values.message}
          aria-invalid={!!errors.message}
          className={`${FIELD} h-[110px] resize-none py-[11px] leading-[24px]`}
        />
      </Field>

      <div className="-mt-[10px] sm:col-span-2">
        {/* Off-screen and skipped by keyboard and screen readers: only bots fill
            it. It sits inside this block rather than directly in the grid, where
            the site's scroll reveal would pick it up and wait on it forever. Pushed
            off the inline start, which on a right-to-left page is the right: off
            the left there it would widen the page's scroll area. */}
        <div aria-hidden className="absolute -inset-s-[10000px] top-0 h-px w-px overflow-hidden">
          <label>
            {t.honeypot}
            <input name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        <p className="text-[13px] leading-[18px] text-kneks-muted">
          {t.privacy}
        </p>
        {failed?.formError ? (
          <p role="alert" className="mt-[12px] text-[14px] leading-[20px] text-[#b3261e]">
            {failed.formError}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="mt-[18px] flex h-[43px] items-center gap-[10px] rounded-md bg-kneks-gold px-5 text-[14px] font-semibold text-kneks-earth transition-colors hover:bg-[#a87a20] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? t.sending : t.send}
          <svg viewBox="0 0 16 16" aria-hidden className="size-[13px] rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M3 13L13 3M5.5 3H13v7.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}

/** Takes the form's place once the request is stored, and takes focus with it. */
function RequestSent({
  shortlist,
  labels,
}: {
  shortlist: string[];
  labels: KneksLabels["form"]["sent"];
}) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => panel.current?.focus(), []);

  return (
    <div
      ref={panel}
      tabIndex={-1}
      role="status"
      className="self-start rounded-xl border border-kneks-line bg-kneks-mist px-[23px] pb-[27px] pt-[23px] outline-none"
    >
      <p className="flex items-center gap-[10px] text-[20px] font-bold leading-[30px] text-kneks-ink">
        <svg viewBox="0 0 16 16" aria-hidden className="size-[18px] text-kneks-pine" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2.5 8.5l3.5 3.5 7.5-8.5" />
        </svg>
        {labels.title}
      </p>
      <p className="mt-[10px] text-[16px] leading-[26px] text-kneks-muted">
        {labels.body}
      </p>
      {shortlist.length ? (
        <p className="mt-[14px] text-[13px] leading-[18px] text-kneks-muted">
          {format(labels.shortlist, { names: shortlist.join(", ") })}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The SMEs the request is about, as a checklist over the shared shortlist:
 * ticking one here stars its card, and starring a card ticks it here. The
 * checkboxes carry no name; the hidden shortlist field posts the selection.
 */
function SmePicker({
  ref,
  smes,
  labels,
  error,
  onPick,
}: {
  ref: React.Ref<HTMLFieldSetElement>;
  smes: SmeOption[];
  labels: KneksLabels["form"];
  error?: string;
  onPick: () => void;
}) {
  const { names, toggle } = useShortlist();
  const id = useId();
  const errorId = `${id}-error`;
  const [filter, setFilter] = useState("");
  const q = filter.trim().toLowerCase();
  // Picked SMEs stay listed whatever the filter says, so a tick never vanishes.
  const listed = q
    ? smes.filter(
        (sme) =>
          names.includes(sme.name) ||
          [sme.name, sme.sector, sme.city, sme.province].some((field) => field?.toLowerCase().includes(q)),
      )
    : smes;

  return (
    <fieldset ref={ref} aria-describedby={error ? errorId : undefined} className="min-w-0 sm:col-span-2">
      <legend className="sr-only">{labels.smesLabel}</legend>
      <div aria-hidden className="flex items-baseline justify-between gap-4">
        <span className="text-[13px] font-semibold leading-[18px] text-kneks-ink">{labels.smesLabel}</span>
        <span className="text-[13px] leading-[18px] text-kneks-muted">
          {names.length ? format(labels.selected, { count: names.length }) : labels.pickAtLeastOne}
        </span>
      </div>
      {smes.length >= FILTER_FROM ? (
        <label className="mt-[7px] flex h-[41px] items-center gap-2 rounded-md border border-kneks-line bg-white px-[11px] focus-within:border-kneks-pine">
          <svg viewBox="0 0 24 24" aria-hidden className="size-[15px] shrink-0 stroke-kneks-muted" fill="none" strokeWidth={2.2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <span className="sr-only">{labels.filterSmes}</span>
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            // Enter in the filter must not send the form.
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            placeholder={labels.filterSmesPlaceholder}
            className="w-full min-w-0 bg-transparent text-[14px] text-kneks-ink outline-none placeholder:text-kneks-muted"
          />
        </label>
      ) : null}
      {listed.length ? null : (
        <p className="mt-[7px] text-[13px] leading-[18px] text-kneks-muted">{labels.filterSmesEmpty}</p>
      )}
      <ul className="mt-[7px] grid max-h-[250px] gap-2 overflow-y-auto sm:grid-cols-2">
        {listed.map((sme) => {
          const i = smes.indexOf(sme);
          const picked = names.includes(sme.name);
          return (
            <li key={sme.name}>
              <label
                className={`flex h-[50px] cursor-pointer items-center gap-3 rounded-md border px-[9px] transition-[opacity,border-color,background-color] duration-300 has-focus-visible:border-kneks-pine ${
                  error
                    ? "border-[#b3261e]"
                    : picked
                      ? "border-kneks-gold bg-kneks-sand"
                      : `border-kneks-line bg-white hover:border-kneks-pine ${names.length ? "opacity-55 hover:opacity-100 has-focus-visible:opacity-100" : ""}`
                }`}
              >
                <SmeTile image={sme.image} tint={TINTS[i % TINTS.length]} className="size-8 shrink-0 rounded-md" mark="size-5" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold leading-[19px] text-kneks-ink">{sme.name}</span>
                  <span className="block truncate text-[12px] leading-[17px] text-kneks-muted">
                    {placeOf(sme)}
                  </span>
                </span>
                {sme.funded ? (
                  <span className="shrink-0 rounded-full border border-kneks-gold bg-kneks-sand px-2 py-[2px] text-[11px] font-semibold leading-[15px] text-kneks-earth">
                    {labels.funded}
                  </span>
                ) : null}
                <input
                  type="checkbox"
                  checked={picked}
                  onChange={() => {
                    toggle(sme.name);
                    onPick();
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? errorId : undefined}
                  className="size-[18px] shrink-0 cursor-pointer accent-kneks-pine"
                />
                <span className="sr-only">, {placeOf(sme).replace(" · ", ", ")}{sme.funded ? labels.fundedSr : ""}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {error ? (
        <p id={errorId} role="alert" className="mt-[6px] text-[13px] leading-[18px] text-[#b3261e]">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function Field({
  label,
  wide = false,
  error,
  children,
}: {
  label: string;
  wide?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="block text-[13px] font-semibold leading-[18px] text-kneks-ink">{label}</span>
      <span className="mt-[7px] block">{children}</span>
      {error ? (
        <span role="alert" className="mt-[6px] block text-[13px] leading-[18px] text-[#b3261e]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Select({
  name,
  placeholder,
  options,
  value,
  invalid = false,
}: {
  name: string;
  placeholder: string;
  options: string[];
  /** A previously sent choice, restored after a rejected submit. */
  value?: string;
  invalid?: boolean;
}) {
  return (
    <span className="relative block">
      <select
        name={name}
        defaultValue={value && options.includes(value) ? value : ""}
        aria-invalid={invalid}
        className={`${FIELD} h-[49px] appearance-none pe-10 invalid:text-kneks-muted`}
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <svg viewBox="0 0 16 16" aria-hidden className="pointer-events-none absolute inset-e-[17px] top-1/2 size-[13px] -translate-y-1/2 stroke-kneks-ink" fill="none" strokeWidth={1.8}>
        <path d="M3 6l5 5 5-5" />
      </svg>
    </span>
  );
}
