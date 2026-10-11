"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePassword } from "../../actions/users";
import { SubmitButton } from "../../_components/buttons";
import { useFeedback } from "../../_components/feedback";
import { Modal, ModalBody, ModalFooter } from "../../_components/modal";
import { btn, Card, Field, FormMessage, INPUT, PageHeader } from "../../_components/ui";
import { useFormDialog } from "../../_components/use-form-dialog";

export function AccountPanel({ name, email }: { name: string; email: string }) {
  const { toast } = useFeedback();
  const dialog = useFormDialog<true>();

  return (
    <div className="max-w-[640px] space-y-5">
      <PageHeader title="Account" description="Your sign-in details for this admin." />
      <Card className="divide-y divide-ink/10">
        <div className="flex items-center gap-4 px-5 py-4">
          <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-indigo-brand text-[16px] font-bold text-gold">
            {(name || email).charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{name}</p>
            <p className="truncate text-[13px] text-ink-muted">{email}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="text-[14px] font-semibold">Password</p>
            <p className="text-[13px] text-ink-muted">Changing it signs you out on every other device.</p>
          </div>
          <button type="button" onClick={() => dialog.open(true)} className={btn("secondary")}>
            Change password
          </button>
        </div>
      </Card>

      <Modal open={dialog.isOpen} onRequestClose={dialog.requestClose} title="Change password" size="sm">
        {dialog.isOpen ? (
          <PasswordForm
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

function PasswordForm({ onSaved, onCancel, onDirty }: { onSaved: (m: string) => void; onCancel: () => void; onDirty: () => void }) {
  const [state, action] = useActionState(changePassword, null);
  const reported = useRef<typeof state>(null);
  useEffect(() => {
    if (state?.ok && reported.current !== state) {
      reported.current = state;
      onSaved(state.message ?? "Password changed.");
    }
  }, [state, onSaved]);
  const err = (key: string) => (state && !state.ok ? state.fieldErrors?.[key] : undefined);

  return (
    <form action={action} onInput={onDirty}>
      <ModalBody className="space-y-4">
        {state && !state.ok && state.message ? <FormMessage>{state.message}</FormMessage> : null}
        <Field label="Current password" error={err("current")}>
          <input name="current" type="password" required data-autofocus autoComplete="current-password" aria-invalid={!!err("current")} className={INPUT} />
        </Field>
        <Field label="New password" error={err("password")} hint="At least 8 characters.">
          <input name="password" type="password" required minLength={8} autoComplete="new-password" aria-invalid={!!err("password")} className={INPUT} />
        </Field>
        <Field label="Repeat new password" error={err("confirm")}>
          <input name="confirm" type="password" required minLength={8} autoComplete="new-password" aria-invalid={!!err("confirm")} className={INPUT} />
        </Field>
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={onCancel} className={btn("secondary")}>
          Cancel
        </button>
        <SubmitButton pendingLabel="Saving…">Change password</SubmitButton>
      </ModalFooter>
    </form>
  );
}
