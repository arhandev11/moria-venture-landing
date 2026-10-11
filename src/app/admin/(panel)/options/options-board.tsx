"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import type { OptionKind } from "@/db/schema";
import { addOption, deleteOption, renameOption, reorderOptions, toggleOption } from "../../actions/options";
import { SubmitButton } from "../../_components/buttons";
import { LiveRegion, OverflowMenu, Switch } from "../../_components/controls";
import { useFeedback } from "../../_components/feedback";
import { ListIcon, PlusIcon } from "../../_components/icons";
import { Modal, ModalBody, ModalFooter } from "../../_components/modal";
import { SortableHelp, useSortable } from "../../_components/sortable";
import { btn, Card, CardHeader, EmptyState, Field, INPUT, PageHeader } from "../../_components/ui";
import { useFormDialog } from "../../_components/use-form-dialog";
import { useOptimisticFlags } from "../../_components/use-optimistic-flags";

type Option = { id: number; kind: OptionKind; label: string; active: boolean };
/** What the dialog edits: an existing option, or a new one for a list. */
type Editing = { kind: OptionKind; option?: Option };

const LISTS: { kind: OptionKind; title: string; noun: string; hint: string }[] = [
  { kind: "region", title: "Regions", noun: "region", hint: "The “Region” dropdown" },
  { kind: "ticket", title: "Ticket sizes", noun: "ticket size", hint: "The “Ticket size” dropdown" },
];

function form(entries: Record<string, string | number>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) fd.set(k, String(v));
  return fd;
}

/**
 * The two dropdowns of the "Request investor access" form. Rows drag into
 * the order the dropdown shows, the switch takes an option off the form in
 * one click, and a click on the label renames it in a dialog.
 */
export function OptionsBoard({ options }: { options: Option[] }) {
  const dialog = useFormDialog<Editing>();
  const { toast } = useFeedback();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Form options"
        description="The choices on the “Request investor access” form. Only switched-on options appear there, in this order."
        actions={
          <button type="button" onClick={() => dialog.open({ kind: "region" })} className={btn("primary")}>
            <PlusIcon className="size-4" />
            Add option
          </button>
        }
      />
      <div className="grid items-start gap-5 lg:grid-cols-2">
        {LISTS.map((list) => (
          <OptionList key={list.kind} {...list} options={options.filter((o) => o.kind === list.kind)} onEdit={dialog.open} />
        ))}
      </div>
      <SortableHelp />

      <Modal
        open={dialog.isOpen}
        onRequestClose={dialog.requestClose}
        title={dialog.subject?.option ? "Rename option" : "Add option"}
        size="sm"
      >
        {dialog.subject ? (
          <OptionForm
            key={dialog.subject.option?.id ?? "new"}
            editing={dialog.subject}
            onDirty={dialog.markDirty}
            onCancel={dialog.requestClose}
            onSaved={(message) => {
              dialog.close();
              toast(message);
            }}
          />
        ) : null}
      </Modal>
    </div>
  );
}

function OptionList({
  kind,
  title,
  noun,
  hint,
  options,
  onEdit,
}: {
  kind: OptionKind;
  title: string;
  noun: string;
  hint: string;
  options: Option[];
  onEdit: (editing: Editing) => void;
}) {
  const { toast, confirm } = useFeedback();
  const [, startTransition] = useTransition();
  const active = useOptimisticFlags(options.map((o) => ({ id: o.id, on: o.active })));
  const sortable = useSortable({
    items: options,
    nameOf: (o) => o.label,
    save: (ids) => reorderOptions(kind, ids),
    onError: (message) => toast(message, { tone: "error" }),
  });
  const isActive = (o: Option) => active.get(o.id);

  const setOn = (o: Option, next: boolean, undoable = true) => {
    active.set(o.id, next);
    startTransition(async () => {
      const result = await toggleOption(form({ id: o.id, active: String(next) }));
      if (!result.ok) {
        active.set(o.id, !next);
        toast(result.message ?? "That change could not be saved.", { tone: "error" });
        return;
      }
      toast(next ? `“${o.label}” is back on the form.` : `“${o.label}” is off the form.`, {
        action: undoable ? { label: "Undo", run: () => setOn(o, !next, false) } : undefined,
      });
    });
  };

  const remove = async (o: Option) => {
    const ok = await confirm({
      title: `Delete “${o.label}”?`,
      body: "Requests already sent keep this value. Switching the option off hides it without deleting it.",
      confirmLabel: "Delete option",
    });
    if (!ok) return;
    const result = await deleteOption(form({ id: o.id }));
    toast(result.ok ? `Deleted “${o.label}”.` : result.message ?? "That option could not be deleted.", { tone: result.ok ? "success" : "error" });
  };

  return (
    <Card className="overflow-hidden" data-list={kind}>
      <CardHeader
        title={title}
        hint={`${hint}, ${options.filter(isActive).length} of ${options.length} on`}
        action={
          <button type="button" onClick={() => onEdit({ kind })} className={btn("ghost", "sm")} aria-label={`Add ${noun}`}>
            <PlusIcon className="size-4" />
            Add
          </button>
        }
      />
      {options.length ? (
        <ul>
          {sortable.ordered.map((o) => (
            <li
              key={o.id}
              ref={sortable.rowRef(o.id)}
              data-option={o.label}
              className={`flex items-center gap-2 border-b border-ink/[0.07] py-2 pl-3 pr-3 last:border-b-0 ${
                sortable.dragId === o.id ? "relative z-[2] bg-indigo-brand/[0.05] shadow-md" : "bg-white"
              }`}
            >
              {sortable.handle(o)}
              <button
                type="button"
                onClick={() => onEdit({ kind, option: o })}
                title="Rename"
                className={`min-w-0 flex-1 truncate rounded px-1.5 py-1 text-left text-[14px] hover:text-indigo-brand focus-visible:outline-2 focus-visible:outline-indigo-brand ${
                  isActive(o) ? "text-ink" : "text-ink/45 line-through decoration-ink/25"
                }`}
              >
                {o.label}
              </button>
              <Switch checked={isActive(o)} onChange={(next) => setOn(o, next)} label={`Show “${o.label}” on the form`} />
              <OverflowMenu label={`More for ${o.label}`} items={[{ label: "Delete option", danger: true, onSelect: () => void remove(o) }]} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<ListIcon />}
          title={`No ${noun}s yet`}
          action={
            <button type="button" onClick={() => onEdit({ kind })} className={btn("primary")}>
              <PlusIcon className="size-4" />
              Add a {noun}
            </button>
          }
        >
          Without any, visitors cannot send the form.
        </EmptyState>
      )}
      <LiveRegion>{sortable.announcement}</LiveRegion>
    </Card>
  );
}

function OptionForm({
  editing,
  onSaved,
  onCancel,
  onDirty,
}: {
  editing: Editing;
  onSaved: (message: string) => void;
  onCancel: () => void;
  onDirty: () => void;
}) {
  const [state, action] = useActionState(editing.option ? renameOption : addOption, null);
  const reported = useRef<typeof state>(null);
  const [kind, setKind] = useState(editing.kind);

  useEffect(() => {
    if (state?.ok && reported.current !== state) {
      reported.current = state;
      onSaved(state.message ?? "Saved.");
    }
  }, [state, onSaved]);

  const error = state && !state.ok ? state.fieldErrors?.label ?? state.message : undefined;

  return (
    <form action={action} onInput={onDirty}>
      <ModalBody className="space-y-4">
        {editing.option ? (
          <input type="hidden" name="id" value={editing.option.id} />
        ) : (
          <fieldset>
            <legend className="text-[13px] font-semibold text-ink">List</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {LISTS.map((list) => (
                <label
                  key={list.kind}
                  className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-[13px] has-focus-visible:ring-3 has-focus-visible:ring-indigo-brand/20 ${
                    kind === list.kind ? "border-indigo-brand bg-indigo-brand/[0.05] font-semibold text-indigo-brand" : "border-ink/15 text-ink-muted"
                  }`}
                >
                  <input type="radio" name="kind" value={list.kind} checked={kind === list.kind} onChange={() => setKind(list.kind)} className="accent-indigo-brand" />
                  {list.title}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <Field label="Label" error={error} hint="Exactly as visitors will see it in the dropdown.">
          <input
            name="label"
            required
            autoFocus
            maxLength={120}
            defaultValue={state?.values?.label ?? editing.option?.label ?? ""}
            aria-invalid={!!error}
            className={INPUT}
          />
        </Field>
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={onCancel} className={btn("secondary")}>
          Cancel
        </button>
        <SubmitButton pendingLabel="Saving…">{editing.option ? "Save" : "Add option"}</SubmitButton>
      </ModalFooter>
    </form>
  );
}
