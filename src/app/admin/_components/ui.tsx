import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * The admin's small kit. Plain and dense on purpose: it is a working tool,
 * so it borrows the site's indigo, gold and hairlines but none of its scale.
 */

export const BTN = {
  primary:
    "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-indigo-brand px-4 text-[13px] font-semibold text-white transition-colors hover:bg-indigo-brand/90 disabled:opacity-50",
  secondary:
    "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-rule bg-white px-4 text-[13px] font-semibold text-ink transition-colors hover:border-indigo-brand hover:text-indigo-brand disabled:opacity-50",
  danger:
    "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-4 text-[13px] font-semibold text-red-700 transition-colors hover:border-red-600 hover:bg-red-50 disabled:opacity-50",
  icon:
    "inline-flex size-8 items-center justify-center rounded-md border border-rule bg-white text-ink-muted transition-colors hover:border-indigo-brand hover:text-indigo-brand disabled:pointer-events-none disabled:opacity-30",
};

export const INPUT =
  "w-full rounded-md border border-rule bg-white px-3 py-2 text-[14px] text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-indigo-brand focus:ring-2 focus:ring-indigo-brand/15 aria-[invalid=true]:border-red-500";

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
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-5">
      <div>
        <h1 className="text-[24px] font-bold tracking-[-0.01em] text-ink">{title}</h1>
        {description ? <p className="mt-1 text-[14px] text-ink-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
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
      <span className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-indigo-brand">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error ? (
        <span role="alert" className="mt-1 block text-[13px] text-red-700">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1 block text-[12px] text-ink-muted">{hint}</span>
      ) : null}
    </label>
  );
}

export function Card({ children, className = "", ...rest }: ComponentProps<"div">) {
  return (
    <div {...rest} className={`rounded-lg border border-rule bg-white ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ tone, children }: { tone: "gold" | "indigo" | "grey" | "green"; children: ReactNode }) {
  const tones = {
    gold: "bg-gold/25 text-[#6b4f00]",
    indigo: "bg-indigo-brand/10 text-indigo-brand",
    grey: "bg-ink/5 text-ink-muted",
    green: "bg-emerald-50 text-emerald-800",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[12px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function FormMessage({ tone = "error", children }: { tone?: "error" | "success"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-md px-3 py-2 text-[13px] ${tone === "error" ? "bg-red-50 text-red-800" : "bg-emerald-50 text-emerald-800"}`}
    >
      {children}
    </p>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-indigo-brand underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(date);
}
