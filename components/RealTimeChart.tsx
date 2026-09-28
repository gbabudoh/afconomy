"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export interface PriceTick {
  time: string;
  symbol: string;
  close: number;
}

type ConnectionStatus = "connecting" | "connected" | "disconnected";

export default function RealTimeChart({
  symbol = "NGX:DANGCEM",
}: {
  symbol?: string;
}) {
  const [data, setData] = useState<PriceTick[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");

  useEffect(() => {
    // In production, connect to wss://afconomy.com/ws/ticker?symbol=...
    // For now we simulate with mock ticks so the UI renders without a live server.
    setStatus("connected");

    const basePrice =
      symbol.includes("NGN") ? 1450 : symbol.includes("DANGCEM") ? 652 : 17.38;

    const interval = setInterval(() => {
      const tick: PriceTick = {
        time: new Date().toLocaleTimeString(),
        symbol,
        close: parseFloat((basePrice + (Math.random() * 4 - 2)).toFixed(2)),
      };

      setData((prev) => {
        const updated = [...prev, tick];
        if (updated.length > 30) updated.shift();

        if (prev.length > 0) {
          setPriceChange(tick.close - prev[prev.length - 1].close);
        }

        return updated;
      });

      setCurrentPrice(tick.close);
    }, 1500);

    return () => clearInterval(interval);
  }, [symbol]);

  const isUp = priceChange >= 0;

  return (
    <div className="w-full p-6 bg-af-panel text-slate-900 rounded-xl border border-af-border shadow-panel">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Live Market Feed
          </span>
          <h2 className="text-xl font-bold tracking-tight">{symbol}</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-af-bg border border-af-border rounded-full text-xs">
          <Activity
            className={`w-3.5 h-3.5 ${
              status === "connected"
                ? "text-emerald-600 animate-pulse"
                : "text-amber-500"
            }`}
          />
          <span className="capitalize text-slate-700">{status}</span>
        </div>
      </div>

      {/* Price display */}
      <div className="mb-6">
        <div className="text-4xl font-extrabold tabular">
          {currentPrice
            ? currentPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })
            : "—"}
        </div>
        {currentPrice !== null && (
          <div
            className={`flex items-center gap-1 text-sm font-medium mt-1 ${
              isUp ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isUp ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span>
              {isUp ? "+" : ""}
              {priceChange.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            Awaiting market ticks…
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="time"
                stroke="#475569"
                fontSize={10}
                tickLine={false}
                axisLine={false}
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E3E8EF",
                  color: "#0F172A",
                  fontSize: 11,
                }}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke={isUp ? "#10b981" : "#f43f5e"}
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
