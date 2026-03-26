"use client";

import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import NewsFeed from "./NewsFeed";
import { Play, X, Newspaper, Signal, Zap } from "lucide-react";

const TVPlayer = dynamic(() => import("./TVPlayer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="h-9 w-9 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
    </div>
  ),
});

interface DashboardProps {
  sidebarTop?: ReactNode;
}

const TICKER_ITEMS = [
  "NGX All-Share  +1.9%", "•",
  "JSE Top 40  –0.1%", "•",
  "NSE 20  +0.1%", "•",
  "EGX 30  –2.2%", "•",
  "USD / NGN  1,525.50  ▲ 0.8%", "•",
  "USD / ZAR  18.95  ▲ 0.3%", "•",
  "USD / KES  129.50  ▼ 0.2%", "•",
  "USD / EGP  48.35  ▲ 0.1%", "•",
  "🔴  LIVE: Nigerian Market Close — Special Report", "•",
  "AfCFTA Trade Volume Up 21.4% YoY", "•",
  "IMF Revises Africa GDP Forecast → 4.1%", "•",
  "CBN Policy Rate Holds at 27.5%", "•",
  "Dangote Refinery Lifts Nigeria Trade Balance", "•",
];

export default function Dashboard({ sidebarTop }: DashboardProps) {
  const [showMobilePanel, setShowMobilePanel] = useState<"tv" | "news" | null>(null);

  return (
    <div className="flex h-full overflow-hidden" style={{ background: "transparent" }}>

      {/* ════════════════════════ MAIN COLUMN ════════════════════════ */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">

        {/* ── TV HERO (desktop only) ── */}
        <div className="hidden lg:block relative flex-shrink-0 border-b border-black/[0.05]">

          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none ambient-glow"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(255,2,1,0.05), transparent)" }}
          />

          <div className="relative z-10 px-5 xl:px-7 pt-5 pb-4 xl:pt-6">

            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20 shadow-sm">
                    <Play className="h-4 w-4 text-primary fill-primary" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-black tracking-tight text-foreground uppercase">
                    Afconomy TV
                  </p>
                  <p className="text-[10px] font-medium text-secondary/70 uppercase tracking-widest">
                    Africa's Economic Pulse · Live
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.18em]">
                    Live Now
                  </span>
                </div>
                <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08]">
                  <Signal className="h-3 w-3 text-secondary/60" />
                  <span className="text-[10px] font-medium text-secondary/60 uppercase tracking-widest">
                    HD Signal
                  </span>
                </div>
              </div>
            </div>

            {/* Video player */}
            <div className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-black/10 shadow-2xl shadow-black/20 group h-[58vh] xl:h-[68vh]">
              <TVPlayer />

              {/* Hover overlay */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-bold text-sm leading-tight">Nigerian Market Analysis</p>
                  <p className="text-white/50 text-xs mt-0.5">Live from Lagos · Special Report</p>
                </div>
              </div>
            </div>

            {/* ── Breaking news ticker ── */}
            <div className="mt-3 overflow-hidden rounded-xl border border-black/[0.07] bg-white/60 backdrop-blur-sm flex items-stretch shadow-sm">
              <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-primary/10 border-r border-primary/15">
                <Zap className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  Breaking
                </span>
              </div>
              <div className="flex-1 overflow-hidden py-2 px-2">
                <div className="ticker-animate flex gap-8 items-center whitespace-nowrap">
                  {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                    <span
                      key={i}
                      className={item === "•" ? "text-black/20 text-xs" : "text-[11px] font-medium text-foreground/70"}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE BOTTOM NAV ── */}
        <div
          className="lg:hidden sticky bottom-0 z-20 border-t border-black/[0.06] safe-area-pb"
          style={{
            background: "rgba(244,245,251,0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setShowMobilePanel("tv")}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-black/[0.05] transition-colors min-w-[64px]"
            >
              <div className="relative">
                <Play className="h-5 w-5 text-primary" />
                <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              </div>
              <span className="text-[10px] font-bold text-secondary/60 uppercase tracking-wider">Live</span>
            </button>
            <button
              onClick={() => setShowMobilePanel("news")}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-black/[0.05] transition-colors min-w-[64px]"
            >
              <Newspaper className="h-5 w-5 text-secondary/60" />
              <span className="text-[10px] font-bold text-secondary/60 uppercase tracking-wider">News</span>
            </button>
          </div>
        </div>
      </main>

      {/* ════════════════════════ SIDEBAR ════════════════════════ */}
      <aside
        className="hidden lg:flex flex-col w-80 xl:w-96 border-l border-black/[0.07] overflow-hidden flex-shrink-0"
        style={{
          background: "rgba(255,255,255,0.70)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
        }}
      >
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {sidebarTop && <div>{sidebarTop}</div>}
          <NewsFeed />
        </div>
      </aside>

      {/* ════════════════════════ MOBILE PANEL ════════════════════════ */}
      {showMobilePanel && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col animate-in slide-in-from-bottom duration-300"
          style={{ background: "var(--background)" }}
        >
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-black/[0.06]">
            <h2 className="text-base font-black text-foreground uppercase tracking-tight">
              {showMobilePanel === "tv"   && "Live TV"}
              {showMobilePanel === "news" && "Market News"}
            </h2>
            <button
              onClick={() => setShowMobilePanel(null)}
              className="p-2 hover:bg-black/[0.05] rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-secondary/60" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {showMobilePanel === "tv" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 w-fit">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Live Broadcast</span>
                </div>
                <div className="rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl ring-1 ring-black/10">
                  <TVPlayer />
                </div>
                <div className="rounded-2xl border border-black/[0.07] bg-white/80 p-4 shadow-sm">
                  <p className="text-sm font-bold text-foreground">Nigerian Market Close</p>
                  <p className="text-xs text-secondary/70 mt-1">Analyzing daily gains in the NGX</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-secondary/50 font-medium">14:00 – 15:30 GMT</span>
                    <button className="text-primary font-bold hover:underline">Set Reminder</button>
                  </div>
                </div>
              </div>
            )}
            {showMobilePanel === "news" && <NewsFeed />}
          </div>
        </div>
      )}
    </div>
  );
}
