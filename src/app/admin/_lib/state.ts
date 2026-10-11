/** What admin form actions hand back to useActionState. */
export type FormState = {
  ok?: boolean;
  /** Shown above the form: a failure, or a confirmation when `ok`. */
  message?: string;
  fieldErrors?: Record<string, string>;
  /** The submitted text, so inputs can be refilled after React resets the form. */
  values?: Record<string, string>;
} | null;
