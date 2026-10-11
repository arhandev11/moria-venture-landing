"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { saveSme } from "../../actions/smes";
import { SubmitButton } from "../../_components/buttons";
import { Combobox } from "../../_components/combobox";
import { ModalBody, ModalFooter } from "../../_components/modal";
import { btn, Field, FormMessage, INPUT } from "../../_components/ui";

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

export type SmeSuggestions = { sectors: string[]; stages: string[]; cities: string[] };

export const EMPTY_SME: SmeFormValues = {
  name: "",
  sector: "",
  city: "",
  stage: "Seed",
  status: "program",
  brief: "",
  askK: "",
  interestPct: "0",
  metrics: "",
  raisedK: "",
  investor: "",
  quote: "",
  sortOrder: "",
  published: true,
  imageUrl: null,
};

/**
 * Add and edit share this form, in the list's dialog or on its own page.
 * The status picks which money fields apply: interest for SMEs still in the
 * programme, the closed round for funded ones; the other half is not sent.
 * Enter in any single-line field saves.
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

  const v = (key: keyof SmeFormValues) => String(state?.values?.[key] ?? initial[key] ?? "");
  const err = (key: string) => state?.fieldErrors?.[key];
  // React clears a form after its action; keying on what came back remounts
  // the fields with those values, so a rejected form keeps its text.
  const formKey = state && !state.ok ? JSON.stringify(state.values ?? {}) : "initial";
  const isNew = !initial.id;

  const fields = (
    <div className="space-y-6">
      {state && !state.ok && state.message ? <FormMessage>{state.message}</FormMessage> : null}

      <Group title="Profile">
        <Field label="Name" error={err("name")} hint="The tile shows the initials of the first two words." className="sm:col-span-2">
          <input name="name" required data-autofocus maxLength={120} defaultValue={v("name")} aria-invalid={!!err("name")} className={INPUT} />
        </Field>
        <Field label="Sector" error={err("sector")} hint="Each sector becomes a filter on the page. Pick one in use, or type a new one.">
          <Combobox
            name="sector"
            label="Sector"
            options={suggestions.sectors}
            creatable
            required
            maxLength={60}
            placeholder="Choose a sector"
            defaultValue={v("sector")}
            invalid={!!err("sector")}
            onValueChange={onDirty}
          />
        </Field>
        <Field label="City" error={err("city")}>
          <Combobox
            name="city"
            label="City"
            options={suggestions.cities}
            creatable
            required
            maxLength={80}
            placeholder="Choose a city"
            defaultValue={v("city")}
            invalid={!!err("city")}
            onValueChange={onDirty}
          />
        </Field>
        <Field label="Stage" error={err("stage")}>
          <Combobox
            name="stage"
            label="Stage"
            options={suggestions.stages}
            required
            maxLength={40}
            placeholder="Choose a stage"
            defaultValue={v("stage")}
            invalid={!!err("stage")}
            onValueChange={onDirty}
          />
        </Field>
        <Field label="Traction" error={err("metrics")} hint="One line, like “40 outlets, 3 export trials”.">
          <input name="metrics" required maxLength={255} defaultValue={v("metrics")} aria-invalid={!!err("metrics")} className={INPUT} />
        </Field>
        <Field label="Brief" error={err("brief")} hint="One or two sentences, shown when a visitor opens the card." className="sm:col-span-2">
          <textarea name="brief" required rows={3} maxLength={1000} defaultValue={v("brief")} aria-invalid={!!err("brief")} className={INPUT} />
        </Field>
      </Group>

      <Group title="Funding">
        <Field label="Status">
          <select name="status" value={status} onChange={(e) => setStatus(e.target.value as SmeFormValues["status"])} className={INPUT}>
            <option value="program">In the programme</option>
            <option value="funded">Funded</option>
          </select>
        </Field>
        <Field label="Ask (USD thousands)" error={err("askK")} hint="300 means USD 300K.">
          <input name="askK" required inputMode="numeric" defaultValue={v("askK")} aria-invalid={!!err("askK")} className={INPUT} />
        </Field>
        {status === "program" ? (
          <Field label="Investor interest (%)" error={err("interestPct")} hint="Shown as “Investor interest: N% of ask”.">
            <input name="interestPct" required inputMode="numeric" defaultValue={v("interestPct")} aria-invalid={!!err("interestPct")} className={INPUT} />
          </Field>
        ) : (
          <>
            <Field label="Raised (USD thousands)" error={err("raisedK")}>
              <input name="raisedK" required inputMode="numeric" defaultValue={v("raisedK")} aria-invalid={!!err("raisedK")} className={INPUT} />
            </Field>
            <Field label="Investor" error={err("investor")} hint="Like “MENA family office”.">
              <input name="investor" required maxLength={120} defaultValue={v("investor")} aria-invalid={!!err("investor")} className={INPUT} />
            </Field>
          </>
        )}
        <Field label="Founder quote (optional)" error={err("quote")} className="sm:col-span-2">
          <textarea name="quote" rows={2} maxLength={500} defaultValue={v("quote")} className={INPUT} />
        </Field>
      </Group>

      <Group title="Image and visibility">
        <ImagePicker current={initial.imageUrl} error={err("image")} />
        <label className="flex items-start gap-2.5 sm:col-span-2">
          <input
            type="checkbox"
            name="published"
            defaultChecked={state?.values ? state.values.published === "on" : initial.published}
            className="mt-0.5 size-4 accent-indigo-brand"
          />
          <span className="text-[14px]">
            <span className="font-semibold">Show on the KNEKS page</span>
            <span className="block text-[12px] text-ink-muted">Hidden SMEs stay here and can be published any time.</span>
          </span>
        </label>
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

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-ink/10 pt-5 first-of-type:border-t-0 first-of-type:pt-0">
      <legend className="float-left mb-4 w-full text-[13px] font-semibold text-ink-muted">{title}</legend>
      <div className="clear-left grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
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
