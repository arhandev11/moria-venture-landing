/**
 * The pure half of the HSDD import: reading and checking the data file, and
 * working out what an import would change. No database access here, so the
 * tests can drive it with plain objects.
 */
import { MAX_AMOUNT, isSmeCurrency, type SmeCurrency } from "../src/lib/money";
import {
  CURATION_STATUSES,
  LEGAL_FORMS,
  SME_TEXT_LIMITS,
  isHttpUrl,
  type CurationStatus,
  type LegalForm,
} from "../src/lib/sme-fields";

/** One SME as the data file carries it. Keys match the Drizzle field names. */
export type ImportEntry = {
  sourceRef: number;
  name: string;
  sector: string;
  productCategory: string | null;
  city: string | null;
  province: string | null;
  curationStatus: CurationStatus | null;
  readiness: string | null;
  legalForm: LegalForm | null;
  supportingOrg: string | null;
  valuationTerms: string | null;
  brief: string;
  useOfFunds: string | null;
  askAmount: number | null;
  askCurrency: SmeCurrency | null;
  askCurrencyInferred: boolean;
  ceoName: string | null;
  address: string | null;
  potentialInvestors: string | null;
  curationNotes: string | null;
  pitchDeckUrl: string | null;
  dataQualityNotes: string | null;
  /** Applied when the row is created, or again with --reset-display. */
  published: boolean;
  sortOrder: number;
};

export type ImportFile = { source: string; smes: ImportEntry[] };

/** Fields the data file owns: compared on every run, written on create or with --update. */
export const IMPORT_FIELDS = [
  "name",
  "sector",
  "productCategory",
  "city",
  "province",
  "curationStatus",
  "readiness",
  "legalForm",
  "supportingOrg",
  "valuationTerms",
  "brief",
  "useOfFunds",
  "askAmount",
  "askCurrency",
  "askCurrencyInferred",
  "ceoName",
  "address",
  "potentialInvestors",
  "curationNotes",
  "pitchDeckUrl",
  "dataQualityNotes",
] as const satisfies readonly (keyof ImportEntry)[];
export type ImportField = (typeof IMPORT_FIELDS)[number];

/** Fields an admin arranges; written on create, afterwards only with --reset-display. */
export const DISPLAY_FIELDS = ["published", "sortOrder"] as const satisfies readonly (keyof ImportEntry)[];
export type DisplayField = (typeof DISPLAY_FIELDS)[number];

/** The eight sample SMEs the page shipped with; --remove-placeholders deletes them. */
export const PLACEHOLDER_NAMES = [
  "Nusa Halal Foods",
  "Batik Kita",
  "Tani Syariah",
  "Wakaf Pay",
  "Kopi Barakah",
  "Aman Logistik",
  "Madina Learn",
  "Sehat Herbal",
] as const;

const NULLABLE_TEXT = [
  "productCategory",
  "city",
  "province",
  "readiness",
  "supportingOrg",
  "valuationTerms",
  "useOfFunds",
  "ceoName",
  "address",
  "potentialInvestors",
  "curationNotes",
  "pitchDeckUrl",
  "dataQualityNotes",
] as const;

/** Checks the parsed JSON file; returns the entries, or every problem found. */
export function validateFile(data: unknown): { ok: true; file: ImportFile } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const root = data as { source?: unknown; smes?: unknown };
  if (!root || typeof root !== "object") return { ok: false, errors: ["The file is not a JSON object."] };
  if (typeof root.source !== "string" || !/^[a-z0-9-]{1,40}$/.test(root.source)) {
    errors.push('"source" must be a short slug such as "hsdd-2026".');
  }
  if (!Array.isArray(root.smes) || root.smes.length === 0) {
    return { ok: false, errors: [...errors, '"smes" must be a non-empty array.'] };
  }

  const refs = new Set<number>();
  const names = new Set<string>();
  root.smes.forEach((raw: Record<string, unknown>, i: number) => {
    const at = `smes[${i}]${typeof raw?.name === "string" ? ` (${raw.name})` : ""}`;
    const bad = (msg: string) => errors.push(`${at}: ${msg}`);
    if (!raw || typeof raw !== "object") return bad("not an object");

    if (!Number.isSafeInteger(raw.sourceRef) || (raw.sourceRef as number) < 1) bad("sourceRef must be a positive whole number");
    else if (refs.has(raw.sourceRef as number)) bad(`sourceRef ${raw.sourceRef} appears twice`);
    else refs.add(raw.sourceRef as number);

    for (const key of ["name", "sector", "brief"] as const) {
      const v = raw[key];
      if (typeof v !== "string" || !v.trim()) bad(`${key} is required`);
      else if (v.length > SME_TEXT_LIMITS[key]) bad(`${key} is longer than ${SME_TEXT_LIMITS[key]} characters`);
    }
    if (typeof raw.name === "string") {
      const key = raw.name.trim().toLowerCase();
      if (names.has(key)) bad("name appears twice");
      names.add(key);
    }
    for (const key of NULLABLE_TEXT) {
      const v = raw[key];
      if (v === null) continue;
      if (typeof v !== "string" || !v.trim()) bad(`${key} must be a non-empty string or null`);
      else if (v.length > SME_TEXT_LIMITS[key]) bad(`${key} is longer than ${SME_TEXT_LIMITS[key]} characters`);
    }
    if (typeof raw.pitchDeckUrl === "string" && !isHttpUrl(raw.pitchDeckUrl)) bad("pitchDeckUrl must be an http(s) link");

    if (raw.curationStatus !== null && !(CURATION_STATUSES as readonly unknown[]).includes(raw.curationStatus)) {
      bad(`curationStatus must be one of ${CURATION_STATUSES.join(", ")} or null`);
    }
    if (raw.legalForm !== null && !(LEGAL_FORMS as readonly unknown[]).includes(raw.legalForm)) {
      bad(`legalForm must be one of ${LEGAL_FORMS.join(", ")} or null`);
    }

    if (raw.askAmount === null) {
      if (raw.askCurrency !== null) bad("askCurrency must be null when askAmount is null");
      if (raw.askCurrencyInferred !== false) bad("askCurrencyInferred must be false when askAmount is null");
    } else {
      if (!Number.isSafeInteger(raw.askAmount) || (raw.askAmount as number) < 1 || (raw.askAmount as number) > MAX_AMOUNT) {
        bad("askAmount must be a whole number from 1 up, or null");
      }
      if (!isSmeCurrency(raw.askCurrency)) bad("askCurrency must be a supported ISO code when askAmount is set");
    }
    if (typeof raw.askCurrencyInferred !== "boolean") bad("askCurrencyInferred must be true or false");
    if (typeof raw.published !== "boolean") bad("published must be true or false");
    if (!Number.isSafeInteger(raw.sortOrder)) bad("sortOrder must be a whole number");
  });

  return errors.length ? { ok: false, errors } : { ok: true, file: root as ImportFile };
}

/** The columns the planner reads from the database. */
export type ExistingRow = { id: number; source: string | null; sourceRef: number | null } & Pick<
  ImportEntry,
  ImportField | DisplayField
>;

export type FieldChange = { field: ImportField | DisplayField; from: unknown; to: unknown };

export type Plan = {
  create: ImportEntry[];
  /** Rows whose import fields differ from the file; written only with --update. */
  update: { id: number; entry: ImportEntry; changes: FieldChange[]; applied: boolean }[];
  /** Display fields that differ; written only with --reset-display. */
  display: { id: number; entry: ImportEntry; changes: FieldChange[]; applied: boolean }[];
  unchanged: ImportEntry[];
  /** Entries that cannot be written because another row already has the name. */
  conflicts: { entry: ImportEntry; otherId: number; reason: string }[];
  /** Rows of this source in the database that the file no longer lists. Reported, never deleted. */
  orphans: { id: number; name: string; sourceRef: number | null }[];
};

const same = (a: unknown, b: unknown) => (a ?? null) === (b ?? null);

/** Works out what importing `file` over `existing` would do. */
export function planImport(
  file: ImportFile,
  existing: ExistingRow[],
  opts: { update: boolean; resetDisplay: boolean },
): Plan {
  const plan: Plan = { create: [], update: [], display: [], unchanged: [], conflicts: [], orphans: [] };
  const byRef = new Map(
    existing.filter((r) => r.source === file.source && r.sourceRef !== null).map((r) => [r.sourceRef as number, r]),
  );
  const byName = new Map(existing.map((r) => [r.name.trim().toLowerCase(), r]));

  for (const entry of file.smes) {
    const row = byRef.get(entry.sourceRef);
    const holder = byName.get(entry.name.trim().toLowerCase());
    if (!row) {
      if (holder) {
        plan.conflicts.push({ entry, otherId: holder.id, reason: `SME #${holder.id} already has this name` });
      } else {
        plan.create.push(entry);
      }
      continue;
    }

    const changes = IMPORT_FIELDS.filter((f) => !same(row[f], entry[f])).map((f) => ({ field: f, from: row[f], to: entry[f] }));
    const display = DISPLAY_FIELDS.filter((f) => !same(row[f], entry[f])).map((f) => ({ field: f, from: row[f], to: entry[f] }));

    if (changes.some((c) => c.field === "name") && holder && holder.id !== row.id) {
      plan.conflicts.push({ entry, otherId: holder.id, reason: `renaming would clash with SME #${holder.id}` });
      continue;
    }
    if (changes.length) plan.update.push({ id: row.id, entry, changes, applied: opts.update });
    if (display.length) plan.display.push({ id: row.id, entry, changes: display, applied: opts.resetDisplay });
    if (!changes.length && !display.length) plan.unchanged.push(entry);
  }

  const listed = new Set(file.smes.map((e) => e.sourceRef));
  for (const row of existing) {
    if (row.source === file.source && (row.sourceRef === null || !listed.has(row.sourceRef))) {
      plan.orphans.push({ id: row.id, name: row.name, sourceRef: row.sourceRef });
    }
  }
  return plan;
}

const show = (v: unknown) => {
  if (v === null || v === undefined) return "null";
  const s = typeof v === "string" ? JSON.stringify(v) : String(v);
  return s.length > 70 ? `${s.slice(0, 67)}...` : s;
};

/** A readable account of the plan, one line per SME plus the field changes. */
export function describePlan(plan: Plan): string[] {
  const lines: string[] = [];
  for (const e of plan.create) {
    lines.push(`create  #${e.sourceRef} ${e.name}${e.published ? "" : " (unpublished)"}`);
  }
  for (const u of plan.update) {
    lines.push(`${u.applied ? "update " : "differs"} #${u.entry.sourceRef} ${u.entry.name} (SME #${u.id})${u.applied ? "" : " - not written without --update"}`);
    for (const c of u.changes) lines.push(`          ${c.field}: ${show(c.from)} -> ${show(c.to)}`);
  }
  for (const d of plan.display) {
    lines.push(`${d.applied ? "display" : "display differs"} #${d.entry.sourceRef} ${d.entry.name}${d.applied ? "" : " - kept as the admin set it (use --reset-display)"}`);
    for (const c of d.changes) lines.push(`          ${c.field}: ${show(c.from)} -> ${show(c.to)}`);
  }
  for (const c of plan.conflicts) lines.push(`CONFLICT #${c.entry.sourceRef} ${c.entry.name}: ${c.reason}`);
  for (const o of plan.orphans) lines.push(`orphan  SME #${o.id} ${o.name} (source row ${o.sourceRef ?? "?"}) is not in the file; left alone`);
  lines.push(
    `summary: ${plan.create.length} to create, ${plan.update.filter((u) => u.applied).length} to update, ` +
      `${plan.update.filter((u) => !u.applied).length} differing but kept, ${plan.display.filter((d) => d.applied).length} display resets, ` +
      `${plan.unchanged.length} unchanged, ${plan.conflicts.length} conflicts, ${plan.orphans.length} orphans`,
  );
  return lines;
}
