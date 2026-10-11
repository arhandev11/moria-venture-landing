import type { Metadata } from "next";
import { Figtree, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { HeroReveal } from "@/components/hero-reveal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hasLocale, htmlLang, localeDir, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/locale-context";
import "../globals.css";

// Stand-in for the brand face: the deck's PDFs ship type as outlines, so the
// original family name is not recoverable from the export.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

// Arabic letters only; Latin and digits stay in Figtree (see globals.css). Not
// preloaded, and only Arabic pages carry its variable, so English and
// Indonesian readers never download it.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

/** Absolute base for canonical and hreflang URLs; APP_URL in production. */
function siteOrigin() {
  try {
    return new URL(process.env.APP_URL?.trim() || "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}

/** Every language is prerendered; the proxy keeps any other value from arriving. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { site } = await getDictionary(lang);
  return {
    metadataBase: siteOrigin(),
    title: { default: site.name, template: site.titleTemplate },
    description: site.description,
  };
}

/**
 * The public site's root layout, one per language: the document's language,
 * direction and type are set here. The admin area has its own root layout
 * and stays English.
 */
export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const fonts = lang === "ar" ? `${figtree.variable} ${plexArabic.variable}` : figtree.variable;

  return (
    <html lang={htmlLang[lang]} dir={localeDir[lang]} className={`${fonts} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={lang}>
          <SiteHeader
            locale={lang}
            labels={dict.header}
            switcherLabels={dict.languageSwitcher}
          />
          <main className="flex-1">{children}</main>
          <SiteFooter dict={dict.footer} />
          <HeroReveal />
          <ScrollReveal />
        </LocaleProvider>
      </body>
    </html>
  );
}
