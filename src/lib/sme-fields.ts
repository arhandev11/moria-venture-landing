/**
 * The fixed vocabularies and length limits of an SME record, shared by the
 * schema, the admin form and its action, the public page and the HSDD import.
 * Plain data with no imports, so client components, drizzle-kit and scripts
 * can all load it.
 */

/** Where an SME stands after a curation round. Null for SMEs added by hand. */
export const CURATION_STATUSES = ["approved", "reserve"] as const;
export type CurationStatus = (typeof CURATION_STATUSES)[number];

export const CURATION_STATUS_LABELS: Record<CurationStatus, string> = {
  approved: "Approved",
  reserve: "Reserve",
};

/** Legal form as curation sources state it. */
export const LEGAL_FORMS = ["pt", "cv", "none"] as const;
export type LegalForm = (typeof LEGAL_FORMS)[number];

/** English labels; the public page may translate by code instead. */
export const LEGAL_FORM_LABELS: Record<LegalForm, string> = {
  pt: "Limited liability company (PT)",
  cv: "CV / partnership firm",
  none: "No legal entity yet",
};

/**
 * Canonical sectors, each a filter chip on /kneks. The admin combobox offers
 * these plus any sector already in use; a new one can still be typed.
 */
export const SME_SECTORS = [
  "Advanced Materials",
  "Agritech",
  "AI",
  "Consumer Electronics",
  "Edtech",
  "Energy",
  "Fashion & Textile",
  "Fintech",
  "Food & Beverage",
  "Halal Tech",
  "Healthtech",
  "Lifestyle",
  "Mobility",
  "SaaS",
  "Social Impact",
] as const;

/** What an SME says it is ready for, in the curation summary's own words. */
export const READINESS_OPTIONS = [
  "Investment",
  "Investment / financing",
  "Project financing",
  "Market access",
  "Buyer partnership",
  "Business partner ecosystem",
  "Promotion",
] as const;

/** Character limits per text field, matching the column sizes (text columns get a sane cap). */
export const SME_TEXT_LIMITS = {
  name: 120,
  sector: 60,
  city: 80,
  province: 80,
  stage: 40,
  readiness: 60,
  brief: 4000,
  metrics: 255,
  investor: 120,
  quote: 500,
  supportingOrg: 160,
  valuationTerms: 255,
  useOfFunds: 2000,
  productCategory: 160,
  ceoName: 200,
  address: 1000,
  potentialInvestors: 2000,
  curationNotes: 4000,
  pitchDeckUrl: 500,
  dataQualityNotes: 4000,
} as const;
export type SmeTextField = keyof typeof SME_TEXT_LIMITS;

/** An http(s) link, as the pitch-deck field must be. */
export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
