"use client";

import { useActionState } from "react";
import { addOption, renameOption } from "../../actions/options";
import { SubmitButton } from "../../_components/buttons";
import { INPUT } from "../../_components/ui";

export function AddOptionForm({ kind }: { kind: string }) {
  const [state, action] = useActionState(addOption, null);
  const error = state?.fieldErrors?.label ?? (state?.ok ? undefined : state?.message);
  return (
    <form action={action}>
      <input type="hidden" name="kind" value={kind} />
      <div className="flex gap-2">
        <input
          name="label"
          required
          maxLength={120}
          placeholder="New option"
          aria-label="New option label"
          aria-invalid={!!error}
          defaultValue={state?.ok ? "" : state?.values?.label}
          className={INPUT}
        />
        <SubmitButton pendingLabel="Adding…">Add</SubmitButton>
      </div>
      {error ? <p role="alert" className="mt-1 text-[13px] text-red-700">{error}</p> : null}
    </form>
  );
}

/** Renames in place. React resets the input after the action, back to the saved label. */
export function RenameOptionForm({ id, label }: { id: number; label: string }) {
  const [state, action] = useActionState(renameOption, null);
  const error = state?.fieldErrors?.label;
  return (
    <form action={action} className="min-w-[180px] flex-1">
      <input type="hidden" name="id" value={id} />
      <div className="flex gap-2">
        <input
          name="label"
          required
          maxLength={120}
          defaultValue={state?.values?.label ?? label}
          aria-label="Option label"
          aria-invalid={!!error}
          className={`${INPUT} py-1.5`}
        />
        <SubmitButton tone="secondary" className="h-[34px] px-3 text-[12px]" pendingLabel="…">
          Save
        </SubmitButton>
      </div>
      {error ? <p role="alert" className="mt-1 text-[13px] text-red-700">{error}</p> : null}
    </form>
  );
}
