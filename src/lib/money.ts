/**
 * Money on SME records: a whole amount in its own currency, never converted.
 * The curation data mixes IDR and USD, so figures are shown in the currency
 * they were given in and are never summed across currencies.
 *
 * Plain functions with no imports, so server code, client components and
 * scripts can all use them.
 */

/** ISO 4217 codes an SME amount may carry. Extend here; the column is char(3). */
export const SME_CURRENCIES = ["IDR", "USD", "SGD", "MYR", "SAR", "AED"] as const;
export type SmeCurrency = (typeof SME_CURRENCIES)[number];

export const isSmeCurrency = (value: unknown): value is SmeCurrency =>
  typeof value === "string" && (SME_CURRENCIES as readonly string[]).includes(value);

export type Money = { amount: number; currency: SmeCurrency };

/** Largest amount accepted: a quadrillion, well inside Number.MAX_SAFE_INTEGER. */
export const MAX_AMOUNT = 1_000_000_000_000_000;

/**
 * Builds a Money from the two nullable columns, or null when either is
 * missing or the code is not one we know.
 */
export function toMoney(amount: number | null | undefined, currency: string | null | undefined): Money | null {
  if (amount === null || amount === undefined || !Number.isFinite(amount)) return null;
  return isSmeCurrency(currency) ? { amount, currency } : null;
}

/**
 * Formats an amount for display.
 *
 * `numberLocale` is an Intl locale such as numberLocale[locale] from
 * src/i18n/config ("en", "id"). Indonesian shows symbols ("Rp 15 M",
 * "US$278 rb"); every other locale shows ISO codes ("IDR 15B", "USD 278K"),
 * so a list that mixes currencies never leaves one of them as a bare "$".
 *
 *   short (cards):          "IDR 15B", "USD 278K", "Rp 2,5 M"
 *   full  (brief, admin):   "IDR 15,000,000,000", "Rp 15.000.000.000"
 */
export function formatMoney(money: Money, numberLocale: string, style: "short" | "full" = "short"): string {
  const indonesian = numberLocale === "id" || numberLocale.startsWith("id-");
  return new Intl.NumberFormat(numberLocale, {
    style: "currency",
    currency: money.currency,
    currencyDisplay: indonesian ? "symbol" : "code",
    ...(style === "short"
      ? { notation: "compact", maximumFractionDigits: 1 }
      : { maximumFractionDigits: 0 }),
  })
    .format(money.amount)
    .replace(/ /g, " ");
}

/**
 * Reads a whole amount typed by an admin. Accepts plain digits or digits
 * grouped in threes by commas, dots, spaces or underscores, so both
 * "15,000,000,000" and "15.000.000.000" mean fifteen billion. Anything else
 * (decimals, a sign, letters, mixed grouping) is null, as is zero or more
 * than MAX_AMOUNT.
 */
export function parseWholeAmount(raw: string): number | null {
  const value = raw.trim();
  if (!/^\d+$/.test(value) && !/^\d{1,3}(?:([,._ ])\d{3})(?:\1\d{3})*$/.test(value)) return null;
  const n = Number(value.replace(/[,._ ]/g, ""));
  return Number.isSafeInteger(n) && n > 0 && n <= MAX_AMOUNT ? n : null;
}
