/**
 * Seeds the admin users, the KNEKS SMEs and the access form's choices.
 * Safe to re-run: users are added only when their email is missing, and SMEs
 * and options only when their table (or option kind) is still empty, so it
 * never overwrites what an admin has since edited.
 *
 *   npm run db:seed
 *
 * SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD override the default first admin.
 */
import bcrypt from "bcryptjs";
import { count, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "../src/db/pool";
import * as schema from "../src/db/schema";
import { SEED_REGIONS, SEED_SMES, SEED_TICKETS } from "../src/lib/kneks-seed";

const { adminUsers, formOptions, smes } = schema;

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (add it to .env.local)");
  const pool = createPool(url);
  const db = drizzle({ client: pool, schema, mode: "default" });

  try {
    const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@test.com").toLowerCase();
    const password = process.env.SEED_ADMIN_PASSWORD ?? "12341234";
    const [existing] = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, email));
    if (existing) {
      console.log(`admin ${email} already exists`);
    } else {
      await db.insert(adminUsers).values({
        email,
        name: "Admin",
        passwordHash: await bcrypt.hash(password, 12),
      });
      console.log(`admin ${email} created`);
    }

    const [{ n: smeCount }] = await db.select({ n: count() }).from(smes);
    if (smeCount > 0) {
      console.log(`smes: ${smeCount} rows present, left alone`);
    } else {
      await db.insert(smes).values(
        SEED_SMES.map((sme, i) => ({ ...sme, sortOrder: (i + 1) * 10, published: true })),
      );
      console.log(`smes: ${SEED_SMES.length} seeded`);
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
