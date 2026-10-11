"use client";

import { useActionState } from "react";
import { login } from "../actions/auth";
import { SubmitButton } from "../_components/buttons";
import { Field, FormMessage, INPUT } from "../_components/ui";

export function LoginForm() {
  const [state, action] = useActionState(login, null);

  return (
    <form action={action} className="mt-6 space-y-4">
      {state?.message ? <FormMessage>{state.message}</FormMessage> : null}
      <Field label="Email">
        <input name="email" type="email" autoComplete="username" required autoFocus defaultValue={state?.values?.email} className={INPUT} />
      </Field>
      <Field label="Password">
        <input name="password" type="password" autoComplete="current-password" required className={INPUT} />
      </Field>
      <SubmitButton className="h-10 w-full" pendingLabel="Signing in…">
        Sign in
      </SubmitButton>
    </form>
  );
}
