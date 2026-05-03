"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays, TrendingUp, DollarSign, BarChart3, Briefcase,
  Globe, Clock, AlertCircle, Search, X, ChevronDown, ChevronUp, Zap,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  country: string;
  countryCode: string;
  category: string;
  date: string;
  time?: string;
  impact: "high" | "medium" | "low";
  actual?: string;
  forecast?: string;
  previous?: string;
  description?: string;
}

const SEED_EVENTS: CalendarEvent[] = [
  { id: "1",  title: "CBN Interest Rate Decision",   country: "Nigeria",      countryCode: "NGA", category: "Interest Rate", date: "2025-04-23", time: "14:00 GMT", impact: "high",   forecast: "27.50%", previous: "27.50%" },
  { id: "2",  title: "CPI Inflation Rate",            country: "South Africa", countryCode: "ZAF", category: "Inflation",     date: "2025-04-24", time: "09:00 GMT", impact: "high",   forecast: "3.2%",   previous: "3.2%"  },
  { id: "3",  title: "GDP Growth Q1 2025",            country: "Kenya",        countryCode: "KEN", category: "GDP",           date: "2025-04-28", time: "10:00 GMT", impact: "high",   forecast: "5.4%",   previous: "5.1%"  },
  { id: "4",  title: "Trade Balance February",        country: "Egypt",        countryCode: "EGY", category: "Trade",         date: "2025-04-29", time: "11:00 GMT", impact: "medium", forecast: "-$2.1B", previous: "-$2.4B"},
  { id: "5",  title: "Annual Budget Statement",       country: "Ghana",        countryCode: "GHA", category: "Budget",        date: "2025-05-05", time: "13:00 GMT", impact: "high",   forecast: "N/A",    previous: "N/A"   },
  { id: "6",  title: "Inflation Rate April",          country: "Morocco",      countryCode: "MAR", category: "Inflation",     date: "2025-05-07", time: "09:30 GMT", impact: "medium", forecast: "2.8%",   previous: "2.5%"  },
  { id: "7",  title: "GDP Annual Growth",             country: "Ethiopia",     countryCode: "ETH", category: "GDP",           date: "2025-05-12", time: "10:00 GMT", impact: "high",   forecast: "7.2%",   previous: "7.1%"  },
  { id: "8",  title: "National Bank Rate Decision",   country: "Rwanda",       countryCode: "RWA", category: "Interest Rate", date: "2025-05-14", time: "12:00 GMT", impact: "medium", forecast: "7.00%",  previous: "7.00%" },
  { id: "9",  title: "PMI Manufacturing",             country: "Ivory Coast",  countryCode: "CIV", category: "PMI",           date: "2025-05-15", time: "08:00 GMT", impact: "low",    forecast: "52.1",   previous: "51.8"  },
  { id: "10", title: "GDP Growth Q1 2025",            country: "Nigeria",      countryCode: "NGA", category: "GDP",           date: "2025-05-20", time: "10:00 GMT", impact: "high",   forecast: "3.2%",   previous: "2.9%"  },
  { id: "11", title: "GDP Growth Q1 2025",            country: "South Africa", countryCode: "ZAF", category: "GDP",           date: "2025-05-27", time: "09:00 GMT", impact: "high",   forecast: "1.2%",   previous: "0.6%"  },
  { id: "12", title: "CPI Inflation April",           country: "Kenya",        countryCode: "KEN", category: "Inflation",     date: "2025-05-29", time: "10:00 GMT", impact: "medium", forecast: "4.5%",   previous: "4.1%"  },
  { id: "13", title: "Central Bank Rate Decision",    country: "Egypt",        countryCode: "EGY", category: "Interest Rate", date: "2025-06-05", time: "14:00 GMT", impact: "high",   forecast: "27.25%", previous: "27.25%"},
  { id: "14", title: "Inflation Rate May",            country: "Nigeria",      countryCode: "NGA", category: "Inflation",     date: "2025-06-12", time: "10:00 GMT", impact: "high",   forecast: "31.5%",  previous: "33.2%" },
  { id: "15", title: "AfCFTA Trade Summit",           country: "Pan-Africa",   countryCode: "AFR", category: "Trade",         date: "2025-06-18", time: "09:00 GMT", impact: "high",   forecast: "N/A",    previous: "N/A"   },
  { id: "16", title: "Unemployment Rate Q1",          country: "South Africa", countryCode: "ZAF", category: "Employment",    date: "2025-06-24", time: "09:00 GMT", impact: "high",   forecast: "31.8%",  previous: "32.1%" },
  { id: "17", title: "Trade Balance March",           country: "Morocco",      countryCode: "MAR", category: "Trade",         date: "2025-07-03", time: "10:00 GMT", impact: "low",    forecast: "-$1.8B", previous: "-$2.0B"},
  { id: "18", title: "MPC Interest Rate Meeting",     country: "Ghana",        countryCode: "GHA", category: "Interest Rate", date: "2025-07-09", time: "14:00 GMT", impact: "high",   forecast: "29.00%", previous: "29.00%"},
  { id: "19", title: "GDP Growth H1 2025",            country: "Tanzania",     countryCode: "TZA", category: "GDP",           date: "2025-07-15", time: "10:00 GMT", impact: "medium", forecast: "6.1%",   previous: "5.8%"  },
  { id: "20", title: "Current Account Balance Q1",   country: "Nigeria",      countryCode: "NGA", category: "Trade",         date: "2025-07-22", time: "10:00 GMT", impact: "medium", forecast: "+$1.2B", previous: "+$0.8B"},
];


const CATEGORY_META: Record<string, { icon: any; color: string; bg: string }> = {
  "GDP":           { icon: TrendingUp,  color: "text-emerald-600", bg: "bg-emerald-50"  },
  "Inflation":     { icon: BarChart3,   color: "text-orange-600",  bg: "bg-orange-50"   },
  "Interest Rate": { icon: DollarSign,  color: "text-violet-600",  bg: "bg-violet-50"   },
  "Trade":         { icon: Globe,       color: "text-blue-600",    bg: "bg-blue-50"     },
  "Employment":    { icon: Briefcase,   color: "text-indigo-600",  bg: "bg-indigo-50"   },
  "Budget":        { icon: CalendarDays,color: "text-primary",     bg: "bg-primary/8"   },
  "PMI":           { icon: BarChart3,   color: "text-cyan-600",    bg: "bg-cyan-50"     },
};

const COUNTRY_FLAGS: Record<string, string> = {
  NGA: "🇳🇬", ZAF: "🇿🇦", KEN: "🇰🇪", EGY: "🇪🇬",
  GHA: "🇬🇭", MAR: "🇲🇦", ETH: "🇪🇹", RWA: "🇷🇼",
  CIV: "🇨🇮", TZA: "🇹🇿", AFR: "🌍",
};

const IMPACT_META = {
  high:   { label: "High",   bar: "bg-red-500",     badge: "bg-red-50 text-red-600 border-red-200/80",          dot: "bg-red-500"     },
  medium: { label: "Medium", bar: "bg-amber-400",   badge: "bg-amber-50 text-amber-600 border-amber-200/80",    dot: "bg-amber-400"   },
  low:    { label: "Low",    bar: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-600 border-emerald-200/80", dot: "bg-emerald-500" },
};

function groupByDate(events: CalendarEvent[]) {
  return events.reduce((acc, event) => {
    const key = event.date.slice(0, 10);
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function isToday(dateStr: string) {
  return dateStr.slice(0, 10) === new Date().toISOString().slice(0, 10);
}

function isPast(dateStr: string) {
  return new Date(dateStr + "T23:59:59") < new Date();
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function CalendarPage() {
  const [events, setEvents]     = useState<CalendarEvent[]>([]);
  const [loading, setLoading]   = useState(true);
  const [category, setCategory] = useState("All");
  const [impact, setImpact]     = useState("All");
  const [search, setSearch]     = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/calendar")
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data.events ?? []);
        setEvents(list.length > 0 ? list : SEED_EVENTS);
      })
      .catch(() => setEvents(SEED_EVENTS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => events.filter(e => {
    if (category !== "All" && e.category !== category) return false;
    if (impact   !== "All" && e.impact   !== impact)   return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase()) &&
        !e.country.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [events, category, impact, search]);

  const grouped  = useMemo(() => groupByDate(filtered), [filtered]);
  const dateKeys = Object.keys(grouped).sort();

  const highCount  = events.filter(e => e.impact === "high").length;
  const todayCount = events.filter(e => isToday(e.date)).length;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">

      {/* ── Sticky header ───────────────────────────────────────── */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-black/6 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Title row */}
          <div className="flex items-center justify-between gap-4 pt-6 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Live Events</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black leading-none">
                Economic Calendar
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-200 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Live</span>
            </div>
          </div>

          {/* Summary stat pills */}
          <div className="grid grid-cols-3 gap-2 pb-4">
            {[
              { label: "High Impact", value: String(highCount),    icon: AlertCircle, color: "text-red-600",    iconBg: "bg-red-50"     },
              { label: "Total Events",value: String(events.length),icon: CalendarDays,color: "text-primary",    iconBg: "bg-primary/8"  },
              { label: "Today",       value: String(todayCount),   icon: Clock,       color: "text-amber-600",  iconBg: "bg-amber-50"   },
            ].map(({ label, value, icon: Icon, color, iconBg }) => (
              <div key={label} className="flex items-center gap-2.5 bg-black/2.5 rounded-2xl px-3.5 py-2.5">
                <div className={`p-1.5 rounded-xl ${iconBg} shrink-0`}>
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-black text-black/35 uppercase tracking-wider leading-none mb-0.5 truncate">{label}</p>
                  <p className={`text-base font-black ${color} leading-none`}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2.5 pb-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:w-60 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/30 pointer-events-none" />
              <input
                type="text"
                placeholder="Event or country…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-8 rounded-xl bg-black/4 border border-transparent focus:border-primary/25 focus:bg-white focus:shadow-sm text-sm text-black placeholder:text-black/30 outline-none transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-black/8 transition-colors">
                  <X className="h-3 w-3 text-black/40" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex gap-1.5 flex-wrap">
              {["All", "GDP", "Inflation", "Interest Rate", "Trade", "Employment"].map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 ${
                    category === c
                      ? "bg-black text-white"
                      : "bg-black/4 text-black/50 hover:bg-black/8 hover:text-black/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Impact filter */}
            <div className="flex gap-1.5 sm:ml-auto shrink-0">
              {(["All", "high", "medium", "low"] as const).map(i => (
                <button
                  key={i}
                  onClick={() => setImpact(i)}
                  className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 capitalize ${
                    impact === i
                      ? i === "All" ? "bg-black text-white"
                        : i === "high" ? "bg-red-500 text-white"
                        : i === "medium" ? "bg-amber-400 text-white"
                        : "bg-emerald-500 text-white"
                      : "bg-black/4 text-black/50 hover:bg-black/8 hover:text-black/70"
                  }`}
                >
                  {i === "All" ? "All" : i}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Events list ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : dateKeys.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="h-16 w-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="h-8 w-8 text-primary/30" />
            </div>
            <p className="font-black text-black text-lg">No events found</p>
            <p className="text-sm text-black/40 mt-1">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={category + impact + search}
              initial="hidden"
              animate="show"
              className="space-y-8"
              transition={{ staggerChildren: 0.04 }}
            >
              {dateKeys.map(dateKey => (
                <motion.div key={dateKey} variants={cardVariants}>
                  {/* Date header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shrink-0 ${
                      isToday(dateKey)
                        ? "bg-primary text-white shadow-md shadow-primary/25"
                        : isPast(dateKey)
                        ? "bg-black/4 text-black/30"
                        : "bg-white border border-black/6 text-black/60 shadow-sm"
                    }`}>
                      {isToday(dateKey) ? "Today" : formatDate(dateKey)}
                    </div>
                    <div className="flex-1 h-px bg-black/[0.06]" />
                    <span className="text-[11px] text-black/30 font-bold shrink-0">
                      {grouped[dateKey].length} event{grouped[dateKey].length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Events for date */}
                  <div className="space-y-2.5">
                    {grouped[dateKey].map(event => {
                      const meta  = CATEGORY_META[event.category] ?? { icon: CalendarDays, color: "text-black/50", bg: "bg-black/4" };
                      const imp   = IMPACT_META[event.impact];
                      const Icon  = meta.icon;
                      const isOpen = expanded === event.id;
                      const past   = isPast(event.date);

                      return (
                        <motion.div
                          key={event.id}
                          layout
                          onClick={() => setExpanded(isOpen ? null : event.id)}
                          className={`group bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                            isOpen
                              ? "border-primary/20 shadow-lg shadow-primary/6"
                              : "border-black/6 hover:border-primary/15 hover:shadow-md hover:shadow-black/6"
                          }`}
                        >
                          {/* Subtle top accent */}
                          <div className={`h-0.5 ${imp.bar} ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-40"} transition-opacity duration-300`} />

                          <div className="flex items-center gap-3.5 px-4 py-3.5">
                            {/* Category icon */}
                            <div className={`p-2 rounded-xl ${meta.bg} shrink-0`}>
                              <Icon className={`h-4 w-4 ${meta.color}`} />
                            </div>

                            {/* Main info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-base leading-none">{COUNTRY_FLAGS[event.countryCode] ?? "🌍"}</span>
                                <span className={`font-bold text-sm leading-tight ${past ? "text-black/40" : "text-black"}`}>
                                  {event.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-[11px] text-black/40 font-medium">{event.country}</span>
                                {event.time && (
                                  <>
                                    <span className="text-black/15">·</span>
                                    <span className="text-[11px] text-black/35 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />{event.time}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Right: badges + expand */}
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`hidden sm:flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg border ${imp.badge}`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${imp.dot} shrink-0`} />
                                {imp.label}
                              </span>
                              <span className="hidden md:block text-[10px] font-bold text-black/30 bg-black/4 px-2 py-1 rounded-lg">
                                {event.category}
                              </span>
                              {isOpen
                                ? <ChevronUp className="h-4 w-4 text-black/30 shrink-0" />
                                : <ChevronDown className="h-4 w-4 text-black/20 group-hover:text-black/40 shrink-0 transition-colors" />
                              }
                            </div>
                          </div>

                          {/* Expanded detail */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-black/5 px-4 py-4 bg-black/1.5">
                                  <div className="grid grid-cols-3 gap-3 mb-3">
                                    {[
                                      { label: "Forecast", value: event.forecast, accent: false },
                                      { label: "Previous", value: event.previous, accent: false },
                                      { label: "Actual",   value: event.actual ?? "Pending", accent: !!event.actual },
                                    ].map(({ label, value, accent }) => (
                                      <div key={label} className="text-center bg-white rounded-xl px-3 py-2.5 border border-black/5">
                                        <p className="text-[9px] text-black/35 uppercase tracking-wider font-black mb-1">{label}</p>
                                        <p className={`text-sm font-black ${accent ? "text-primary" : "text-black"}`}>
                                          {value ?? "—"}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  {event.description && (
                                    <p className="text-[11px] text-black/45 leading-relaxed">{event.description}</p>
                                  )}
                                  <div className="flex items-center gap-1 mt-2.5">
                                    <Zap className="h-2.5 w-2.5 text-primary/50" />
                                    <span className="text-[10px] font-bold text-black/25 uppercase tracking-wider">{event.category}</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
