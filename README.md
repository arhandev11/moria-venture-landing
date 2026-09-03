# Moria Ventures

Next.js 16 (App Router) slice of the Moria Ventures design deck. One route per design file.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Routes

| Route | Source design |
|---|---|
| `/` | Moria-Venture _ Homepage.pdf |
| `/about` | Moria-Venture _ About.pdf |
| `/what-we-do` | Moria-Venture _ What We Do.pdf |
| `/portfolio` | Moria-Venture _ Portfolio.pdf |
| `/corridor` | Moria-Venture _ Indonesia-Saudi Corridor.pdf |
| `/for-businesses` | Moria-Venture _ For Businesses.pdf |
| `/for-limited-partners` | Moria-Venture _ For Limited Partners.pdf |
| `/contact` | Moria-Venture _ Contact Us.pdf |

Source PDFs live in `design-refs/`.

## Structure

```
src/app/            one folder per route
src/components/     site-header, site-footer, cta-band, ui, form, portfolio-table
public/assets/      brand marks, team portraits, photography
```

Shared primitives are in `src/components/ui.tsx`: `Container`, `Section`, `PageHero`,
`SectionTitle`, `Eyebrow`, `Button`, `Stat`, `DefRow`, `NumberedItem`, `AnchorNav`,
`Supergraphic`, `ImageSlot`.

## Design tokens

Defined as Tailwind v4 theme colors in `src/app/globals.css`, sampled from the PDFs:

| Token | Value | Use |
|---|---|---|
| `indigo-brand` | `#383189` | headings, primary buttons, footer |
| `gold` | `#FCC228` | CTA bands, accents |
| `shell` | `#FAFAFA` | default page background |
| `cream` | `#F7F5F0` | alternating section background |
| `ink` | `#201F22` | body copy |
| `rule` | `#D9D6CD` | hairlines |

## Assets

The asset export was reorganised into space-free paths:

| Original | Now |
|---|---|
| `Footer/Logo MV.svg` | `brand/logo-wordmark.svg` |
| `Navbar/Group 179.png` | `brand/logo-wordmark-sm.png` |
| `Page 1 - Homepage/Layer_1.svg` | `brand/wordmark-hero.svg` |
| `Page 1 - Homepage/Vector.svg` | `brand/supergraphic-hero.svg` |
| `Page 2 - About Us/supergraphic.svg` | `brand/supergraphic-mark.svg` |
| `Page 2 - About Us/Vector.svg` | `brand/supergraphic-tall.svg` |
| `Page 2 - About Us/Vector_footer.svg` | `brand/supergraphic-footer.svg` |
| `Page 3 - What We Do/Vector.svg` | `brand/supergraphic-wide.svg` |
| `Page 3 - What We Do/supergraphic.svg` | `brand/supergraphic-corner.svg` |
| `Page 1 - Homepage/portrait-*.png` | `team/{husni,musab,faris,sandi}.png` |
| `Page 2 - About Us/portrait-husni{,-1,-2,-3}.png` | `team/wide-{husni,musab,faris,sandi}.png` |
| `Page 2 - About Us/pexels-javaistan-*.png` | `about/jakarta.png` |
| `Page 2 - About Us/pexels-mdamirumar-*.png` | `about/riyadh.png` |
| `Page 3 - What We Do/section-image-*.png` | `what-we-do/*.png` |
| `Page 1 - Homepage/dates.json` | `homepage/dates.lottie.json` (Lottie, not wired up yet) |

## Known gaps

- **Typography.** The PDFs ship type as outlines, so the brand family name is not
  recoverable from the export. Figtree is used as a stand-in; swap it in
  `src/app/layout.tsx` once the real font is available.
- **Photography.** Most stock imagery in the deck did not ship with the asset export.
  Those spots render a branded placeholder via `ImageSlot`; pass a `src` to fill one in.
- **Forms.** Contact, pitch, and data room forms are static markup — no submit handler,
  validation, or endpoint is wired up.
- **Insights, Careers, and legal links** point at `#`; those pages do not exist yet.
