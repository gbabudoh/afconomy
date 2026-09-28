"use client";

import React from "react";
import { TrendingUp, TrendingDown, RefreshCw, AlertTriangle } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";

interface Props {
  symbol?: string;
}

export default function MiniTickerWidget({ symbol = "USD/NGN" }: Props) {
  const { data, isLoading, isError, isFetching } = useMarketData(symbol);

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <div className="bg-af-panel border border-af-border p-4 rounded-xl flex items-center justify-center min-h-[82px] w-56">
        <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
      </div>
    );
  }

  /* ── Error state ── */
  if (isError || !data?.success) {
    return (
      <div className="bg-af-panel border border-rose-200 p-4 rounded-xl flex items-center gap-2 text-rose-600 min-h-[82px] w-56 text-xs">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>Feed Offline</span>
      </div>
    );
  }

  const { close, open } = data.data;
  const priceShift = close - open;
  const isUp = priceShift >= 0;

  return (
    <div className="bg-af-panel border border-af-border hover:border-slate-300 p-4 rounded-xl w-56 relative overflow-hidden transition shadow-panel">
      {/* Background sync indicator */}
      {isFetching && (
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-blue-500/80 animate-pulse" />
      )}

      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
            {data.meta.zone} Interbank
          </span>
          <h4 className="text-xs font-bold text-slate-800 mt-0.5">{symbol}</h4>
        </div>
        <div
          className={`p-1 rounded ${
            isUp
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {isUp ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-lg font-black tabular text-slate-900">
          {close.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span
          className={`text-[10px] font-bold tabular ${
            isUp ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {isUp ? "+" : ""}
          {priceShift.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
