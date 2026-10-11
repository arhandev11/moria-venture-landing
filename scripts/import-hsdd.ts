/**
 * Imports the HSDD 2026 curation results (data/hsdd-2026.json) into `smes`.
 *
 *   npm run db:import:hsdd                       dry run: prints what would change, writes nothing
 *   npm run db:import:hsdd -- --apply            creates the SMEs the database does not have yet
 *   npm run db:import:hsdd -- --apply --update   also rewrites imported fields that differ from the file
 *
 * Other flags:
 *   --reset-display        also puts published and sort order back to the file's values
 *   --remove-placeholders  deletes the eight sample SMEs the page shipped with (hand-added rows only)
 *   --file <path>          reads another data file with the same shape
 *
 * Rows are matched on (source, sourceRef), the source's own row number, so a
 * re-run never duplicates and a fuller file can add the missing rows later.
 * Without --update an existing row is never overwritten: whatever an admin has
 * since edited stays, and the dry run lists where it differs from the file.
 * Rows of this source that the file no longer lists are reported, not deleted.
 * Every write runs in one transaction; a name clash aborts the whole run.
 *
 * /kneks picks the changes up on its hourly revalidate, or at once when an
 * admin next saves any SME.
 */
import { readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { eq, inArray, isNull, like, or, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "../src/db/pool";
import * as schema from "../src/db/schema";
import {
  DISPLAY_FIELDS,
  IMPORT_FIELDS,
  PLACEHOLDER_NAMES,
  describePlan,
  planImport,
  validateFile,
  type ImportEntry,
} from "./hsdd-import-lib";

const { smes, investorRequests } = schema;

/** The only file names saveSmeImage ever writes; anything else is not ours to delete. */
const IMAGE_NAME = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/;

function parseArgs(argv: string[]) {
  const known = new Set(["--apply", "--dry-run", "--update", "--reset-display", "--remove-placeholders", "--file"]);
  const opts = { apply: false, update: false, resetDisplay: false, removePlaceholders: false, file: "data/hsdd-2026.json" };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!known.has(arg)) throw new Error(`Unknown option ${arg}`);
    if (arg === "--apply") opts.apply = true;
    if (arg === "--update") opts.update = true;
    if (arg === "--reset-display") opts.resetDisplay = true;
    if (arg === "--remove-placeholders") opts.removePlaceholders = true;
    if (arg === "--file") {
      const value = argv[++i];
      if (!value) throw new Error("--file needs a path");
      opts.file = value;
    }
  }
  if (argv.includes("--dry-run") && opts.apply) throw new Error("Pass either --dry-run or --apply, not both");
  return opts;
}

/** The entry as row values: everything the file owns, plus the display fields on create. */
function rowValues(entry: ImportEntry, fields: readonly (keyof ImportEntry)[]) {
  return Object.fromEntries(fields.map((f) => [f, entry[f]])) as Partial<ImportEntry>;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const parsed = validateFile(JSON.parse(await readFile(opts.file, "utf8")));
  if (!parsed.ok) {
    console.error(`${opts.file} has problems:\n  ${parsed.errors.join("\n  ")}`);
    process.exit(1);
  }
  const file = parsed.file;

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (add it to .env.local)");
  const pool = createPool(url);
  const db = drizzle({ client: pool, schema, mode: "default" });

  try {
    console.log(`${opts.apply ? "APPLY" : "DRY RUN"}: ${file.smes.length} SMEs from ${opts.file} (source "${file.source}")\n`);

    // Placeholders first, so their names are free before the plan checks for clashes.
    const placeholders = opts.removePlaceholders
      ? await db
          .select({ id: smes.id, name: smes.name, imageFile: smes.imageFile })
          .from(smes)
          .where(and(isNull(smes.source), inArray(smes.name, [...PLACEHOLDER_NAMES])))
      : [];
    if (opts.removePlaceholders) {
      for (const p of placeholders) console.log(`delete  sample SME #${p.id} ${p.name}${p.imageFile ? ` (image ${p.imageFile})` : ""}`);
      if (!placeholders.length) console.log("delete  no sample SMEs left");
      const mentions = await db
        .select({ id: investorRequests.id, shortlist: investorRequests.shortlist })
        .from(investorRequests)
        .where(or(...PLACEHOLDER_NAMES.map((n) => like(investorRequests.shortlist, `%${n}%`))));
      console.log(
        `note    ${mentions.length} investor request(s) name a sample SME in their shortlist` +
          `${mentions.length ? ` (ids ${mentions.map((m) => m.id).join(", ")})` : ""}; shortlists are text and stay as they are`,
      );
    }

    const removed = new Set(placeholders.map((p) => p.id));
    const existing = (
      await db
        .select({
          id: smes.id,
          source: smes.source,
          sourceRef: smes.sourceRef,
          ...Object.fromEntries([...IMPORT_FIELDS, ...DISPLAY_FIELDS].map((f) => [f, smes[f]])),
        })
        .from(smes)
    ).filter((r) => !removed.has(r.id)) as Parameters<typeof planImport>[1];

    const plan = planImport(file, existing, { update: opts.update, resetDisplay: opts.resetDisplay });
    console.log(describePlan(plan).join("\n"));

    if (plan.conflicts.length) {
      console.error("\nName clashes must be resolved (rename or delete the other SME) before importing. Nothing written.");
      process.exitCode = 2;
      return;
    }
    if (!opts.apply) {
      console.log("\nDry run: nothing written. Re-run with --apply to write.");
      return;
    }
    const writes =
      placeholders.length +
      plan.create.length +
      plan.update.filter((u) => u.applied).length +
      plan.display.filter((d) => d.applied).length;
    if (!writes) {
      console.log("\nNothing to write.");
      return;
    }

    await db.transaction(async (tx) => {
      if (placeholders.length) await tx.delete(smes).where(inArray(smes.id, [...removed]));
      for (const entry of plan.create) {
        await tx.insert(smes).values({
          ...rowValues(entry, [...IMPORT_FIELDS, ...DISPLAY_FIELDS]),
          name: entry.name,
          sector: entry.sector,
          brief: entry.brief,
          status: "program",
          source: file.source,
          sourceRef: entry.sourceRef,
        });
      }
      for (const u of plan.update.filter((x) => x.applied)) {
        await tx.update(smes).set(rowValues(u.entry, u.changes.map((c) => c.field))).where(eq(smes.id, u.id));
      }
      for (const d of plan.display.filter((x) => x.applied)) {
        await tx.update(smes).set(rowValues(d.entry, d.changes.map((c) => c.field))).where(eq(smes.id, d.id));
      }
    });
    console.log("\nWritten.");

    // Image files go only after the rows that pointed at them are gone.
    const dir = path.resolve(process.cwd(), process.env.UPLOAD_DIR || "storage/uploads", "smes");
    for (const p of placeholders) {
      if (!p.imageFile || !IMAGE_NAME.test(p.imageFile)) continue;
      await unlink(path.join(dir, p.imageFile)).then(
        () => console.log(`removed image ${p.imageFile}`),
        (err: NodeJS.ErrnoException) => err.code !== "ENOENT" && console.warn(`could not remove ${p.imageFile}: ${err.message}`),
      );
    }
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
