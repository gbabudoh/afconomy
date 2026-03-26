"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, BarChart3, Globe, Calendar, Activity } from "lucide-react";

const COUNTRIES: Record<string, {
  code: string; name: string; flag: string; region: string; capital: string;
  currency: string; gdp: string; gdpGrowth: string; gdpGrowthPositive: boolean;
  population: string; inflation: string; interestRate: string; rating: string;
  ratingColor: string; description: string; exports: string[]; imports: string[];
  sectors: { name: string; share: string; pct: number }[];
  recentEvents: { date: string; title: string; value: string; impact: string }[];
}> = {
  NGA: {
    code: "NGA", name: "Nigeria", flag: "🇳🇬", region: "West Africa", capital: "Abuja",
    currency: "NGN", gdp: "$477B", gdpGrowth: "+3.2%", gdpGrowthPositive: true,
    population: "223M", inflation: "31.7%", interestRate: "27.50%", rating: "B-", ratingColor: "text-amber-600",
    description: "Nigeria is Africa's largest economy by GDP and most populous nation, home to 220 million people. As a major oil producer accounting for ~90% of foreign exchange earnings, the country is actively diversifying into technology, agriculture, and services. Lagos has emerged as Africa's leading tech hub, with a vibrant fintech ecosystem attracting billions in foreign investment.",
    exports: ["Crude Oil", "Petroleum Products", "Cocoa", "Rubber", "Cashews"],
    imports: ["Machinery", "Chemicals", "Transport Equipment", "Manufactured Goods", "Food"],
    sectors: [{ name: "Services", share: "54%", pct: 54 }, { name: "Industry", share: "22%", pct: 22 }, { name: "Agriculture", share: "24%", pct: 24 }],
    recentEvents: [
      { date: "Apr 23", title: "CBN Interest Rate Decision", value: "27.50%", impact: "high" },
      { date: "Apr 15", title: "CPI Inflation Rate", value: "31.7%", impact: "high" },
      { date: "Apr 01", title: "PMI Manufacturing", value: "49.8", impact: "medium" },
    ],
  },
  ZAF: {
    code: "ZAF", name: "South Africa", flag: "🇿🇦", region: "Southern Africa", capital: "Pretoria",
    currency: "ZAR", gdp: "$373B", gdpGrowth: "+0.6%", gdpGrowthPositive: true,
    population: "60M", inflation: "3.2%", interestRate: "8.25%", rating: "BB-", ratingColor: "text-amber-500",
    description: "South Africa is the continent's most industrialised economy and a key gateway to sub-Saharan African markets. Home to the Johannesburg Stock Exchange — Africa's largest bourse — the country commands deep capital markets, a sophisticated financial sector, and world-class mining operations in gold, platinum, and diamonds. Structural challenges including energy supply constraints and high unemployment remain key policy priorities.",
    exports: ["Gold", "Platinum", "Diamonds", "Coal", "Iron Ore"],
    imports: ["Machinery", "Petroleum", "Chemicals", "Electronics", "Motor Vehicles"],
    sectors: [{ name: "Services", share: "69%", pct: 69 }, { name: "Industry", share: "24%", pct: 24 }, { name: "Agriculture", share: "7%", pct: 7 }],
    recentEvents: [
      { date: "Apr 24", title: "CPI Inflation Rate", value: "3.2%", impact: "high" },
      { date: "Apr 20", title: "SARB Interest Rate", value: "8.25%", impact: "high" },
      { date: "Apr 10", title: "Trade Balance", value: "+R4.2B", impact: "medium" },
    ],
  },
  EGY: {
    code: "EGY", name: "Egypt", flag: "🇪🇬", region: "North Africa", capital: "Cairo",
    currency: "EGP", gdp: "$395B", gdpGrowth: "+3.8%", gdpGrowthPositive: true,
    population: "106M", inflation: "29.5%", interestRate: "27.25%", rating: "B", ratingColor: "text-amber-600",
    description: "Egypt occupies a strategic geographic crossroads linking Africa, the Middle East, and Europe. The Suez Canal generates over $9 billion in annual revenues, while tourism, remittances, and a growing industrial base diversify the economy. Egypt is undergoing a major IMF-backed reform programme focused on fiscal consolidation, exchange rate liberalisation, and private sector development.",
    exports: ["Petroleum Products", "Natural Gas", "Textiles", "Chemicals", "Tourism"],
    imports: ["Machinery", "Food & Grain", "Chemicals", "Iron & Steel", "Consumer Goods"],
    sectors: [{ name: "Services", share: "52%", pct: 52 }, { name: "Industry", share: "33%", pct: 33 }, { name: "Agriculture", share: "15%", pct: 15 }],
    recentEvents: [
      { date: "Apr 29", title: "Trade Balance Feb", value: "-$2.1B", impact: "medium" },
      { date: "Apr 20", title: "CPI Inflation", value: "29.5%", impact: "high" },
      { date: "Apr 04", title: "CBE Rate Decision", value: "27.25%", impact: "high" },
    ],
  },
  KEN: {
    code: "KEN", name: "Kenya", flag: "🇰🇪", region: "East Africa", capital: "Nairobi",
    currency: "KES", gdp: "$118B", gdpGrowth: "+5.4%", gdpGrowthPositive: true,
    population: "55M", inflation: "6.3%", interestRate: "13.00%", rating: "B", ratingColor: "text-amber-600",
    description: "Kenya is East Africa's economic and financial hub, known globally as the birthplace of M-Pesa mobile money. Nairobi hosts the regional headquarters of hundreds of multinational corporations and serves as a gateway to East and Central Africa. Strong growth in technology, financial services, and logistics complements traditional strengths in agriculture, particularly tea and horticulture.",
    exports: ["Tea", "Horticulture", "Coffee", "Mobile Services", "Tourism"],
    imports: ["Petroleum", "Machinery", "Motor Vehicles", "Iron & Steel", "Plastics"],
    sectors: [{ name: "Services", share: "53%", pct: 53 }, { name: "Agriculture", share: "34%", pct: 34 }, { name: "Industry", share: "13%", pct: 13 }],
    recentEvents: [
      { date: "Apr 28", title: "GDP Growth Q1", value: "+5.4%", impact: "high" },
      { date: "Apr 18", title: "Inflation Rate", value: "6.3%", impact: "medium" },
      { date: "Apr 05", title: "CBK Rate Decision", value: "13.00%", impact: "high" },
    ],
  },
  ETH: {
    code: "ETH", name: "Ethiopia", flag: "🇪🇹", region: "East Africa", capital: "Addis Ababa",
    currency: "ETB", gdp: "$156B", gdpGrowth: "+7.2%", gdpGrowthPositive: true,
    population: "126M", inflation: "22.1%", interestRate: "7.00%", rating: "CCC", ratingColor: "text-red-500",
    description: "Ethiopia is Africa's second-most populous nation and one of the world's fastest-growing economies. Driven by massive public infrastructure investment, a thriving manufacturing sector, and robust services growth, Ethiopia is transforming into an industrial hub. The Grand Ethiopian Renaissance Dam (GERD) on the Blue Nile is set to make Ethiopia Africa's leading power exporter.",
    exports: ["Coffee", "Oilseeds", "Flowers", "Gold", "Khat"],
    imports: ["Capital Goods", "Consumer Goods", "Fuel", "Cereals", "Chemicals"],
    sectors: [{ name: "Agriculture", share: "37%", pct: 37 }, { name: "Services", share: "40%", pct: 40 }, { name: "Industry", share: "23%", pct: 23 }],
    recentEvents: [
      { date: "May 12", title: "GDP Annual Growth", value: "+7.2%", impact: "high" },
      { date: "Apr 22", title: "Inflation Rate", value: "22.1%", impact: "high" },
      { date: "Apr 10", title: "Trade Balance", value: "-$2.8B", impact: "medium" },
    ],
  },
  GHA: {
    code: "GHA", name: "Ghana", flag: "🇬🇭", region: "West Africa", capital: "Accra",
    currency: "GHS", gdp: "$75B", gdpGrowth: "+2.9%", gdpGrowthPositive: true,
    population: "33M", inflation: "20.9%", interestRate: "29.00%", rating: "SD", ratingColor: "text-red-500",
    description: "Ghana is a stable democracy and one of West Africa's leading economies, underpinned by gold, cocoa, and oil exports. The country is implementing a bold IMF-supported debt restructuring programme following a 2022 sovereign default, with fiscal consolidation and structural reforms aimed at restoring macroeconomic stability and attracting investment.",
    exports: ["Gold", "Cocoa", "Oil", "Timber", "Tuna"],
    imports: ["Oil & Gas", "Machinery", "Vehicles", "Plastics", "Food"],
    sectors: [{ name: "Services", share: "47%", pct: 47 }, { name: "Industry", share: "30%", pct: 30 }, { name: "Agriculture", share: "23%", pct: 23 }],
    recentEvents: [
      { date: "May 05", title: "Budget Statement", value: "N/A", impact: "high" },
      { date: "Apr 25", title: "Inflation Rate", value: "20.9%", impact: "high" },
      { date: "Apr 12", title: "BOG Rate Decision", value: "29.00%", impact: "high" },
    ],
  },
  MAR: {
    code: "MAR", name: "Morocco", flag: "🇲🇦", region: "North Africa", capital: "Rabat",
    currency: "MAD", gdp: "$142B", gdpGrowth: "+3.4%", gdpGrowthPositive: true,
    population: "37M", inflation: "2.8%", interestRate: "3.00%", rating: "BB+", ratingColor: "text-green-600",
    description: "Morocco is among Africa's most stable and diversified economies, strategically positioned as a gateway between Europe and Africa. The world's largest phosphate exporter and a growing renewables leader, Morocco aims to generate 52% of its electricity from renewables by 2030. Strong tourism, a growing automotive manufacturing sector, and deepening pan-African trade ties drive robust growth.",
    exports: ["Phosphates & Fertilisers", "Automobiles", "Electronics", "Textiles", "Tourism"],
    imports: ["Fuel", "Capital Goods", "Food", "Consumer Goods", "Chemicals"],
    sectors: [{ name: "Services", share: "56%", pct: 56 }, { name: "Industry", share: "28%", pct: 28 }, { name: "Agriculture", share: "16%", pct: 16 }],
    recentEvents: [
      { date: "May 07", title: "Inflation Rate Apr", value: "2.8%", impact: "medium" },
      { date: "Apr 16", title: "BAM Rate Decision", value: "3.00%", impact: "medium" },
      { date: "Apr 08", title: "Trade Balance", value: "-MAD 22B", impact: "medium" },
    ],
  },
  RWA: {
    code: "RWA", name: "Rwanda", flag: "🇷🇼", region: "East Africa", capital: "Kigali",
    currency: "RWF", gdp: "$14B", gdpGrowth: "+7.5%", gdpGrowthPositive: true,
    population: "14M", inflation: "5.2%", interestRate: "7.00%", rating: "B+", ratingColor: "text-amber-500",
    description: "Rwanda is widely regarded as Africa's model of governance, efficiency, and rapid economic transformation. Three decades after the 1994 genocide, Kigali has emerged as one of the continent's most liveable, clean, and business-friendly capitals. A diversified economy built on tourism, tech, financial services, and mining — combined with visionary leadership — makes Rwanda a beacon for African economic development.",
    exports: ["Coffee", "Tea", "Minerals (Coltan, Cassiterite)", "Tourism", "Horticulture"],
    imports: ["Capital Goods", "Food", "Fuel", "Consumer Goods", "Pharmaceuticals"],
    sectors: [{ name: "Services", share: "49%", pct: 49 }, { name: "Agriculture", share: "26%", pct: 26 }, { name: "Industry", share: "25%", pct: 25 }],
    recentEvents: [
      { date: "May 14", title: "NBR Rate Decision", value: "7.00%", impact: "medium" },
      { date: "Apr 20", title: "GDP Growth Q1", value: "+7.5%", impact: "high" },
      { date: "Apr 10", title: "Inflation Rate", value: "5.2%", impact: "medium" },
    ],
  },
};

const IMPACT_COLORS: Record<string, string> = {
  high: "bg-red-50 text-red-600 border-red-100",
  medium: "bg-amber-50 text-amber-600 border-amber-100",
  low: "bg-green-50 text-green-600 border-green-100",
};

export default function CountryProfilePage() {
  const params = useParams();
  const code = (params?.code as string)?.toUpperCase();
  const country = COUNTRIES[code];

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🌍</p>
          <h2 className="text-xl font-black text-foreground mb-2">Country not found</h2>
          <p className="text-secondary text-sm mb-6">Profile for &quot;{code}&quot; is not yet available.</p>
          <Link href="/countries" className="text-sm font-semibold text-primary hover:underline">← Back to Countries</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] mx-auto">
      {/* Back link */}
      <Link href="/countries" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Countries
      </Link>

      {/* Country Hero */}
      <div className="rounded-2xl border border-border bg-white shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <span className="text-5xl">{country.flag}</span>
          <div className="flex-1">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <h1 className="text-3xl font-black text-foreground">{country.name}</h1>
                <p className="text-sm text-secondary mt-0.5">{country.region} · Capital: {country.capital}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold bg-muted/60 border border-border px-3 py-1.5 rounded-full text-secondary">{country.currency}</span>
                <span className={`text-lg font-black ${country.ratingColor}`}>{country.rating} <span className="text-xs font-semibold text-secondary">Rating</span></span>
              </div>
            </div>
            <p className="text-sm text-secondary leading-relaxed mt-3 max-w-3xl">{country.description}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "GDP", value: country.gdp, sub: country.gdpGrowth, positive: country.gdpGrowthPositive, icon: DollarSign },
          { label: "Population", value: country.population, sub: country.region, positive: true, icon: Users },
          { label: "Inflation", value: country.inflation, sub: "Latest CPI", positive: false, icon: Activity },
          { label: "Interest Rate", value: country.interestRate, sub: "Central Bank", positive: true, icon: BarChart3 },
        ].map(({ label, value, sub, positive, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-border bg-white shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-4 w-4 text-primary/70" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-2xl font-black text-foreground">{value}</p>
            <p className={`text-xs font-semibold mt-0.5 flex items-center gap-1 ${label === "GDP" ? (positive ? "text-emerald-600" : "text-red-500") : "text-secondary"}`}>
              {label === "GDP" && (positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />)}
              {sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Economic Sectors */}
          <div className="rounded-xl border border-border bg-white shadow-sm p-5">
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> GDP by Sector
            </h2>
            <div className="space-y-3">
              {country.sectors.map((sector) => (
                <div key={sector.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">{sector.name}</span>
                    <span className="text-sm font-black text-primary">{sector.share}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/70 transition-all duration-500"
                      style={{ width: `${sector.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trade */}
          <div className="rounded-xl border border-border bg-white shadow-sm p-5">
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" /> Key Trade Flows
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-2">Top Exports</p>
                <div className="space-y-1.5">
                  {country.exports.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-2">Top Imports</p>
                <div className="space-y-1.5">
                  {country.imports.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span className="text-xs text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — Recent Events */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-white shadow-sm p-5">
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Recent Data Releases
            </h2>
            <div className="space-y-3">
              {country.recentEvents.map((event, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <span className={`text-[9px] font-black px-2 py-1 rounded-md border flex-shrink-0 ${IMPACT_COLORS[event.impact]}`}>
                    {event.impact.toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground leading-snug">{event.title}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[10px] text-secondary">{event.date}</span>
                      <span className="text-xs font-black text-primary">{event.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/calendar" className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-primary hover:underline">
              View Full Calendar →
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-border bg-white shadow-sm p-5">
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3">Quick Facts</h2>
            <div className="space-y-2">
              {[
                { label: "Currency", value: country.currency },
                { label: "Capital City", value: country.capital },
                { label: "Region", value: country.region },
                { label: "Credit Rating", value: country.rating },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-xs text-secondary font-medium">{label}</span>
                  <span className="text-xs font-black text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
