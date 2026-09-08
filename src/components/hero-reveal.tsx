"use client";

import { useEffect } from "react";

/** Between one element of the hero and the next. */
const ELEMENT_MS = 260;
/** Between one line of a headline or paragraph and the next. */
const LINE_MS = 180;

/**
 * Brings the hero in one piece at a time, on load.
 *
 * The site-wide `ScrollReveal` deliberately shows anything already on screen at
 * once — waiting for a scroll that has not happened would leave the top of the
 * page blank. The hero wants the opposite: it is the first thing read, so it is
 * worth drawing out. This owns every element inside `[data-hero-reveal]` and
 * `ScrollReveal` leaves that subtree alone.
 *
 * Elements marked `data-reveal-lines` come in a line at a time. Lines cannot be
 * known from the markup — they depend on the width the text ends up wrapping
 * at — so each word is wrapped in its own span and the spans are grouped by the
 * top edge they land on. Words share their line's delay, which reads as the
 * line arriving as one. Only text nodes are wrapped, so inline mark-up inside
 * the copy survives untouched.
 *
 * Delays ride on a custom property rather than a timer: every element starts
 * its transition in the same frame, and the browser keeps them in step.
 *
 * Progressive throughout: the markup ships visible and is only hidden once this
 * runs, and readers who have asked for reduced motion are left alone.
 */
export function HeroReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = document.querySelector<HTMLElement>("[data-hero-reveal]");
    if (!hero) return;
    // The word wrapping below rewrites the DOM it reads, so running twice would
    // wrap the wrapping and strand the first pass hidden. React invokes effects
    // twice in development, so this has to be said out loud.
    if (hero.dataset.heroRevealDone) return;
    hero.dataset.heroRevealDone = "1";

    /**
     * Replaces each text node with one span per word, leaving element children
     * where they are. Returns the spans in document order.
     */
    const wrapWords = (root: HTMLElement) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const texts: Text[] = [];
      let node = walker.nextNode();
      while (node) {
        if (node.textContent?.trim()) texts.push(node as Text);
        node = walker.nextNode();
      }

      const words: HTMLElement[] = [];
      for (const text of texts) {
        const frag = document.createDocumentFragment();
        // Keep the separators: dropping them would re-flow the paragraph.
        for (const part of text.textContent!.split(/(\s+)/)) {
          if (!part) continue;
          if (!part.trim()) {
            frag.appendChild(document.createTextNode(part));
            continue;
          }
          const span = document.createElement("span");
          span.textContent = part;
          // Inline boxes cannot be transformed; inline-block can, and still
          // breaks between words the way the original text did.
          span.style.display = "inline-block";
          frag.appendChild(span);
          words.push(span);
        }
        text.parentNode?.replaceChild(frag, text);
      }
      return words;
    };

    /** Groups words by the line box they landed on, top to bottom. */
    const groupByLine = (words: HTMLElement[]) => {
      const lines: HTMLElement[][] = [];
      let lastTop: number | null = null;
      for (const word of words) {
        const top = Math.round(word.getBoundingClientRect().top);
        // A couple of pixels of slack: superscripts and mixed sizes on one line
        // do not share an exact top.
        if (lastTop === null || Math.abs(top - lastTop) > 4) {
          lines.push([]);
          lastTop = top;
        }
        lines[lines.length - 1].push(word);
      }
      return lines;
    };

    const staged: { el: HTMLElement; delay: number }[] = [];
    let cursor = 0;

    for (const child of hero.children) {
      if (!(child instanceof HTMLElement)) continue;

      if (child.hasAttribute("data-reveal-lines")) {
        const lines = groupByLine(wrapWords(child));
        for (const line of lines) {
          for (const word of line) staged.push({ el: word, delay: cursor });
          cursor += LINE_MS;
        }
        // A block of copy earns a fuller beat before whatever follows it.
        cursor += ELEMENT_MS - LINE_MS;
      } else {
        staged.push({ el: child, delay: cursor });
        cursor += ELEMENT_MS;
      }
    }

    if (!staged.length) return;

    for (const { el, delay } of staged) {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.dataset.heroPending = "";
    }

    const reveal = () => {
      for (const { el } of staged) {
        el.dataset.heroIn = "";
        delete el.dataset.heroPending;
      }
    };

    // One frame with the hidden state applied, or there is nothing to move from.
    requestAnimationFrame(reveal);
    // Hidden copy is worse than unanimated copy, so nothing is left to chance:
    // if that frame never lands, this does.
    const failsafe = window.setTimeout(reveal, 1200);
    return () => window.clearTimeout(failsafe);
  }, []);

  return null;
}
