"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp, TrendingDown, Dot } from "lucide-react";

const STOCK_DATA = [
  { name: "NGX ASI", value: "156,492.36", change: "+1.9%", isUp: true },
  { name: "JSE Top 40", value: "108,163.94", change: "-0.1%", isUp: false },
  { name: "NSE 20", value: "3,140.93", change: "+0.1%", isUp: true },
  { name: "EGX 30", value: "40,657.30", change: "-2.2%", isUp: false },
  { name: "USD/NGN", value: "1,525.50", change: "+0.8%", isUp: true },
  { name: "USD/ZAR", value: "18.95", change: "+0.3%", isUp: true },
  { name: "USD/KES", value: "129.50", change: "-0.2%", isUp: false },
  { name: "Brent Oil", value: "$82.45", change: "+1.2%", isUp: true },
  { name: "Gold", value: "$2,342.10", change: "+0.5%", isUp: true },
];

export default function TickerHeader() {
  return (
    <header className="w-full bg-[#fafafa]/80 backdrop-blur-3xl border-b border-black/5 h-14 flex items-center overflow-hidden z-50 glass-gradient-vibrant">
      <div className="flex-shrink-0 px-6 border-r border-black/5 flex items-center gap-3 bg-white/40">
        <Image src="/logo.png" alt="Afconomy" width={100} height={24} className="h-6 w-auto" />
        <div className="h-4 w-px bg-black/10 hidden md:block" />
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hidden md:block">Live Markets</span>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-animate flex gap-12 items-center whitespace-nowrap px-6">
          {[...STOCK_DATA, ...STOCK_DATA].map((stock, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider">{stock.name}</span>
              <span className="text-xs font-black text-black">{stock.value}</span>
              <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black ${
                stock.isUp ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
              }`}>
                {stock.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stock.change}
              </div>
              <Dot className="text-black/10" />
            </div>
          ))}
        </div>
        
        {/* Gradients to mask edges */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />
      </div>
      
      <div className="flex-shrink-0 px-6 border-l border-black/10 hidden lg:flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Market Open</span>
        </div>
      </div>
    </header>
  );
}
