"use server";

import { after } from "next/server";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { defaultLocale, hasLocale, numberLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import {
  HONEYPOT_FIELD,
  LOCALE_FIELD,
  REQUEST_FIELDS,
  REQUEST_LIMITS,
  SHORTLIST_FIELD,
  type InvestorRequestResult,
  type RequestErrorField,
  type RequestField,
} from "@/lib/investor-request";
import { getFormOptions, getPublishedSmes } from "@/lib/kneks-data";
import { sendInvestorRequestEmails } from "@/lib/mail/investor-request";
import { siteUrl } from "@/lib/mail/site-url";
import { clientIp, hit } from "@/lib/rate-limit";

/** Loose on purpose: one @, a dot in the domain, no spaces. Delivery is the real test. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Stores an access request from the /kneks form. Public: anyone can POST it,
 * so every field is checked here, choices must be ones the admin has left
 * active, at least one published SME must be picked, and each address gets a
 * handful of sends per hour.
 *
 * Once stored, the team and the investor are emailed from `after`, i.e. once
 * the response has gone: a slow or dead mail server never delays or fails
 * the submission. Rejected requests (honeypot, rate limit) send nothing.
 *
 * Messages come back in the language of the page that sent the form (the
 * hidden locale field), from the same dictionary the form reads.
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

  const requested = formData.get(LOCALE_FIELD);
  const locale = typeof requested === "string" && hasLocale(requested) ? requested : defaultLocale;
  const fieldErrors: Partial<Record<RequestErrorField, string>> = {};
  const [options, smes, dict] = await Promise.all([
    getFormOptions(),
    getPublishedSmes(),
    getDictionary(locale),
  ]);
  const t = dict.kneks.errors;

  // Only names of SMEs actually on the page are kept, in the page's order.
  // Accepts one comma-separated field or the field repeated per name.
  const picked = new Set(
    formData
      .getAll(SHORTLIST_FIELD)
      .flatMap((entry) => (typeof entry === "string" ? entry.split(",") : []))
      .map((name) => name.trim()),
  );
  const shortlist = smes.map((sme) => sme.name).filter((name) => picked.has(name));
  const echo = { ...values, shortlist };

  if (!values.name) fieldErrors.name = t.name;
  if (!EMAIL.test(values.email)) fieldErrors.email = t.email;
  if (!options.regions.includes(values.region)) fieldErrors.region = t.region;
  if (!options.tickets.includes(values.ticket)) fieldErrors.ticket = t.ticket;
  if (!shortlist.length) fieldErrors.shortlist = t.shortlist;
  for (const field of REQUEST_FIELDS) {
    if (!fieldErrors[field] && values[field].length > REQUEST_LIMITS[field]) {
      fieldErrors[field] = format(t.tooLong, {
        limit: REQUEST_LIMITS[field].toLocaleString(numberLocale[locale]),
      });
    }
  }
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values: echo };

  const limit = hit(`investor-request:${await clientIp()}`, 5, 60 * 60 * 1000);
  if (!limit.allowed) {
    return {
      ok: false,
      fieldErrors: {},
      formError: t.rateLimited,
      values: echo,
    };
  }

  let id: number;
  try {
    [{ id }] = await getDb()
      .insert(investorRequests)
      .values({ ...values, shortlist: shortlist.join(", ") })
      .$returningId();
  } catch (err) {
    console.error("[kneks] failed to store investor request", err);
    return {
      ok: false,
      fieldErrors: {},
      formError: t.storeFailed,
      values: echo,
    };
  }

  const request = { id, ...values, shortlist, submittedAt: new Date() };
  const site = await siteUrl();
  after(() => sendInvestorRequestEmails(request, site));
  return { ok: true };
}
