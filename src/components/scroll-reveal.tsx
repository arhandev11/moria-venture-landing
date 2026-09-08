"use client";

import { useEffect } from "react";

/**
 * Fades section content up as it scrolls into view, across every page.
 *
 * Targets are found rather than hand-annotated: `Container` marks itself as a
 * reveal group, so each of its direct children is a step, and full-bleed
 * `ImageSlot`s mark themselves individually since they sit outside any
 * container. Adding a section anywhere therefore animates without touching this
 * file.
 *
 * Everything is progressive: the markup ships visible, and this only hides an
 * element at the moment it also starts observing it. If the script never runs
 * the page still reads normally. Only opacity and transform are touched, so
 * nothing here can move the layout the deck was measured against.
 */
/** Delay between steps within one section. Deliberately unhurried. */
const STAGGER_MS = 440;

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = [];

    // A block whose children are a row of cards or a list of rows reads better
    // stepped through than faded in as one slab, so those are unwrapped a
    // single level. Tables are left alone — animating rows inside a scroller
    // fights the scroller.
    const stepsInto = (el: HTMLElement) => {
      if (el.querySelector("table")) return false;
      const display = getComputedStyle(el).display;
      const listy = ["UL", "OL", "DL"].includes(el.tagName);
      if (display !== "grid" && !listy) return false;
      return el.childElementCount >= 2;
    };

    const collect = (el: HTMLElement) => {
      if (stepsInto(el)) {
        for (const child of el.children) {
          if (child instanceof HTMLElement) targets.push(child);
        }
      } else {
        targets.push(el);
      }
    };

    // The hero runs its own, slower sequence; see HeroReveal.
    const ownedByHero = (el: Element) => !!el.closest("[data-hero-reveal]");

    document
      .querySelectorAll<HTMLElement>("main [data-reveal-group]")
      .forEach((group) => {
        if (ownedByHero(group)) return;
        for (const child of group.children) {
          if (child instanceof HTMLElement) collect(child);
        }
      });
    document
      .querySelectorAll<HTMLElement>("main [data-reveal]")
      .forEach((el) => {
        if (!ownedByHero(el)) targets.push(el);
      });

    if (!targets.length) return;

    // Anything already on screen animates in immediately rather than waiting
    // for a scroll that may never come.
    const fold = window.innerHeight;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          const step = Number(el.dataset.revealStep ?? 0);
          window.setTimeout(() => {
            el.dataset.revealIn = "";
            delete el.dataset.revealPending;
          }, step * STAGGER_MS);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    for (const el of targets) {
      // Stagger is per group, so each section counts its own children.
      const siblings = el.parentElement ? [...el.parentElement.children] : [el];
      el.dataset.revealStep = String(Math.min(siblings.indexOf(el), 5));
      el.dataset.revealPending = "";
      if (el.getBoundingClientRect().top < fold) {
        // Give the browser a frame with the hidden state applied, otherwise
        // there is nothing to transition from.
        requestAnimationFrame(() => {
          el.dataset.revealIn = "";
          delete el.dataset.revealPending;
        });
      } else {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
