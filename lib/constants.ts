// Display labels for database enums. Kept free of Prisma imports so client
// components can use them without pulling the generated client into the bundle.

export const REGION_LABELS = {
  ECOWAS: "ECOWAS",
  SADC: "SADC",
  EAC: "EAC",
  MAGHREB: "Maghreb",
  ECCAS: "ECCAS",
  PAN_AFRICAN: "Pan-African",
} as const;

export const CATEGORY_LABELS = {
  POLICY: "Policy",
  SOCIO_ECONOMIC: "Socio-Economic",
  MARKETS: "Markets",
  POLITICS: "Politics",
  TRADE: "Trade",
} as const;

export const ASSET_CLASS_LABELS = {
  STOCK: "Equities",
  INDEX: "Indices",
  FX: "FX Interbank Rates",
  BOND: "Sovereign Bonds",
  COMMODITY: "Commodities",
} as const;

export type RegionKey = keyof typeof REGION_LABELS;
export type CategoryKey = keyof typeof CATEGORY_LABELS;
export type AssetClassKey = keyof typeof ASSET_CLASS_LABELS;

export function isRegion(value: unknown): value is RegionKey {
  return typeof value === "string" && value in REGION_LABELS;
}

export function isCategory(value: unknown): value is CategoryKey {
  return typeof value === "string" && value in CATEGORY_LABELS;
}

export function isAssetClass(value: unknown): value is AssetClassKey {
  return typeof value === "string" && value in ASSET_CLASS_LABELS;
}

/** Fixed locale + timezone so server and client render the same string. */
export function formatPublished(date: Date | null) {
  if (!date) return "";
  return (
    date.toLocaleString("en-GB", {
      timeZone: "UTC",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }) + " UTC"
  );
}

// URL-safe form of a ticker: 'NGX:DANGCEM' → 'NGX-DANGCEM', 'USD/NGN' → 'USD_NGN'
export function symbolToSlug(symbol: string) {
  return symbol.replace(":", "-").replace("/", "_");
}

export function slugToSymbol(slug: string) {
  return decodeURIComponent(slug).replace("-", ":").replace("_", "/");
}
