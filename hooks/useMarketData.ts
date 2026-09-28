"use client";

import { useQuery } from "@tanstack/react-query";

export interface MarketTickerPayload {
  success: boolean;
  meta: { symbol: string; currency: string; zone: string };
  data: {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  };
}

async function fetchTicker(symbol: string): Promise<MarketTickerPayload> {
  const res = await fetch(
    `/api/v1/markets/ticker?symbol=${encodeURIComponent(symbol)}`
  );
  if (!res.ok) throw new Error(`Ticker API error: ${res.status}`);
  return res.json();
}

/**
 * Polls the /api/v1/markets/ticker REST endpoint via TanStack Query.
 * Falls back to stale data during refetches so the UI never flashes.
 */
export function useMarketData(symbol: string) {
  return useQuery({
    queryKey: ["market-ticker", symbol],
    queryFn: () => fetchTicker(symbol),
  });
}
