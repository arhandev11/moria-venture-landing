import "server-only";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import { createPool } from "./pool";
import * as schema from "./schema";

type Db = MySql2Database<typeof schema>;

/**
 * One pool per server process. Dev reloads re-evaluate this module, so the
 * handle is parked on globalThis rather than opening a new pool on every edit.
 * mysql2 pools connect on first query, so creating one never blocks a build.
 */
const globalForDb = globalThis as unknown as { moriaDb?: Db };

export function getDb(): Db {
  if (globalForDb.moriaDb) return globalForDb.moriaDb;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  globalForDb.moriaDb = drizzle({ client: createPool(url), schema, mode: "default" });
  return globalForDb.moriaDb;
}

export { schema };
