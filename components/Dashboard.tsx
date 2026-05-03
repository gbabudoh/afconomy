"use client";

import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { Play, Signal, Radio, History, Maximize2, Volume2, Settings } from "lucide-react";
import TickerHeader from "./TickerHeader";
import TickerFooter from "./TickerFooter";
import InsightsPanel from "./InsightsPanel";
import GlassSidebar from "./GlassSidebar";
import { motion } from "framer-motion";
import AskIntelligence from "./AskIntelligence";

const TVPlayer = dynamic(() => import("./TVPlayer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin shadow-[0_0_20px_rgba(255,2,1,0.2)]" />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Initializing Stream</span>
      </div>
    </div>
  ),
});

export default function Dashboard(_: { children?: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("economy");
  const [streamMode, setStreamMode] = useState<"live" | "recorded">("live");
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden bg-white text-black selection:bg-primary/10">

      {/* ─── TOP TICKER ─── */}
      <TickerHeader />

      <div className="flex flex-1 min-h-0 relative">

        {/* ─── MAIN STREAM AREA ─── */}
        <main className="flex-1 flex flex-col relative overflow-hidden mesh-gradient">

          {/* Floating glass blobs — reduced opacity on mobile for performance */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"
            />
            <motion.div
              animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full"
            />
            <motion.div
              animate={{ y: [0, -50, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-1/4 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full"
            />
          </div>

          {/* Content — tighter on mobile, comfortable on desktop */}
          <div className="flex-1 p-3 sm:p-5 lg:p-6 flex flex-col gap-3 sm:gap-5 lg:gap-6 relative z-10 pb-22 lg:pb-6">

            {/* Stream Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/5 shadow-sm">
                  <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${streamMode === "live" ? "bg-primary animate-pulse shadow-[0_0_8px_rgba(255,2,1,0.4)]" : "bg-black/20"}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-black leading-none">
                    {streamMode === "live" ? "Live" : "Recorded"}
                  </span>
                </div>
                {/* Signal info — visible on sm+ only */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-4 w-px bg-black/10" />
                  <Signal className="h-3.5 w-3.5 text-black/30" />
                  <span className="text-[10px] font-black text-black/30 uppercase tracking-widest">HD 1080p</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button className="p-2 rounded-xl bg-white border border-black/5 shadow-sm hover:bg-black/2 transition-all active:scale-95">
                  <Maximize2 className="h-4 w-4 text-black/40" />
                </button>
                <button className="p-2 rounded-xl bg-white border border-black/5 shadow-sm hover:bg-black/2 transition-all active:scale-95">
                  <Settings className="h-4 w-4 text-black/40" />
                </button>
              </div>
            </div>

            {/* Video Container */}
            <div className="flex-1 relative group min-h-0">
              <div className="absolute inset-0 rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5 bg-black">
                <TVPlayer isMuted={isMuted} isPlaying={isPlaying} streamMode={streamMode} />

                {/* Overlay Controls */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <h1 className="text-lg sm:text-3xl font-black text-white tracking-tight drop-shadow-2xl leading-tight">
                      African Market Intelligence Report
                    </h1>
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span className="text-xs font-bold text-white/60">Live from Lagos · Q2 Analysis</span>
                      <div className="flex items-center gap-1 text-primary">
                        <Radio className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">12.4K Watching</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`h-11 w-11 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-xl ${
                        isPlaying ? "bg-white text-black" : "bg-primary text-white"
                      }`}
                    >
                      {isPlaying ? <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-current" /> : <Play className="h-5 w-5 sm:h-6 sm:w-6" />}
                    </button>
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className={`h-11 w-11 sm:h-14 sm:w-14 rounded-2xl backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all border border-white/20 ${
                        isMuted ? "bg-white/10 text-white/40" : "bg-white/40 text-white shadow-lg"
                      }`}
                    >
                      <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setStreamMode("live")}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 rounded-2xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 active:scale-[0.97] ${
                  streamMode === "live"
                    ? "bg-primary text-white shadow-xl shadow-primary/20"
                    : "glass-card text-black/40 hover:text-black/70 shadow-sm"
                }`}
              >
                <Radio className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                Live Stream
              </button>
              <button
                onClick={() => setStreamMode("recorded")}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 rounded-2xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 active:scale-[0.97] ${
                  streamMode === "recorded"
                    ? "bg-black text-white shadow-xl"
                    : "glass-card text-black/40 hover:text-black/70 shadow-sm"
                }`}
              >
                <History className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                Recorded
              </button>
            </div>
          </div>
        </main>

        {/* ─── RIGHT SIDEBAR — desktop only ─── */}
        <div className="hidden lg:block">
          <GlassSidebar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      <InsightsPanel sectorId="Global" />

      {/* ─── BOTTOM TICKER — desktop only (MobileNav occupies this space on mobile) ─── */}
      <div className="hidden lg:block">
        <TickerFooter />
      </div>
      <AskIntelligence />
    </div>
  );
}
