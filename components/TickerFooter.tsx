"use client";

import { useState, useEffect } from "react";
import { Clock, Globe, Dot } from "lucide-react";

const NEWS_DATA = [
  { time: "09:00 AM", title: "🔴 BREAKING: AfCFTA regional trade volume surges 24.5% in Q1 2026" },
  { time: "09:15 AM", title: "Nigeria inflation rate cools to 28.2% as monetary policy takes effect" },
  { time: "09:30 AM", title: "South Africa's JSE hits record high amid tech stock rally" },
  { time: "09:45 AM", title: "Kenya signs $5B infrastructure deal for new tech-hub corridor" },
  { time: "10:00 AM", title: "Egypt explores digital currency framework for international trade" },
  { time: "10:15 AM", title: "Ghana's cocoa exports reach multi-year high on premium pricing" },
  { time: "10:30 AM", title: "IMF projects 4.2% average growth for Sub-Saharan Africa in 2026" },
];

export default function TickerFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-GB", { 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        timeZoneName: "short" 
      }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#fafafa] border-t border-black/10 h-14 flex items-center overflow-hidden z-50">
      <div className="flex-shrink-0 px-6 border-r border-black/5 flex items-center gap-3 bg-black/[0.02] h-full">
        <Clock className="h-4 w-4 text-black/40" />
        <span className="text-[11px] font-black text-black tabular-nums tracking-wider">{time}</span>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-animate flex gap-12 items-center whitespace-nowrap px-6">
          {[...NEWS_DATA, ...NEWS_DATA].map((news, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">{news.time}</span>
              <span className="text-xs font-black text-black">{news.title}</span>
              <Dot className="text-black/10" />
            </div>
          ))}
        </div>
        
        {/* Gradients to mask edges */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />
      </div>
      
      <div className="flex-shrink-0 px-6 border-l border-black/10 hidden lg:flex items-center gap-6 h-full">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,2,1,0.3)]" />
          <span className="text-[10px] font-black text-primary uppercase tracking-widest">Global Desk</span>
        </div>
        <div className="flex items-center -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-6 rounded-full bg-black/5 border border-white flex items-center justify-center">
              <Globe className="h-3 w-3 text-black/20" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
