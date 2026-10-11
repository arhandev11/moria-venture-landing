/**
 * The access form's starting choices, as the page shipped them before they
 * moved to the database. The seed script writes these once; the page falls
 * back to them only when a build runs without a reachable database.
 *
 * SMEs have no seed: the real ones come from the HSDD import
 * (npm run db:import:hsdd), and a build without a database shows none.
 *
 * Plain data with no imports, so the seed script can load it outside Next.
 */

export const SEED_REGIONS = [
  "Saudi Arabia & wider GCC",
  "United Arab Emirates",
  "Malaysia",
  "Singapore",
  "Indonesia",
  "Elsewhere",
];

export const SEED_TICKETS = [
  "Under USD 100K",
  "USD 100K – 500K",
  "USD 500K – 1M",
  "Above USD 1M",
];
