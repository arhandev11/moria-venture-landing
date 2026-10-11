"use server";

import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import {
  HONEYPOT_FIELD,
  REQUEST_FIELDS,
  REQUEST_LIMITS,
  type InvestorRequestResult,
  type RequestField,
} from "@/lib/investor-request";
import { getFormOptions, getPublishedSmes } from "@/lib/kneks-data";
import { clientIp, hit } from "@/lib/rate-limit";

/** Loose on purpose: one @, a dot in the domain, no spaces. Delivery is the real test. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Stores an access request from the /kneks form. Public: anyone can POST it,
 * so every field is checked here, choices must be ones the admin has left
 * active, and each address gets a handful of sends per hour.
 *
 * Shaped for useActionState: `(previous, formData) => result`.
 */
export async function submitInvestorRequest(
  _previous: InvestorRequestResult | null,
  formData: FormData,
): Promise<InvestorRequestResult> {
  const values = Object.fromEntries(
    REQUEST_FIELDS.map((field) => {
      const raw = formData.get(field);
      return [field, typeof raw === "string" ? raw.trim() : ""];
    }),
  ) as Record<RequestField, string>;

  // A filled honeypot gets the success screen, so the bot learns nothing.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") return { ok: true };

  const fieldErrors: Partial<Record<RequestField, string>> = {};
  const [options, smes] = await Promise.all([getFormOptions(), getPublishedSmes()]);

  if (!values.name) fieldErrors.name = "Enter your name.";
  if (!EMAIL.test(values.email)) fieldErrors.email = "Enter a valid email.";
  if (!options.regions.includes(values.region)) fieldErrors.region = "Select a region.";
  if (!options.tickets.includes(values.ticket)) fieldErrors.ticket = "Select a ticket size.";
  for (const field of REQUEST_FIELDS) {
    if (!fieldErrors[field] && values[field].length > REQUEST_LIMITS[field]) {
      fieldErrors[field] = `Keep this under ${REQUEST_LIMITS[field].toLocaleString("en")} characters.`;
    }
  }
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values };

  const limit = hit(`investor-request:${await clientIp()}`, 5, 60 * 60 * 1000);
  if (!limit.allowed) {
    return {
      ok: false,
      fieldErrors: {},
      formError: "Too many requests from your network. Please try again later.",
      values,
    };
  }

  // Only names of SMEs actually on the page are kept, in the page's order.
  const starred = new Set(
    String(formData.get("shortlist") ?? "")
      .split(",")
      .map((name) => name.trim()),
  );
  const shortlist = smes
    .map((sme) => sme.name)
    .filter((name) => starred.has(name))
    .join(", ");

  try {
    await getDb().insert(investorRequests).values({ ...values, shortlist });
  } catch (err) {
    console.error("[kneks] failed to store investor request", err);
    return {
      ok: false,
      fieldErrors: {},
      formError: "We could not send your request just now. Please try again in a moment.",
      values,
    };
  }
  return { ok: true };
}
