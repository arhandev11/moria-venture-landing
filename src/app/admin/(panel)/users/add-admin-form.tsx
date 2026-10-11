"use client";

import { useActionState } from "react";
import { addAdmin } from "../../actions/users";
import { SubmitButton } from "../../_components/buttons";
import { Field, FormMessage, INPUT } from "../../_components/ui";

export function AddAdminForm() {
  const [state, action] = useActionState(addAdmin, null);
  const err = (key: string) => state?.fieldErrors?.[key];
  return (
    <form action={action} className="mt-4 space-y-4">
      {state?.message ? <FormMessage tone={state.ok ? "success" : "error"}>{state.message}</FormMessage> : null}
      <Field label="Name" error={err("name")}>
        <input name="name" required maxLength={120} defaultValue={state?.ok ? "" : state?.values?.name} aria-invalid={!!err("name")} className={INPUT} />
      </Field>
      <Field label="Email" error={err("email")}>
        <input name="email" type="email" required autoComplete="off" defaultValue={state?.ok ? "" : state?.values?.email} aria-invalid={!!err("email")} className={INPUT} />
      </Field>
      <Field label="Password" error={err("password")} hint="At least 8 characters. Share it privately; they can change it under Account.">
        <input name="password" type="password" required minLength={8} autoComplete="new-password" aria-invalid={!!err("password")} className={INPUT} />
      </Field>
      <SubmitButton pendingLabel="Adding…">Add admin</SubmitButton>
    </form>
  );
}
