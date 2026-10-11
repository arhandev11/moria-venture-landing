import { lang } from "next/root-params";
import { Container, Section } from "@/components/ui";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleLink } from "@/i18n/locale-context";

/**
 * The public 404, in the reader's language. Not-found pages get no params,
 * so the language comes from the root parameter instead.
 */
export default async function NotFound() {
  const value = await lang();
  const { notFound: t } = await getDictionary(hasLocale(value) ? value : defaultLocale);

  return (
    <Section>
      <Container className="pb-[160px] pt-[140px]">
        <h1 className="t-section text-indigo-brand">{t.title}</h1>
        <p className="t-lede mt-6 max-w-[640px] text-ink">{t.body}</p>
        <LocaleLink
          href="/"
          className="t-label mt-10 inline-flex h-[47px] items-center justify-center bg-indigo-brand px-[34px] text-gold transition-colors hover:bg-indigo-brand/90"
        >
          {t.home}
        </LocaleLink>
      </Container>
    </Section>
  );
}
