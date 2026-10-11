"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { StarIcon, useShortlist } from "@/components/kneks/shortlist";
import { submitInvestorRequest } from "@/lib/actions/investor-request";
import { HONEYPOT_FIELD, REQUEST_LIMITS } from "@/lib/investor-request";

const FIELD =
  "w-full rounded-md border border-kneks-line bg-white px-[13px] text-[15px] text-kneks-ink outline-none transition-colors placeholder:text-kneks-muted focus:border-kneks-pine aria-[invalid=true]:border-[#b3261e]";

/** The investor's starred SMEs, carried into the access request. */
export function ShortlistCard() {
  const { names, toggle } = useShortlist();

  return (
    <div className="rounded-xl border border-kneks-line bg-kneks-mist px-[23px] pb-[25px] pt-[21px]">
      <p className="flex items-center gap-[10px] text-[20px] font-bold leading-[30px] text-kneks-ink">
        <StarIcon className="size-[21px] text-kneks-pine" />
        Your shortlist
      </p>
      {names.length ? (
        <ul className="mt-[10px] flex flex-wrap gap-2">
          {names.map((name) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => toggle(name)}
                aria-label={`Remove ${name} from shortlist`}
                className="flex h-8 items-center gap-1.5 rounded-full border border-kneks-line bg-white pl-3 pr-2.5 text-[14px] font-medium text-kneks-ink hover:border-kneks-pine"
              >
                {name}
                <span aria-hidden className="text-kneks-muted">×</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-[10px] text-[16px] leading-[26px] text-kneks-muted">None yet.</p>
      )}
      <p className="mt-[14px] text-[13px] leading-[18px] text-kneks-muted">
        Star an SME to include it with your access request.
      </p>
    </div>
  );
}

/**
 * The access request. Sent to a Server Action that checks every field again
 * and stores it for the team's inbox in /admin; the shortlist rides along as a
 * hidden field. Field errors come back inline, and a sent request swaps the
 * form for a confirmation.
 */
export function RequestAccessForm({ regions, tickets }: { regions: string[]; tickets: string[] }) {
  const { names } = useShortlist();
  const [state, action, pending] = useActionState(submitInvestorRequest, null);
  const failed = state && !state.ok ? state : null;
  const errors = failed?.fieldErrors ?? {};
  const values = failed?.values ?? {};

  if (state?.ok) return <RequestSent shortlist={names} />;

  return (
    // React clears a form once its action settles; keying on what came back
    // remounts the fields with those values, so a rejected form keeps its text.
    // noValidate leaves the checking to the server, whose messages show inline.
    <form
      key={failed ? JSON.stringify(values) : "fresh"}
      action={action}
      noValidate
      className="relative grid gap-x-5 gap-y-[27px] sm:grid-cols-2"
    >
      <input type="hidden" name="shortlist" value={names.join(", ")} />
      {/* Off-screen and skipped by keyboard and screen readers: only bots fill it. */}
      <div aria-hidden className="absolute left-[-10000px] top-0 h-px w-px overflow-hidden">
        <label>
          Company website
          <input name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <Field label="Name" error={errors.name}>
        <input
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          maxLength={REQUEST_LIMITS.name}
          defaultValue={values.name}
          aria-invalid={!!errors.name}
          className={`${FIELD} h-[49px]`}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={REQUEST_LIMITS.email}
          defaultValue={values.email}
          aria-invalid={!!errors.email}
          className={`${FIELD} h-[49px]`}
        />
      </Field>
      <Field label="Region" error={errors.region}>
        <Select name="region" placeholder="Select region" options={regions} value={values.region} invalid={!!errors.region} />
      </Field>
      <Field label="Ticket size" error={errors.ticket}>
        <Select name="ticket" placeholder="Select ticket size" options={tickets} value={values.ticket} invalid={!!errors.ticket} />
      </Field>
      <Field label="Message" wide error={errors.message}>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your investment interests."
          maxLength={REQUEST_LIMITS.message}
          defaultValue={values.message}
          aria-invalid={!!errors.message}
          className={`${FIELD} h-[110px] resize-none py-[11px] leading-[24px]`}
        />
      </Field>

      <div className="-mt-[10px] sm:col-span-2">
        <p className="text-[13px] leading-[18px] text-kneks-muted">
          Your details are used only to coordinate investor access and introductions.
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
          {pending ? "Sending…" : "Send request"}
          <svg viewBox="0 0 16 16" aria-hidden className="size-[13px]" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M3 13L13 3M5.5 3H13v7.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}

/** Takes the form's place once the request is stored, and takes focus with it. */
function RequestSent({ shortlist }: { shortlist: string[] }) {
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
        Request sent
      </p>
      <p className="mt-[10px] text-[16px] leading-[26px] text-kneks-muted">
        Thanks, we&apos;ll be in touch. Expect the current SME list and an
        invitation to an intro call.
      </p>
      {shortlist.length ? (
        <p className="mt-[14px] text-[13px] leading-[18px] text-kneks-muted">
          Your shortlist went with it: {shortlist.join(", ")}.
        </p>
      ) : null}
    </div>
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
        className={`${FIELD} h-[49px] appearance-none pr-10 invalid:text-kneks-muted`}
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <svg viewBox="0 0 16 16" aria-hidden className="pointer-events-none absolute right-[17px] top-1/2 size-[13px] -translate-y-1/2 stroke-kneks-ink" fill="none" strokeWidth={1.8}>
        <path d="M3 6l5 5 5-5" />
      </svg>
    </span>
  );
}
