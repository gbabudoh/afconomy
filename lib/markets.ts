import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { REGION_LABELS } from "@/lib/constants";

// Candle bucket width → how far back to look for that resolution
export const RESOLUTIONS = {
  "15m": { bucket: "15 minutes", lookback: "2 days" },
  "1h": { bucket: "1 hour", lookback: "7 days" },
  "4h": { bucket: "4 hours", lookback: "30 days" },
  "1d": { bucket: "1 day", lookback: "365 days" },
} as const;

export type Resolution = keyof typeof RESOLUTIONS;

export function isResolution(value: unknown): value is Resolution {
  return typeof value === "string" && value in RESOLUTIONS;
}

export interface Candle {
  bucket: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface WatchlistRow {
  symbol: string;
  name: string;
  last: number;
  changePct: number | null;
  high: number | null;
  low: number | null;
}

export async function getAsset(symbol: string) {
  return prisma.financialAsset.findUnique({ where: { symbol } });
}

export async function getLatestTicker(symbol: string) {
  const asset = await prisma.financialAsset.findUnique({
    where: { symbol },
    include: { prices: { orderBy: { time: "desc" }, take: 1 } },
  });
  const latest = asset?.prices[0];
  if (!asset || !latest) return null;

  return {
    meta: {
      symbol: asset.symbol,
      currency: asset.currency,
      zone: REGION_LABELS[asset.region],
    },
    data: {
      timestamp: latest.time.getTime(),
      open: latest.open.toNumber(),
      high: latest.high.toNumber(),
      low: latest.low.toNumber(),
      close: latest.close.toNumber(),
      volume: latest.volume?.toNumber() ?? 0,
    },
  };
}

/**
 * OHLCV candles aggregated on the fly. Uses core-Postgres date_bin rather than
 * TimescaleDB's time_bucket/first/last so it runs with or without the extension;
 * on a hypertable the time filter still gets chunk exclusion.
 */
export async function getCandles(symbol: string, resolution: Resolution): Promise<Candle[]> {
  const { bucket, lookback } = RESOLUTIONS[resolution];

  const rows = await prisma.$queryRaw<
    { bucket: Date; open: number; high: number; low: number; close: number; volume: number }[]
  >`
    SELECT date_bin(${bucket}::interval, time, TIMESTAMPTZ '2000-01-01') AS bucket,
           ((array_agg(open ORDER BY time ASC))[1])::float8   AS open,
           max(high)::float8                                  AS high,
           min(low)::float8                                   AS low,
           ((array_agg(close ORDER BY time DESC))[1])::float8 AS close,
           coalesce(sum(volume), 0)::float8                   AS volume
    FROM asset_prices
    WHERE symbol = ${symbol}
      AND time > now() - ${lookback}::interval
    GROUP BY bucket
    ORDER BY bucket ASC
  `;

  return rows.map((r) => ({ ...r, bucket: r.bucket.toISOString(), symbol }));
}

/**
 * Latest price, 24h change and 24h range for each asset. Uses the user's
 * saved watchlist when they have one, otherwise every active asset.
 */
export async function getWatchlist(userId?: string): Promise<WatchlistRow[]> {
  const saved = userId
    ? await prisma.watchlistItem.findMany({
        where: { userId },
        orderBy: { position: "asc" },
        select: { symbol: true },
      })
    : [];
  const symbols = saved.map((s) => s.symbol);

  const filter = symbols.length
    ? Prisma.sql`a.symbol = ANY(${symbols})`
    : Prisma.sql`a.is_active`;

  const rows = await prisma.$queryRaw<
    { symbol: string; name: string; last: number; prev: number | null; high: number | null; low: number | null }[]
  >`
    SELECT a.symbol, a.name,
           l.close::float8 AS last,
           p.close::float8 AS prev,
           d.high::float8  AS high,
           d.low::float8   AS low
    FROM financial_assets a
    JOIN LATERAL (
      SELECT close, time FROM asset_prices
      WHERE symbol = a.symbol ORDER BY time DESC LIMIT 1
    ) l ON true
    LEFT JOIN LATERAL (
      SELECT close FROM asset_prices
      WHERE symbol = a.symbol AND time <= l.time - interval '24 hours'
      ORDER BY time DESC LIMIT 1
    ) p ON true
    LEFT JOIN LATERAL (
      SELECT max(high) AS high, min(low) AS low FROM asset_prices
      WHERE symbol = a.symbol AND time > l.time - interval '24 hours'
    ) d ON true
    WHERE ${filter}
    ORDER BY a.symbol
  `;

  const bySymbol = new Map(
    rows.map((r) => [
      r.symbol,
      {
        symbol: r.symbol,
        name: r.name,
        last: r.last,
        changePct: r.prev ? ((r.last - r.prev) / r.prev) * 100 : null,
        high: r.high,
        low: r.low,
      },
    ])
  );

  // Preserve the user's saved ordering
  return symbols.length
    ? symbols.flatMap((s) => bySymbol.get(s) ?? [])
    : [...bySymbol.values()];
}

/** Close price in effect at a given moment (e.g. when an article was published). */
export async function getCloseAt(symbol: string, at: Date) {
  const row = await prisma.assetPrice.findFirst({
    where: { symbol, time: { lte: at } },
    orderBy: { time: "desc" },
    select: { close: true, time: true },
  });
  return row ? { close: row.close.toNumber(), time: row.time } : null;
}
