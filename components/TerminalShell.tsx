"use client";

import React, { useState, useSyncExternalStore } from "react";
import { LayoutDashboard, Newspaper, LineChart, User } from "lucide-react";
import MiniTickerWidget from "@/components/MiniTickerWidget";
import MarketWatchlist from "@/components/MarketWatchlist";
import CandleHistoryChart from "@/components/CandleHistoryChart";
import NewsWire from "@/components/NewsWire";
import MobileTabContainer from "@/components/MobileTabContainer";
import LiveTV, { type LiveBroadcast } from "@/components/LiveTV";
import PreferencesPanel, { type SavedPreferences } from "@/components/PreferencesPanel";
import type { WatchlistRow } from "@/lib/markets";
import type { ArticleSummary } from "@/lib/news";


interface Props {
  watchlist: WatchlistRow[];
  articles: ArticleSummary[];
  broadcast: LiveBroadcast | null;
  preferences: SavedPreferences | null;
}

const TABS = [
  { id: "terminal", label: "Terminal", icon: LayoutDashboard },
  { id: "wire", label: "Wire", icon: Newspaper },
  { id: "markets", label: "Markets", icon: LineChart },
  { id: "account", label: "Account", icon: User },
] as const;

function TickerTape({ rows }: { rows: WatchlistRow[] }) {
  if (rows.length === 0) return null;
  // Duplicated so the -50% marquee loop is seamless
  const items = [...rows, ...rows];
  return (
    <div className="border-b border-af-border bg-af-panel overflow-hidden">
      <div className="flex w-max animate-marquee">
        {items.map((r, i) => {
          const up = (r.changePct ?? 0) >= 0;
          return (
            <span key={`${r.symbol}-${i}`} className="px-5 py-1.5 text-[11px] font-mono whitespace-nowrap">
              <span className="font-bold text-slate-700">{r.symbol}</span>{" "}
              <span className="text-slate-900 tabular">
                {r.last.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>{" "}
              <span className={up ? "text-emerald-600" : "text-rose-600"}>
                {r.changePct === null ? "" : `${up ? "+" : ""}${r.changePct.toFixed(2)}%`}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * null until mounted. The desktop and mobile layouts are both in the DOM, so
 * the TV must only mount in the visible one — otherwise it opens two streams.
 */
function useIsDesktop() {
  return useSyncExternalStore<boolean | null>(
    (cb) => {
      const mq = window.matchMedia(DESKTOP_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => null
  );
}

export default function TerminalShell({ watchlist, articles, broadcast, preferences }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("terminal");
  const isDesktop = useIsDesktop();
  const featured = watchlist[0];
  const tickers = watchlist.slice(0, 4);

  const tickerRow = (
    <div className="flex gap-3 overflow-x-auto scrollbar-none">
      {tickers.map((r) => (
        <MiniTickerWidget key={r.symbol} symbol={r.symbol} />
      ))}
    </div>
  );

  return (
    <>
      <TickerTape rows={watchlist} />

      {/* ── Desktop ── */}
      <main className="hidden lg:grid grid-cols-12 gap-4 p-4 max-w-[1600px] mx-auto w-full">
        <section className="col-span-8 space-y-4">
          {tickerRow}
          {/* Placeholder keeps the 16:9 slot from jumping while the media query resolves */}
          {isDesktop === true ? <LiveTV broadcast={broadcast} /> : <div className="aspect-video w-full" />}
          <MarketWatchlist rows={watchlist} />
        </section>
        <aside className="col-span-4 space-y-4">
          {featured && <CandleHistoryChart symbol={featured.symbol} name={featured.name} />}
          <NewsWire articles={articles} />
        </aside>
      </main>

      {/* ── Mobile ── */}
      <div className="lg:hidden flex-1 flex flex-col">
        <MobileTabContainer activeTab={tab}>
          {tab === "terminal" && (
            <div className="space-y-4 pb-20">
              {isDesktop === false && <LiveTV broadcast={broadcast} />}
              {tickerRow}
              {featured && <CandleHistoryChart symbol={featured.symbol} name={featured.name} />}
            </div>
          )}
          {tab === "wire" && (
            <div className="pb-20">
              <NewsWire articles={articles} />
            </div>
          )}
          {tab === "markets" && (
            <div className="pb-20">
              <MarketWatchlist rows={watchlist} />
            </div>
          )}
          {tab === "account" && (
            <div className="pb-20">
              <PreferencesPanel initial={preferences} />
            </div>
          )}
        </MobileTabContainer>

        <nav className="fixed bottom-0 inset-x-0 z-40 bg-af-panel border-t border-af-border grid grid-cols-4 pb-[env(safe-area-inset-bottom)]">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold ${
                tab === id ? "text-af-red" : "text-slate-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
