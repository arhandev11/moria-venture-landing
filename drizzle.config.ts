import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

// drizzle-kit does not read Next's env files, so the local one is loaded here.
// On a server, DATABASE_URL comes from the environment and neither file exists.
for (const file of [".env.local", ".env"]) {
  if (!process.env.DATABASE_URL && existsSync(file)) process.loadEnvFile(file);
}

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  strict: true,
  verbose: true,
});
