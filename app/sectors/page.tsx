"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3, Briefcase, Ship, Coins, CircleDollarSign, UtensilsCrossed,
  Layers, Crown, ChevronRight, Zap, TrendingUp, TrendingDown,
} from "lucide-react";

const SECTORS = [
  {
    id: "economy",
    label: "Economy",
    description: "GDP, inflation & growth",
    icon: BarChart3,
    colorClass: "from-emerald-500 to-teal-600",
    bgClass: "bg-emerald-50",
    ringClass: "ring-emerald-100",
    textClass: "text-emerald-700",
    href: "/economy",
    stat: "+4.2%",
    statLabel: "YoY Growth",
    isUp: true,
  },
  {
    id: "employment",
    label: "Employment",
    description: "Jobs, wages & labour",
    icon: Briefcase,
    colorClass: "from-blue-500 to-indigo-600",
    bgClass: "bg-blue-50",
    ringClass: "ring-blue-100",
    textClass: "text-blue-700",
    href: "/employment",
    stat: "6.8%",
    statLabel: "Unemployment",
    isUp: false,
  },
  {
    id: "trade",
    label: "Import & Export",
    description: "Trade flows & balances",
    icon: Ship,
    colorClass: "from-indigo-500 to-violet-600",
    bgClass: "bg-indigo-50",
    ringClass: "ring-indigo-100",
    textClass: "text-indigo-700",
    href: "/trade",
    stat: "$2.1T",
    statLabel: "Trade Volume",
    isUp: true,
  },
  {
    id: "currency",
    label: "Currency",
    description: "FX rates & reserves",
    icon: Coins,
    colorClass: "from-amber-500 to-orange-500",
    bgClass: "bg-amber-50",
    ringClass: "ring-amber-100",
    textClass: "text-amber-700",
    href: "/currency",
    stat: "±2.3%",
    statLabel: "FX Volatility",
    isUp: false,
  },
  {
    id: "finance",
    label: "Finance",
    description: "Markets & capital flows",
    icon: CircleDollarSign,
    colorClass: "from-violet-500 to-purple-600",
    bgClass: "bg-violet-50",
    ringClass: "ring-violet-100",
    textClass: "text-violet-700",
    href: "/finance",
    stat: "+8.4%",
    statLabel: "Market Index",
    isUp: true,
  },
  {
    id: "food",
    label: "Food Security",
    description: "Agriculture & supply",
    icon: UtensilsCrossed,
    colorClass: "from-orange-500 to-red-500",
    bgClass: "bg-orange-50",
    ringClass: "ring-orange-100",
    textClass: "text-orange-700",
    href: "/food",
    stat: "67%",
    statLabel: "Food Access",
    isUp: true,
  },
  {
    id: "other",
    label: "Other Sectors",
    description: "Energy, health & more",
    icon: Layers,
    colorClass: "from-slate-500 to-gray-600",
    bgClass: "bg-slate-50",
    ringClass: "ring-slate-100",
    textClass: "text-slate-700",
    href: "/other",
    stat: "12+",
    statLabel: "Industries",
    isUp: true,
  },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function SectorsPage() {
  return (
    <div className="min-h-screen bg-white mesh-gradient">
      {/* ── Header ── */}
      <div className="px-4 sm:px-6 pt-8 pb-5">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Live Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1 text-black">Markets</h1>
          <p className="text-[11px] font-bold uppercase tracking-widest text-black/35">7 Active Sectors · All Africa</p>
        </motion.div>
      </div>

      {/* ── Sector Cards Grid ── */}
      <div className="px-4 sm:px-6 pb-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3"
        >
          {SECTORS.map((sector) => (
            <motion.div key={sector.id} variants={item}>
              <Link
                href={sector.href}
                className={`flex flex-col h-full p-4 rounded-3xl ${sector.bgClass} ring-1 ${sector.ringClass} active:scale-[0.95] transition-transform duration-150 select-none`}
              >
                {/* Top row: icon + arrow */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${sector.colorClass} shadow-md`}>
                    <sector.icon className="h-[18px] w-[18px] text-white" strokeWidth={2} />
                  </div>
                  <ChevronRight className="h-4 w-4 text-black/15 mt-0.5 shrink-0" />
                </div>

                {/* Label + description */}
                <p className="font-black text-[13px] text-black leading-snug">{sector.label}</p>
                <p className="text-[10px] text-black/40 font-medium leading-snug mt-0.5 mb-3">{sector.description}</p>

                {/* Stat */}
                <div className="mt-auto flex items-center gap-1.5">
                  {sector.isUp
                    ? <TrendingUp className={`h-3 w-3 ${sector.textClass} shrink-0`} strokeWidth={2.5} />
                    : <TrendingDown className={`h-3 w-3 ${sector.textClass} shrink-0`} strokeWidth={2.5} />
                  }
                  <span className={`text-sm font-black ${sector.textClass}`}>{sector.stat}</span>
                  <span className="text-[9px] font-black text-black/30 uppercase tracking-wide">{sector.statLabel}</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* ── Pro Access — full width ── */}
          <motion.div variants={item} className="col-span-2">
            <div className="relative flex items-center justify-between p-5 rounded-3xl bg-black overflow-hidden">
              {/* Ambient glows */}
              <div className="absolute -top-6 right-10 h-28 w-28 bg-amber-400/15 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-8 h-20 w-20 bg-primary/10 blur-2xl rounded-full pointer-events-none" />

              <div className="relative z-10 flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Crown className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="text-[9.5px] font-black uppercase tracking-[0.3em] text-amber-400">Pro Access</span>
                </div>
                <h3 className="text-white font-black text-[17px] leading-tight">Unlock Deep Intelligence</h3>
                <p className="text-white/35 text-[11px] font-medium mt-1 leading-relaxed">
                  54 countries · historical data · API access
                </p>
              </div>

              <div className="relative z-10 shrink-0">
                <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-400 text-black text-[11px] font-black active:scale-95 transition-transform shadow-lg shadow-amber-400/25 whitespace-nowrap">
                  Upgrade
                  <Zap className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
