"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { slugify, STORY_LIMITS as L } from "@/lib/story-fields";
import { saveStory } from "../../actions/stories";
import { SubmitButton } from "../../_components/buttons";
import { Combobox } from "../../_components/combobox";
import { ModalBody, ModalFooter } from "../../_components/modal";
import { btn, Field, FormMessage, INPUT } from "../../_components/ui";
import { useRefusalKey } from "../../_components/use-refusal-key";

export type StoryFormValues = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverAlt: string;
  /** The linked SME's name, or "". */
  sme: string;
  sourceLine: string;
  /** YYYY-MM-DD. */
  publishedAt: string;
  isSample: boolean;
  published: boolean;
  coverUrl: string | null;
};

/** Today in Jakarta, as a date input wants it. */
export function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date());
}

export const EMPTY_STORY: StoryFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  coverAlt: "",
  sme: "",
  sourceLine: "",
  publishedAt: "",
  isSample: false,
  published: true,
  coverUrl: null,
};

type TextKey = "title" | "slug" | "excerpt" | "body" | "coverAlt" | "sourceLine" | "sme" | "publishedAt";

/**
 * Add and edit share this form, in the list's dialog. The slug follows the
 * title while the story is new and the slug has not been typed in; an
 * existing story keeps its slug (and so its link) unless it is edited by hand.
 */
export function StoryForm({
  initial,
  smeNames,
  onSaved,
  onCancel,
  onDirty,
}: {
  initial: StoryFormValues;
  smeNames: string[];
  onSaved: (message: string) => void;
  onCancel: () => void;
  onDirty?: () => void;
}) {
  const [state, action] = useActionState(saveStory, null);
  const reported = useRef<typeof state>(null);

  useEffect(() => {
    if (state?.ok && reported.current !== state) {
      reported.current = state;
      onSaved(state.message ?? "Saved.");
    }
  }, [state, onSaved]);

  const v = (key: TextKey) => state?.values?.[key] ?? initial[key] ?? "";
  const on = (key: "published" | "isSample") => (state?.values ? state.values[key] === "on" : initial[key]);
  const err = (key: string) => state?.fieldErrors?.[key];
  // React clears a form after its action; a new key on every refusal remounts
  // the fields with what came back, so a rejected form keeps its text and choices.
  const formKey = useRefusalKey(state);
  const isNew = !initial.id;

  return (
    <form key={formKey} action={action} onInput={onDirty} onChange={onDirty}>
      {initial.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      <ModalBody>
        <div className="space-y-5">
          {state && !state.ok && state.message ? <FormMessage>{state.message}</FormMessage> : null}

          <TitleAndSlug
            title={v("title")}
            slug={v("slug")}
            // A rejected save hands back the slug made from the title; it still follows the title then.
            follow={isNew && (!v("slug") || v("slug") === slugify(v("title")))}
            titleError={err("title")}
            slugError={err("slug")}
          />

          <Field label="Summary" error={err("excerpt")} hint="One or two sentences for the card on the KNEKS page (cut to three lines there).">
            <textarea name="excerpt" required rows={2} maxLength={L.excerpt} defaultValue={v("excerpt")} aria-invalid={!!err("excerpt")} className={INPUT} />
          </Field>

          <Field
            label="Story"
            error={err("body")}
            hint={
              <>
                Blank line between paragraphs. <Code>## </Code> starts a subheading, <Code>- </Code> a bullet, <Code>**bold**</Code> for bold and{" "}
                <Code>[text](https://link)</Code> for a link.
              </>
            }
          >
            <textarea
              name="body"
              required
              rows={12}
              maxLength={L.body}
              defaultValue={v("body")}
              aria-invalid={!!err("body")}
              className={`${INPUT} font-mono text-[13px] leading-[20px]`}
            />
          </Field>

          <CoverPicker current={initial.coverUrl} error={err("cover")} />
          <Field label="Cover description" error={err("coverAlt")} hint="What the image shows, for screen readers. Leave empty if it is only decoration.">
            <input name="coverAlt" maxLength={L.coverAlt} defaultValue={v("coverAlt")} aria-invalid={!!err("coverAlt")} className={INPUT} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Linked SME" error={err("sme")} hint="Optional. Shown above the title and in an “About” box. A hidden SME is not shown.">
              <Combobox
                name="sme"
                label="Linked SME"
                options={smeNames}
                placeholder="Choose an SME"
                defaultValue={v("sme")}
                invalid={!!err("sme")}
                onValueChange={onDirty}
              />
            </Field>
            <Field label="Author or source" error={err("sourceLine")} hint="Optional, like “Moria Ventures programme team”.">
              <input name="sourceLine" maxLength={L.sourceLine} defaultValue={v("sourceLine")} aria-invalid={!!err("sourceLine")} className={INPUT} />
            </Field>
            <Field label="Date shown" error={err("publishedAt")}>
              <input name="publishedAt" type="date" required defaultValue={v("publishedAt")} aria-invalid={!!err("publishedAt")} className={INPUT} />
            </Field>
          </div>

          <div className="space-y-3 border-t border-ink/10 pt-5">
            <Check name="isSample" defaultChecked={on("isSample")} title="Sample story">
              Marked “Sample story” on the site, for illustrative content that is not a real account.
            </Check>
            <Check name="published" defaultChecked={on("published")} title="Show on the KNEKS page">
              Hidden stories stay here, and their page is not found, until published.
            </Check>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={onCancel} className={btn("secondary")}>
          Cancel
        </button>
        <SubmitButton pendingLabel="Saving…">{isNew ? "Add story" : "Save changes"}</SubmitButton>
      </ModalFooter>
    </form>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-ink/[0.06] px-1 py-px font-mono text-[11px] text-ink">{children}</code>;
}

function Check({ name, defaultChecked, title, children }: { name: string; defaultChecked: boolean; title: string; children: ReactNode }) {
  return (
    <label className="flex items-start gap-2.5">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 size-4 accent-indigo-brand" />
      <span className="text-[14px]">
        <span className="font-semibold">{title}</span>
        <span className="block text-[12px] text-ink-muted">{children}</span>
      </span>
    </label>
  );
}

/** The title, and the slug that follows it until the slug is typed in. */
function TitleAndSlug({
  title: initialTitle,
  slug: initialSlug,
  follow: initialFollow,
  titleError,
  slugError,
}: {
  title: string;
  slug: string;
  follow: boolean;
  titleError?: string;
  slugError?: string;
}) {
  const [slug, setSlug] = useState(initialFollow ? slugify(initialTitle) : initialSlug);
  const [follow, setFollow] = useState(initialFollow);
  return (
    <div className="space-y-4">
      <Field label="Title" error={titleError}>
        <input
          name="title"
          required
          data-autofocus
          maxLength={L.title}
          defaultValue={initialTitle}
          onChange={(e) => {
            if (follow) setSlug(slugify(e.target.value));
          }}
          aria-invalid={!!titleError}
          className={INPUT}
        />
      </Field>
      <Field
        label="Slug"
        error={slugError}
        hint={
          <>
            The story’s address: <span className="font-mono text-ink">/kneks/stories/{slug || "…"}</span>. Changing it breaks links already shared.
          </>
        }
      >
        <input
          name="slug"
          maxLength={L.slug}
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setFollow(e.target.value === "");
          }}
          spellCheck={false}
          autoCapitalize="off"
          aria-invalid={!!slugError}
          className={`${INPUT} font-mono text-[13px]`}
        />
      </Field>
    </div>
  );
}

/**
 * Drop a cover or browse for one; the preview shows straight away. The file
 * travels in the form's own `cover` input and the server checks its bytes.
 */
function CoverPicker({ current, error }: { current: string | null; error?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(current);
  const [removed, setRemoved] = useState(false);
  const [over, setOver] = useState(false);

  useEffect(
    () => () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  const take = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setRemoved(false);
  };
  const showing = preview && !removed;

  return (
    <div>
      <p className="text-[13px] font-semibold text-ink">Cover image (optional)</p>
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
          className={`relative flex aspect-video w-48 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed text-center text-[12px] transition-colors focus-within:ring-3 focus-within:ring-indigo-brand/20 ${
            over ? "border-indigo-brand bg-indigo-brand/[0.04]" : "border-ink/25 bg-shell hover:border-indigo-brand/50"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- local preview of the chosen file */}
          {showing ? <img src={preview} alt="" className="absolute inset-0 size-full object-cover" /> : null}
          <span className={showing ? "sr-only" : "px-3 text-ink-muted"}>
            Drop an image or <span className="font-semibold text-indigo-brand">browse</span>
          </span>
          <input ref={input} name="cover" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => take(e.target.files)} className="sr-only" />
        </label>
        <div className="space-y-1.5 text-[12px] text-ink-muted">
          <p>JPEG, PNG or WebP, up to 2 MB, shown at 16:9. Without one, the card shows the programme’s gradient.</p>
          {showing ? (
            <button
              type="button"
              onClick={() => {
                setRemoved(true);
                if (input.current) input.current.value = "";
              }}
              className="font-semibold text-red-700 hover:underline"
            >
              Remove cover
            </button>
          ) : null}
        </div>
      </div>
      {removed && current ? <input type="hidden" name="removeCover" value="on" /> : null}
      {error ? (
        <p role="alert" className="mt-1.5 text-[12px] font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
