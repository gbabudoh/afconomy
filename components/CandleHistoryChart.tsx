"use client";

import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { useHybridMarketData, type Candle } from "@/hooks/useHybridMarketData";

function hourLabel(iso: string) {
  const d = new Date(iso);
  return `${d.getUTCDate()}/${d.getUTCMonth() + 1} ${String(d.getUTCHours()).padStart(2, "0")}:00`;
}

function CandleTooltip({ active, payload }: { active?: boolean; payload?: { payload: Candle }[] }) {
  if (!active || !payload?.length) return null;
  const c = payload[0].payload;
  return (
    <div className="bg-af-bg border border-af-border rounded-lg px-3 py-2 text-[11px] font-mono text-slate-700 space-y-0.5">
      <div className="text-slate-500">{hourLabel(c.bucket)} UTC</div>
      <div>O {c.open.toFixed(2)} · H {c.high.toFixed(2)}</div>
      <div>L {c.low.toFixed(2)} · C {c.close.toFixed(2)}</div>
      {c.volume > 0 && <div className="text-slate-500">Vol {c.volume.toLocaleString()}</div>}
    </div>
  );
}

/** 1h candles from TimescaleDB, patched live by the ticker WebSocket when available. */
export default function CandleHistoryChart({ symbol, name }: { symbol: string; name?: string }) {
  const { chartData, isLoading, isError } = useHybridMarketData(symbol);

  const first = chartData[0]?.open;
  const last = chartData.at(-1)?.close;
  const change = first && last ? ((last - first) / first) * 100 : 0;
  const up = change >= 0;
  const color = up ? "#10b981" : "#f43f5e";
  // ':' and '/' in tickers break url(#id) references
  const gradientId = `fill-${symbol.replace(/[^a-zA-Z0-9]/g, "-")}`;

  return (
    <div className="w-full p-5 bg-af-panel rounded-xl border border-af-border shadow-panel">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {name ?? "Price History"} · 1H · 7D
          </span>
          <h2 className="text-xl font-bold tracking-tight">{symbol}</h2>
        </div>
        {last !== undefined && (
          <div className="text-right">
            <div className="text-2xl font-extrabold tabular">
              {last.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-xs font-bold tabular ${up ? "text-emerald-600" : "text-rose-600"}`}>
              {up ? "+" : ""}
              {change.toFixed(2)}% 7D
            </div>
          </div>
        )}
      </div>

      <div className="h-64 w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
          </div>
        ) : isError || chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center gap-2 text-slate-500 text-xs">
            <AlertTriangle className="w-4 h-4" /> No price history available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="bucket"
                tickFormatter={hourLabel}
                stroke="#475569"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                minTickGap={40}
              />
              <YAxis
                domain={["auto", "auto"]}
                stroke="#475569"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                orientation="right"
                width={60}
              />
              <Tooltip content={<CandleTooltip />} />
              <Area
                type="monotone"
                dataKey="close"
                stroke={color}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
