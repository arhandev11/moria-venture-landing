import {
  bigint,
  boolean,
  char,
  date,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
// Relative, not "@/": drizzle-kit and the seed script load this file too.
import { ADMIN_ROLES, type AdminRole } from "../lib/auth/roles";
import { CURATION_STATUSES, LEGAL_FORMS } from "../lib/sme-fields";

/**
 * Tables for the admin area and the KNEKS partnership page. Kept free of
 * `server-only` so drizzle-kit and the seed script can import it as plain TS.
 */

export { ADMIN_ROLES, type AdminRole };

export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  passwordHash: varchar("password_hash", { length: 100 }).notNull(),
  /**
   * The default exists only so the migration that added this column turned
   * every admin who already existed into a superadmin, which is what they
   * were. New rows must still name their role: every insert sets it.
   */
  role: mysqlEnum("role", ADMIN_ROLES).notNull().default("superadmin"),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

/**
 * Server-side sessions. The cookie carries a random token; only its keyed
 * hash is stored here, so a leaked table cannot be replayed as cookies.
 */
export const adminSessions = mysqlTable(
  "admin_sessions",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    userId: int("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("admin_sessions_user_idx").on(t.userId)],
);

/**
 * The SMEs shown under "SMEs in the program" on /kneks.
 *
 * Money is stored as a whole amount in its own currency (ISO 4217 code), never
 * converted: the curation data mixes IDR and USD. Columns under "admin only"
 * must never be selected by the public read path.
 */
export const smes = mysqlTable(
  "smes",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 120 }).notNull().unique(),
    /** Canonical short sector; each one is a filter chip on /kneks. */
    sector: varchar("sector", { length: 60 }).notNull(),
    city: varchar("city", { length: 80 }),
    province: varchar("province", { length: 80 }),
    stage: varchar("stage", { length: 40 }),
    /** Investment, Market access, Project financing ... as the curation source states it. */
    readiness: varchar("readiness", { length: 60 }),
    status: mysqlEnum("status", ["program", "funded"]).notNull().default("program"),
    brief: text("brief").notNull(),
    /** The round being raised, in whole units of askCurrency. Both set or both null. */
    askAmount: bigint("ask_amount", { mode: "number", unsigned: true }),
    askCurrency: char("ask_currency", { length: 3 }),
    /** Program SMEs only: share of the ask investors have signalled, 0–100; null hides the meter. */
    interestPct: int("interest_pct"),
    /** Traction, as the brief's one-line summary. */
    metrics: varchar("metrics", { length: 255 }),
    /** Funded SMEs only: what the closed round raised, in whole units of raisedCurrency. */
    raisedAmount: bigint("raised_amount", { mode: "number", unsigned: true }),
    raisedCurrency: char("raised_currency", { length: 3 }),
    investor: varchar("investor", { length: 120 }),
    quote: text("quote"),
    legalForm: mysqlEnum("legal_form", LEGAL_FORMS),
    /** Supporting ministry, agency or incubator. */
    supportingOrg: varchar("supporting_org", { length: 160 }),
    /** Valuation or equity offered, as written ("10% equity"). */
    valuationTerms: varchar("valuation_terms", { length: 255 }),
    useOfFunds: text("use_of_funds"),
    /** File name inside UPLOAD_DIR/smes, served by /media/smes/[file]. */
    imageFile: varchar("image_file", { length: 100 }),

    // Admin only from here to sourceRef.
    curationStatus: mysqlEnum("curation_status", CURATION_STATUSES),
    /** The product category exactly as the curation source wrote it. */
    productCategory: varchar("product_category", { length: 160 }),
    /** True when the ask's currency was guessed from the figure's size, not stated by the source. */
    askCurrencyInferred: boolean("ask_currency_inferred").notNull().default(false),
    ceoName: varchar("ceo_name", { length: 200 }),
    address: text("address"),
    potentialInvestors: text("potential_investors"),
    curationNotes: text("curation_notes"),
    pitchDeckUrl: varchar("pitch_deck_url", { length: 500 }),
    dataQualityNotes: text("data_quality_notes"),
    /** Import provenance and upsert key: e.g. "hsdd-2026" and the source's row number. Null when added by hand. */
    source: varchar("source", { length: 40 }),
    sourceRef: int("source_ref"),

    sortOrder: int("sort_order").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (t) => [
    index("smes_order_idx").on(t.published, t.sortOrder),
    uniqueIndex("smes_source_ref_uq").on(t.source, t.sourceRef),
  ],
);

export const OPTION_KINDS = ["region", "ticket"] as const;
export type OptionKind = (typeof OPTION_KINDS)[number];

/** The region and ticket-size choices on the investor access form. */
export const formOptions = mysqlTable(
  "form_options",
  {
    id: int("id").autoincrement().primaryKey(),
    kind: mysqlEnum("kind", OPTION_KINDS).notNull(),
    label: varchar("label", { length: 120 }).notNull(),
    sortOrder: int("sort_order").notNull().default(0),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("form_options_kind_label_uq").on(t.kind, t.label)],
);

/** Requests sent from the "Request investor access" form on /kneks. */
export const investorRequests = mysqlTable(
  "investor_requests",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    region: varchar("region", { length: 120 }).notNull(),
    ticket: varchar("ticket", { length: 120 }).notNull(),
    message: text("message").notNull(),
    /** Comma-separated SME names the investor starred. */
    shortlist: text("shortlist").notNull(),
    status: mysqlEnum("status", ["new", "handled"]).notNull().default("new"),
    handledAt: timestamp("handled_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("investor_requests_created_idx").on(t.createdAt)],
);

/**
 * Articles under "Success stories" on /kneks, each with its own page at
 * /kneks/stories/[slug]. Content is stored as written (English) and shown
 * as is in every language. The body is plain text with a tiny markup the
 * public page renders itself (see src/lib/story-markup.ts), never as HTML.
 */
export const successStories = mysqlTable(
  "success_stories",
  {
    id: int("id").autoincrement().primaryKey(),
    /** The URL segment; made from the title, editable, unique. */
    slug: varchar("slug", { length: 120 }).notNull().unique(),
    title: varchar("title", { length: 160 }).notNull(),
    /** The card's summary. */
    excerpt: varchar("excerpt", { length: 300 }).notNull(),
    body: text("body").notNull(),
    /** Uploaded cover: a file name inside UPLOAD_DIR/stories, served by /media/stories/[file]. Wins over coverAsset. */
    coverFile: varchar("cover_file", { length: 100 }),
    /** A cover shipped with the site, as a path under /assets/ (the seeded samples use these). */
    coverAsset: varchar("cover_asset", { length: 200 }),
    coverAlt: varchar("cover_alt", { length: 200 }),
    /** The SME the story is about; the story stays when the SME is deleted. */
    smeId: int("sme_id").references(() => smes.id, { onDelete: "set null" }),
    /** Author or source line, as written. */
    sourceLine: varchar("source_line", { length: 200 }),
    /** The date shown on the story, as YYYY-MM-DD with no time zone to shift it. */
    publishedAt: date("published_at", { mode: "string" }).notNull(),
    /** Illustrative content: the public page marks it "Sample story". */
    isSample: boolean("is_sample").notNull().default(false),
    published: boolean("published").notNull().default(true),
    sortOrder: int("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (t) => [index("success_stories_order_idx").on(t.published, t.sortOrder), index("success_stories_sme_idx").on(t.smeId)],
);

export type SmeRow = typeof smes.$inferSelect;
export type FormOptionRow = typeof formOptions.$inferSelect;
export type InvestorRequestRow = typeof investorRequests.$inferSelect;
export type SuccessStoryRow = typeof successStories.$inferSelect;
