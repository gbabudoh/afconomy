"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, ArrowDownRight, Activity, Info, Globe, ChevronDown, Check,
  Download, FileJson, FileSpreadsheet, FileText, Zap, Loader2
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { AFRICAN_COUNTRIES, AFRICAN_COUNTRIES_MAP, getCountryData } from "@/lib/africanData";
import { fetchIMFIndicator, IMF_INDICATORS } from "@/lib/imfService";
import { exportToCSV, exportToJSON } from "@/lib/exportUtils";
import { generatePDFReport } from "@/lib/reportGenerator";
import AISummary from "./AISummary";
import SentimentMeter from "./SentimentMeter";
import { Flag } from "./Flag";

interface Metric {
  label: string;
  value: string;
  change: string;
  isUp: boolean;
  icon: any;
}

interface SectorLayoutProps {
  title: string;
  subtitle: string;
  sectorId: "economy" | "employment" | "trade" | "currency" | "finance" | "food" | "other";
  initialMetrics: Metric[];
  initialChartData: any[];
  initialTableData: any[];
  children?: ReactNode;
}

export default function SectorLayout({ 
  title, 
  subtitle, 
  sectorId, 
  initialMetrics, 
  initialChartData, 
  initialTableData, 
  children 
}: SectorLayoutProps) {
  const [selectedCountry, setSelectedCountry] = useState("All Africa");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [metrics, setMetrics] = useState(initialMetrics);
  const [chartData, setChartData] = useState(initialChartData);
  const [tableData, setTableData] = useState(initialTableData);
  const [isLiveLoading, setIsLiveLoading] = useState(false);
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [isForecasting, setIsForecasting] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchForecast() {
      if (!showForecast || forecastData.length > 0) return;
      setIsForecasting(true);
      try {
        const res = await fetch("/api/ai/forecast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: selectedCountry, historicalData: chartData })
        });
        if (!res.ok) throw new Error("Forecast fetch failed");
        const data = await res.json();
        setForecastData(data.forecast || []);
      } catch (e) {
        console.error("Forecasting failed", e);
        setForecastData([]);
      } finally {
        setIsForecasting(false);
      }
    }
    fetchForecast();
  }, [showForecast, selectedCountry, chartData]);

  const combinedChartData = [
    ...chartData.map(d => ({ ...d, actualValue: d.value })),
    ...(showForecast ? forecastData.map((d, i) => ({ 
      ...d, 
      forecastValue: d.value,
      ...(i === 0 ? { actualValue: chartData[chartData.length - 1]?.value } : {})
    })) : [])
  ];

  useEffect(() => {
    async function fetchHeadlines() {
      try {
        const res = await fetch(`/api/news?country=${encodeURIComponent(selectedCountry)}&pageSize=5`);
        if (!res.ok) throw new Error("News fetch failed");
        const data = await res.json();
        if (data.success) {
          setHeadlines(data.articles.map((a: any) => a.title));
        }
      } catch (e) {
        console.error("Failed to fetch headlines for sentiment", e);
        setHeadlines([]);
      }
    }
    fetchHeadlines();
  }, [selectedCountry]);

  useEffect(() => {
    async function updateData() {
      if (selectedCountry === "All Africa") {
        setMetrics(initialMetrics);
        setChartData(initialChartData);
        setTableData(initialTableData);
        return;
      }

      setIsLiveLoading(true);
      const countryCode = AFRICAN_COUNTRIES_MAP[selectedCountry];
      const data = getCountryData(selectedCountry);
      
      let newMetrics = [...initialMetrics];

      if (sectorId === "economy") {
        const [gdpData, inflationData] = await Promise.all([
          fetchIMFIndicator(IMF_INDICATORS.GDP_GROWTH, countryCode),
          fetchIMFIndicator(IMF_INDICATORS.INFLATION, countryCode)
        ]);

        newMetrics = [
          { ...initialMetrics[0], value: gdpData ? `${gdpData.value.toFixed(1)}%` : data.economy.growth, label: gdpData ? `GDP Growth (${gdpData.name})` : initialMetrics[0].label },
          { ...initialMetrics[1], value: inflationData ? `${inflationData.value.toFixed(1)}%` : data.economy.inflation, label: inflationData ? `Inflation (${inflationData.name})` : initialMetrics[1].label },
          { ...initialMetrics[2], value: data.economy.debt },
          { ...initialMetrics[3], value: data.economy.gdp },
        ];
      } else if (sectorId === "employment") {
        const unemploymentData = await fetchIMFIndicator(IMF_INDICATORS.UNEMPLOYMENT, countryCode);
        newMetrics = [
          { ...initialMetrics[0], value: unemploymentData ? `${unemploymentData.value.toFixed(1)}%` : data.employment.rate, label: unemploymentData ? `Unemployment (${unemploymentData.name})` : initialMetrics[0].label },
          { ...initialMetrics[1], value: data.employment.youth },
          { ...initialMetrics[2], value: data.employment.literacy },
          { ...initialMetrics[3], value: "Active" },
        ];
      }
      
      setMetrics(newMetrics);
      setChartData(initialChartData.map(d => ({ ...d, value: d.value * (0.8 + Math.random() * 0.4) })));
      setIsLiveLoading(false);
    }

    updateData();
  }, [selectedCountry, sectorId, initialMetrics, initialChartData, initialTableData]);

  return (
    <div 
      className="flex flex-col bg-[#fafafa] mesh-gradient-premium relative min-h-screen"
      suppressHydrationWarning
    >
      {/* Background Aura Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 ambient-glow-subtle rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 ambient-glow-subtle rounded-full" />

      {/* ─── Page Header ─── */}
      <header className="px-4 sm:px-8 py-6 md:py-10 border-b border-black/5 premium-glass z-20 sticky top-0">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(255,2,1,0.5)]" />
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isLiveLoading ? "text-amber-500" : "text-primary"}`}>
                {isLiveLoading ? "Synthesizing Data..." : "Live Data Hub"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-2 leading-none">
              <span className="text-black">{title.split(' ')[0]}</span>
              <span className="text-primary ml-2">{title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-black/70 font-bold uppercase tracking-widest text-[10px]">{subtitle} · {selectedCountry}</p>
          </motion.div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Country Selector */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="premium-glass px-5 py-4 rounded-2xl flex items-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:min-w-60 justify-between shadow-xl"
              >
                <div className="flex items-center gap-2.5">
                  {selectedCountry !== "All Africa" ? (
                    <Flag code={AFRICAN_COUNTRIES_MAP[selectedCountry]} size="sm" />
                  ) : (
                    <Globe className="h-4 w-4 text-primary shrink-0" />
                  )}
                  <span className="text-sm font-black truncate text-black">{selectedCountry}</span>
                </div>
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform text-black/40 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-70 max-h-[55vh] overflow-y-auto bg-white border border-black/5 rounded-2xl shadow-2xl z-100 p-2 no-scrollbar"
                  >
                    <button
                      onClick={() => { setSelectedCountry("All Africa"); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-black/5 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm font-bold text-black">All Africa</span>
                      </div>
                      {selectedCountry === "All Africa" && <Check className="h-4 w-4 text-primary" />}
                    </button>
                    <div className="h-px bg-black/5 my-1.5" />
                    {AFRICAN_COUNTRIES.map(country => (
                      <button
                        key={country}
                        onClick={() => { setSelectedCountry(country); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-black/5 transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Flag code={AFRICAN_COUNTRIES_MAP[country]} size="sm" />
                          <span className="text-sm font-bold text-black">{country}</span>
                        </div>
                        {selectedCountry === country && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live Status Badge */}
            <div className="premium-glass px-5 py-4 rounded-2xl items-center gap-4 hidden sm:flex shrink-0 shadow-xl">
              <div className="text-right">
                <p className="text-[10px] font-black text-black/40 uppercase tracking-widest leading-none mb-1">Status</p>
                <p className="text-sm font-black text-emerald-600 uppercase leading-none">Live Feed</p>
              </div>
              <div className="relative">
                <Activity className="h-5 w-5 text-emerald-500 animate-pulse" />
                <div className="absolute inset-0 bg-emerald-500/20 blur-md animate-pulse rounded-full" />
              </div>
            </div>

            {/* Export Menu */}
            <div className="relative group">
              <button 
                className="premium-glass px-5 py-4 rounded-2xl flex items-center gap-3 transition-all hover:scale-[1.05] active:scale-[0.95] text-black/60 hover:text-black shadow-xl"
                title="Download Institutional Intelligence"
              >
                <Download className="h-4 w-4" />
                <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest text-black">Download</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-black/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button 
                  onClick={() => exportToCSV(tableData, `${selectedCountry}_${sectorId}_intelligence`)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 rounded-xl transition-colors text-left"
                >
                  <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-black">Export CSV</span>
                </button>
                <button 
                  onClick={() => exportToJSON({ metrics, chartData, tableData }, `${selectedCountry}_${sectorId}_intelligence`)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 rounded-xl transition-colors text-left"
                >
                  <FileJson className="h-4 w-4 text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-black">Export JSON</span>
                </button>
                <div className="h-px bg-black/5 my-1" />
                <button 
                  onClick={() => generatePDFReport({ country: selectedCountry, sector: title, metrics, tableData, chartRef })}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 rounded-xl transition-colors text-left"
                >
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-black">Generate PDF Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Content Area ─── */}
      <main className="relative z-10 px-4 sm:px-8 pb-12 pt-8">
        <div className="max-w-[1600px] mx-auto space-y-8 md:space-y-12">
          
          {/* AI Insights Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            <div className="lg:col-span-8 h-full">
              <AISummary country={selectedCountry} />
            </div>
            <div className="lg:col-span-4 h-full">
              <SentimentMeter headlines={headlines} country={selectedCountry} />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((metric, i) => {
              const gradients = [
                "from-primary/10 via-primary/5 to-transparent",
                "from-blue-600/10 via-blue-600/5 to-transparent",
                "from-amber-600/10 via-amber-600/5 to-transparent",
                "from-emerald-600/10 via-emerald-600/5 to-transparent"
              ];
              const accentColors = ["text-primary", "text-blue-600", "text-amber-600", "text-emerald-600"];
              const bgAccents = ["bg-primary", "bg-blue-600", "bg-amber-600", "bg-emerald-600"];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`premium-glass p-8 rounded-[2rem] shadow-xl relative group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                >
                  {/* Subtle Background Gradient Mix */}
                  <div className={`absolute inset-0 bg-linear-to-br ${gradients[i % 4]} opacity-40 pointer-events-none`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-2xl ${bgAccents[i % 4]} text-white shadow-lg transition-all duration-300 group-hover:scale-110`}>
                        <metric.icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50">{metric.label}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-4xl font-black text-black tracking-tighter leading-none">{metric.value}</h3>
                        <div className={`flex items-center gap-1.5 mt-3 text-xs font-black ${metric.isUp ? "text-emerald-600" : "text-red-600"}`}>
                          {metric.isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                          <span>{metric.change}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Analytics Card */}
          <div className="premium-glass rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-black">Performance Analytics</h2>
                <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mt-1">Trend Analysis · 2026 AI Projection</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => setShowForecast(!showForecast)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${
                    showForecast 
                      ? "bg-primary text-white scale-[1.05] shadow-primary/20" 
                      : "premium-glass text-black/60 hover:text-black hover:scale-[1.02]"
                  }`}
                >
                  {isForecasting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Zap className={`h-3.5 w-3.5 ${showForecast ? "fill-current" : ""}`} />}
                  {showForecast ? "Predictive Mode ON" : "AI Forecast Mode"}
                </button>

                <div className="flex bg-black/5 p-1 rounded-2xl border border-black/5 premium-glass shadow-xl">
                  {["1H", "1D", "1W", "1M", "1Y"].map(t => (
                    <button 
                      key={t} 
                      onClick={() => setSelectedTimeframe(t)}
                      className={`px-5 py-3 rounded-xl text-[10px] font-black transition-all ${
                        t === selectedTimeframe ? "bg-white text-black shadow-lg scale-[1.05]" : "text-black/40 hover:text-black"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full" ref={chartRef}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={combinedChartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff0201" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ff0201" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: "rgba(0,0,0,0.4)" }} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-4 shadow-2xl border border-black/5 rounded-2xl min-w-40">
                            <p className="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">
                              {data.name} · {data.isForecast ? "AI PROJECTION" : "HISTORICAL"}
                            </p>
                            <p className={`text-xl font-black ${data.isForecast ? "text-blue-600" : "text-black"}`}>
                              {data.value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actualValue" 
                    stroke="#ff0201" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    connectNulls
                  />
                  {showForecast && (
                    <Area 
                      type="monotone" 
                      dataKey="forecastValue" 
                      stroke="#3b82f6" 
                      strokeWidth={4} 
                      strokeDasharray="10 10"
                      fillOpacity={1} 
                      fill="url(#colorForecast)" 
                      connectNulls
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table */}
          <div className="premium-glass rounded-[3rem] overflow-hidden shadow-2xl border border-white/40">
            <div className="p-10 border-b border-black/5 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black tracking-tight text-black">Institutional Data Ledger</h3>
                <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mt-1">Real-Time Indicator Breakdown</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition-all text-[10px] font-black uppercase tracking-widest">
                <Info className="h-4 w-4" />
                <span>Metadata</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black/5">
                    <th className="px-8 py-4 text-[10px] font-black text-black/50 uppercase tracking-widest">Indicator</th>
                    <th className="px-8 py-4 text-[10px] font-black text-black/50 uppercase tracking-widest">Current Value</th>
                    <th className="px-8 py-4 text-[10px] font-black text-black/50 uppercase tracking-widest">Change</th>
                    <th className="px-8 py-4 text-[10px] font-black text-black/50 uppercase tracking-widest hidden sm:table-cell">AI Projection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {tableData.map((row, i) => (
                    <tr key={i} className="hover:bg-black/[0.01] transition-colors group">
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-black">{row.name}</p>
                        <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mt-1">{row.sub || row.category}</p>
                      </td>
                      <td className="px-8 py-6 font-black text-sm text-black">{row.value}</td>
                      <td className="px-8 py-6">
                        <div className={`flex items-center gap-1.5 text-xs font-black ${row.isUp ? "text-emerald-600" : "text-red-600"}`}>
                          {row.isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                          {row.change}
                        </div>
                      </td>
                      <td className="px-8 py-6 hidden sm:table-cell">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-black/20">{row.proj || row.projection}%</span>
                          <div className="w-24 h-1.5 bg-black/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${row.projection || 70}%` }}
                              className="h-full bg-black/20"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1600px] mx-auto px-8 py-12 border-t border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 opacity-40">
        <p className="text-[10px] font-black uppercase tracking-widest text-black">© 2026 AFCONOMY INTELLIGENCE UNIT</p>
        <div className="flex gap-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-black cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-black cursor-pointer hover:text-primary transition-colors">Data Sources</span>
        </div>
      </footer>

      {children}
    </div>
  );
}
