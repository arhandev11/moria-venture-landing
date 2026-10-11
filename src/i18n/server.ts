import "server-only";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import type { Dictionary } from "@/i18n/types";

type LangParams = Promise<{ lang: string }>;

/**
 * A page's language and dictionary from its `params`. The proxy only lets
 * known languages through, but a guard here keeps a stray value a 404.
 */
export async function loadPage(params: LangParams): Promise<{ lang: Locale; dict: Dictionary }> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { lang, dict: await getDictionary(lang) };
}

/**
 * generateMetadata in one line: the page's English path and where its title
 * and description live in the dictionary.
 */
export async function metadataFor(
  params: LangParams,
  path: string,
  pick: (dict: Dictionary) => { title?: string; description: string },
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, path, pick(await getDictionary(lang)));
}
