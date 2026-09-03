import { Button, Container, Supergraphic } from "@/components/ui";

/** Gold closing band. Every page in the deck ends with a variant of this. */
export function CtaBand({
  title = (
    <>
      Ready to invest in the future of
      <br className="hidden sm:block" />
      Shariah-compliant innovation?
    </>
  ),
  primary = { label: "Request Data Room", href: "/contact" },
  secondary = { label: "Apply for Funding", href: "/for-businesses" },
  padding = "pb-[140px] pt-[168px]",
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
        <div className="mt-[62px] flex flex-wrap gap-4">
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
