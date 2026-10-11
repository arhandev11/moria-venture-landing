"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Shortlist = {
  names: string[];
  toggle: (name: string) => void;
  /** Sets the whole list at once, e.g. back to what a rejected request sent. */
  replace: (names: string[]) => void;
};

const ShortlistContext = createContext<Shortlist | null>(null);

/**
 * The SMEs an investor has starred. The stars sit on the pipeline cards, the
 * list they build sits beside the access form, and the form's SME picker is a
 * third view of it, so all three share this rather than any one owning it.
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
    <ShortlistContext.Provider value={{ names, toggle, replace: setNames }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const value = useContext(ShortlistContext);
  if (!value) throw new Error("useShortlist needs a ShortlistProvider above it");
  return value;
}

/**
 * The Moria coin that marks an SME as shortlisted: greyed out until it is
 * picked, then in full colour. Picking flips it once (CoinFlip in
 * globals.css); it only plays on the change, never for SMEs already on the
 * list when the page loads, and not at all under reduced motion.
 */
export function CoinIcon({
  active = true,
  className = "",
}: {
  active?: boolean;
  className?: string;
}) {
  const [flipping, setFlipping] = useState(false);
  const was = useRef(active);
  useEffect(() => {
    if (active && !was.current) setFlipping(true);
    was.current = active;
  }, [active]);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- a small static brand mark
    <img
      src="/assets/brand/logo-coin.svg"
      alt=""
      aria-hidden
      onAnimationEnd={() => setFlipping(false)}
      className={`transition-[filter,opacity] duration-300 ${active ? "drop-shadow-[0_2px_4px_rgba(184,137,43,0.45)]" : "opacity-45 grayscale"} ${flipping ? "coin-flip" : ""} ${className}`}
    />
  );
}
