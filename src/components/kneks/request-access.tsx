"use client";

import type { ReactNode } from "react";
import { StarIcon, useShortlist } from "@/components/kneks/shortlist";

const REGIONS = [
  "Saudi Arabia & wider GCC",
  "United Arab Emirates",
  "Malaysia",
  "Singapore",
  "Indonesia",
  "Elsewhere",
];

const TICKETS = [
  "Under USD 100K",
  "USD 100K – 500K",
  "USD 500K – 1M",
  "Above USD 1M",
];

const FIELD =
  "w-full rounded-md border border-kneks-line bg-white px-[13px] text-[15px] text-kneks-ink outline-none transition-colors placeholder:text-kneks-muted focus:border-kneks-pine";

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
 * The access request. Like the site's other forms it is laid out but not yet
 * wired to anything; the shortlist rides along as a hidden field so it is
 * ready when it is.
 */
export function RequestAccessForm() {
  const { names } = useShortlist();

  return (
    <form className="grid gap-x-5 gap-y-[27px] sm:grid-cols-2">
      <input type="hidden" name="shortlist" value={names.join(", ")} />
      <Field label="Name">
        <input name="name" autoComplete="name" placeholder="Your full name" className={`${FIELD} h-[49px]`} />
      </Field>
      <Field label="Email">
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={`${FIELD} h-[49px]`} />
      </Field>
      <Field label="Region">
        <Select name="region" placeholder="Select region" options={REGIONS} />
      </Field>
      <Field label="Ticket size">
        <Select name="ticket" placeholder="Select ticket size" options={TICKETS} />
      </Field>
      <Field label="Message" wide>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your investment interests."
          className={`${FIELD} h-[110px] resize-none py-[11px] leading-[24px]`}
        />
      </Field>

      <div className="-mt-[10px] sm:col-span-2">
        <p className="text-[13px] leading-[18px] text-kneks-muted">
          Your details are used only to coordinate investor access and introductions.
        </p>
        <button
          type="submit"
          className="mt-[18px] flex h-[43px] items-center gap-[10px] rounded-md bg-kneks-gold px-5 text-[14px] font-semibold text-kneks-earth transition-colors hover:bg-[#a87a20]"
        >
          Send request
          <svg viewBox="0 0 16 16" aria-hidden className="size-[13px]" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M3 13L13 3M5.5 3H13v7.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  wide = false,
  children,
}: {
  label: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="block text-[13px] font-semibold leading-[18px] text-kneks-ink">{label}</span>
      <span className="mt-[7px] block">{children}</span>
    </label>
  );
}

function Select({
  name,
  placeholder,
  options,
}: {
  name: string;
  placeholder: string;
  options: string[];
}) {
  return (
    <span className="relative block">
      <select
        name={name}
        defaultValue=""
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
