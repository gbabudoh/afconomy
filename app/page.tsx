"use client";

import { useState, useMemo, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import CurrencyConverter from "@/components/CurrencyConverter";
import DataChart from "@/components/DataChart";
import { DollarSign, BarChart3, ArrowUpRight, ArrowDownRight, Globe, Building2, GraduationCap, Briefcase, LucideIcon, X, Clock, Share2, Bookmark, TrendingUp, Activity, Users, Leaf, FileText } from "lucide-react";
import { useCountry } from "@/lib/CountryContext";
import { africanCountries } from "@/lib/countries";
import { countryMacroData, getMacroForCountry, CountryMacro, MacroMetric } from "@/lib/macroData";
import { researchReports, ResearchReport } from "@/lib/researchData";
import { newsData, NewsItem } from "@/lib/newsData";
import { INDICATORS as WB_INDICATORS } from "@/lib/api/worldbank";
import { IMF_INDICATORS } from "@/lib/api/imf";

const INDICATORS = { ...WB_INDICATORS, ...IMF_INDICATORS };

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [deepDiveCategory, setDeepDiveCategory] = useState<keyof Omit<CountryMacro, 'metrics' | 'gdpData' | 'inflationData'>>("financial");
  const [selectedResearch, setSelectedResearch] = useState<ResearchReport | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const { selectedCountries } = useCountry();
  const [apiData, setApiData] = useState<any>(null);
  const [research, setResearch] = useState<any[]>([]);

  useEffect(() => {
    // Fetch real-time data if available
    const fetchRealData = async () => {
      try {
        const codes = selectedCountries.length > 0 ? selectedCountries : ['NGA', 'EGY', 'ZAF', 'KEN', 'GHA', 'MAR', 'ETH', 'RWA', 'CIV'];
        const response = await fetch('/api/macro-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            countries: codes,
            indicators: [INDICATORS.GDP_GROWTH, INDICATORS.INFLATION, INDICATORS.POPULATION]
          })
        });
        const result = await response.json();
        if (result.success) {
          setApiData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch real-time data:", error);
      }
    };

    const fetchResearch = async () => {
      try {
        const res = await fetch("/api/research");
        const data = await res.json();
        if (res.ok) setResearch(data);
      } catch (err) {
        console.error("Failed to fetch research:", err);
      }
    };

    fetchRealData();
    fetchResearch();
  }, [selectedCountries]);

  // Resolve active macro data
  const activeMacro = useMemo(() => {
    if (selectedCountries.length === 0) return countryMacroData.default;

    if (selectedCountries.length === 1) {
      const code = selectedCountries[0].toUpperCase();
      return getMacroForCountry(code);
    }

    // Multiple countries selected - Aggregate data
    const selectedData = selectedCountries
      .map(code => getMacroForCountry(code.toUpperCase()));

    if (selectedData.length === 0) return countryMacroData.default;

    // Helper to parse population (e.g., "114M" -> 114, "1.4B" -> 1400)
    const parsePop = (s: string) => {
      const val = parseFloat(s);
      if (s.includes('B')) return val * 1000;
      return val;
    };

    // Aggregate metrics
    const totalPop = selectedData.reduce((sum, d) => sum + parsePop(d.metrics[2].value), 0);
    const avgGrowth = selectedData.reduce((sum, d) => sum + parseFloat(d.metrics[0].value), 0) / selectedData.length;
    const avgInflation = selectedData.reduce((sum, d) => sum + parseFloat(d.metrics[1].value), 0) / selectedData.length;
    const totalTrade = selectedData.reduce((sum, d) => sum + parseFloat(d.metrics[3].value.replace(/[^0-9.-]/g, '')), 0);

    // Helper for multi-metric aggregation (averaging)
    const aggregateMetrics = (key: keyof CountryMacro) => {
      const baseMetrics = selectedData[0][key];
      if (!Array.isArray(baseMetrics)) return baseMetrics;

      return (baseMetrics as MacroMetric[]).map((m, i) => {
        const values = selectedData.map(d => {
          const targetMetrics = d[key] as MacroMetric[];
          const target = targetMetrics[i];
          return target ? parseFloat(target.value) : 0;
        });
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        
        // Return MacroMetric shape
        return {
          ...m,
          value: m.value.includes('%') ? `${avg.toFixed(1)}%` : m.value,
          trend: "Avg"
        } as MacroMetric;
      });
    };

    const finalMacro = {
      metrics: [
        { ...selectedData[0].metrics[0], value: `${avgGrowth.toFixed(1)}%`, trend: "Avg" },
        { ...selectedData[0].metrics[1], value: `${avgInflation.toFixed(1)}%`, trend: "Avg" },
        { ...selectedData[0].metrics[2], value: totalPop >= 1000 ? `${(totalPop / 1000).toFixed(1)}B` : `${Math.round(totalPop)}M`, trend: "Total" },
        { ...selectedData[0].metrics[3], value: `${totalTrade >= 0 ? '+' : ''}$${totalTrade.toFixed(1)}B`, trend: "Total", color: totalTrade >= 0 ? 'text-emerald-600' : 'text-red-500' },
      ],
      financial: aggregateMetrics('financial') as MacroMetric[],
      education: aggregateMetrics('education') as MacroMetric[],
      employment: aggregateMetrics('employment') as MacroMetric[],
      trade: selectedData[0].trade,
      performance: aggregateMetrics('performance') as MacroMetric[],
      gdpData: selectedData[0].gdpData,
      inflationData: selectedData[0].inflationData,
    };

    // Simple override logic for demonstration of "live" feel
    if (apiData && apiData.length === 1 && selectedCountries.length === 1) {
      const live = apiData[0];
      const code = selectedCountries[0];
      
      // Try to override with IMF data if available (2026 projections)
      if (live[IMF_INDICATORS.GDP_GROWTH]) {
        finalMacro.metrics[0].value = `${parseFloat(live[IMF_INDICATORS.GDP_GROWTH].value).toFixed(1)}%`;
        finalMacro.metrics[0].trend = "IMF 2026";
      }
      if (live[IMF_INDICATORS.INFLATION]) {
        finalMacro.metrics[1].value = `${parseFloat(live[IMF_INDICATORS.INFLATION].value).toFixed(1)}%`;
        finalMacro.metrics[1].trend = "IMF 2026";
      }
      if (live[IMF_INDICATORS.POPULATION]) {
        const popVal = parseFloat(live[IMF_INDICATORS.POPULATION].value);
        finalMacro.metrics[2].value = `${popVal.toFixed(1)}M`;
        finalMacro.metrics[2].trend = "IMF 2026";
      }
      if (live[IMF_INDICATORS.CURRENT_ACCOUNT_TOTAL]) {
        const tradeVal = parseFloat(live[IMF_INDICATORS.CURRENT_ACCOUNT_TOTAL].value);
        finalMacro.metrics[3].value = `${tradeVal >= 0 ? '+' : ''}$${tradeVal.toFixed(1)}B`;
        finalMacro.metrics[3].trend = "IMF 2026";
        finalMacro.metrics[3].color = tradeVal >= 0 ? 'text-emerald-600' : 'text-red-500';
      }
    }

    return finalMacro;
  }, [selectedCountries, apiData]);

  // Filter news for current selection
  const activeNews = useMemo(() => {
    if (selectedCountries.length === 0) return newsData.filter(n => !n.countryCode).slice(0, 3);
    const filtered = newsData.filter(n => n.countryCode && selectedCountries.includes(n.countryCode));
    if (filtered.length === 0) return newsData.filter(n => !n.countryCode).slice(0, 3);
    return filtered.slice(0, 3);
  }, [selectedCountries]);

  const gdpData = activeMacro.gdpData;
  const inflationData = activeMacro.inflationData;
  const macroMetrics = activeMacro.metrics;

  const isSelected = (countryName: string) => {
    if (selectedCountries.length === 0) return true;
    const country = africanCountries.find(c => c.name === countryName);
    return country ? selectedCountries.includes(country.code) : false;
  };

  const regionalTradeData = [
    { year: "2019", growth: 12.1 },
    { year: "2020", growth: 9.8 },
    { year: "2021", growth: 14.2 },
    { year: "2022", growth: 16.5 },
    { year: "2023", growth: 18.9 },
    { year: "2024", growth: 21.4 },
  ];

  const sectorPerformanceData = [
    { sector: "Tech", performance: 24.5 },
    { sector: "Agri", performance: 18.2 },
    { sector: "Mining", performance: 12.8 },
    { sector: "Manuf", performance: 15.4 },
    { sector: "Finance", performance: 20.1 },
  ];

  const marketData = [
    { name: "NGX All-Share", value: "156,492.36", change: "+1.9%", isUp: true, country: "Nigeria" },
    { name: "JSE Top 40", value: "108,163.94", change: "-0.1%", isUp: false, country: "South Africa" },
    { name: "NSE 20", value: "3,140.93", change: "+0.1%", isUp: true, country: "Kenya" },
    { name: "EGX 30", value: "40,657.30", change: "-2.2%", isUp: false, country: "Egypt" },
  ].filter(market => isSelected(market.country));

  const currencies = [
    { pair: "USD/NGN", rate: "1,525.50", change: "+0.8%", isUp: true, country: "Nigeria" },
    { pair: "USD/ZAR", rate: "18.95", change: "+0.3%", isUp: true, country: "South Africa" },
    { pair: "USD/KES", rate: "129.50", change: "-0.2%", isUp: false, country: "Kenya" },
    { pair: "USD/EGP", rate: "48.35", change: "+0.1%", isUp: true, country: "Egypt" },
  ].filter(curr => isSelected(curr.country));

  const renderOverview = () => (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Macro Engine{selectedCountries.length === 1 ? `: ${africanCountries.find(c => c.code === selectedCountries[0])?.name}` : selectedCountries.length > 1 ? ` (${selectedCountries.length} Countries)` : ""}
        </h2>
        <p className="text-base text-secondary">Key economic indicators {selectedCountries.length > 0 ? "for selected regions" : "across the African continent"}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {macroMetrics.map((metric: MacroMetric) => (
          <div 
            key={metric.name} 
            className="group relative overflow-hidden rounded-xl border border-secondary/10 bg-card p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/20 hover:bg-secondary/5"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-lg bg-secondary/5 transition-colors group-hover:bg-primary/5`}>
                <metric.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${metric.color} transition-transform group-hover:scale-110`} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${metric.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {metric.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-secondary">{metric.name}</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{metric.value}</h3>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-secondary/10 bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-all hover:border-secondary/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <h3 className="text-base sm:text-lg font-bold text-foreground">GDP Growth Historical</h3>
            <select className="text-xs font-medium text-secondary bg-secondary/5 border border-secondary/20 rounded-lg px-2 sm:px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option>Last 12 months</option>
              <option>Last 5 years</option>
              <option>All time</option>
            </select>
          </div>
          <div className="h-[200px] sm:h-[300px]">
            <DataChart 
              data={gdpData} 
              type="bar" 
              dataKey="growth" 
              categoryKey="year" 
              color="#ff0201" 
            />
          </div>
        </div>
        
        <div className="rounded-xl border border-secondary/10 bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-all hover:border-secondary/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <h3 className="text-base sm:text-lg font-bold text-foreground">Inflation Trends</h3>
            <select className="text-xs font-medium text-secondary bg-secondary/5 border border-secondary/20 rounded-lg px-2 sm:px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option>Last 12 months</option>
              <option>Last 5 years</option>
              <option>All time</option>
            </select>
          </div>
          <div className="h-[200px] sm:h-[300px]">
            <DataChart 
              data={inflationData} 
              type="area" 
              dataKey="rate" 
              categoryKey="year" 
              color="#575757" 
            />
          </div>
        </div>
      </div>

      {/* Dynamic Economic Highlights Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Economic Highlights</h3>
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded border border-primary/10">
            {selectedCountries.length > 0 ? "Regional Focus" : "Continental View"}
          </span>
        </div>
        
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeNews.map((news: NewsItem) => (
            <div 
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="group p-4 sm:p-5 rounded-xl border border-secondary/10 bg-card hover:bg-secondary/5 hover:border-primary/20 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <news.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-tight">
                  {news.date}
                </span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {news.title}
              </h4>
              <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                {news.summary}
              </p>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-secondary/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary px-1.5 py-0.5 rounded bg-primary/5">
                  {news.category}
                </span>
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-secondary group-hover:text-primary transition-all opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Detail Modal (Overview Specific) */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <div 
            className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <selectedNews.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Economic Update
                  </span>
                  <div className="flex items-center gap-2 text-xs text-secondary mt-0.5">
                    <Clock className="h-3.5 w-3.5" />
                    Published {selectedNews.date}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-secondary" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto no-scrollbar space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-full uppercase tracking-tight">
                  {selectedNews.category} Report
                </span>
                <h2 className="text-3xl font-bold text-foreground leading-tight">
                  {selectedNews.title}
                </h2>
              </div>

              <div className="space-y-6 text-secondary leading-relaxed text-lg">
                <p className="font-medium text-foreground/80 italic border-l-4 border-primary/30 pl-6 py-2 bg-primary/[0.02]">
                  {selectedNews.summary}
                </p>
                
                {selectedNews.fullContent ? (
                  <div className="space-y-6 text-base text-foreground/90">
                    {selectedNews.fullContent.split('\n\n').map((para: string, idx: number) => {
                      const cleanPara = para.trim();
                      if (cleanPara.startsWith('# ')) return null;
                      if (cleanPara.startsWith('## ')) {
                        return (
                          <h3 key={idx} className="text-xl font-bold text-foreground pt-4 mb-2">
                            {cleanPara.replace('## ', '')}
                          </h3>
                        );
                      }
                      if (cleanPara.includes('- **')) {
                        return (
                          <ul key={idx} className="space-y-3">
                            {cleanPara.split('\n').map((li: string, lidx: number) => (
                              <li key={lidx} className="flex gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <span dangerouslySetInnerHTML={{ __html: li.trim().replace('- **', '<b>').replace('**: ', '</b>: ') }} />
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={idx}>{cleanPara}</p>;
                    })}
                  </div>
                ) : (
                  <p className="text-base text-foreground/90">
                    Full analysis for this report is being finalized by our economic research team. 
                    Please check back shortly for the comprehensive breakdown and regional impact assessment.
                  </p>
                )}
              </div>

              {/* Footer / Actions */}
              <div className="flex items-center gap-3 pt-8 mt-12 border-t border-border">
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Close Report
                </button>
                <button className="p-3 border border-border rounded-xl hover:bg-secondary/5 transition-all">
                  <Share2 className="h-6 w-6 text-secondary" />
                </button>
              </div>
            </div>
          </div>
          {/* Backdrop Click */}
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedNews(null)} />
        </div>
      )}
    </section>
  );

  const renderMarkets = () => (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Market Pulse</h2>
        <p className="text-base text-secondary">Real-time market data and currency exchange rates</p>
      </div>

      {/* Stock Markets */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">African Stock Exchanges</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {marketData.map((market) => (
            <div 
              key={market.name}
              className="group rounded-xl border border-secondary/10 bg-card p-6 shadow-sm hover:shadow-md transition-all hover:border-primary/20"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-medium text-secondary mb-1">{market.country}</p>
                  <h4 className="text-lg font-bold text-foreground">{market.name}</h4>
                </div>
                <div className={`p-2 rounded-lg ${market.isUp ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  {market.isUp ? (
                    <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{market.value}</p>
                </div>
                <span className={`text-sm font-bold ${market.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                  {market.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Currency Exchange */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Currency Exchange Rates</h3>
        <div className="rounded-xl border border-secondary/10 bg-card shadow-sm overflow-hidden">
          <div className="divide-y divide-secondary/10">
            {currencies.map((currency) => (
              <div 
                key={currency.pair}
                className="flex items-center justify-between p-4 hover:bg-secondary/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/5">
                    <DollarSign className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{currency.pair}</p>
                    <p className="text-xs text-secondary">Exchange Rate</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{currency.rate}</p>
                  <span className={`text-xs font-bold ${currency.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                    {currency.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Summary */}
      <div className="rounded-xl border border-secondary/10 bg-gradient-to-br from-secondary/5 to-primary/5 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-card">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-foreground mb-2">Market Overview</h4>
            <p className="text-sm text-secondary">
              African markets showing mixed performance today with strong gains in West African exchanges. 
              Currency markets remain stable with moderate fluctuations across major pairs.
            </p>
          </div>
        </div>
      </div>

      {/* Currency Converter */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Currency Converter</h3>
        <CurrencyConverter />
      </div>
    </section>
  );

  const renderDeepDive = () => {
    const categories: { key: keyof Omit<CountryMacro, 'metrics' | 'gdpData' | 'inflationData'>; label: string; icon: LucideIcon }[] = [
      { key: "financial", label: "Financial", icon: DollarSign },
      { key: "education", label: "Education", icon: GraduationCap },
      { key: "employment", label: "Employment", icon: Briefcase },
      { key: "trade", label: "Trade", icon: Globe },
      { key: "performance", label: "Performance", icon: BarChart3 },
    ];

    const activeMetrics = activeMacro[deepDiveCategory] as MacroMetric[];

    return (
      <section className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Deep Dive Analysis</h2>
            <p className="text-sm sm:text-base text-secondary">Specialized economic indicators and regional performance</p>
          </div>
          
          {/* Category Tabs - Improved mobile scrolling */}
          <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex gap-2 sm:gap-1 pb-2 sm:pb-0 overflow-x-auto no-scrollbar sm:flex-wrap sm:bg-secondary/5 sm:p-1 sm:rounded-xl sm:border sm:border-secondary/10">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setDeepDiveCategory(cat.key)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2 text-xs sm:text-sm font-bold rounded-lg sm:rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                    deepDiveCategory === cat.key 
                      ? "bg-primary text-primary-foreground sm:bg-card sm:text-primary shadow-sm sm:ring-1 sm:ring-border" 
                      : "bg-secondary/10 text-secondary hover:text-foreground hover:bg-secondary/20 sm:bg-transparent sm:hover:bg-secondary/5"
                  }`}
                >
                  <cat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline sm:inline">{cat.label}</span>
                  <span className="xs:hidden sm:hidden">{cat.label.slice(0, 4)}</span>
                </button>
              ))}
            </div>
            {/* Scroll indicator for mobile */}
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
          </div>
        </div>

        {/* Specialized Metrics Grid */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {activeMetrics.map((metric) => (
            <div 
              key={metric.name}
              className="group rounded-xl border border-secondary/10 bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-all hover:border-primary/20"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-lg bg-secondary/5 group-hover:bg-primary/5 transition-colors">
                  <metric.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${metric.color}`} />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  {metric.trend}
                </span>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <p className="text-xs sm:text-sm font-medium text-secondary">{metric.name}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">{metric.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Existing Analysis Charts */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-secondary/10 bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 sm:mb-2">Regional Trade Analysis</h3>
                <p className="text-xs sm:text-sm text-secondary line-clamp-2">
                  Examining intra-African trade patterns and the impact of AfCFTA on regional economies.
                </p>
              </div>
            </div>
            <div className="h-[160px] sm:h-[200px]">
              <DataChart 
                data={regionalTradeData} 
                type="area" 
                dataKey="growth" 
                categoryKey="year" 
                color="#ff0201" 
                height={200}
              />
            </div>
          </div>

          <div className="rounded-xl border border-secondary/10 bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 sm:mb-2">Sector Performance</h3>
                <p className="text-xs sm:text-sm text-secondary line-clamp-2">
                  Deep analysis of key sectors including technology, agriculture, and manufacturing.
                </p>
              </div>
            </div>
            <div className="h-[160px] sm:h-[200px]">
              <DataChart 
                data={sectorPerformanceData} 
                type="bar" 
                dataKey="performance" 
                categoryKey="sector" 
                color="#575757" 
                height={200}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Featured Research</h3>
          <div className="grid gap-3 sm:gap-4">
            {(research.length > 0 ? research : researchReports).map((report) => {
              const iconName = (report as any).icon;
              const Icon = typeof iconName === 'string' 
                ? (({ Activity, Leaf, Building2, TrendingUp, FileText }[iconName] || FileText) as LucideIcon)
                : (report.icon as LucideIcon);
              
              const displayDate = report.date || (report.publishedAt ? new Date(report.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "");

              return (
                <div 
                  key={report.id}
                  onClick={() => setSelectedResearch(report)}
                  className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl border border-secondary/10 bg-card hover:bg-secondary/5 hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-primary/10">
                        {report.category}
                      </span>
                      <span className="text-[10px] sm:text-xs text-secondary">{displayDate}</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {report.title}
                    </h4>
                  </div>
                  <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-secondary group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Research Detail Modal */}
        {selectedResearch && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
            <div 
              className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    {(() => {
                      const iconName = (selectedResearch as any).icon;
                      const Icon = typeof iconName === 'string'
                        ? (({ Activity, Leaf, Building2, TrendingUp, FileText }[iconName] || FileText) as LucideIcon)
                        : (selectedResearch.icon as LucideIcon);
                      return <Icon className="h-6 w-6 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      Research Analysis
                    </span>
                    <div className="flex items-center gap-2 text-xs text-secondary mt-0.5">
                      <Clock className="h-3.5 w-3.5" />
                      Published {selectedResearch.date || (selectedResearch as any).publishedAt ? new Date((selectedResearch as any).publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ""}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedResearch(null)}
                  className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-secondary" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto no-scrollbar space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-full uppercase tracking-tight">
                    {selectedResearch.category} Report
                  </span>
                  <h2 className="text-3xl font-bold text-foreground leading-tight">
                    {selectedResearch.title}
                  </h2>
                </div>

                <div className="space-y-6 text-secondary leading-relaxed">
                  <p className="text-xl font-medium text-foreground/80 italic border-l-4 border-primary/30 pl-6 py-2 bg-primary/[0.02]">
                    {selectedResearch.summary}
                  </p>
                  
                  {/* Processed Full Content (using simple splits for markdown-like feels) */}
                  {selectedResearch.fullContent.split('\n\n').map((para, idx) => {
                    const cleanPara = para.trim();
                    if (cleanPara.startsWith('# ')) {
                      return null; // Title handled above
                    }
                    if (cleanPara.startsWith('## ')) {
                      return (
                        <h3 key={idx} className="text-xl font-bold text-foreground pt-4 mb-2">
                          {cleanPara.replace('## ', '')}
                        </h3>
                      );
                    }
                    if (cleanPara.includes('- **')) {
                      return (
                        <ul key={idx} className="space-y-3">
                          {cleanPara.split('\n').map((li, lidx) => (
                            <li key={lidx} className="flex gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              <span dangerouslySetInnerHTML={{ __html: li.trim().replace('- **', '<b>').replace('**: ', '</b>: ') }} />
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx} className="text-base text-foreground/90">{cleanPara}</p>;
                  })}
                </div>

                {/* Footer / Actions */}
                <div className="flex items-center gap-3 pt-8 mt-12 border-t border-border">
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    Download Full PDF
                  </button>
                  <button className="p-3 border border-border rounded-xl hover:bg-secondary/5 transition-all">
                    <Share2 className="h-6 w-6 text-secondary" />
                  </button>
                  <button className="p-3 border border-border rounded-xl hover:bg-secondary/5 transition-all">
                    <Bookmark className="h-6 w-6 text-secondary" />
                  </button>
                </div>
              </div>
            </div>
            {/* Backdrop Click */}
            <div className="absolute inset-0 -z-10" onClick={() => setSelectedResearch(null)} />
          </div>
        )}
      </section>
    );
  };

  return (
    <Dashboard activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "overview" && renderOverview()}
      {activeTab === "markets" && renderMarkets()}
      {activeTab === "deep-dive" && renderDeepDive()}
    </Dashboard>
  );
}
