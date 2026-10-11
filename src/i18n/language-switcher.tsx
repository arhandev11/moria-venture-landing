"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { locales, nativeName, shortName, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { localizePath, splitLocale } from "@/i18n/paths";

type Labels = {
  /** "Language", in the page's language. */
  label: string;
  /** "Language: {language}", read out on the desktop trigger. */
  current: string;
};

/**
 * Moves the reader to the same page in another language.
 *
 * Plain links rather than next/link on purpose: a change of language changes
 * the document's direction and type, and a full load lets the root layout,
 * the fonts and the reveal scripts start clean in the new one. The hrefs work
 * without JavaScript; with it, the query and the in-page anchor ride along.
 *
 * The path is read with the language stripped, so the server render (which
 * knows an English page as /en/…) and the browser (which reads /…) agree.
 *
 * `desktop` is a compact dropdown in the header's style; `mobile` is a row of
 * pills for the open mobile menu.
 */
export function LanguageSwitcher({
  locale,
  labels,
  variant = "desktop",
  className = "",
}: {
  locale: Locale;
  labels: Labels;
  variant?: "desktop" | "mobile";
  className?: string;
}) {
  const { path } = splitLocale(usePathname());
  const keepPlace = (e: MouseEvent<HTMLAnchorElement>) => {
    const { search, hash } = window.location;
    if (search || hash) e.currentTarget.href += `${search}${hash}`;
  };

  if (variant === "mobile") {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <span className="me-2 text-[11px] font-bold uppercase tracking-[0.1em] text-ink/60">
          {labels.label}
        </span>
        {locales.map((l) => (
          <a
            key={l}
            href={localizePath(l, path)}
            hrefLang={l}
            lang={l}
            onClick={keepPlace}
            aria-current={l === locale ? "true" : undefined}
            className={`flex h-9 items-center rounded-full border px-4 text-[13px] ${
              l === locale
                ? "border-indigo-brand bg-indigo-brand text-white"
                : "border-rule text-ink hover:border-indigo-brand hover:text-indigo-brand"
            }`}
          >
            {nativeName[l]}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      <button
        type="button"
        aria-label={format(labels.current, { language: nativeName[locale] })}
        aria-haspopup="true"
        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink hover:text-indigo-brand"
      >
        <svg viewBox="0 0 16 16" aria-hidden className="size-[14px]" fill="none" stroke="currentColor" strokeWidth={1.4}>
          <circle cx="8" cy="8" r="6.5" />
          <path d="M1.5 8h13M8 1.5c1.8 1.9 2.6 4 2.6 6.5S9.8 12.6 8 14.5C6.2 12.6 5.4 10.5 5.4 8S6.2 3.4 8 1.5z" />
        </svg>
        {shortName[locale]}
        <svg viewBox="0 0 10 6" aria-hidden className="h-1.5 w-2.5 fill-current">
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>
      <ul className="invisible absolute inset-e-0 top-full w-52 border border-rule bg-shell py-2 opacity-0 shadow-sm transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {locales.map((l) => (
          <li key={l}>
            <a
              href={localizePath(l, path)}
              hrefLang={l}
              lang={l}
              onClick={keepPlace}
              aria-current={l === locale ? "true" : undefined}
              className={`block px-4 py-2 text-[13px] hover:bg-cream hover:text-indigo-brand ${
                l === locale ? "text-indigo-brand" : "text-ink"
              }`}
            >
              {nativeName[l]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
