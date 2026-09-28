"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface Candle {
  bucket: string; // ISO timestamp aligned to 1-hour boundary
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface HistoryResponse {
  success: boolean;
  data: Candle[];
}

interface LiveTick {
  time: string;
  symbol: string;
  close: number;
  volume?: number;
}

async function fetchHistory(symbol: string): Promise<Candle[]> {
  const res = await fetch(
    `/api/v1/markets/history?symbol=${encodeURIComponent(symbol)}&resolution=1h`
  );
  if (!res.ok) throw new Error("Failed to load historical analytics.");
  const payload: HistoryResponse = await res.json();
  return payload.data;
}

/**
 * Hybrid hook: loads historical 1h candles via TanStack Query (REST),
 * then patches them in real time via a WebSocket stream.
 *
 * Scenario A — incoming tick falls inside the active 1h candle → update OHLC.
 * Scenario B — clock rolls into a new hour → append a fresh candle.
 */
export function useHybridMarketData(symbol: string) {
  const queryClient = useQueryClient();

  const { data: candles = [], isLoading, isError } = useQuery({
    queryKey: ["market-history-1h", symbol],
    queryFn: () => fetchHistory(symbol),
    // Historical backdrop is immutable once loaded
    staleTime: Infinity,
  });

  const hasHistory = candles.length > 0;

  // WebSocket overlay — patches the query cache directly so REST refetches
  // and live ticks share one source of truth
  useEffect(() => {
    if (!hasHistory) return;

    const wsUrl = `${
      typeof window !== "undefined" && window.location.protocol === "https:"
        ? "wss"
        : "ws"
    }://${
      typeof window !== "undefined" ? window.location.host : "localhost:3000"
    }/ws/ticker?symbol=${encodeURIComponent(symbol)}`;

    let ws: WebSocket;
    try {
      ws = new WebSocket(wsUrl);
    } catch {
      // WebSocket not available in dev without a server — skip gracefully
      return;
    }

    ws.onmessage = (event) => {
      const tick: LiveTick = JSON.parse(event.data as string);
      const tickTime = new Date(tick.time);
      tickTime.setMinutes(0, 0, 0);
      const bucketIso = tickTime.toISOString();

      queryClient.setQueryData<Candle[]>(["market-history-1h", symbol], (prev) => {
        if (!prev || prev.length === 0) return prev;
        const updated = [...prev];
        const last = updated[updated.length - 1];

        if (last.bucket === bucketIso) {
          // Update active candle
          updated[updated.length - 1] = {
            ...last,
            high: Math.max(last.high, tick.close),
            low: Math.min(last.low, tick.close),
            close: tick.close,
            volume: last.volume + (tick.volume ?? 0),
          };
        } else if (new Date(bucketIso) > new Date(last.bucket)) {
          // New hour — open a fresh candle
          const fresh: Candle = {
            bucket: bucketIso,
            symbol,
            open: tick.close,
            high: tick.close,
            low: tick.close,
            close: tick.close,
            volume: tick.volume ?? 0,
          };
          updated.push(fresh);
          if (updated.length > 50) updated.shift();
        }

        return updated;
      });
    };

    return () => ws.close();
  }, [symbol, hasHistory, queryClient]);

  return {
    chartData: candles,
    isLoading: isLoading && !hasHistory,
    isError,
  };
}
