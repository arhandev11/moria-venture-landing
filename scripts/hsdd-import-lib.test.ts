import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { planImport, validateFile, type ExistingRow, type ImportFile } from "./hsdd-import-lib";

const raw = JSON.parse(readFileSync(new URL("../data/hsdd-2026.json", import.meta.url), "utf8"));

function file(): ImportFile {
  const result = validateFile(structuredClone(raw));
  assert.ok(result.ok, result.ok ? "" : result.errors.join("\n"));
  return result.file;
}

const asRow = (id: number, source: string, e: ImportFile["smes"][number]): ExistingRow => ({ ...e, id, source });

test("the committed data file is valid and matches the curation decisions", () => {
  const f = file();
  assert.equal(f.source, "hsdd-2026");
  assert.equal(f.smes.length, 30);
  assert.equal(f.smes.filter((s) => s.published).length, 24);
  assert.ok(f.smes.every((s) => s.published === (s.curationStatus === "approved")));
  for (const ref of [9, 14]) assert.equal(f.smes.find((s) => s.sourceRef === ref)?.curationStatus, "reserve");
  for (const ref of [27, 29, 30]) assert.equal(f.smes.find((s) => s.sourceRef === ref)?.valuationTerms, null);
  for (const ref of [28, 29]) assert.equal(f.smes.find((s) => s.sourceRef === ref)?.address, null);
  assert.ok(f.smes.every((s) => !s.brief.includes("slide notes")));
});

test("validateFile rejects a currency without an amount and a bad link", () => {
  const broken = structuredClone(raw);
  broken.smes[0].askAmount = null;
  broken.smes[1].pitchDeckUrl = "javascript:alert(1)";
  broken.smes[2].askCurrency = "XYZ";
  const result = validateFile(broken);
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.errors.length, 4); // currency set + inferred set without amount, link, code
});

test("an empty database gets every entry created", () => {
  const plan = planImport(file(), [], { update: false, resetDisplay: false });
  assert.equal(plan.create.length, 30);
  assert.equal(plan.conflicts.length + plan.update.length + plan.orphans.length, 0);
});

test("a re-run creates only the new rows and leaves admin edits alone without --update", () => {
  const f = file();
  const existing = f.smes.slice(0, 29).map((e, i) => asRow(i + 1, f.source, e));
  existing[0] = { ...existing[0], askCurrency: "IDR", published: false }; // edited in the admin
  const plan = planImport(f, existing, { update: false, resetDisplay: false });
  assert.deepEqual(plan.create.map((e) => e.sourceRef), [f.smes[29].sourceRef]);
  assert.equal(plan.update.length, 1);
  assert.equal(plan.update[0].applied, false);
  assert.deepEqual(plan.update[0].changes.map((c) => c.field), ["askCurrency"]);
  assert.equal(plan.display[0].applied, false);
  assert.equal(plan.unchanged.length, 28);

  const forced = planImport(f, existing, { update: true, resetDisplay: true });
  assert.equal(forced.update[0].applied, true);
  assert.equal(forced.display[0].applied, true);
});

test("a hand-added SME with the same name is a conflict, and dropped rows are orphans", () => {
  const f = file();
  const handMade: ExistingRow = { ...asRow(99, "", f.smes[0]), source: null, sourceRef: null };
  const gone: ExistingRow = { ...asRow(100, f.source, f.smes[1]), sourceRef: 77, name: "Old Row" };
  const plan = planImport(f, [handMade, gone], { update: false, resetDisplay: false });
  assert.equal(plan.conflicts.length, 1);
  assert.equal(plan.conflicts[0].otherId, 99);
  assert.deepEqual(plan.orphans.map((o) => o.id), [100]);
});
