import {
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Tables for the admin area and the KNEKS partnership page. Kept free of
 * `server-only` so drizzle-kit and the seed script can import it as plain TS.
 */

export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  passwordHash: varchar("password_hash", { length: 100 }).notNull(),
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

/** The SMEs shown under "SMEs in the program" on /kneks. */
export const smes = mysqlTable(
  "smes",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 120 }).notNull().unique(),
    sector: varchar("sector", { length: 60 }).notNull(),
    city: varchar("city", { length: 80 }).notNull(),
    stage: varchar("stage", { length: 40 }).notNull(),
    status: mysqlEnum("status", ["program", "funded"]).notNull().default("program"),
    brief: text("brief").notNull(),
    /** The round being raised, in USD thousands. */
    askK: int("ask_k").notNull(),
    /** Program SMEs only: share of the ask investors have signalled, 0–100. */
    interestPct: int("interest_pct"),
    /** Traction, as the brief's one-line summary. */
    metrics: varchar("metrics", { length: 255 }).notNull(),
    /** Funded SMEs only: what the closed round raised, in USD thousands. */
    raisedK: int("raised_k"),
    investor: varchar("investor", { length: 120 }),
    quote: text("quote"),
    /** File name inside UPLOAD_DIR/smes, served by /media/smes/[file]. */
    imageFile: varchar("image_file", { length: 100 }),
    sortOrder: int("sort_order").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (t) => [index("smes_order_idx").on(t.published, t.sortOrder)],
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

export type SmeRow = typeof smes.$inferSelect;
export type FormOptionRow = typeof formOptions.$inferSelect;
export type InvestorRequestRow = typeof investorRequests.$inferSelect;
