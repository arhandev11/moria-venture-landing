import "server-only";
import bcrypt from "bcryptjs";

const COST = 12;

export const PASSWORD_MIN = 8;
/** bcrypt reads only the first 72 bytes; longer input would be silently cut. */
export const PASSWORD_MAX = 72;

export function hashPassword(password: string) {
  return bcrypt.hash(password, COST);
}

/**
 * A hash of nothing in particular, compared against when the email is
 * unknown so a miss takes as long as a wrong password.
 */
const DUMMY_HASH = "$2b$12$8yiEtSBLj74WjxNmYxjkTeFp7ZX4n7iT8bBxw05vpnML8.lPrfHse";

export async function verifyPassword(password: string, hash: string | null) {
  const ok = await bcrypt.compare(password, hash ?? DUMMY_HASH);
  return hash !== null && ok;
}

export function passwordProblem(password: string): string | null {
  if (password.length < PASSWORD_MIN) return `Use at least ${PASSWORD_MIN} characters.`;
  if (new TextEncoder().encode(password).length > PASSWORD_MAX) return `Use at most ${PASSWORD_MAX} bytes.`;
  return null;
}
