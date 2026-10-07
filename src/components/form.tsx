import type { ReactNode } from "react";

/**
 * Static form markup only — no submit handler is wired up yet, so the action
 * buttons are plain `type="button"`.
 */

type FieldTone = "default" | "on-gold";
/** `lg` is the revised deck's form: 48px inputs on a 2px rule, 13px labels. */
type FieldSize = "md" | "lg";

const FOCUS =
  "focus:outline-2 focus:outline-offset-2 focus:outline-indigo-brand";

const INPUT: Record<FieldSize, Record<FieldTone, string>> = {
  md: {
    default: `w-full border border-indigo-brand bg-transparent px-4 py-3 text-[13px] text-ink placeholder:text-ink/40 ${FOCUS}`,
    "on-gold": `w-full border border-transparent bg-shell px-4 py-3 text-[13px] text-ink placeholder:text-ink/40 ${FOCUS}`,
  },
  lg: {
    default: `w-full border-2 border-indigo-brand bg-transparent px-5 text-[15px] text-ink placeholder:text-ink/45 ${FOCUS}`,
    "on-gold": `w-full border-2 border-transparent bg-shell px-5 text-[15px] text-ink placeholder:text-ink/45 ${FOCUS}`,
  },
};

export function Field({
  label,
  placeholder,
  type = "text",
  rows,
  tone = "default",
  size = "md",
  className = "",
}: {
  label: string;
  placeholder: string;
  type?: string;
  rows?: number;
  tone?: FieldTone;
  size?: FieldSize;
  className?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const labelClass =
    size === "lg"
      ? "block text-[13px] font-bold uppercase tracking-[0.02em] text-indigo-brand"
      : "block text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-brand";
  // The large size takes its height from a fixed 48px rather than padding;
  // a textarea still needs padding, having no single line to centre on.
  const inputClass =
    size === "lg"
      ? `${INPUT.lg[tone]} ${rows ? "py-3" : "h-12"}`
      : INPUT.md[tone];
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          className={`${size === "lg" ? "mt-3" : "mt-2"} ${inputClass}`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={`${size === "lg" ? "mt-3" : "mt-2"} ${inputClass}`}
        />
      )}
    </div>
  );
}

export function SubmitButton({
  children,
  tone = "gold",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  tone?: "gold" | "indigo";
  size?: FieldSize;
  className?: string;
}) {
  const tones = {
    gold: "bg-gold text-indigo-brand hover:bg-gold-deep",
    indigo: "bg-indigo-brand text-white hover:bg-indigo-brand/90",
  };
  return (
    <button
      type="button"
      className={`${
        size === "lg" ? "h-[54px] px-10 text-[13px] font-bold" : "px-7 py-3.5 text-[11px] font-semibold"
      } uppercase tracking-[0.08em] transition-colors ${tones[tone]} ${className}`}
    >
      {children}
    </button>
  );
}
