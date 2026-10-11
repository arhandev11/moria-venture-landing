/**
 * The KNEKS page's starting content: the eight sample SMEs and the access
 * form's choices, as the page shipped them before they moved to the database.
 * The seed script writes these once; the page falls back to them only when a
 * build runs without a reachable database.
 *
 * Plain data with no imports, so the seed script can load it outside Next.
 */

export type SeedSme = {
  name: string;
  sector: string;
  city: string;
  stage: string;
  brief: string;
  askK: number;
  metrics: string;
  status: "program" | "funded";
  /** Program only. The deck sets the first four; the rest are the prototype's interest over ask. */
  interestPct: number | null;
  raisedK: number | null;
  investor: string | null;
  quote: string | null;
};

export const SEED_SMES: SeedSme[] = [
  {
    name: "Nusa Halal Foods",
    sector: "Food",
    city: "Surabaya",
    stage: "Seed",
    status: "program",
    interestPct: 60,
    brief: "Frozen halal ready meals for retail and export. Certified facility, 40 outlets.",
    askK: 300,
    metrics: "40 outlets, 3 export trials",
    raisedK: null,
    investor: null,
    quote: null,
  },
  {
    name: "Batik Kita",
    sector: "Fashion",
    city: "Solo",
    stage: "Pre-seed",
    status: "program",
    interestPct: 35,
    brief: "Artisan batik label selling online across Southeast Asia, with 120 craft partners.",
    askK: 150,
    metrics: "120 artisans, 6 markets",
    raisedK: null,
    investor: null,
    quote: null,
  },
  {
    name: "Tani Syariah",
    sector: "Agritech",
    city: "Bandung",
    stage: "Seed",
    status: "program",
    interestPct: 75,
    brief: "Profit-sharing platform linking smallholder farmers to buyers and working capital.",
    askK: 500,
    metrics: "2,000 farmers onboarded",
    raisedK: null,
    investor: null,
    quote: null,
  },
  {
    name: "Wakaf Pay",
    sector: "Fintech",
    city: "Jakarta",
    stage: "Series A",
    status: "program",
    interestPct: 45,
    brief: "Digital payments and wallet for waqf collection and charity programs.",
    askK: 1200,
    metrics: "85 institutions live",
    raisedK: null,
    investor: null,
    quote: null,
  },
  {
    name: "Kopi Barakah",
    sector: "Food",
    city: "Aceh",
    stage: "Seed",
    status: "program",
    interestPct: 24, // USD 60K of 250K
    brief: "Specialty Gayo coffee roaster with fair-trade sourcing and GCC distribution interest.",
    askK: 250,
    metrics: "4 export buyers in talks",
    raisedK: null,
    investor: null,
    quote: null,
  },
  {
    name: "Aman Logistik",
    sector: "Logistics",
    city: "Semarang",
    stage: "Seed",
    status: "funded",
    interestPct: null,
    brief: "Cold-chain halal logistics for SMEs, with traceable handling from farm to shelf.",
    askK: 600,
    metrics: "3 hubs, 150 clients",
    raisedK: 600,
    investor: "MENA family office",
    quote: "The program helped us prepare for conversations beyond our home market.",
  },
  {
    name: "Madina Learn",
    sector: "Edtech",
    city: "Yogyakarta",
    stage: "Pre-seed",
    status: "program",
    interestPct: 45, // USD 90K of 200K
    brief: "Mobile learning app for Quran and Arabic literacy with school subscriptions.",
    askK: 200,
    metrics: "30 school contracts",
    raisedK: null,
    investor: null,
    quote: null,
  },
  {
    name: "Sehat Herbal",
    sector: "Wellness",
    city: "Malang",
    stage: "Pre-seed",
    status: "funded",
    interestPct: null,
    brief: "Certified herbal supplements sold through pharmacies and online.",
    askK: 200,
    metrics: "500 pharmacy points",
    raisedK: 200,
    investor: "Southeast Asia VC",
    quote: "A clearer investment story opened the door to new partners.",
  },
];

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
