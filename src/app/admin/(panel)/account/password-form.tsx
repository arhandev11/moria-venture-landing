"use client";

import { useActionState } from "react";
import { changePassword } from "../../actions/users";
import { SubmitButton } from "../../_components/buttons";
import { Field, FormMessage, INPUT } from "../../_components/ui";

export function PasswordForm() {
  const [state, action] = useActionState(changePassword, null);
  const err = (key: string) => state?.fieldErrors?.[key];
  return (
    <form action={action} className="mt-4 space-y-4">
      {state?.message ? <FormMessage tone={state.ok ? "success" : "error"}>{state.message}</FormMessage> : null}
      <Field label="Current password" error={err("current")}>
        <input name="current" type="password" required autoComplete="current-password" aria-invalid={!!err("current")} className={INPUT} />
      </Field>
      <Field label="New password" error={err("password")} hint="At least 8 characters.">
        <input name="password" type="password" required minLength={8} autoComplete="new-password" aria-invalid={!!err("password")} className={INPUT} />
      </Field>
      <Field label="Repeat new password" error={err("confirm")}>
        <input name="confirm" type="password" required minLength={8} autoComplete="new-password" aria-invalid={!!err("confirm")} className={INPUT} />
      </Field>
      <SubmitButton pendingLabel="Saving…">Change password</SubmitButton>
    </form>
  );
}
