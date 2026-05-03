"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users,
  BarChart3, Globe, CalendarDays, Activity, Briefcase,
  Landmark, PiggyBank, Banknote, MapPin, Zap, ChevronRight,
} from "lucide-react";
import { COUNTRY_PROFILES } from "@/lib/countryProfiles";
import { Flag } from "@/components/Flag";

const IMPACT_STYLES = {
  high:   "bg-red-50 text-red-600 border-red-200/80",
  medium: "bg-amber-50 text-amber-600 border-amber-200/80",
  low:    "bg-emerald-50 text-emerald-600 border-emerald-200/80",
};

const RATING_STYLES = {
  strong:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  moderate: "bg-amber-50 text-amber-700 border-amber-200",
  weak:     "bg-red-50 text-red-600 border-red-200",
};

const stagger = { show: { transition: { staggerChildren: 0.055 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function CountryProfilePage() {
  const params  = useParams();
  const code    = (params?.code as string)?.toUpperCase();
  const country = COUNTRY_PROFILES[code];

  if (!country) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="h-20 w-20 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-5">
            <Globe className="h-10 w-10 text-primary/30" />
          </div>
          <h2 className="text-2xl font-black text-black mb-2">Country not found</h2>
          <p className="text-sm text-black/40 mb-6">Profile for &quot;{code}&quot; is not yet available.</p>
          <Link href="/countries" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Countries
          </Link>
        </motion.div>
      </div>
    );
  }

  const rs = RATING_STYLES[country.ratingTier];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">

      {/* ── Sticky header ───────────────────────────────────────── */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-black/6 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <Link
            href="/countries"
            className="h-9 w-9 rounded-xl bg-black/4 hover:bg-black/8 flex items-center justify-center transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4 text-black/60" />
          </Link>
          <Flag code={country.code} size="md" />
          <div className="min-w-0">
            <p className="text-sm font-black text-black leading-none truncate">{country.name}</p>
            <p className="text-[10px] text-black/35 font-medium mt-0.5">{country.region}</p>
          </div>
          <span className={`ml-auto shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-black ${rs}`}>
            {country.rating}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">

          {/* ── Hero card ─────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl border border-black/6 overflow-hidden">
            <div className="relative p-6 sm:p-8">
              {/* Flag watermark */}
              <div className="absolute top-4 right-6 opacity-[0.045] pointer-events-none">
                <Flag code={country.code} size="xl" className="w-[180px] h-[120px]" />
              </div>

              <div className="relative flex flex-col sm:flex-row sm:items-start gap-5">
                <Flag code={country.code} size="xl" className="rounded-xl shadow-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start flex-wrap gap-3 mb-3">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight leading-none">
                        {country.name}
                      </h1>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-black/30" />
                          <span className="text-xs text-black/40 font-medium">{country.capital}</span>
                        </div>
                        <span className="text-black/15">·</span>
                        <span className="text-xs text-black/40 font-medium">{country.region}</span>
                        <span className="text-black/15">·</span>
                        <span className="flex items-center gap-1 text-[10px] font-black text-primary bg-primary/6 border border-primary/10 px-2 py-0.5 rounded-full">
                          <Zap className="h-2.5 w-2.5" />{country.currency}
                        </span>
                      </div>
                    </div>
                    <span className={`ml-auto sm:ml-0 shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black ${rs}`}>
                      {country.rating} Rating
                    </span>
                  </div>
                  <p className="text-sm text-black/55 leading-relaxed max-w-3xl">
                    {country.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Key Metrics (6 cards) ──────────────────────────────── */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "GDP",         value: country.gdp,          sub: country.gdpGrowth,       icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50",  isGrowth: true },
              { label: "GDP Growth",  value: country.gdpGrowth,    sub: "Annual",                icon: TrendingUp,  color: country.gdpGrowthPositive ? "text-emerald-600" : "text-red-500", bg: country.gdpGrowthPositive ? "bg-emerald-50" : "bg-red-50", isGrowth: false },
              { label: "Per Capita",  value: country.gdpPerCapita, sub: "GDP / person",          icon: Banknote,   color: "text-blue-600",   bg: "bg-blue-50",    isGrowth: false },
              { label: "Population",  value: country.population,   sub: country.region,          icon: Users,      color: "text-violet-600", bg: "bg-violet-50",  isGrowth: false },
              { label: "Inflation",   value: country.inflation,    sub: "Latest CPI",            icon: Activity,   color: "text-orange-600", bg: "bg-orange-50",  isGrowth: false },
              { label: "Policy Rate", value: country.interestRate, sub: "Central Bank",          icon: Landmark,   color: "text-primary",    bg: "bg-primary/8",  isGrowth: false },
            ].map(({ label, value, sub, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border border-black/6 p-4">
                <div className={`p-2 rounded-xl ${bg} w-fit mb-2.5`}>
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                </div>
                <p className="text-[9px] font-black text-black/30 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className={`text-lg font-black leading-none ${color}`}>{value}</p>
                <p className="text-[10px] text-black/30 font-medium mt-1 leading-none">{sub}</p>
              </div>
            ))}
          </motion.div>

          {/* ── Additional Indicators ─────────────────────────────── */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Unemployment",    value: country.unemployment,  icon: Briefcase,  color: "text-indigo-600", bg: "bg-indigo-50"  },
              { label: "Debt / GDP",       value: country.debtToGDP,     icon: PiggyBank,  color: "text-amber-600",  bg: "bg-amber-50"   },
              { label: "FX Reserves",     value: country.fxReserves,    icon: Landmark,   color: "text-teal-600",   bg: "bg-teal-50"    },
              { label: "Current Account", value: country.currentAccount,icon: BarChart3,  color: "text-slate-600",  bg: "bg-slate-50"   },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border border-black/6 p-4 flex items-center gap-3">
                <div className={`p-2 rounded-xl ${bg} shrink-0`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black text-black/30 uppercase tracking-widest leading-none mb-1">{label}</p>
                  <p className={`text-base font-black leading-none ${color}`}>{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Main 2-column layout ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Left: 2/3 */}
            <div className="lg:col-span-2 space-y-5">

              {/* GDP by Sector */}
              <motion.div variants={fadeUp} className="bg-white rounded-3xl border border-black/6 p-6">
                <h2 className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-5 flex items-center gap-2">
                  <BarChart3 className="h-3.5 w-3.5" /> GDP by Sector
                </h2>
                <div className="space-y-4">
                  {country.sectors.map((sector, i) => {
                    const colors = [
                      { bar: "bg-primary", label: "text-primary" },
                      { bar: "bg-blue-500", label: "text-blue-600" },
                      { bar: "bg-emerald-500", label: "text-emerald-600" },
                    ];
                    const c = colors[i] ?? colors[0];
                    return (
                      <div key={sector.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-bold text-black/70">{sector.name}</span>
                          <span className={`text-sm font-black ${c.label}`}>{sector.share}</span>
                        </div>
                        <div className="h-2 rounded-full bg-black/4 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${sector.pct}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                            className={`h-full rounded-full ${c.bar}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Trade Flows */}
              <motion.div variants={fadeUp} className="bg-white rounded-3xl border border-black/6 p-6">
                <h2 className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-5 flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5" /> Key Trade Flows
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <TrendingUp className="h-3 w-3 text-emerald-500" /> Top Exports
                    </p>
                    <div className="space-y-2">
                      {country.exports.map((item, i) => (
                        <div key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/80">
                          <span className="text-[10px] font-black text-emerald-500/60 w-4 shrink-0">{i + 1}</span>
                          <span className="text-xs font-bold text-black/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <TrendingDown className="h-3 w-3 text-red-400" /> Top Imports
                    </p>
                    <div className="space-y-2">
                      {country.imports.map((item, i) => (
                        <div key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-50/60 border border-red-100/80">
                          <span className="text-[10px] font-black text-red-400/60 w-4 shrink-0">{i + 1}</span>
                          <span className="text-xs font-bold text-black/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trade Partners */}
                <div className="mt-5 pt-5 border-t border-black/5">
                  <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-3">Major Trade Partners</p>
                  <div className="flex flex-wrap gap-2">
                    {country.tradePartners.map((partner) => (
                      <span key={partner} className="px-3 py-1.5 rounded-full bg-black/4 text-xs font-bold text-black/55 border border-black/5">
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: 1/3 */}
            <div className="space-y-5">

              {/* Recent Data Releases */}
              <motion.div variants={fadeUp} className="bg-white rounded-3xl border border-black/6 p-6">
                <h2 className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5" /> Recent Data Releases
                </h2>
                <div className="space-y-3">
                  {country.recentEvents.map((event, i) => (
                    <div key={i} className={`flex items-start gap-3 pb-3 ${i < country.recentEvents.length - 1 ? "border-b border-black/5" : ""}`}>
                      <span className={`text-[9px] font-black px-2 py-1 rounded-lg border shrink-0 mt-0.5 ${IMPACT_STYLES[event.impact]}`}>
                        {event.impact.toUpperCase()}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-black/75 leading-snug">{event.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-black/30 font-medium">{event.date}</span>
                          <span className="text-xs font-black text-primary">{event.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/calendar"
                  className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-primary/70 hover:text-primary transition-colors py-2 border-t border-black/5"
                >
                  View Economic Calendar
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>

              {/* Quick Facts */}
              <motion.div variants={fadeUp} className="bg-white rounded-3xl border border-black/6 p-6">
                <h2 className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-4">Quick Facts</h2>
                <div className="space-y-0">
                  {[
                    { label: "Currency",      value: country.currency,     icon: Banknote   },
                    { label: "Capital City",  value: country.capital,      icon: MapPin     },
                    { label: "Region",        value: country.region,       icon: Globe      },
                    { label: "Credit Rating", value: country.rating,       icon: Landmark   },
                    { label: "GDP per Capita",value: country.gdpPerCapita, icon: DollarSign },
                    { label: "Population",    value: country.population,   icon: Users      },
                  ].map(({ label, value, icon: Icon }, i, arr) => (
                    <div key={label} className={`flex items-center justify-between py-2.5 ${i < arr.length - 1 ? "border-b border-black/5" : ""}`}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-black/25 shrink-0" />
                        <span className="text-xs text-black/40 font-medium">{label}</span>
                      </div>
                      <span className="text-xs font-black text-black/75">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
