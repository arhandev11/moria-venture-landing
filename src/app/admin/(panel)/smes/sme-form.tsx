"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { saveSme } from "../../actions/smes";
import { SubmitButton } from "../../_components/buttons";
import { BTN, Field, FormMessage, INPUT } from "../../_components/ui";

export type SmeFormValues = {
  id?: number;
  name: string;
  sector: string;
  city: string;
  stage: string;
  status: "program" | "funded";
  brief: string;
  askK: string;
  interestPct: string;
  metrics: string;
  raisedK: string;
  investor: string;
  quote: string;
  sortOrder: string;
  published: boolean;
  imageUrl: string | null;
};

/**
 * Add and edit share this form. The status picks which half of the money
 * fields applies: interest for SMEs still in the program, the closed round
 * for funded ones. The hidden half is not sent, so it cannot fail validation.
 */
export function SmeForm({
  initial,
  suggestions,
}: {
  initial: SmeFormValues;
  suggestions: { sectors: string[]; stages: string[]; cities: string[] };
}) {
  const [state, action] = useActionState(saveSme, null);
  const [status, setStatus] = useState(initial.status);
  const v = (key: keyof SmeFormValues) => String(state?.values?.[key] ?? initial[key] ?? "");
  const err = (key: string) => state?.fieldErrors?.[key];
  // React resets uncontrolled inputs after an action; a changing key remounts
  // them with the values that came back, so a rejected form keeps its text.
  const formKey = state ? JSON.stringify(state.values ?? {}) : "initial";

  return (
    <form key={formKey} action={action} className="space-y-8">
      {initial.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      {state?.message ? <FormMessage>{state.message}</FormMessage> : null}

      <Section title="Profile">
        <Field label="Name" error={err("name")} hint="Initials on the tile come from the first two words." className="sm:col-span-2">
          <input name="name" required maxLength={120} defaultValue={v("name")} aria-invalid={!!err("name")} className={INPUT} />
        </Field>
        <Field label="Sector" error={err("sector")} hint="Each sector becomes a filter chip.">
          <input name="sector" required maxLength={60} list="sme-sectors" defaultValue={v("sector")} aria-invalid={!!err("sector")} className={INPUT} />
        </Field>
        <Field label="City" error={err("city")}>
          <input name="city" required maxLength={80} list="sme-cities" defaultValue={v("city")} aria-invalid={!!err("city")} className={INPUT} />
        </Field>
        <Field label="Stage" error={err("stage")} hint="e.g. Pre-seed, Seed, Series A">
          <input name="stage" required maxLength={40} list="sme-stages" defaultValue={v("stage")} aria-invalid={!!err("stage")} className={INPUT} />
        </Field>
        <Field label="Traction" error={err("metrics")} hint="One line, e.g. “40 outlets, 3 export trials”.">
          <input name="metrics" required maxLength={255} defaultValue={v("metrics")} aria-invalid={!!err("metrics")} className={INPUT} />
        </Field>
        <Field label="Brief" error={err("brief")} hint="One or two sentences for the brief dialog." className="sm:col-span-2">
          <textarea name="brief" required rows={3} maxLength={1000} defaultValue={v("brief")} aria-invalid={!!err("brief")} className={INPUT} />
        </Field>
      </Section>

      <Section title="Funding">
        <Field label="Status">
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as SmeFormValues["status"])}
            className={INPUT}
          >
            <option value="program">In the program</option>
            <option value="funded">Funded</option>
          </select>
        </Field>
        <Field label="Ask (USD K)" error={err("askK")} hint="The round being raised, in thousands: 300 = USD 300K.">
          <input name="askK" required inputMode="numeric" defaultValue={v("askK")} aria-invalid={!!err("askK")} className={INPUT} />
        </Field>
        {status === "program" ? (
          <Field label="Investor interest (%)" error={err("interestPct")} hint="Card reads “Investor interest: N% of ask (sample)”.">
            <input name="interestPct" required inputMode="numeric" defaultValue={v("interestPct")} aria-invalid={!!err("interestPct")} className={INPUT} />
          </Field>
        ) : (
          <>
            <Field label="Raised (USD K)" error={err("raisedK")}>
              <input name="raisedK" required inputMode="numeric" defaultValue={v("raisedK")} aria-invalid={!!err("raisedK")} className={INPUT} />
            </Field>
            <Field label="Investor" error={err("investor")} hint="e.g. “MENA family office”.">
              <input name="investor" required maxLength={120} defaultValue={v("investor")} aria-invalid={!!err("investor")} className={INPUT} />
            </Field>
          </>
        )}
        <Field label="Founder quote" error={err("quote")} hint="Optional." className="sm:col-span-2">
          <textarea name="quote" rows={2} maxLength={500} defaultValue={v("quote")} className={INPUT} />
        </Field>
      </Section>

      <Section title="Image and visibility">
        <Field label="Image" error={err("image")} hint="Optional. JPEG, PNG or WebP, up to 2 MB. Without one the tile shows the initials." className="sm:col-span-2">
          <div className="flex flex-wrap items-center gap-4">
            {initial.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- admin preview of an uploaded file
              <img src={initial.imageUrl} alt="" className="h-16 w-28 rounded object-cover" />
            ) : null}
            <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="text-[13px]" />
            {initial.imageUrl ? (
              <label className="flex items-center gap-2 text-[13px]">
                <input type="checkbox" name="removeImage" /> Remove current image
              </label>
            ) : null}
          </div>
        </Field>
        <Field label="Display order" error={err("sortOrder")} hint="Lower comes first. Leave blank to add at the end; the arrows on the list also reorder.">
          <input name="sortOrder" inputMode="numeric" defaultValue={v("sortOrder")} className={INPUT} />
        </Field>
        <Field label="Published">
          <label className="flex h-[38px] items-center gap-2 text-[14px]">
            <input type="checkbox" name="published" defaultChecked={state?.values ? state.values.published === "on" : initial.published} /> Show on /kneks
          </label>
        </Field>
      </Section>

      <div className="flex gap-3 border-t border-rule pt-5">
        <SubmitButton pendingLabel="Saving…">{initial.id ? "Save changes" : "Add SME"}</SubmitButton>
        <Link href="/admin/smes" className={BTN.secondary}>
          Cancel
        </Link>
      </div>

      <datalist id="sme-sectors">{suggestions.sectors.map((s) => <option key={s} value={s} />)}</datalist>
      <datalist id="sme-stages">{suggestions.stages.map((s) => <option key={s} value={s} />)}</datalist>
      <datalist id="sme-cities">{suggestions.cities.map((s) => <option key={s} value={s} />)}</datalist>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-[15px] font-bold text-ink">{title}</legend>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
