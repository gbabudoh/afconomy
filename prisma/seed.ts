// Development seed data. Prices are a simulated random walk and indicator
// values are illustrative — none of this is real market or official data.
import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { Meilisearch } from "meilisearch";
import {
  PrismaClient,
  type AssetClass,
  type RegionBloc,
} from "../generated/prisma/client";

config({ path: [".env.local", ".env"], quiet: true });

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

// Deterministic PRNG so every seed produces the same series
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260928);

const HOUR = 60 * 60 * 1000;

const ASSETS: {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  exchange: string | null;
  currency: string;
  country: string | null;
  region: RegionBloc;
  price: number; // approximate level the walk ends near
  vol: number; // per-step volatility
  volume: number; // typical per-step volume (0 for FX)
}[] = [
  { symbol: "USD/NGN", name: "US Dollar / Nigerian Naira", assetClass: "FX", exchange: "CBN NFEM", currency: "NGN", country: "NG", region: "ECOWAS", price: 1452.5, vol: 0.0012, volume: 0 },
  { symbol: "USD/GHS", name: "US Dollar / Ghanaian Cedi", assetClass: "FX", exchange: "BoG Interbank", currency: "GHS", country: "GH", region: "ECOWAS", price: 14.25, vol: 0.001, volume: 0 },
  { symbol: "USD/ZAR", name: "US Dollar / South African Rand", assetClass: "FX", exchange: "SARB Interbank", currency: "ZAR", country: "ZA", region: "SADC", price: 17.38, vol: 0.0015, volume: 0 },
  { symbol: "USD/KES", name: "US Dollar / Kenyan Shilling", assetClass: "FX", exchange: "CBK Interbank", currency: "KES", country: "KE", region: "EAC", price: 129.4, vol: 0.0006, volume: 0 },
  { symbol: "USD/EGP", name: "US Dollar / Egyptian Pound", assetClass: "FX", exchange: "CBE Interbank", currency: "EGP", country: "EG", region: "MAGHREB", price: 48.6, vol: 0.0008, volume: 0 },
  { symbol: "NGX:DANGCEM", name: "Dangote Cement PLC", assetClass: "STOCK", exchange: "Nigerian Exchange Group", currency: "NGN", country: "NG", region: "ECOWAS", price: 652, vol: 0.003, volume: 12500 },
  { symbol: "NGX:MTNN", name: "MTN Nigeria Communications PLC", assetClass: "STOCK", exchange: "Nigerian Exchange Group", currency: "NGN", country: "NG", region: "ECOWAS", price: 285, vol: 0.004, volume: 18000 },
  { symbol: "JSE:SOL", name: "Sasol Limited", assetClass: "STOCK", exchange: "Johannesburg Stock Exchange", currency: "ZAR", country: "ZA", region: "SADC", price: 138.45, vol: 0.005, volume: 42000 },
  { symbol: "JSE:NPN", name: "Naspers Limited", assetClass: "STOCK", exchange: "Johannesburg Stock Exchange", currency: "ZAR", country: "ZA", region: "SADC", price: 4120, vol: 0.004, volume: 9000 },
  { symbol: "EGX:COMI", name: "Commercial International Bank", assetClass: "STOCK", exchange: "Egyptian Exchange", currency: "EGP", country: "EG", region: "MAGHREB", price: 82.25, vol: 0.004, volume: 30000 },
  { symbol: "NSE:EQTY", name: "Equity Group Holdings", assetClass: "STOCK", exchange: "Nairobi Securities Exchange", currency: "KES", country: "KE", region: "EAC", price: 41.2, vol: 0.004, volume: 25000 },
  { symbol: "NSE:SCOM", name: "Safaricom PLC", assetClass: "STOCK", exchange: "Nairobi Securities Exchange", currency: "KES", country: "KE", region: "EAC", price: 17.6, vol: 0.004, volume: 90000 },
  { symbol: "NGX:ASI", name: "NGX All-Share Index", assetClass: "INDEX", exchange: "Nigerian Exchange Group", currency: "NGN", country: "NG", region: "ECOWAS", price: 98450, vol: 0.0015, volume: 0 },
  { symbol: "JSE:J203", name: "FTSE/JSE All Share Index", assetClass: "INDEX", exchange: "Johannesburg Stock Exchange", currency: "ZAR", country: "ZA", region: "SADC", price: 86200, vol: 0.0015, volume: 0 },
  { symbol: "BRENT", name: "Brent Crude Oil", assetClass: "COMMODITY", exchange: "ICE", currency: "USD", country: null, region: "PAN_AFRICAN", price: 74.2, vol: 0.003, volume: 0 },
  { symbol: "COCOA", name: "Cocoa Futures", assetClass: "COMMODITY", exchange: "ICE", currency: "USD", country: null, region: "ECOWAS", price: 7850, vol: 0.006, volume: 0 },
];

const STEP_MINUTES = 15;
const DAYS_OF_HISTORY = 14;

function simulatePrices(asset: (typeof ASSETS)[number]) {
  const steps = (DAYS_OF_HISTORY * 24 * 60) / STEP_MINUTES;
  const end = Math.floor(Date.now() / (STEP_MINUTES * 60_000)) * STEP_MINUTES * 60_000;

  // Walk backwards from the target price so the latest tick lands near it
  const closes: number[] = [asset.price];
  for (let i = 1; i < steps; i++) {
    const shock = (rand() - 0.5) * 2 * asset.vol;
    closes.push(closes[i - 1] / (1 + shock));
  }
  closes.reverse();

  return closes.map((close, i) => {
    const open = i === 0 ? close : closes[i - 1];
    const wick = close * asset.vol * rand();
    return {
      time: new Date(end - (steps - 1 - i) * STEP_MINUTES * 60_000),
      symbol: asset.symbol,
      open: open.toFixed(4),
      high: (Math.max(open, close) + wick).toFixed(4),
      low: (Math.min(open, close) - wick).toFixed(4),
      close: close.toFixed(4),
      volume: asset.volume ? Math.round(asset.volume * (0.5 + rand())).toFixed(2) : null,
    };
  });
}

const AUTHORS = [
  { key: "amina", name: "Amina Diallo", slug: "amina-diallo", role: "Lead Macroeconomic Strategist", bio: "Former principal policy consultant covering ECOWAS monetary integration." },
  { key: "kwame", name: "Kwame Mensah", slug: "kwame-mensah", role: "West Africa Markets Correspondent", bio: "Covers the NGX and GSE, FX liquidity and sovereign debt." },
  { key: "thandiwe", name: "Thandiwe Nkosi", slug: "thandiwe-nkosi", role: "SADC Energy & Mining Editor", bio: "Reports on JSE resources, power-sector reform and critical minerals." },
  { key: "wanjiru", name: "Wanjiru Kamau", slug: "wanjiru-kamau", role: "East Africa Policy Analyst", bio: "Tracks EAC fiscal policy, mobile money and regional trade corridors." },
] as const;

type AuthorKey = (typeof AUTHORS)[number]["key"];

const ARTICLES: {
  author: AuthorKey;
  title: string;
  excerpt: string;
  category: "POLICY" | "SOCIO_ECONOMIC" | "MARKETS" | "POLITICS" | "TRADE";
  region: RegionBloc;
  country?: string;
  tags: string[];
  symbols: string[];
  isPremium?: boolean;
  hoursAgo: number;
}[] = [
  {
    author: "amina",
    title: "AfCFTA Trade Volumes Surge Across the ECOWAS Bloc",
    excerpt: "Cross-border flows accelerate as tariff schedules phase in and payment rails mature.",
    category: "TRADE",
    region: "ECOWAS",
    tags: ["AfCFTA", "Trade", "PAPSS"],
    symbols: ["USD/NGN", "USD/GHS"],
    hoursAgo: 2,
  },
  {
    author: "kwame",
    title: "Naira Holds Steady as CBN Deepens FX Market Liquidity",
    excerpt: "Interbank spreads narrow after a fresh round of dollar sales to authorised dealers.",
    category: "MARKETS",
    region: "ECOWAS",
    country: "NG",
    tags: ["Naira", "CBN", "FX"],
    symbols: ["USD/NGN", "NGX:ASI"],
    hoursAgo: 5,
  },
  {
    author: "kwame",
    title: "Dangote Cement Rallies on Export Expansion Plans",
    excerpt: "Management outlines new West African export terminals as domestic demand recovers.",
    category: "MARKETS",
    region: "ECOWAS",
    country: "NG",
    tags: ["Equities", "Cement", "Exports"],
    symbols: ["NGX:DANGCEM"],
    hoursAgo: 9,
  },
  {
    author: "thandiwe",
    title: "Sasol Slides as Brent Weakness Weighs on SADC Energy Names",
    excerpt: "Lower crude realisations and rand strength compress refining margins.",
    category: "MARKETS",
    region: "SADC",
    country: "ZA",
    tags: ["Energy", "Oil", "JSE"],
    symbols: ["JSE:SOL", "BRENT", "USD/ZAR"],
    hoursAgo: 14,
  },
  {
    author: "thandiwe",
    title: "Eskom Unbundling: What Grid Reform Means for SADC Industry",
    excerpt: "A transmission company carve-out opens the door to private generation at scale.",
    category: "POLICY",
    region: "SADC",
    country: "ZA",
    tags: ["Power", "Reform", "Infrastructure"],
    symbols: ["USD/ZAR", "JSE:J203"],
    isPremium: true,
    hoursAgo: 26,
  },
  {
    author: "wanjiru",
    title: "Kenya's Finance Bill Debate Puts Mobile Money Taxes in Focus",
    excerpt: "Proposed excise changes test the balance between revenue targets and financial inclusion.",
    category: "POLITICS",
    region: "EAC",
    country: "KE",
    tags: ["Fiscal Policy", "Mobile Money", "Tax"],
    symbols: ["NSE:SCOM", "USD/KES"],
    hoursAgo: 31,
  },
  {
    author: "wanjiru",
    title: "Youth Employment and the Digital Economy in East Africa",
    excerpt: "Gig platforms absorb graduates faster than formal sectors, but social protection lags.",
    category: "SOCIO_ECONOMIC",
    region: "EAC",
    tags: ["Employment", "Digital Economy"],
    symbols: ["NSE:EQTY"],
    hoursAgo: 48,
  },
  {
    author: "amina",
    title: "Cocoa Windfall Tests Ghana's Fiscal Discipline",
    excerpt: "Record prices boost export receipts; the question is whether they reach the budget.",
    category: "POLICY",
    region: "ECOWAS",
    country: "GH",
    tags: ["Cocoa", "Commodities", "IMF"],
    symbols: ["COCOA", "USD/GHS"],
    isPremium: true,
    hoursAgo: 72,
  },
  {
    author: "amina",
    title: "Egypt's Pound Float, One Year On",
    excerpt: "Inflation is easing and portfolio inflows are back, but the reform bill is still coming due.",
    category: "POLICY",
    region: "MAGHREB",
    country: "EG",
    tags: ["EGP", "Inflation", "IMF"],
    symbols: ["USD/EGP", "EGX:COMI"],
    hoursAgo: 96,
  },
];

function body(title: string, excerpt: string) {
  return [
    `${excerpt}`,
    `This is sample analysis generated for local development of the Afconomy terminal. It stands in for a full ${title.toLowerCase()} brief and exists to exercise layout, search and the article-to-ticker linkage.`,
    `Analysts will replace this copy with reporting sourced from central bank releases, exchange filings and on-the-ground interviews.`,
  ].join("\n\n");
}

// Illustrative monthly values, not official statistics
const INDICATORS = [
  { code: "NG.CPI.YOY", name: "Nigeria Headline Inflation (YoY)", country: "NG", region: "ECOWAS", unit: "%", source: "NBS", start: 24.5, drift: -0.35 },
  { code: "NG.MPR", name: "Nigeria Monetary Policy Rate", country: "NG", region: "ECOWAS", unit: "%", source: "CBN", start: 27.5, drift: 0 },
  { code: "GH.CPI.YOY", name: "Ghana Consumer Price Inflation (YoY)", country: "GH", region: "ECOWAS", unit: "%", source: "GSS", start: 21.0, drift: -0.6 },
  { code: "ZA.REPO", name: "South Africa Repo Rate", country: "ZA", region: "SADC", unit: "%", source: "SARB", start: 7.75, drift: -0.04 },
  { code: "KE.CPI.YOY", name: "Kenya Consumer Price Inflation (YoY)", country: "KE", region: "EAC", unit: "%", source: "KNBS", start: 4.4, drift: -0.02 },
] as const;

async function main() {
  console.log("Seeding Afconomy…");

  // Children first so FKs don't block the wipe
  await prisma.$transaction([
    prisma.watchlistItem.deleteMany(),
    prisma.articleAsset.deleteMany(),
    prisma.article.deleteMany(),
    prisma.broadcast.deleteMany(),
    prisma.author.deleteMany(),
    prisma.traderPreference.deleteMany(),
    prisma.subscription.deleteMany(),
    prisma.user.deleteMany(),
    prisma.assetPrice.deleteMany(),
    prisma.financialAsset.deleteMany(),
    prisma.indicatorObservation.deleteMany(),
    prisma.economicIndicator.deleteMany(),
  ]);

  // ── Markets ──
  await prisma.financialAsset.createMany({
    data: ASSETS.map((a) => ({
      symbol: a.symbol,
      name: a.name,
      assetClass: a.assetClass,
      exchange: a.exchange,
      currency: a.currency,
      country: a.country,
      region: a.region,
    })),
  });
  for (const asset of ASSETS) {
    await prisma.assetPrice.createMany({ data: simulatePrices(asset) });
  }
  console.log(`  ${ASSETS.length} assets, ${DAYS_OF_HISTORY} days of ${STEP_MINUTES}m prices`);

  // ── Macro indicators ──
  for (const ind of INDICATORS) {
    const { start, drift, ...meta } = ind;
    const created = await prisma.economicIndicator.create({
      data: { ...meta, frequency: "MONTHLY" },
    });
    const now = new Date();
    await prisma.indicatorObservation.createMany({
      data: Array.from({ length: 24 }, (_, i) => {
        const monthsAgo = 23 - i;
        return {
          time: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthsAgo, 1)),
          indicatorId: created.id,
          value: (start + drift * i + (rand() - 0.5) * 0.3).toFixed(4),
        };
      }),
    });
  }
  console.log(`  ${INDICATORS.length} economic indicators`);

  // ── Users & subscriptions ──
  const investor = await prisma.user.create({
    data: {
      email: "investor@afconomy.com",
      name: "Premium Investor",
      subscription: { create: { tier: "PREMIUM", status: "ACTIVE" } },
      preferences: {
        create: { regions: ["ECOWAS", "SADC"], assetClasses: ["FX", "STOCK"], delivery: "TERMINAL_ONLY" },
      },
      watchlist: {
        create: ["USD/NGN", "NGX:DANGCEM", "USD/ZAR", "JSE:SOL", "BRENT"].map((symbol, position) => ({
          symbol,
          position,
        })),
      },
    },
  });
  await prisma.user.create({
    data: {
      email: "trader@afconomy.com",
      name: "Retail Trader",
      subscription: { create: { tier: "FREE", status: "ACTIVE" } },
    },
  });

  // ── Newsroom ──
  const authorIds = {} as Record<AuthorKey, string>;
  for (const a of AUTHORS) {
    const email = `${a.slug.replace("-", ".")}@afconomy.com`;
    const user = await prisma.user.create({
      data: {
        email,
        name: a.name,
        role: a.key === "amina" ? "EDITOR" : "JOURNALIST",
        subscription: { create: { tier: "ELITE", status: "ACTIVE" } },
      },
    });
    const author = await prisma.author.create({
      data: { userId: user.id, name: a.name, slug: a.slug, role: a.role, bio: a.bio },
    });
    authorIds[a.key] = author.id;
  }

  const searchDocs = [];
  for (const art of ARTICLES) {
    const slug = art.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
    const publishedAt = new Date(Date.now() - art.hoursAgo * HOUR);
    const created = await prisma.article.create({
      data: {
        authorId: authorIds[art.author],
        title: art.title,
        slug,
        excerpt: art.excerpt,
        content: body(art.title, art.excerpt),
        category: art.category,
        region: art.region,
        country: art.country,
        tags: art.tags,
        isPremium: art.isPremium ?? false,
        status: "PUBLISHED",
        publishedAt,
        assets: { create: art.symbols.map((symbol) => ({ symbol })) },
      },
    });
    searchDocs.push({
      id: created.id,
      title: created.title,
      slug: created.slug,
      excerpt: created.excerpt,
      region: created.region,
      category: created.category,
      tags: created.tags,
      publishedAt: publishedAt.getTime(),
    });
  }
  console.log(`  ${AUTHORS.length} authors, ${ARTICLES.length} articles`);

  // ── Broadcasts ──
  await prisma.broadcast.createMany({
    data: [
      {
        roomName: "brent-crude-analysis",
        title: "Brent Crude & African Producers: Live Desk",
        description: "What the oil tape means for Nigeria, Angola and the rand.",
        status: "LIVE",
        requiredTier: "PREMIUM",
        hostId: authorIds.thandiwe,
        startedAt: new Date(Date.now() - 20 * 60_000),
      },
      {
        roomName: "cbn-mpc-decision",
        title: "CBN MPC Decision: Instant Reaction",
        description: "Rates, the naira and what comes next.",
        status: "SCHEDULED",
        requiredTier: "PREMIUM",
        hostId: authorIds.amina,
        scheduledAt: new Date(Date.now() + 2 * 24 * HOUR),
      },
    ],
  });
  console.log("  2 broadcasts");

  // ── Search index (optional) ──
  const host = process.env.MEILISEARCH_HOST;
  const apiKey = process.env.MEILISEARCH_ADMIN_KEY;
  if (host && apiKey) {
    try {
      const index = new Meilisearch({ host, apiKey }).index("articles");
      await index.deleteAllDocuments();
      await index.addDocuments(searchDocs, { primaryKey: "id" });
      await index.updateSettings({
        searchableAttributes: ["title", "excerpt", "tags", "region", "category"],
        sortableAttributes: ["publishedAt"],
        filterableAttributes: ["region", "category"],
      });
      console.log("  indexed articles in Meilisearch");
    } catch {
      console.warn("  Meilisearch unreachable — skipped search indexing");
    }
  }

  console.log("Done. Dev users (set DEV_USER_EMAIL in .env to switch):");
  console.log("  amina.diallo@afconomy.com  EDITOR, ELITE  — can publish");
  console.log(`  ${investor.email}      READER, PREMIUM — can watch live`);
  console.log("  trader@afconomy.com        READER, FREE    — hits the paywall");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
