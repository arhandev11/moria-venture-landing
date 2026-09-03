import type { ReactNode } from "react";

/**
 * Static form markup only — no submit handler is wired up yet, so the action
 * buttons are plain `type="button"`.
 */

type FieldTone = "default" | "on-gold";

const INPUT: Record<FieldTone, string> = {
  default:
    "w-full border border-indigo-brand bg-transparent px-4 py-3 text-[13px] text-ink placeholder:text-ink/40 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-brand",
  "on-gold":
    "w-full border border-transparent bg-shell px-4 py-3 text-[13px] text-ink placeholder:text-ink/40 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-brand",
};

export function Field({
  label,
  placeholder,
  type = "text",
  rows,
  tone = "default",
  className = "",
}: {
  label: string;
  placeholder: string;
  type?: string;
  rows?: number;
  tone?: FieldTone;
  className?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-brand"
      >
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          className={`mt-2 ${INPUT[tone]}`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={`mt-2 ${INPUT[tone]}`}
        />
      )}
    </div>
  );
}

export function SubmitButton({
  children,
  tone = "gold",
  className = "",
}: {
  children: ReactNode;
  tone?: "gold" | "indigo";
  className?: string;
}) {
  const tones = {
    gold: "bg-gold text-indigo-brand hover:bg-gold-deep",
    indigo: "bg-indigo-brand text-white hover:bg-indigo-brand/90",
  };
  return (
    <button
      type="button"
      className={`px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${tones[tone]} ${className}`}
    >
      {children}
    </button>
  );
}
