import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tone = "indigo" | "gold" | "outline" | "outline-on-gold";

const TONE: Record<Tone, string> = {
  indigo: "bg-indigo-brand text-gold hover:bg-indigo-brand/90",
  gold: "bg-gold text-indigo-brand hover:bg-gold-deep",
  outline:
    "border border-indigo-brand text-indigo-brand hover:bg-indigo-brand hover:text-gold",
  "outline-on-gold":
    "border border-indigo-brand text-indigo-brand hover:bg-indigo-brand hover:text-gold",
};

export function Button({
  href = "#",
  tone = "indigo",
  children,
}: {
  href?: string;
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${TONE[tone]}`}
    >
      {children}
    </Link>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  tone = "shell",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "shell" | "cream" | "gold" | "indigo";
  className?: string;
  id?: string;
}) {
  const tones = {
    shell: "bg-shell",
    cream: "bg-cream",
    gold: "bg-gold text-indigo-brand",
    indigo: "bg-indigo-brand text-white",
  };
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-brand ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`display text-indigo-brand text-[34px] sm:text-[44px] lg:text-[52px] ${className}`}
    >
      {children}
    </Tag>
  );
}

/** The gold line-work supergraphic that anchors most hero and CTA blocks. */
export function Supergraphic({
  src = "/assets/brand/supergraphic-hero.svg",
  className = "",
  width = 628,
  height = 663,
}: {
  src?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={width}
      height={height}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}

/** Page hero shared by every inner page: big uppercase title, lede, optional actions. */
export function PageHero({
  title,
  lede,
  actions,
  actionsInline = false,
}: {
  title: string;
  lede: ReactNode;
  actions?: ReactNode;
  actionsInline?: boolean;
}) {
  return (
    <Section className="relative overflow-hidden border-b border-rule/60">
      <Supergraphic className="absolute -top-6 right-0 h-[420px] w-auto opacity-40 sm:opacity-90 lg:h-[480px]" />
      <Container className="relative py-16 lg:py-24">
        <h1 className="display max-w-4xl text-indigo-brand text-[40px] uppercase sm:text-[56px] lg:text-[64px]">
          {title}
        </h1>
        <div
          className={`mt-8 lg:mt-10 ${
            actionsInline
              ? "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
              : ""
          }`}
        >
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-muted">
            {lede}
          </p>
          {actions ? (
            <div className={`flex flex-wrap gap-3 ${actionsInline ? "" : "mt-8"}`}>
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

/** Sticky in-page section switcher used on About and What We Do. */
export function AnchorNav({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <div className="border-b border-rule/60 bg-cream">
      <Container>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-6">
              <a
                href={item.href}
                className={`text-[11px] font-bold uppercase tracking-[0.12em] ${
                  i === 0 ? "text-indigo-brand" : "text-ink/70 hover:text-indigo-brand"
                }`}
              >
                {item.label}
              </a>
              {i < items.length - 1 ? (
                <span aria-hidden className="h-4 w-px bg-rule" />
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export function Stat({
  value,
  label,
  divider = true,
}: {
  value: string;
  label: string;
  divider?: boolean;
}) {
  return (
    <div className={divider ? "border-l border-rule pl-5 first:border-l-0 first:pl-0" : ""}>
      <p className="display text-indigo-brand text-[34px] sm:text-[42px]">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/70">
        {label}
      </p>
    </div>
  );
}

/** Two-column label/description row separated by hairlines — the deck's workhorse pattern. */
export function DefRow({
  term,
  children,
  termClassName = "text-indigo-brand",
}: {
  term: ReactNode;
  children: ReactNode;
  termClassName?: string;
}) {
  return (
    <div className="grid gap-2 border-t border-rule py-6 last:border-b sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-10">
      <dt className={`text-[15px] font-semibold ${termClassName}`}>{term}</dt>
      <dd className="text-[13px] leading-relaxed text-ink-muted">{children}</dd>
    </div>
  );
}

export function NumberedItem({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 border-t border-rule py-6 last:border-b">
      <span className="display text-indigo-brand text-[30px] leading-none">{n}</span>
      <div>
        <h3 className="text-[15px] font-semibold text-indigo-brand">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{children}</p>
      </div>
    </div>
  );
}

/**
 * Photography slot. The design deck uses stock imagery that did not ship with the
 * asset export, so slots without a `src` render a branded placeholder instead.
 */
export function ImageSlot({
  src,
  alt = "",
  label,
  ratio = "aspect-[16/7]",
  className = "",
  priority,
}: {
  src?: string;
  alt?: string;
  label?: string;
  ratio?: string;
  className?: string;
  priority?: ComponentProps<typeof Image>["priority"];
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${ratio} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`relative flex items-end overflow-hidden rounded-xl border border-rule/60 bg-cream ${ratio} ${className}`}
      aria-hidden
    >
      <Supergraphic
        src="/assets/brand/supergraphic-wide.svg"
        className="absolute -right-10 -top-10 h-[160%] w-auto opacity-70"
      />
      <span className="relative m-5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
        {label ?? "Image placeholder"}
      </span>
    </div>
  );
}
