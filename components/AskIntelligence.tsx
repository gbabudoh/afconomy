"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Sparkles, Loader2, X, Command, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AskIntelligence() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResult(null);
    }
  }, [isOpen]);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/ai/query", {
        method: "POST",
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Query failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-48 right-4 lg:bottom-8 lg:right-8 z-50 p-4 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40 hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <Sparkles className="h-5 w-5 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black uppercase tracking-widest text-[10px] whitespace-nowrap">Ask Intelligence</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-black/5"
            >
              <form onSubmit={handleQuery} className="p-6 border-b border-black/5 flex items-center gap-4">
                <Search className="h-6 w-6 text-black/20" />
                <input 
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question... e.g., 'Compare Nigeria and Kenya GDP growth'"
                  className="flex-1 bg-transparent border-none outline-none text-xl font-bold placeholder:text-black/10"
                />
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-black/5 text-[10px] font-black text-black/30">
                    <Command className="h-3 w-3" />
                    <span>K</span>
                  </div>
                  <button type="button" onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <X className="h-5 w-5 text-black/40" />
                  </button>
                </div>
              </form>

              <div className="max-h-[70vh] overflow-y-auto p-8">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-20 gap-4"
                    >
                      <Loader2 className="h-10 w-10 text-primary animate-spin" />
                      <p className="text-sm font-black uppercase tracking-[0.3em] text-black/20">Consulting Data Refinery...</p>
                    </motion.div>
                  ) : result ? (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${result.error ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"}`}>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">
                          {result.error || result.summary}
                        </h3>
                      </div>

                      {/* Result Chart */}
                      {!result.error && result.results && (
                        <div className="h-80 w-full bg-black/2 p-6 rounded-3xl border border-black/5">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} hide />
                              <YAxis hide />
                              <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                              />
                              {result.results.map((r: any, i: number) => (
                                <Area 
                                  key={r.isoCode}
                                  type="monotone" 
                                  data={r.data}
                                  dataKey="value" 
                                  name={r.isoCode}
                                  stroke={i === 0 ? "#ff0201" : "#3b82f6"} 
                                  fill={i === 0 ? "rgba(255, 2, 1, 0.1)" : "rgba(59, 130, 246, 0.1)"}
                                  strokeWidth={3}
                                />
                              ))}
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      {result.error && (
                        <div className="p-8 text-center bg-black/2 rounded-3xl border border-black/5">
                          <p className="text-black/40 font-bold">Try rephrasing your query or selecting a different country.</p>
                        </div>
                      )}

                      {!result.error && (
                        <div className="p-6 rounded-2xl bg-black/[0.02] border border-black/5">
                          <p className="text-sm font-bold text-black/60 leading-relaxed italic">
                            "This comparison shows the relative volatility between these economies. Notice the divergence in performance based on recent institutional updates."
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/20">Try these queries:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          "Compare Nigeria and South Africa GDP",
                          "Show me inflation in Ethiopia vs Kenya",
                          "Unemployment trends in North Africa",
                          "Debt-to-GDP ratio for Ghana since 2020"
                        ].map(suggestion => (
                          <button 
                            key={suggestion}
                            onClick={() => setQuery(suggestion)}
                            className="p-4 rounded-2xl border border-black/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-left text-sm font-bold text-black/60"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-4 bg-black/2 border-t border-black/5 flex items-center justify-between px-8">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/30">AI Analyst Online</span>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-black/20 italic">Press Enter to Search</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
