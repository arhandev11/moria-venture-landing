import Image from "next/image";
import { AnimatedSupergraphic } from "@/components/animated-supergraphic";
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
      className={`t-label inline-flex h-[47px] items-center justify-center px-[34px] transition-colors ${TONE[tone]}`}
    >
      {children}
    </Link>
  );
}

/**
 * The deck is drawn on a 1440px canvas with content running from x=80 to x=1360,
 * so the container caps at 1440 and carries 80px of side padding at that width.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-20 ${className}`}
    >
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
  return <p className={`t-eyebrow text-indigo-brand ${className}`}>{children}</p>;
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
    <Tag className={`t-section text-indigo-brand ${className}`}>{children}</Tag>
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

/**
 * Page hero shared by the inner pages. The deck sizes this band differently per
 * page, so the padding, the gap under the headline and the lede's own size are
 * all passed in.
 */
export function PageHero({
  title,
  lede,
  actions,
  actionsInline = false,
  padding = "pb-[100px] pt-[110px] lg:pb-[132px] lg:pt-[110px]",
  ledeGap = "mt-[45px]",
  ledeClassName = "t-lede max-w-[640px]",
  markClassName = "absolute right-0 top-0 h-[300px] w-[159px] opacity-40 sm:opacity-100 lg:h-[470px] lg:w-[250px]",
}: {
  title: ReactNode;
  lede: ReactNode;
  actions?: ReactNode;
  actionsInline?: boolean;
  padding?: string;
  ledeGap?: string;
  ledeClassName?: string;
  markClassName?: string;
}) {
  return (
    <Section className="relative overflow-hidden">
      <AnimatedSupergraphic className={markClassName} />
      <Container className={`relative ${padding}`}>
        <h1 className="t-hero uppercase text-indigo-brand">{title}</h1>
        <div
          className={`${ledeGap} ${
            actionsInline
              ? "flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
              : ""
          }`}
        >
          <p className={`${ledeClassName} text-ink-muted`}>{lede}</p>
          {actions ? (
            <div className={`flex flex-wrap gap-4 ${actionsInline ? "" : "mt-[55px]"}`}>
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
    <div className="border-y border-rule/60 bg-cream">
      <Container>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 py-6">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-8">
              <a
                href={item.href}
                className={`t-eyebrow ${
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
    <div className={divider ? "border-l border-rule pl-6 first:border-l-0 first:pl-0" : ""}>
      <p className="t-stat text-indigo-brand">{value}</p>
      <p className="t-eyebrow mt-3 text-ink/70">{label}</p>
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
    <div className="grid gap-3 border-t border-rule py-7 last:border-b sm:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] sm:gap-0">
      <dt className={`text-[19px] font-semibold ${termClassName}`}>{term}</dt>
      <dd className="text-[16px] leading-[26px] text-ink-muted">{children}</dd>
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
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-7 border-t border-rule py-9 last:border-b">
      <span className="t-sub text-indigo-brand">{n}</span>
      <div>
        <h3 className="t-title text-indigo-brand">{title}</h3>
        <p className="t-body mt-3 text-ink-muted">{children}</p>
      </div>
    </div>
  );
}

/**
 * Photography slot. Falls back to a branded placeholder when no source is given.
 */
export function ImageSlot({
  src,
  alt = "",
  label,
  ratio = "aspect-[16/7]",
  className = "",
  priority,
  rounded = "rounded-xl",
}: {
  src?: string;
  alt?: string;
  label?: string;
  ratio?: string;
  className?: string;
  priority?: ComponentProps<typeof Image>["priority"];
  rounded?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${ratio} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`relative flex items-end overflow-hidden border border-rule/60 bg-cream ${rounded} ${ratio} ${className}`}
      aria-hidden
    >
      <Supergraphic
        src="/assets/brand/supergraphic-wide.svg"
        className="absolute -right-10 -top-10 h-[160%] w-auto opacity-70"
      />
      <span className="t-eyebrow relative m-6 text-ink/40">
        {label ?? "Image placeholder"}
      </span>
    </div>
  );
}
