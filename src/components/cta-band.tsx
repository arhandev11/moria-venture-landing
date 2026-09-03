import { Button, Container, Supergraphic } from "@/components/ui";

/** Gold closing band. Every page in the deck ends with a variant of this. */
export function CtaBand({
  title = (
    <>
      Ready to invest in the future of
      <br className="hidden sm:block" /> Shariah-compliant innovation?
    </>
  ),
  primary = { label: "Request Data Room", href: "/contact" },
  secondary = { label: "Apply for Funding", href: "/for-businesses" },
}: {
  title?: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-gold">
      <Supergraphic
        src="/assets/brand/supergraphic-hero.svg"
        className="absolute -right-32 -top-16 h-[160%] w-auto opacity-30 mix-blend-multiply" />
      <Container className="relative py-20 lg:py-28">
        <h2 className="display max-w-3xl text-indigo-brand text-[32px] sm:text-[44px] lg:text-[52px]">
          {title}
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
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
