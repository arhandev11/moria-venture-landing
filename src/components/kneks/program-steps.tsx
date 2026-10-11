"use client";

import { useState, type FocusEvent, type PointerEvent } from "react";
import { format } from "@/i18n/format";
import type { Dictionary } from "@/i18n/types";

/**
 * The program's five steps. No step is marked by default: a card turns to the
 * deck's yellow while it is pointed at, keyboard-focused or tapped, and the
 * caption under the row names it.
 *
 * Three ways in, one highlight. A mouse highlights on hover and lets go when
 * it leaves, even after a click (a click also focuses the card, which must
 * not keep it yellow). Keyboard focus counts only when it is visible focus.
 * A tap has no hover to leave, so it holds until focus moves elsewhere.
 *
 * The caption keeps its line when empty, so the section never changes height.
 */
export function ProgramSteps({ labels }: { labels: Dictionary["kneks"]["program"] }) {
  const steps = labels.steps;
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [tapped, setTapped] = useState<number | null>(null);
  const active = hovered ?? focused ?? tapped;

  const handlers = (i: number) => ({
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHovered(i);
    },
    onPointerLeave: (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHovered(null);
    },
    onPointerUp: (e: PointerEvent) => {
      if (e.pointerType !== "mouse") setTapped(i);
    },
    onFocus: (e: FocusEvent<HTMLLIElement>) => {
      if (e.currentTarget.matches(":focus-visible")) setFocused(i);
    },
    onBlur: () => {
      setFocused(null);
      setTapped(null);
    },
  });

  return (
    <>
      <ol className="mt-[28px] grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => {
          const on = active === i;
          return (
            // The card's colours live on an inner box: the list item is what the
            // site's scroll reveal animates, and its transition would replace
            // this one.
            <li
              key={step.title}
              tabIndex={0}
              {...handlers(i)}
              className="cursor-default rounded-xl outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kneks-pine"
            >
              <div
                className={`h-full rounded-xl border border-t-[3px] px-[19px] pb-5 pt-[19px] transition-colors duration-200 motion-reduce:transition-none lg:min-h-[180px] lg:pb-0 ${
                  on ? "border-kneks-gold bg-kneks-sand" : "border-kneks-pine bg-white"
                }`}
              >
                <p
                  className={`text-[30px] font-bold leading-[34px] transition-colors duration-200 motion-reduce:transition-none ${
                    on ? "text-kneks-pine" : "text-kneks-gold"
                  }`}
                >
                  {i + 1}
                </p>
                <p className="mt-[16px] text-[18px] font-bold leading-[24px] text-kneks-ink">{step.title}</p>
                <p className="mt-[2px] text-[13px] leading-[21px] text-kneks-muted">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p aria-live="polite" className="mt-[30px] min-h-[18px] text-[13px] leading-[18px] text-kneks-muted">
        {active === null
          ? null
          : format(labels.stageOf, {
              current: active + 1,
              total: steps.length,
              title: steps[active].title,
            })}
      </p>
    </>
  );
}
