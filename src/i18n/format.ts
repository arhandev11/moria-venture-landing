import { numberLocale, type Locale } from "@/i18n/config";

/**
 * Small string helpers for dictionary entries. Pure, so client components
 * that receive dictionary slices as props can use them too.
 */

/**
 * A count-dependent entry. English needs `one` and `other`; Arabic uses up
 * to six forms; Indonesian usually only `other`. `other` is the fallback.
 */
export type Plural = { other: string } & Partial<
  Record<"zero" | "one" | "two" | "few" | "many", string>
>;

/**
 * Marks an entry in the English dictionary as plural, so the dictionary type
 * reads it as `Plural` and the other languages may use their own set of forms.
 */
export const plural = (forms: Plural): Plural => forms;

/** Fills `{name}` placeholders. Unknown placeholders are left as written. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** Picks the plural form for `count` and fills `{count}` and any other values. */
export function formatPlural(
  locale: Locale,
  forms: Plural,
  count: number,
  values: Record<string, string | number> = {},
): string {
  const rule = new Intl.PluralRules(locale).select(count) as keyof Plural;
  const template = forms[rule] ?? forms.other;
  return format(template, { count: formatNumber(locale, count), ...values });
}

/** Grouped number in the language's separators, always on Latin digits. */
export function formatNumber(locale: Locale, value: number): string {
  return value.toLocaleString(numberLocale[locale]);
}
