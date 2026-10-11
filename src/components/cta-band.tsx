import { Button, Container, Supergraphic } from "@/components/ui";
import { lines } from "@/i18n/rich";
import type { Dictionary } from "@/i18n/types";

/**
 * Gold closing band. Every page in the deck ends with a variant of this. The
 * default copy comes from the page's dictionary; the heading's lines break
 * from sm up, as the deck sets them.
 */
export function CtaBand({
  dict,
  title,
  primary,
  secondary,
  padding = "pb-[158px] pt-[156px]",
}: {
  dict: Pick<Dictionary, "ctaBand" | "common">;
  title?: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** The deck varies this band's height per page. */
  padding?: string;
}) {
  const first = primary ?? { label: dict.common.imInvestor, href: "/for-limited-partners" };
  const second = secondary ?? { label: dict.common.imFounder, href: "/for-businesses" };
  return (
    <section className="relative overflow-hidden bg-gold">
      <Supergraphic
        src="/assets/brand/supergraphic-hero.svg"
        className="absolute -inset-e-32 -top-16 h-[160%] w-auto opacity-30 mix-blend-multiply rtl:-scale-x-100"
      />
      <Container className={`relative ${padding}`}>
        <h2 className="t-section max-w-[1120px] text-indigo-brand">
          {title ?? lines(dict.ctaBand.title, "hidden sm:block")}
        </h2>
        <div className="mt-[54px] flex flex-wrap gap-4">
          <Button href={first.href} tone="indigo">
            {first.label}
          </Button>
          <Button href={second.href} tone="outline-on-gold">
            {second.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
