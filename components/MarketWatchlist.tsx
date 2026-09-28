"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDownRight, Search, FileDown } from "lucide-react";
import type { WatchlistRow } from "@/lib/markets";
import { symbolToSlug } from "@/lib/constants";

function fmt(value: number | null) {
  return value === null
    ? "—"
    : value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function exportCsv(rows: WatchlistRow[]) {
  const header = "symbol,name,last,change_pct,high_24h,low_24h";
  const lines = rows.map((r) =>
    [r.symbol, `"${r.name}"`, r.last, r.changePct?.toFixed(4) ?? "", r.high ?? "", r.low ?? ""].join(",")
  );
  const url = URL.createObjectURL(new Blob([[header, ...lines].join("\n")], { type: "text/csv" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "afconomy-watchlist.csv" });
  a.click();
  URL.revokeObjectURL(url);
}

export default function MarketWatchlist({ rows }: { rows: WatchlistRow[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("");

  const filtered = rows.filter(
    (r) =>
      r.symbol.toLowerCase().includes(filter.toLowerCase()) ||
      r.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full bg-af-panel border border-af-border rounded-xl overflow-hidden shadow-panel flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-af-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Multi-Market Watch List
          </span>
          <span className="text-[10px] bg-af-bg text-slate-500 font-mono px-2 py-0.5 rounded border border-af-border">
            24H
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by asset…"
              className="bg-af-bg border border-af-border text-[11px] rounded-lg pl-8 pr-3 py-1.5 w-44 focus:outline-none focus:border-af-red/60 transition text-slate-800"
            />
          </div>
          <button
            title="Export CSV"
            onClick={() => exportCsv(filtered)}
            className="p-1.5 bg-af-bg hover:bg-slate-100 border border-af-border rounded-lg text-slate-500 hover:text-slate-900 transition"
          >
            <FileDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-[11px] font-medium tracking-tight">
          <thead>
            <tr className="bg-af-bg border-b border-af-border font-bold text-slate-500 uppercase tracking-widest text-[9px]">
              <th className="py-3 px-4">Ticker</th>
              <th className="py-3 px-3 text-right">Last</th>
              <th className="py-3 px-4 text-right">Change</th>
              <th className="py-3 px-3 text-right hidden sm:table-cell">High</th>
              <th className="py-3 px-3 text-right hidden sm:table-cell">Low</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-af-border/60 font-mono">
            {filtered.map((row) => {
              const up = (row.changePct ?? 0) >= 0;
              return (
                <tr
                  key={row.symbol}
                  onClick={() => router.push(`/markets/${symbolToSlug(row.symbol)}`)}
                  className="hover:bg-slate-50 cursor-pointer group transition"
                >
                  <td className="py-2.5 px-4 font-sans">
                    <div className="font-bold text-slate-800 group-hover:text-slate-900 transition">
                      {row.symbol}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium tracking-normal truncate max-w-[140px] sm:max-w-none">
                      {row.name}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">{fmt(row.last)}</td>
                  <td className="py-2.5 px-4 text-right font-bold">
                    <div
                      className={`flex items-center justify-end gap-1 ${
                        up ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span>
                        {row.changePct === null
                          ? "—"
                          : `${up ? "+" : ""}${row.changePct.toFixed(2)}%`}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-500 hidden sm:table-cell">
                    {fmt(row.high)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-500 hidden sm:table-cell">
                    {fmt(row.low)}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 text-xs font-sans">
                  {rows.length === 0 ? "No market data yet — run npm run db:seed" : `No assets match "${filter}"`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
