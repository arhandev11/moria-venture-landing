import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * The admin's kit: an ordinary app dashboard on a light ground, white cards
 * with soft borders, dense tables. The brand is the accent rather than the
 * theme: indigo for primary actions, links and the active nav item, gold
 * for what wants attention (new requests, the active marker).
 */

type Tone = "primary" | "secondary" | "ghost" | "danger" | "destructive" | "icon";
type Size = "md" | "sm";

export const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-brand";

const TONES: Record<Tone, string> = {
  primary: "bg-indigo-brand text-white shadow-sm hover:bg-[#2d2770]",
  secondary: "border border-ink/15 bg-white text-ink shadow-sm hover:border-ink/25 hover:bg-shell",
  ghost: "text-indigo-brand hover:bg-indigo-brand/[0.06]",
  destructive: "bg-red-700 text-white shadow-sm hover:bg-red-800",
  danger: "border border-red-200 bg-white text-red-700 shadow-sm hover:border-red-300 hover:bg-red-50",
  icon: "border border-ink/15 bg-white text-ink-muted shadow-sm hover:border-indigo-brand/40 hover:text-indigo-brand",
};

const SIZES: Record<Size, string> = {
  md: "h-9 px-3.5 text-[13px]",
  sm: "h-7 px-2.5 text-[12px]",
};

export function btn(tone: Tone = "primary", size: Size = "md") {
  const shape = tone === "icon" ? "size-7 rounded-md" : `${SIZES[size]} rounded-md font-semibold`;
  return `inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-40 ${shape} ${TONES[tone]} ${FOCUS}`;
}

export const INPUT =
  "w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-[14px] text-ink shadow-sm outline-none transition-colors placeholder:text-ink/40 focus:border-indigo-brand focus:ring-3 focus:ring-indigo-brand/15 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/15";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
      <div className="min-w-0">
        <h1 className="break-words text-[22px] font-bold leading-tight tracking-[-0.01em] text-ink">{title}</h1>
        {description ? <p className="mt-1 max-w-[680px] text-[14px] leading-[22px] text-ink-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Card({ children, className = "", ...rest }: ComponentProps<"div">) {
  return (
    <div {...rest} className={`rounded-xl border border-ink/10 bg-white shadow-[0_1px_2px_rgb(32_31_34/0.04),0_1px_6px_rgb(32_31_34/0.04)] ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, hint, action }: { title: string; hint?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-3.5">
      <div className="min-w-0">
        <h2 className="text-[14px] font-semibold text-ink">{title}</h2>
        {hint ? <p className="mt-0.5 text-[12px] text-ink-muted">{hint}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
  className = "",
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[13px] font-semibold text-ink">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error ? (
        <span role="alert" className="mt-1.5 block text-[12px] font-medium text-red-700">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-[12px] leading-[18px] text-ink-muted">{hint}</span>
      ) : null}
    </label>
  );
}

/**
 * Status pills. Gold marks what needs attention (new, funded), indigo what
 * is on (live, active, you), green nothing; muted is anything at rest.
 */
export function Badge({ tone, children }: { tone: "gold" | "indigo" | "green" | "muted"; children: ReactNode }) {
  const tones = {
    gold: "bg-gold/30 text-[#5c4200] ring-gold/60",
    indigo: "bg-indigo-brand/[0.08] text-indigo-brand ring-indigo-brand/20",
    green: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
    muted: "bg-ink/[0.05] text-ink-muted ring-ink/10",
  };
  const dots = { gold: "bg-gold-deep", indigo: "bg-indigo-brand", green: "bg-emerald-600", muted: "bg-ink/35" };
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[12px] font-medium ring-1 ring-inset ${tones[tone]}`}>
      <span aria-hidden className={`size-1.5 rounded-full ${dots[tone]}`} />
      {children}
    </span>
  );
}

export function FormMessage({ tone = "error", children }: { tone?: "error" | "success"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-lg border px-3.5 py-2.5 text-[13px] ${
        tone === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      {children}
    </p>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={`rounded text-[13px] font-semibold text-indigo-brand hover:underline ${FOCUS}`}>
      {children}
    </Link>
  );
}

/** An empty list: an icon, a line of explanation and, where there is one, the next step. */
export function EmptyState({ icon, title, children, action }: { icon: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-indigo-brand/[0.07] text-indigo-brand">{icon}</span>
      <p className="mt-3 text-[14px] font-semibold text-ink">{title}</p>
      {children ? <p className="mt-1 max-w-[360px] text-[13px] text-ink-muted">{children}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

/**
 * Table chrome shared by the lists. The wrapper scrolls on both axes so the
 * header row can stick inside it. Lists drop secondary columns as the screen
 * narrows (folding them into the first cell) rather than scrolling sideways,
 * so a row's controls are always in view.
 */
export const TABLE = {
  scroll: "max-h-[calc(100vh-240px)] min-h-[120px] overflow-auto",
  table: "w-full border-separate border-spacing-0 text-left text-[14px]",
  th: "sticky top-0 z-[1] whitespace-nowrap border-b border-ink/10 bg-shell px-3 py-2.5 text-[12px] font-semibold text-ink-muted first:pl-4 last:pr-4 sm:px-4 sm:first:pl-5 sm:last:pr-5",
  tr: "transition-colors hover:bg-indigo-brand/[0.025]",
  td: "border-b border-ink/[0.07] px-3 py-3 align-middle first:pl-4 last:pr-4 sm:px-4 sm:first:pl-5 sm:last:pr-5",
};

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(date);
}
