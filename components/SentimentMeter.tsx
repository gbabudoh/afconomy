"use client";

import { useState, useEffect } from "react";
import { Gauge, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SentimentMeterProps {
  country: string;
  headlines: string[];
}

export default function SentimentMeter({ country, headlines }: SentimentMeterProps) {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSentiment() {
      if (!headlines || headlines.length === 0) {
        setLoading(false);
        setScore(50);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch("/api/ai/sentiment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country, headlines })
        });
        if (!res.ok) throw new Error("Sentiment API failed");
        const data = await res.json();
        setScore(data.score);
      } catch (error) {
        setScore(50);
      } finally {
        setLoading(false);
      }
    }
    fetchSentiment();
  }, [country, headlines]);

  const getStatus = (val: number) => {
    if (val > 65) return { label: "Bullish", color: "text-emerald-600", icon: TrendingUp, bg: "bg-emerald-500/20", border: "border-emerald-500/20" };
    if (val < 35) return { label: "Bearish", color: "text-red-600", icon: TrendingDown, bg: "bg-red-500/20", border: "border-red-500/20" };
    return { label: "Neutral", color: "text-amber-600", icon: Minus, bg: "bg-amber-500/20", border: "border-amber-500/20" };
  };

  const status = getStatus(score || 50);

  return (
    <div className="premium-glass p-8 rounded-[3rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/40">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-black text-white shadow-xl">
            <Gauge className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight text-black">Market Sentiment</h3>
            <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em]">Institutional Psychological Index</p>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-2xl ${status.bg} ${status.color} ${status.border} flex items-center gap-2 border`}>
          <status.icon className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-widest">{status.label}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {/* The Gauge */}
        <div className="relative w-full h-6 bg-black/5 rounded-full overflow-hidden mb-8 border border-black/5 shadow-inner">
          <motion.div
            initial={{ width: "50%" }}
            animate={{ width: `${score || 50}%` }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            className={`h-full relative shadow-lg ${
              (score || 50) > 65 ? "bg-linear-to-r from-emerald-600 to-emerald-400 shadow-emerald-500/40" :
              (score || 50) < 35 ? "bg-linear-to-r from-red-600 to-red-400 shadow-red-500/40" :
              "bg-linear-to-r from-amber-500 to-amber-300 shadow-amber-500/40"
            }`}
          >
            {/* Glossy overlay for the bar */}
            <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent pointer-events-none" />
          </motion.div>
          {/* Center mark */}
          <div className="absolute left-1/2 top-0 w-0.5 h-full bg-black/20" />
        </div>

        <div className="flex justify-between w-full px-1">
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Fear</span>
            <span className="text-[8px] font-bold text-black/30 uppercase mt-0.5">Capitulation</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Optimism</span>
            <span className="text-[8px] font-bold text-black/30 uppercase mt-0.5">Bull Market</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-black/5 border border-black/5">
          <div className="text-5xl font-black tracking-tighter text-black tabular-nums">
            {loading ? "..." : score || "--"}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-black leading-tight mb-1">
              Calculated for {country}
            </p>
            <p className="text-[9px] font-bold text-black/40 leading-snug">
              Derived from {headlines.length} institutional intelligence reports. This index aggregates market mood, volatility expectations, and policy sentiment.
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-black text-black/30 uppercase tracking-widest">Live AI Analysis Active</span>
          </div>
          <Info className="h-3 w-3 text-black/20" />
        </div>
      </div>
    </div>
  );
}
