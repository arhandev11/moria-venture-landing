import { Button, Container, Supergraphic } from "@/components/ui";

/** Gold closing band. Every page in the deck ends with a variant of this. */
export function CtaBand({
  title = (
    <>
      Ready to invest in the future
      <br className="hidden sm:block" /> of Islamic Principle
      <br className="hidden sm:block" /> compliant innovation?
    </>
  ),
  primary = { label: "I'm an Investor", href: "/for-limited-partners" },
  secondary = { label: "I'm a Founder", href: "/for-businesses" },
  padding = "pb-[158px] pt-[156px]",
}: {
  title?: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** The deck varies this band's height per page. */
  padding?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gold">
      <Supergraphic
        src="/assets/brand/supergraphic-hero.svg"
        className="absolute -right-32 -top-16 h-[160%] w-auto opacity-30 mix-blend-multiply"
      />
      <Container className={`relative ${padding}`}>
        <h2 className="t-section max-w-[1120px] text-indigo-brand">{title}</h2>
        <div className="mt-[54px] flex flex-wrap gap-4">
          <Button href={primary.href} tone="indigo">
            {primary.label}
          </Button>
          <Button href={secondary.href} tone="outline-on-gold">
            {secondary.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
