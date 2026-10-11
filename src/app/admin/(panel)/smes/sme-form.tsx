"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { formatMoney, isSmeCurrency, parseWholeAmount, SME_CURRENCIES } from "@/lib/money";
import { CURATION_STATUS_LABELS, CURATION_STATUSES, isHttpUrl, LEGAL_FORM_LABELS, LEGAL_FORMS, SME_TEXT_LIMITS } from "@/lib/sme-fields";
import { saveSme } from "../../actions/smes";
import { SubmitButton } from "../../_components/buttons";
import { Combobox } from "../../_components/combobox";
import { ExternalIcon } from "../../_components/icons";
import { ModalBody, ModalFooter } from "../../_components/modal";
import { btn, FormMessage, INPUT } from "../../_components/ui";
import { citiesOf } from "./indonesia-regions";

export type SmeFormValues = {
  id?: number;
  name: string;
  sector: string;
  city: string;
  province: string;
  stage: string;
  readiness: string;
  status: "program" | "funded";
  brief: string;
  askAmount: string;
  askCurrency: string;
  askCurrencyInferred: boolean;
  interestPct: string;
  metrics: string;
  raisedAmount: string;
  raisedCurrency: string;
  investor: string;
  quote: string;
  legalForm: string;
  supportingOrg: string;
  valuationTerms: string;
  useOfFunds: string;
  curationStatus: string;
  productCategory: string;
  ceoName: string;
  address: string;
  potentialInvestors: string;
  curationNotes: string;
  pitchDeckUrl: string;
  dataQualityNotes: string;
  /** Where an imported row came from, e.g. "HSDD 2026 · row 23"; null when added by hand. Never posted. */
  source: string | null;
  sortOrder: string;
  published: boolean;
  imageUrl: string | null;
};

export type SmeSuggestions = { sectors: string[]; stages: string[]; provinces: string[]; readiness: string[] };

export const EMPTY_SME: SmeFormValues = {
  name: "",
  sector: "",
  city: "",
  province: "",
  stage: "",
  readiness: "",
  status: "program",
  brief: "",
  askAmount: "",
  askCurrency: "",
  askCurrencyInferred: false,
  interestPct: "",
  metrics: "",
  raisedAmount: "",
  raisedCurrency: "",
  investor: "",
  quote: "",
  legalForm: "",
  supportingOrg: "",
  valuationTerms: "",
  useOfFunds: "",
  curationStatus: "",
  productCategory: "",
  ceoName: "",
  address: "",
  potentialInvestors: "",
  curationNotes: "",
  pitchDeckUrl: "",
  dataQualityNotes: "",
  source: null,
  sortOrder: "",
  published: true,
  imageUrl: null,
};

type TextKey = {
  [K in keyof SmeFormValues]-?: SmeFormValues[K] extends string ? K : never;
}[keyof SmeFormValues];

const L = SME_TEXT_LIMITS;

/**
 * Add and edit share this form, in the list's dialog or on its own page.
 * Three sections: what the KNEKS page shows, the money, and the curation
 * record that never leaves the admin. The status picks which money fields
 * apply: interest for SMEs still in the programme, the closed round for
 * funded ones; the other half is not sent. Only name, sector and brief are
 * required. Enter in any single-line field saves.
 */
export function SmeForm({
  initial,
  suggestions,
  onSaved,
  onCancel,
  onDirty,
  layout,
}: {
  initial: SmeFormValues;
  suggestions: SmeSuggestions;
  onSaved: (message: string) => void;
  onCancel: () => void;
  onDirty?: () => void;
  /** "modal" splits into a scrolling body and a pinned footer. */
  layout: "modal" | "page";
}) {
  const [state, action] = useActionState(saveSme, null);
  const [status, setStatus] = useState(initial.status);
  const reported = useRef<typeof state>(null);

  useEffect(() => {
    if (state?.ok && reported.current !== state) {
      reported.current = state;
      onSaved(state.message ?? "Saved.");
    }
  }, [state, onSaved]);

  const v = (key: TextKey) => state?.values?.[key] ?? initial[key] ?? "";
  const on = (key: "published" | "askCurrencyInferred") => (state?.values ? state.values[key] === "on" : initial[key]);
  const err = (key: string) => state?.fieldErrors?.[key];
  // React clears a form after its action; keying on what came back remounts
  // the fields with those values, so a rejected form keeps its text.
  const formKey = state && !state.ok ? JSON.stringify(state.values ?? {}) : "initial";
  const isNew = !initial.id;

  /** A plain one-line input. */
  const line = (key: TextKey, props: { required?: boolean; autoFocus?: boolean; placeholder?: string } = {}) => (
    <input
      name={key}
      required={props.required}
      data-autofocus={props.autoFocus || undefined}
      maxLength={L[key as keyof typeof L]}
      placeholder={props.placeholder}
      defaultValue={v(key)}
      aria-invalid={!!err(key)}
      className={INPUT}
    />
  );
  const area = (key: TextKey, rows: number, required = false) => (
    <textarea name={key} required={required} rows={rows} maxLength={L[key as keyof typeof L]} defaultValue={v(key)} aria-invalid={!!err(key)} className={INPUT} />
  );
  const combo = (key: "sector" | "stage" | "readiness", label: string, options: readonly string[], creatable = true, required = false) => (
    <Combobox
      name={key}
      label={label}
      options={options}
      creatable={creatable}
      required={required}
      maxLength={L[key]}
      placeholder={`Choose ${label.toLowerCase().startsWith("a") ? "an" : "a"} ${label.toLowerCase()}`}
      defaultValue={v(key)}
      invalid={!!err(key)}
      onValueChange={onDirty}
    />
  );

  const fields = (
    <div className="space-y-6">
      {state && !state.ok && state.message ? <FormMessage>{state.message}</FormMessage> : null}

      <Group title="Public profile" hint="Shown on the KNEKS page.">
        <Field label="Name" error={err("name")} hint="The tile shows the initials of the first two words." className="sm:col-span-2">
          {line("name", { required: true, autoFocus: true })}
        </Field>
        <Field label="Sector" error={err("sector")} hint="Each sector becomes a filter on the page. Pick one, or type a new one.">
          {combo("sector", "Sector", suggestions.sectors, true, true)}
        </Field>
        <Field label="Product category" adminOnly error={err("productCategory")} hint="As the curation source wrote it.">
          {line("productCategory")}
        </Field>
        <PlaceFields
          provinces={suggestions.provinces}
          province={v("province")}
          city={v("city")}
          provinceError={err("province")}
          cityError={err("city")}
          onDirty={onDirty}
        />
        <Field label="Readiness" error={err("readiness")} hint="What the SME is ready for. Shown as the pill when there is no stage.">
          {combo("readiness", "Readiness", suggestions.readiness)}
        </Field>
        <Field label="Stage" error={err("stage")}>
          {combo("stage", "Stage", suggestions.stages, false)}
        </Field>
        <Field label="Legal form" error={err("legalForm")}>
          <select name="legalForm" defaultValue={v("legalForm")} aria-invalid={!!err("legalForm")} className={INPUT}>
            <option value="">Not stated</option>
            {LEGAL_FORMS.map((f) => (
              <option key={f} value={f}>
                {LEGAL_FORM_LABELS[f]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Supporting organisation" error={err("supportingOrg")} hint="Ministry, agency or incubator.">
          {line("supportingOrg")}
        </Field>
        <Field label="Traction" error={err("metrics")} hint="One line, like “40 outlets, 3 export trials”." className="sm:col-span-2">
          {line("metrics")}
        </Field>
        <Field label="Brief" error={err("brief")} hint="Shown when a visitor opens the card. Separate paragraphs with a blank line." className="sm:col-span-2">
          {area("brief", 5, true)}
        </Field>
        <Field label="Use of funds" error={err("useOfFunds")} className="sm:col-span-2">
          {area("useOfFunds", 3)}
        </Field>
        <Field label="Equity / valuation terms" error={err("valuationTerms")} hint="As offered, like “10% equity”." className="sm:col-span-2">
          {line("valuationTerms")}
        </Field>
        <Field label="Founder quote" error={err("quote")} className="sm:col-span-2">
          {area("quote", 2)}
        </Field>
        <ImagePicker current={initial.imageUrl} error={err("image")} />
        <label className="flex items-start gap-2.5 sm:col-span-2">
          <input type="checkbox" name="published" defaultChecked={on("published")} className="mt-0.5 size-4 accent-indigo-brand" />
          <span className="text-[14px]">
            <span className="font-semibold">Show on the KNEKS page</span>
            <span className="block text-[12px] text-ink-muted">Hidden SMEs stay here and can be published any time.</span>
          </span>
        </label>
      </Group>

      <Group title="Funding" hint="Amounts stay in the currency they were given in; nothing is converted.">
        <MoneyField
          label="Ask"
          amountName="askAmount"
          currencyName="askCurrency"
          amount={v("askAmount")}
          currency={v("askCurrency")}
          amountError={err("askAmount")}
          currencyError={err("askCurrency")}
          onDirty={onDirty}
        />
        <label className="flex items-start gap-2.5 sm:col-span-2">
          <input type="checkbox" name="askCurrencyInferred" defaultChecked={on("askCurrencyInferred")} className="mt-0.5 size-4 accent-indigo-brand" />
          <span className="text-[14px]">
            <span className="font-semibold">Currency unconfirmed</span> <AdminOnly />
            <span className="block text-[12px] text-ink-muted">The source gave a figure without a currency; it was guessed from its size. Untick once the SME confirms.</span>
          </span>
        </label>
        <Field label="Status">
          <select name="status" value={status} onChange={(e) => setStatus(e.target.value as SmeFormValues["status"])} className={INPUT}>
            <option value="program">In the programme</option>
            <option value="funded">Funded</option>
          </select>
        </Field>
        {status === "program" ? (
          <Field label="Investor interest (%)" error={err("interestPct")} hint="Shown as “Investor interest: N% of ask”. Leave blank to hide the meter.">
            <input name="interestPct" inputMode="numeric" defaultValue={v("interestPct")} aria-invalid={!!err("interestPct")} className={INPUT} />
          </Field>
        ) : (
          <>
            <Field label="Investor" error={err("investor")} hint="Like “MENA family office”.">
              <input name="investor" required maxLength={L.investor} defaultValue={v("investor")} aria-invalid={!!err("investor")} className={INPUT} />
            </Field>
            <MoneyField
              label="Raised"
              amountName="raisedAmount"
              currencyName="raisedCurrency"
              amount={v("raisedAmount")}
              currency={v("raisedCurrency")}
              amountError={err("raisedAmount")}
              currencyError={err("raisedCurrency")}
              onDirty={onDirty}
            />
          </>
        )}
      </Group>

      <Group title="Programme / internal" badge hint="Never shown on the KNEKS page.">
        <Field label="Curation status" error={err("curationStatus")}>
          <select name="curationStatus" defaultValue={v("curationStatus")} aria-invalid={!!err("curationStatus")} className={INPUT}>
            <option value="">None (added by hand)</option>
            {CURATION_STATUSES.map((c) => (
              <option key={c} value={c}>
                {CURATION_STATUS_LABELS[c]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="CEO / owner" error={err("ceoName")}>
          {line("ceoName")}
        </Field>
        <Field label="Address" error={err("address")} className="sm:col-span-2">
          {area("address", 2)}
        </Field>
        <PitchDeckField initial={v("pitchDeckUrl")} error={err("pitchDeckUrl")} />
        <Field label="Potential investors" error={err("potentialInvestors")} className="sm:col-span-2">
          {area("potentialInvestors", 2)}
        </Field>
        <Field label="Curation notes" error={err("curationNotes")} className="sm:col-span-2">
          {area("curationNotes", 3)}
        </Field>
        <Field label="Data-quality notes" error={err("dataQualityNotes")} hint="One note per line." className="sm:col-span-2">
          {area("dataQualityNotes", 3)}
        </Field>
        <div className="sm:col-span-2">
          <p className="text-[13px] font-semibold text-ink">Source</p>
          <p className="mt-1 text-[14px] text-ink-muted">{initial.source ?? "Added by hand"}</p>
        </div>
      </Group>
    </div>
  );

  const actions = (
    <>
      <button type="button" onClick={onCancel} className={btn("secondary")}>
        Cancel
      </button>
      <SubmitButton pendingLabel="Saving…">{isNew ? "Add SME" : "Save changes"}</SubmitButton>
    </>
  );

  return (
    <form key={formKey} action={action} onInput={onDirty} onChange={onDirty}>
      {initial.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      {layout === "modal" ? (
        <>
          <ModalBody>{fields}</ModalBody>
          <ModalFooter>{actions}</ModalFooter>
        </>
      ) : (
        <>
          {fields}
          <div className="mt-6 flex justify-end gap-2 border-t border-ink/10 pt-5">{actions}</div>
        </>
      )}
    </form>
  );
}

function AdminOnly() {
  return (
    <span className="ml-1 inline-flex items-center rounded bg-ink/[0.06] px-1.5 py-px align-[1px] text-[10px] font-semibold uppercase tracking-[0.04em] text-ink-muted ring-1 ring-inset ring-ink/10">
      Admin only
    </span>
  );
}

function Group({ title, hint, badge, children }: { title: string; hint?: string; badge?: boolean; children: ReactNode }) {
  return (
    <fieldset className="border-t border-ink/10 pt-5 first-of-type:border-t-0 first-of-type:pt-0">
      <legend className="float-left mb-4 w-full text-[13px] font-semibold text-ink-muted">
        {title}
        {badge ? <AdminOnly /> : null}
        {hint ? <span className="block text-[12px] font-normal">{hint}</span> : null}
      </legend>
      <div className="clear-left grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

/** The kit's Field, with room for the "Admin only" tag next to the label. */
function Field({
  label,
  adminOnly,
  hint,
  error,
  children,
  className = "",
}: {
  label: string;
  adminOnly?: boolean;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[13px] font-semibold text-ink">
        {label}
        {adminOnly ? <AdminOnly /> : null}
      </span>
      <span className="mt-1.5 block">{children}</span>
      {error ? (
        <span role="alert" className="mt-1.5 block text-[12px] font-medium text-red-700">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-[12px] leading-[18px] text-ink-muted">{hint}</span>
      ) : null}
    </label>
  );
}

/**
 * Province first, then the city: the city list is that province's cities and
 * regencies, and stays shut until a province is picked. A city not in the list
 * can still be typed in. Changing the province drops a city that is not in the
 * new one's list. A saved city the list does not know keeps showing as is.
 */
function PlaceFields({
  provinces,
  province: initialProvince,
  city: initialCity,
  provinceError,
  cityError,
  onDirty,
}: {
  provinces: readonly string[];
  province: string;
  city: string;
  provinceError?: string;
  cityError?: string;
  onDirty?: () => void;
}) {
  const [province, setProvince] = useState(initialProvince);
  const [city, setCity] = useState(initialCity);
  // Bumped to remount the city box when the province clears it.
  const [cityKey, setCityKey] = useState(0);
  const cities = citiesOf(province);

  return (
    <>
      <Field label="Province" error={provinceError}>
        <Combobox
          name="province"
          label="Province"
          options={provinces}
          creatable
          maxLength={L.province}
          placeholder="Choose a province"
          defaultValue={province}
          invalid={!!provinceError}
          onValueChange={(next) => {
            setProvince(next);
            if (city && !citiesOf(next).includes(city)) {
              setCity("");
              setCityKey((k) => k + 1);
            }
            onDirty?.();
          }}
        />
      </Field>
      <Field
        label="City"
        error={cityError}
        hint={province ? "A city or regency in this province. Type one in if it is missing." : "Choose a province first."}
      >
        {province || city ? (
          <Combobox
            key={cityKey}
            name="city"
            label="City"
            options={cities}
            creatable
            maxLength={L.city}
            placeholder={province ? "Choose a city" : "Choose a province first"}
            defaultValue={city}
            invalid={!!cityError}
            onValueChange={(next) => {
              setCity(next);
              onDirty?.();
            }}
          />
        ) : (
          <input disabled placeholder="Choose a province first" aria-label="City" className={`${INPUT} cursor-not-allowed bg-shell`} />
        )}
      </Field>
    </>
  );
}

/**
 * An amount and its currency side by side, with the figure written out
 * underneath as it will read ("IDR 15,000,000,000"), so a missing or extra
 * zero shows before saving. Both or neither.
 */
function MoneyField({
  label,
  amountName,
  currencyName,
  amount: initialAmount,
  currency: initialCurrency,
  amountError,
  currencyError,
  onDirty,
}: {
  label: string;
  amountName: string;
  currencyName: string;
  amount: string;
  currency: string;
  amountError?: string;
  currencyError?: string;
  onDirty?: () => void;
}) {
  const [amount, setAmount] = useState(initialAmount);
  const [currency, setCurrency] = useState(initialCurrency);
  // A server error stands until the figure is edited; then the live preview takes over.
  const [edited, setEdited] = useState(false);
  const parsed = amount.trim() ? parseWholeAmount(amount) : null;
  const preview = parsed !== null && isSmeCurrency(currency) ? formatMoney({ amount: parsed, currency }, "en", "full") : null;
  const error = edited ? undefined : (amountError ?? currencyError);

  return (
    <div className="sm:col-span-2">
      <label htmlFor={`${amountName}-input`} className="block text-[13px] font-semibold text-ink">
        {label}
      </label>
      <div className="mt-1.5 flex gap-2">
        <select
          name={currencyName}
          aria-label={`${label} currency`}
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
            setEdited(true);
            onDirty?.();
          }}
          aria-invalid={!edited && !!currencyError}
          className={`${INPUT.replace("w-full ", "")} w-[96px] shrink-0`}
        >
          <option value="">—</option>
          {SME_CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          id={`${amountName}-input`}
          name={amountName}
          inputMode="numeric"
          autoComplete="off"
          placeholder="e.g. 15000000000"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setEdited(true);
          }}
          aria-invalid={!edited && !!amountError}
          className={`${INPUT} tabular-nums`}
        />
      </div>
      {error ? (
        <p role="alert" className="mt-1.5 text-[12px] font-medium text-red-700">
          {error}
        </p>
      ) : (
        <p className="mt-1.5 text-[12px] leading-[18px] text-ink-muted tabular-nums">
          {preview ?? (amount.trim() && parsed === null ? "Whole units only: no decimals or signs." : "Whole units of the currency. Leave both empty if not disclosed.")}
        </p>
      )}
    </div>
  );
}

/** The pitch-deck link, with a button that opens what is typed in a new tab. */
function PitchDeckField({ initial, error }: { initial: string; error?: string }) {
  const [url, setUrl] = useState(initial);
  const valid = isHttpUrl(url.trim());
  return (
    <div className="sm:col-span-2">
      <label htmlFor="pitchDeckUrl-input" className="block text-[13px] font-semibold text-ink">
        Pitch deck link
      </label>
      <div className="mt-1.5 flex gap-2">
        <input
          id="pitchDeckUrl-input"
          name="pitchDeckUrl"
          type="url"
          maxLength={L.pitchDeckUrl}
          placeholder="https://drive.google.com/…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-invalid={!!error}
          className={INPUT}
        />
        {valid ? (
          <a href={url.trim()} target="_blank" rel="noopener noreferrer" className={`${btn("secondary")} h-auto`}>
            <ExternalIcon className="size-4" />
            Open
          </a>
        ) : (
          <span aria-hidden className={`${btn("secondary")} h-auto opacity-40`}>
            <ExternalIcon className="size-4" />
            Open
          </span>
        )}
      </div>
      {error ? (
        <p role="alert" className="mt-1.5 text-[12px] font-medium text-red-700">
          {error}
        </p>
      ) : (
        <p className="mt-1.5 text-[12px] leading-[18px] text-ink-muted">A full http(s) link, usually a Google Drive share link.</p>
      )}
    </div>
  );
}

/**
 * Drop an image or browse for one; the preview shows straight away. The file
 * still travels in the form's own `image` input, so the server checks it
 * exactly as before.
 */
function ImagePicker({ current, error }: { current: string | null; error?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(current);
  const [removed, setRemoved] = useState(false);
  const [over, setOver] = useState(false);

  useEffect(() => () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  const take = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setRemoved(false);
  };

  return (
    <div className="sm:col-span-2">
      <p className="text-[13px] font-semibold text-ink">Image (optional)</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-4">
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            if (input.current && e.dataTransfer.files.length) {
              input.current.files = e.dataTransfer.files;
              take(e.dataTransfer.files);
            }
          }}
          className={`relative flex h-24 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed text-center text-[12px] transition-colors focus-within:ring-3 focus-within:ring-indigo-brand/20 ${
            over ? "border-indigo-brand bg-indigo-brand/[0.04]" : "border-ink/25 bg-shell hover:border-indigo-brand/50"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- local preview of the chosen file */}
          {preview && !removed ? <img src={preview} alt="" className="absolute inset-0 size-full object-cover" /> : null}
          <span className={preview && !removed ? "sr-only" : "px-3 text-ink-muted"}>
            Drop an image or <span className="font-semibold text-indigo-brand">browse</span>
          </span>
          <input
            ref={input}
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => take(e.target.files)}
            className="sr-only"
          />
        </label>
        <div className="space-y-1.5 text-[12px] text-ink-muted">
          <p>JPEG, PNG or WebP, up to 2 MB. Without one, the card shows the initials.</p>
          {preview && !removed ? (
            <button
              type="button"
              onClick={() => {
                setRemoved(true);
                if (input.current) input.current.value = "";
              }}
              className="font-semibold text-red-700 hover:underline"
            >
              Remove image
            </button>
          ) : null}
        </div>
      </div>
      {removed && current ? <input type="hidden" name="removeImage" value="on" /> : null}
      {error ? (
        <p role="alert" className="mt-1.5 text-[12px] font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
