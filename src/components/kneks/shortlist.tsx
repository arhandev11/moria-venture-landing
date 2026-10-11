"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Shortlist = {
  names: string[];
  toggle: (name: string) => void;
};

const ShortlistContext = createContext<Shortlist | null>(null);

/**
 * The SMEs an investor has starred. The stars sit on the pipeline cards and the
 * list they build sits beside the access form further down, so the two share
 * this rather than either owning it.
 */
export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [names, setNames] = useState<string[]>([]);
  const toggle = (name: string) =>
    setNames((current) =>
      current.includes(name)
        ? current.filter((n) => n !== name)
        : [...current, name],
    );

  return (
    <ShortlistContext.Provider value={{ names, toggle }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const value = useContext(ShortlistContext);
  if (!value) throw new Error("useShortlist needs a ShortlistProvider above it");
  return value;
}

/** Outline star, filled while the SME is on the shortlist. */
export function StarIcon({
  filled = false,
  className = "",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    >
      <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
    </svg>
  );
}
