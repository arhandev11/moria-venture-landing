import "server-only";

/** Small readers for FormData in admin actions; everything arrives as untrusted text. */

export function text(fd: FormData, key: string) {
  const value = fd.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** A whole number, or null when blank or not a number. */
export function whole(fd: FormData, key: string) {
  const raw = text(fd, key).replace(/[,_\s]/g, "");
  if (!/^-?\d+$/.test(raw)) return null;
  const n = Number(raw);
  return Number.isSafeInteger(n) ? n : null;
}

/** A positive row id, or null. */
export function id(fd: FormData, key = "id") {
  const n = whole(fd, key);
  return n !== null && n > 0 ? n : null;
}

export function checked(fd: FormData, key: string) {
  return fd.get(key) === "on" || fd.get(key) === "true";
}

/** A unique-key clash. Drizzle wraps the mysql2 error, so the cause chain is walked. */
export function isDuplicate(err: unknown): boolean {
  for (let e = err, depth = 0; e && typeof e === "object" && depth < 5; e = (e as { cause?: unknown }).cause, depth++) {
    if ((e as { code?: string }).code === "ER_DUP_ENTRY") return true;
  }
  return false;
}

/** Swaps an item with its neighbour and renumbers the list in steps of ten. */
export function reorder<T extends { id: number }>(rows: T[], targetId: number, direction: "up" | "down") {
  const list = [...rows];
  const i = list.findIndex((row) => row.id === targetId);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= list.length) return null;
  [list[i], list[j]] = [list[j], list[i]];
  return list.map((row, index) => ({ id: row.id, sortOrder: (index + 1) * 10 }));
}
