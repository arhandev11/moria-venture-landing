/**
 * The contract between the /kneks access form and its Server Action. Lives
 * outside the action file so the client form can import the types and limits.
 */

export const REQUEST_FIELDS = ["name", "email", "region", "ticket", "message"] as const;
export type RequestField = (typeof REQUEST_FIELDS)[number];

export const REQUEST_LIMITS: Record<RequestField, number> = {
  name: 120,
  email: 254,
  region: 120,
  ticket: 120,
  message: 4000,
};

/** The hidden field a person never sees and a form-filling bot usually fills. */
export const HONEYPOT_FIELD = "company_website";

/**
 * The SMEs the investor picked: comma-separated names in one field, or the
 * field repeated once per name. At least one published SME is required.
 */
export const SHORTLIST_FIELD = "shortlist";

/**
 * The page's language ("en", "id", "ar"), posted by the form so the action
 * can word its messages to match; anything else reads as English.
 */
export const LOCALE_FIELD = "locale";

/** Fields that can carry an inline error: the text inputs plus the SME picker. */
export type RequestErrorField = RequestField | typeof SHORTLIST_FIELD;

export type InvestorRequestResult =
  | { ok: true }
  | {
      ok: false;
      /** Per-field messages, ready to show under each input. */
      fieldErrors: Partial<Record<RequestErrorField, string>>;
      /** A form-level message, e.g. rate limited or server error. */
      formError?: string;
      /**
       * What was submitted, so the form can be refilled after a failed round
       * trip. `shortlist` is always set on a failure: the picked names that
       * are published SMEs, in the page's order.
       */
      values: Partial<Record<RequestField, string>> & { shortlist?: string[] };
    };
