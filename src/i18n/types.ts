import type en from "@/i18n/dictionaries/en";

/**
 * The shape every language's dictionary must have: English's, key for key.
 * Strings are plain `string`, so translations are free to differ; the keys,
 * nesting and list shapes are what is enforced.
 */
export type Dictionary = typeof en;

/** One page's or component's slice, for handing to a client component as a prop. */
export type DictionarySection<K extends keyof Dictionary> = Dictionary[K];
