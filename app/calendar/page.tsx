"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar, Filter, TrendingUp, DollarSign, BarChart3, Briefcase, Globe, ChevronLeft, ChevronRight, Clock, AlertCircle } from "lucide-react";

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
  { id: "1",  title: "CBN Interest Rate Decision",        country: "Nigeria",       countryCode: "NGA", category: "Interest Rate", date: "2025-04-23", time: "14:00 GMT", impact: "high",   forecast: "27.50%", previous: "27.50%" },
  { id: "2",  title: "CPI Inflation Rate",                country: "South Africa",  countryCode: "ZAF", category: "Inflation",     date: "2025-04-24", time: "09:00 GMT", impact: "high",   forecast: "3.2%",   previous: "3.2%"  },
  { id: "3",  title: "GDP Growth Q1 2025",                country: "Kenya",         countryCode: "KEN", category: "GDP",           date: "2025-04-28", time: "10:00 GMT", impact: "high",   forecast: "5.4%",   previous: "5.1%"  },
  { id: "4",  title: "Trade Balance February",            country: "Egypt",         countryCode: "EGY", category: "Trade",         date: "2025-04-29", time: "11:00 GMT", impact: "medium", forecast: "-$2.1B", previous: "-$2.4B"},
  { id: "5",  title: "Annual Budget Statement",           country: "Ghana",         countryCode: "GHA", category: "Budget",        date: "2025-05-05", time: "13:00 GMT", impact: "high",   forecast: "N/A",    previous: "N/A"   },
  { id: "6",  title: "Inflation Rate April",              country: "Morocco",       countryCode: "MAR", category: "Inflation",     date: "2025-05-07", time: "09:30 GMT", impact: "medium", forecast: "2.8%",   previous: "2.5%"  },
  { id: "7",  title: "GDP Annual Growth",                 country: "Ethiopia",      countryCode: "ETH", category: "GDP",           date: "2025-05-12", time: "10:00 GMT", impact: "high",   forecast: "7.2%",   previous: "7.1%"  },
  { id: "8",  title: "National Bank Rate Decision",       country: "Rwanda",        countryCode: "RWA", category: "Interest Rate", date: "2025-05-14", time: "12:00 GMT", impact: "medium", forecast: "7.00%",  previous: "7.00%" },
  { id: "9",  title: "PMI Manufacturing",                 country: "Ivory Coast",   countryCode: "CIV", category: "PMI",           date: "2025-05-15", time: "08:00 GMT", impact: "low",    forecast: "52.1",   previous: "51.8"  },
  { id: "10", title: "GDP Growth Q1 2025",                country: "Nigeria",       countryCode: "NGA", category: "GDP",           date: "2025-05-20", time: "10:00 GMT", impact: "high",   forecast: "3.2%",   previous: "2.9%"  },
  { id: "11", title: "GDP Growth Q1 2025",                country: "South Africa",  countryCode: "ZAF", category: "GDP",           date: "2025-05-27", time: "09:00 GMT", impact: "high",   forecast: "1.2%",   previous: "0.6%"  },
  { id: "12", title: "CPI Inflation April",               country: "Kenya",         countryCode: "KEN", category: "Inflation",     date: "2025-05-29", time: "10:00 GMT", impact: "medium", forecast: "4.5%",   previous: "4.1%"  },
  { id: "13", title: "Central Bank Rate Decision",        country: "Egypt",         countryCode: "EGY", category: "Interest Rate", date: "2025-06-05", time: "14:00 GMT", impact: "high",   forecast: "27.25%", previous: "27.25%"},
  { id: "14", title: "Inflation Rate May",                country: "Nigeria",       countryCode: "NGA", category: "Inflation",     date: "2025-06-12", time: "10:00 GMT", impact: "high",   forecast: "31.5%",  previous: "33.2%" },
  { id: "15", title: "AfCFTA Trade Summit",               country: "Pan-Africa",    countryCode: "AFR", category: "Trade",         date: "2025-06-18", time: "09:00 GMT", impact: "high",   forecast: "N/A",    previous: "N/A"   },
  { id: "16", title: "Unemployment Rate Q1",              country: "South Africa",  countryCode: "ZAF", category: "Employment",    date: "2025-06-24", time: "09:00 GMT", impact: "high",   forecast: "31.8%",  previous: "32.1%" },
  { id: "17", title: "Trade Balance March",               country: "Morocco",       countryCode: "MAR", category: "Trade",         date: "2025-07-03", time: "10:00 GMT", impact: "low",    forecast: "-$1.8B", previous: "-$2.0B"},
  { id: "18", title: "MPC Interest Rate Meeting",         country: "Ghana",         countryCode: "GHA", category: "Interest Rate", date: "2025-07-09", time: "14:00 GMT", impact: "high",   forecast: "29.00%", previous: "29.00%"},
  { id: "19", title: "GDP Growth H1 2025",                country: "Tanzania",      countryCode: "TZA", category: "GDP",           date: "2025-07-15", time: "10:00 GMT", impact: "medium", forecast: "6.1%",   previous: "5.8%"  },
  { id: "20", title: "Current Account Balance Q1",        country: "Nigeria",       countryCode: "NGA", category: "Trade",         date: "2025-07-22", time: "10:00 GMT", impact: "medium", forecast: "+$1.2B", previous: "+$0.8B"},
];

const CATEGORIES = ["All", "GDP", "Inflation", "Interest Rate", "Trade", "Employment", "Budget", "PMI"];
const IMPACTS    = ["All", "high", "medium", "low"];

const CATEGORY_ICONS: Record<string, any> = {
  "GDP":           TrendingUp,
  "Inflation":     BarChart3,
  "Interest Rate": DollarSign,
  "Trade":         Globe,
  "Employment":    Briefcase,
  "Budget":        Calendar,
  "PMI":           BarChart3,
};

const COUNTRY_FLAGS: Record<string, string> = {
  NGA: "🇳🇬", ZAF: "🇿🇦", KEN: "🇰🇪", EGY: "🇪🇬",
  GHA: "🇬🇭", MAR: "🇲🇦", ETH: "🇪🇹", RWA: "🇷🇼",
  CIV: "🇨🇮", TZA: "🇹🇿", AFR: "🌍",
};

const IMPACT_STYLES = {
  high:   "bg-red-50 text-red-600 border border-red-200",
  medium: "bg-amber-50 text-amber-600 border border-amber-200",
  low:    "bg-emerald-50 text-emerald-600 border border-emerald-200",
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
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function isToday(dateStr: string) {
  return dateStr.slice(0, 10) === new Date().toISOString().slice(0, 10);
}

export default function CalendarPage() {
  const [events, setEvents]           = useState<CalendarEvent[]>([]);
  const [loading, setLoading]         = useState(true);
  const [category, setCategory]       = useState("All");
  const [impact, setImpact]           = useState("All");
  const [search, setSearch]           = useState("");
  const [expanded, setExpanded]       = useState<string | null>(null);

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

  const filtered = useMemo(() => {
    return events.filter(e => {
      if (category !== "All" && e.category !== category) return false;
      if (impact   !== "All" && e.impact   !== impact)   return false;
      if (search && !e.title.toLowerCase().includes(search.toLowerCase()) &&
          !e.country.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [events, category, impact, search]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);
  const dateKeys = Object.keys(grouped).sort();

  const highCount   = events.filter(e => e.impact === "high").length;
  const todayCount  = events.filter(e => e.date.slice(0, 10) === new Date().toISOString().slice(0, 10)).length;

  return (
    <div className="min-h-screen" style={{ background: "transparent" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight">Economic Calendar</h1>
              <p className="text-sm text-secondary">Upcoming African economic events, data releases & policy decisions</p>
            </div>
          </div>

          {/* Summary pills */}
          <div className="flex gap-3 mt-5 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border shadow-sm">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-bold text-foreground">{highCount}</span>
              <span className="text-xs text-secondary">High Impact</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border shadow-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-foreground">{events.length}</span>
              <span className="text-xs text-secondary">Total Events</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border shadow-sm">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-bold text-foreground">{todayCount}</span>
              <span className="text-xs text-secondary">Today</span>
            </div>
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search events or countries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-border bg-muted/50 px-3 text-sm text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
            />
            {/* Category */}
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="h-9 rounded-lg border border-border bg-muted/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            {/* Impact */}
            <select
              value={impact}
              onChange={e => setImpact(e.target.value)}
              className="h-9 rounded-lg border border-border bg-muted/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {IMPACTS.map(i => <option key={i} value={i}>{i === "All" ? "All Impact" : i.charAt(0).toUpperCase() + i.slice(1)}</option>)}
            </select>
          </div>
        </div>

        {/* ── Events list ── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : dateKeys.length === 0 ? (
          <div className="text-center py-20 text-secondary">No events match your filters.</div>
        ) : (
          <div className="space-y-6">
            {dateKeys.map(dateKey => (
              <div key={dateKey}>
                {/* Date header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    isToday(dateKey)
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-white border border-border text-secondary shadow-sm"
                  }`}>
                    {isToday(dateKey) ? "Today" : formatDate(dateKey)}
                  </div>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-secondary/60">{grouped[dateKey].length} event{grouped[dateKey].length > 1 ? "s" : ""}</span>
                </div>

                {/* Events for this date */}
                <div className="space-y-2">
                  {grouped[dateKey].map(event => {
                    const Icon = CATEGORY_ICONS[event.category] ?? Calendar;
                    const isOpen = expanded === event.id;
                    return (
                      <div
                        key={event.id}
                        onClick={() => setExpanded(isOpen ? null : event.id)}
                        className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer overflow-hidden"
                      >
                        <div className="flex items-center gap-4 p-4">
                          {/* Impact bar */}
                          <div className={`w-1 self-stretch rounded-full ${
                            event.impact === "high" ? "bg-red-500" :
                            event.impact === "medium" ? "bg-amber-400" : "bg-emerald-500"
                          }`} />

                          {/* Icon */}
                          <div className="p-2 rounded-xl bg-muted flex-shrink-0">
                            <Icon className="h-4 w-4 text-secondary" />
                          </div>

                          {/* Main info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-lg">{COUNTRY_FLAGS[event.countryCode] ?? "🌍"}</span>
                              <span className="font-bold text-sm text-foreground">{event.title}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className="text-xs text-secondary">{event.country}</span>
                              {event.time && (
                                <>
                                  <span className="text-secondary/30">·</span>
                                  <span className="text-xs text-secondary flex items-center gap-1">
                                    <Clock className="h-3 w-3" />{event.time}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Right side */}
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider ${IMPACT_STYLES[event.impact]}`}>
                              {event.impact}
                            </span>
                            <span className="text-xs text-secondary/40 bg-muted px-2 py-1 rounded-lg font-medium">
                              {event.category}
                            </span>
                          </div>
                        </div>

                        {/* Expanded detail */}
                        {isOpen && (
                          <div className="border-t border-border px-4 py-3 bg-muted/40">
                            <div className="grid grid-cols-3 gap-4">
                              {[
                                { label: "Forecast", value: event.forecast },
                                { label: "Previous", value: event.previous },
                                { label: "Actual",   value: event.actual ?? "Pending" },
                              ].map(({ label, value }) => (
                                <div key={label} className="text-center">
                                  <p className="text-[10px] text-secondary uppercase tracking-wider font-bold">{label}</p>
                                  <p className={`text-sm font-black mt-0.5 ${label === "Actual" && event.actual ? "text-primary" : "text-foreground"}`}>
                                    {value ?? "—"}
                                  </p>
                                </div>
                              ))}
                            </div>
                            {event.description && (
                              <p className="text-xs text-secondary mt-3 border-t border-border pt-3">{event.description}</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
