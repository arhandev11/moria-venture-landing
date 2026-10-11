/**
 * Seeds the admin users and the access form's choices. Safe to re-run: users
 * are added only when their email is missing, and options only when their
 * kind is still empty, so it never overwrites what an admin has since edited.
 * SMEs are not seeded: the real ones come from the HSDD import
 * (npm run db:import:hsdd).
 *
 *   npm run db:seed
 *
 * SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD override the default first admin, a
 * superadmin. SEED_KNEKS_EMAIL / SEED_KNEKS_PASSWORD do the same for a KNEKS
 * user, who may only edit the SMEs (admin1@test.com by default, for local
 * testing); set SEED_KNEKS_EMAIL to an empty string to skip that user, e.g.
 * on a server where the real KNEKS accounts are added from the admin.
 */
import bcrypt from "bcryptjs";
import { count, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "../src/db/pool";
import * as schema from "../src/db/schema";
import type { AdminRole } from "../src/lib/auth/roles";
import { SEED_REGIONS, SEED_TICKETS } from "../src/lib/kneks-seed";

const { adminUsers, formOptions } = schema;

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (add it to .env.local)");
  const pool = createPool(url);
  const db = drizzle({ client: pool, schema, mode: "default" });

  /** Adds the user only when the email is missing; an existing user, role included, is left as it is. */
  async function ensureUser(rawEmail: string, password: string, name: string, role: AdminRole) {
    const email = rawEmail.trim().toLowerCase();
    const [existing] = await db.select({ role: adminUsers.role }).from(adminUsers).where(eq(adminUsers.email, email));
    if (existing) {
      console.log(`admin ${email} already exists (${existing.role}), left alone`);
      return;
    }
    // The role is always named: the column's default exists only for the migration.
    await db.insert(adminUsers).values({ email, name, role, passwordHash: await bcrypt.hash(password, 12) });
    console.log(`admin ${email} created as ${role}`);
  }

  try {
    await ensureUser(process.env.SEED_ADMIN_EMAIL ?? "admin@test.com", process.env.SEED_ADMIN_PASSWORD ?? "12341234", "Admin", "superadmin");
    const kneksEmail = process.env.SEED_KNEKS_EMAIL ?? "admin1@test.com";
    if (kneksEmail.trim()) {
      await ensureUser(kneksEmail, process.env.SEED_KNEKS_PASSWORD ?? "12341234", "KNEKS", "kneks");
    } else {
      console.log("kneks user: SEED_KNEKS_EMAIL is empty, skipped");
    }

    for (const [kind, labels] of [
      ["region", SEED_REGIONS],
      ["ticket", SEED_TICKETS],
    ] as const) {
      const [{ n }] = await db.select({ n: count() }).from(formOptions).where(eq(formOptions.kind, kind));
      if (n > 0) {
        console.log(`${kind} options: ${n} rows present, left alone`);
        continue;
      }
      await db.insert(formOptions).values(
        labels.map((label, i) => ({ kind, label, sortOrder: (i + 1) * 10, active: true })),
      );
      console.log(`${kind} options: ${labels.length} seeded`);
    }
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
