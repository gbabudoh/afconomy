"use client";

import { motion } from "framer-motion";
import { Lock, Zap, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ProOverlay({ title = "Unlock Pro Intelligence" }: { title?: string }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
      {/* Blurred background effect */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[2.5rem]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative glass-card max-w-md w-full bg-white/95 shadow-[0_30px_100px_rgba(0,0,0,0.15)] rounded-[2rem] p-8 sm:p-10 border border-white text-center"
      >
        <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        
        <h2 className="text-3xl font-black tracking-tight mb-4 uppercase">{title}</h2>
        <p className="text-sm font-medium text-black/50 mb-8 leading-relaxed">
          Deep-dive intelligence for this region is reserved for <span className="text-black font-black uppercase tracking-tighter">Pro Members</span>.
        </p>

        <div className="space-y-4 mb-10 text-left">
          {[
            "Full historical data (10+ years)",
            "Institutional data export (CSV/JSON)",
            "Real-time market volatility alerts",
            "Unlimited access to 54 African countries"
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              <span className="text-xs font-bold text-black/70">{feature}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
          <Zap className="h-4 w-4 fill-current" />
          Upgrade to Intelligence Pro
        </button>
        
        <p className="mt-6 text-[10px] font-black text-black/20 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <ShieldCheck className="h-3 w-3" />
          Enterprise-Grade Security Included
        </p>
      </motion.div>
    </div>
  );
}
