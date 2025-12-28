"use client";

import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import CurrencyConverter from "@/components/CurrencyConverter";
import DataChart from "@/components/DataChart";
import { TrendingUp, Users, DollarSign, Activity, BarChart3, ArrowUpRight, ArrowDownRight, Globe, Building2 } from "lucide-react";
import { useCountry } from "@/lib/CountryContext";
import { africanCountries } from "@/lib/countries";
import { countryMacroData } from "@/lib/macroData";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const { selectedCountries } = useCountry();

  // Resolve active macro data
  // If exactly one country is selected and we have data for it, use it. Otherwise default.
  const activeDataKey = selectedCountries.length === 1 && countryMacroData[selectedCountries[0]] 
    ? selectedCountries[0] 
    : "default";
  
  const activeMacro = countryMacroData[activeDataKey];

  // Helper to check if a country is selected (for filtering lists like markets/currencies)
  const isSelected = (countryName: string) => {
    if (selectedCountries.length === 0) return true;
    const country = africanCountries.find(c => c.name === countryName);
    return country ? selectedCountries.includes(country.code) : false;
  };

  const gdpData = activeMacro.gdpData;
  const inflationData = activeMacro.inflationData;
  const macroMetrics = activeMacro.metrics;

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
    { name: "NGX All-Share", value: "52,340.12", change: "+2.4%", isUp: true, country: "Nigeria" },
    { name: "JSE Top 40", value: "68,234.50", change: "-0.8%", isUp: false, country: "South Africa" },
    { name: "NSE 20", value: "1,845.23", change: "+1.2%", isUp: true, country: "Kenya" },
    { name: "EGX 30", value: "18,456.78", change: "+0.5%", isUp: true, country: "Egypt" },
  ].filter(market => isSelected(market.country));

  const currencies = [
    { pair: "USD/NGN", rate: "1,485.50", change: "+0.3%", isUp: true, country: "Nigeria" },
    { pair: "USD/ZAR", rate: "18.45", change: "-0.2%", isUp: false, country: "South Africa" },
    { pair: "USD/KES", rate: "128.30", change: "+0.1%", isUp: true, country: "Kenya" },
    { pair: "USD/EGP", rate: "30.85", change: "+0.4%", isUp: true, country: "Egypt" },
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {macroMetrics.map((metric) => (
          <div 
            key={metric.name} 
            className="group relative overflow-hidden rounded-xl border border-secondary/10 bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/20 hover:bg-secondary/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-secondary/5 transition-colors group-hover:bg-primary/5`}>
                <metric.icon className={`h-5 w-5 ${metric.color} transition-transform group-hover:scale-110`} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${metric.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {metric.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-secondary">{metric.name}</p>
              <h3 className="text-3xl font-bold text-foreground">{metric.value}</h3>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-secondary/10 bg-card p-6 shadow-sm hover:shadow-md transition-all hover:border-secondary/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">GDP Growth Historical</h3>
            <select className="text-xs font-medium text-secondary bg-secondary/5 border border-secondary/20 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option>Last 12 months</option>
              <option>Last 5 years</option>
              <option>All time</option>
            </select>
          </div>
          <div className="h-[300px]">
            <DataChart 
              data={gdpData} 
              type="bar" 
              dataKey="growth" 
              categoryKey="year" 
              color="#ff0201" 
            />
          </div>
        </div>
        
        <div className="rounded-xl border border-secondary/10 bg-card p-6 shadow-sm hover:shadow-md transition-all hover:border-secondary/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Inflation Trends</h3>
            <select className="text-xs font-medium text-secondary bg-secondary/5 border border-secondary/20 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option>Last 12 months</option>
              <option>Last 5 years</option>
              <option>All time</option>
            </select>
          </div>
          <div className="h-[300px]">
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

      {/* News Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Latest Macro Analysis</h3>
        <div className="grid gap-4">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="group flex gap-4 p-5 rounded-xl border border-secondary/10 bg-card hover:bg-secondary/5 hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="h-24 w-40 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center border border-secondary/10">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center ring-4 ring-secondary/5">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">Regional Report</span>
                <h4 className="font-bold text-base leading-tight text-foreground group-hover:text-primary transition-colors">
                  Economic recovery expected in West African trade blocks by Q3 2026
                </h4>
                <p className="text-sm text-secondary line-clamp-2">
                  New data suggests that recent policy changes in major economies are beginning to yield positive results for regional stability and growth...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
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

  const renderDeepDive = () => (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Deep Dive Analysis</h2>
        <p className="text-base text-secondary">Comprehensive insights and detailed economic analysis</p>
      </div>

      {/* Analysis Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-secondary/10 bg-card p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">Regional Trade Analysis</h3>
              <p className="text-sm text-secondary">
                Examining intra-African trade patterns and the impact of AfCFTA on regional economies.
              </p>
            </div>
          </div>
          <div className="h-[200px]">
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

        <div className="rounded-xl border border-secondary/10 bg-card p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">Sector Performance</h3>
              <p className="text-sm text-secondary">
                Deep analysis of key sectors including technology, agriculture, and manufacturing.
              </p>
            </div>
          </div>
          <div className="h-[200px]">
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

      {/* Research Reports */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Featured Research</h3>
        <div className="grid gap-4">
          {[
            { title: "Digital Economy Growth in Sub-Saharan Africa", category: "Technology", date: "Dec 2024" },
            { title: "Agricultural Productivity and Food Security Trends", category: "Agriculture", date: "Nov 2024" },
            { title: "Infrastructure Investment and Economic Development", category: "Infrastructure", date: "Nov 2024" },
          ].map((report, i) => (
            <div 
              key={i}
              className="group flex items-center gap-4 p-5 rounded-xl border border-secondary/10 bg-card hover:bg-secondary/5 hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">
                    {report.category}
                  </span>
                  <span className="text-xs text-secondary">{report.date}</span>
                </div>
                <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  {report.title}
                </h4>
              </div>
              <ArrowUpRight className="h-5 w-5 text-secondary group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <Dashboard activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "overview" && renderOverview()}
      {activeTab === "markets" && renderMarkets()}
      {activeTab === "deep-dive" && renderDeepDive()}
    </Dashboard>
  );
}
