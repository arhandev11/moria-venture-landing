/**
 * Seeds three SAMPLE success stories, so the section on /kneks has something
 * to show until real ones are written. Safe to re-run: it writes only while
 * the table is empty, so it never touches or duplicates what an admin has
 * since added, edited or deleted.
 *
 *   npm run db:seed:stories                          local (.env.local)
 *   npx tsx --env-file=.env scripts/seed-stories.ts  on a server
 *
 * Each story is marked is_sample (the site shows "Sample story") and says so
 * in its own text. They describe the program journey in general terms
 * (screening, mentoring, pitch preparation, investor introductions) about
 * SMEs from the HSDD 2026 import; nothing in them is presented as a fact
 * about those companies beyond the description in their curation brief: no
 * amounts raised, no investors, no outcomes. Covers are site images under
 * /assets/ without people in them, so no one pictured is mistaken for the
 * SME's team.
 *
 * An SME that is missing or hidden is left unlinked rather than failing the
 * run. /kneks picks the stories up on its hourly revalidate, or at once when
 * an admin next saves any story or SME.
 */
import { and, count, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "../src/db/pool";
import * as schema from "../src/db/schema";

const { smes, successStories } = schema;

const SAMPLE_NOTE = "**Sample story — illustrative only.** This page shows how a company could move through the KNEKS × Moria program. It is not an account of events, and it makes no claim about funding, investors or results.";

const STORIES: {
  sme: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverAsset: string;
  coverAlt: string;
  publishedAt: string;
}[] = [
  {
    sme: "SantriLink",
    slug: "sample-santrilink-pesantren-payments-program-journey",
    title: "From pesantren software to investor-ready: a sample program journey",
    excerpt:
      "Sample story — illustrative only. How a pesantren management and payments platform like SantriLink could use screening, mentoring and pitch preparation to get ready for investor conversations.",
    body: `${SAMPLE_NOTE}

## The company

SantriLink is a digital management application for Islamic boarding schools (pesantren), connecting administrators, students and guardians on one platform to simplify administration and payments. It joined the program's pipeline through the Halal Startup Demo Day 2026 curation.

## What the journey could look like

- **Screening.** A business review and an Islamic Principle review of how fees and payments flow through the platform.
- **Mentoring.** Working sessions on unit economics per school, onboarding costs and how the product grows from one pesantren to many.
- **Pitch preparation.** A clear investment story: the problem pesantren face, the product, traction to date and how funds would be used.
- **Investor introductions.** Meetings with investors whose mandate fits Islamic finance infrastructure, in Indonesia and across the Gulf.

## Why it matters

Pesantren are a large and underserved part of Indonesia's Islamic economy. A program like this one helps a founder present that opportunity in the terms investors use, so the conversation can move past introductions.`,
    coverAsset: "/assets/what-we-do/project-finance.webp",
    coverAlt: "Hands working through financial documents with a calculator and a laptop on a wooden desk.",
    publishedAt: "2026-10-01",
  },
  {
    sme: "Mak-E Farmhouse",
    slug: "sample-mak-e-farmhouse-sheep-farming-program-journey",
    title: "Scaling a sheep-farming ecosystem: a sample program journey",
    excerpt:
      "Sample story — illustrative only. How an integrated livestock and agritech business like Mak-E Farmhouse could prepare for cross-border investors through the program.",
    body: `${SAMPLE_NOTE}

## The company

Mak-E Farmhouse, based in Bandung, builds an integrated sheep-farming ecosystem that combines livestock operations, technology, feed, farmer empowerment and market access, including a smart-barn product and a Qurban and Aqiqah savings platform.

## What the journey could look like

- **Screening.** Reviewing the business model across farming, technology and the Qurban and Aqiqah market, and its fit with Islamic Principles.
- **Mentoring.** Separating the capital needs of the farm operations from those of the technology products, so each can be explained on its own terms.
- **Pitch preparation.** Turning seasonal demand around Eid al-Adha into a clear, data-backed growth plan.
- **Investor introductions.** Conversations with investors interested in halal food supply chains and agritech, from Southeast Asia to the Gulf.

## Why it matters

Demand for Qurban and Aqiqah livestock connects Indonesian farmers to a market that Muslim investors already understand. The program's role is to help a company like this show that link clearly and credibly.`,
    coverAsset: "/assets/for-businesses/process.webp",
    coverAlt: "A tidy desk with a laptop showing a spreadsheet, a desk calendar and notebooks.",
    publishedAt: "2026-09-24",
  },
  {
    sme: "Harvesea",
    slug: "sample-harvesea-halal-seafood-program-journey",
    title: "Building a halal seafood supply chain: a sample program journey",
    excerpt:
      "Sample story — illustrative only. How a halal seafood supply-chain platform like Harvesea could go from screening to investor introductions in the program.",
    body: `${SAMPLE_NOTE}

## The company

Harvesea is a halal seafood supply-chain platform that helps restaurants, hotels and caterers buy quality seafood at competitive prices, orchestrating sourcing, pricing, processing and fulfilment through its supplier network and technology.

## What the journey could look like

- **Screening.** A review of the supplier network, halal assurance along the chain and the business model.
- **Mentoring.** Sharpening the numbers that matter for a supply-chain business: margins per order, working capital and supplier reliability.
- **Pitch preparation.** Explaining how the platform serves hotels, restaurants and caterers, and what new capital would unlock.
- **Investor introductions.** Meetings with investors focused on halal food and logistics, including partners in the Moria Ventures network in the Gulf.

## Why it matters

Reliable halal supply is a practical need for food businesses across Indonesia and the wider region. The program helps founders turn operational strength into an investment case that travels across borders.`,
    coverAsset: "/assets/what-we-do/venture-capital.webp",
    coverAlt: "The Jakarta skyline under a blue sky.",
    publishedAt: "2026-09-17",
  },
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (add it to .env.local, or pass --env-file=.env)");
  const pool = createPool(url);
  const db = drizzle({ client: pool, schema, mode: "default" });

  try {
    const [{ n }] = await db.select({ n: count() }).from(successStories);
    if (n > 0) {
      console.log(`success_stories: ${n} rows present, left alone`);
      return;
    }

    const rows = [];
    for (const [i, story] of STORIES.entries()) {
      const [sme] = await db
        .select({ id: smes.id })
        .from(smes)
        .where(and(eq(smes.name, story.sme), eq(smes.published, true)))
        .limit(1);
      if (!sme) console.warn(`  ${story.sme}: not found or not published; the story is left unlinked`);
      rows.push({
        slug: story.slug,
        title: story.title,
        excerpt: story.excerpt,
        body: story.body,
        coverAsset: story.coverAsset,
        coverAlt: story.coverAlt,
        publishedAt: story.publishedAt,
        smeId: sme?.id ?? null,
        sourceLine: "Sample story — illustrative only",
        isSample: true,
        published: true,
        sortOrder: (i + 1) * 10,
      });
    }
    await db.insert(successStories).values(rows);
    console.log(`success_stories: ${rows.length} sample stories seeded`);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
