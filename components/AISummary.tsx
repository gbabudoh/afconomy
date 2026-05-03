"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AISummary({ country }: { country: string }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const res = await fetch(`/api/ai/summary?country=${encodeURIComponent(country)}`);
        if (!res.ok) throw new Error("AI Summary failed");
        const data = await res.json();
        setSummary(data.summary);
      } catch (error) {
        setSummary("Unable to connect to AI intelligence unit.");
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [country]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-glass p-8 rounded-[3rem] shadow-2xl border border-white/40 h-full flex flex-col relative overflow-hidden"
    >
      {/* Decorative BG element */}
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Sparkles className="h-24 w-24 text-primary" />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-black tracking-tight">AI Economic Insights</h3>
          <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em]">Institutional Analyst · Real-Time</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 py-4"
          >
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Synthesizing Market Intelligence...</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <p className="text-sm md:text-base font-normal text-black/80 leading-relaxed tracking-tight">
              {summary}
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Verified against IMF Data</span>
              </div>
              <button className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1.5">
                <Info className="h-3 w-3" />
                Full Methodology
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
