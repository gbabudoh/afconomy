export interface CountryProfile {
  code: string;
  name: string;
  flag: string;
  region: string;
  capital: string;
  currency: string;
  gdp: string;
  gdpGrowth: string;
  gdpGrowthPositive: boolean;
  gdpPerCapita: string;
  population: string;
  inflation: string;
  interestRate: string;
  rating: string;
  ratingTier: "strong" | "moderate" | "weak";
  unemployment: string;
  debtToGDP: string;
  fxReserves: string;
  currentAccount: string;
  description: string;
  exports: string[];
  imports: string[];
  tradePartners: string[];
  sectors: { name: string; share: string; pct: number }[];
  recentEvents: { date: string; title: string; value: string; impact: "high" | "medium" | "low" }[];
}

export const COUNTRY_PROFILES: Record<string, CountryProfile> = {

  // ── North Africa ─────────────────────────────────────────────────────────────

  DZA: {
    code: "DZA", name: "Algeria", flag: "🇩🇿", region: "North Africa", capital: "Algiers",
    currency: "DZD", gdp: "$239B", gdpGrowth: "+3.8%", gdpGrowthPositive: true, gdpPerCapita: "$5,300",
    population: "45M", inflation: "7.2%", interestRate: "3.00%", rating: "NR", ratingTier: "moderate",
    unemployment: "11.8%", debtToGDP: "56%", fxReserves: "$69B", currentAccount: "+0.5%",
    description: "Algeria is North Africa's second-largest economy and a dominant natural gas exporter, supplying roughly a quarter of Europe's gas needs via pipelines. Hydrocarbon revenues fund an expansive public sector and fuel subsidies, but the government is actively pursuing its Vision 2030 diversification agenda to grow manufacturing, agriculture, and ICT. Petrochemical investments and rising offshore gas discoveries offer a platform for sustained long-term growth.",
    exports: ["Natural Gas", "Crude Oil", "Petroleum Products", "Dates", "Phosphates"],
    imports: ["Capital Goods", "Food & Cereals", "Consumer Goods", "Steel", "Pharmaceuticals"],
    tradePartners: ["Italy", "France", "Spain", "Germany", "UK"],
    sectors: [{ name: "Services", share: "46%", pct: 46 }, { name: "Industry", share: "38%", pct: 38 }, { name: "Agriculture", share: "16%", pct: 16 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth Q1", value: "+3.8%", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "7.2%", impact: "medium" },
      { date: "Feb 2025", title: "Trade Balance", value: "+$2.1B", impact: "medium" },
    ],
  },

  EGY: {
    code: "EGY", name: "Egypt", flag: "🇪🇬", region: "North Africa", capital: "Cairo",
    currency: "EGP", gdp: "$395B", gdpGrowth: "+3.8%", gdpGrowthPositive: true, gdpPerCapita: "$3,700",
    population: "106M", inflation: "29.5%", interestRate: "27.25%", rating: "B", ratingTier: "weak",
    unemployment: "7.1%", debtToGDP: "92%", fxReserves: "$46B", currentAccount: "-2.4%",
    description: "Egypt occupies a strategic crossroads linking Africa, the Middle East, and Europe, with the Suez Canal generating over $9B in annual revenues. Africa's second-most populous nation is undertaking a sweeping IMF-backed reform programme featuring currency liberalisation, fiscal consolidation, and private sector development. A booming new administrative capital east of Cairo and rising LNG production signal a country reinventing itself for the 21st century.",
    exports: ["Petroleum Products", "Natural Gas", "Textiles", "Chemicals", "Tourism Services"],
    imports: ["Machinery & Equipment", "Food & Grain", "Chemicals", "Iron & Steel", "Consumer Goods"],
    tradePartners: ["UAE", "Saudi Arabia", "Turkey", "Italy", "China"],
    sectors: [{ name: "Services", share: "52%", pct: 52 }, { name: "Industry", share: "33%", pct: 33 }, { name: "Agriculture", share: "15%", pct: 15 }],
    recentEvents: [
      { date: "Apr 2025", title: "CBE Rate Decision", value: "27.25%", impact: "high" },
      { date: "Apr 2025", title: "CPI Inflation", value: "29.5%", impact: "high" },
      { date: "Mar 2025", title: "Trade Balance", value: "-$2.1B", impact: "medium" },
    ],
  },

  LBY: {
    code: "LBY", name: "Libya", flag: "🇱🇾", region: "North Africa", capital: "Tripoli",
    currency: "LYD", gdp: "$41B", gdpGrowth: "+10.0%", gdpGrowthPositive: true, gdpPerCapita: "$5,800",
    population: "7M", inflation: "5.0%", interestRate: "3.00%", rating: "NR", ratingTier: "weak",
    unemployment: "18.0%", debtToGDP: "3%", fxReserves: "$88B", currentAccount: "+8.2%",
    description: "Libya holds Africa's largest proven oil reserves — estimated at 48 billion barrels — and is rebuilding its petroleum sector following years of political instability. Despite ongoing governance challenges between rival authorities in Tripoli and Benghazi, oil output has recovered toward 1.2 million barrels per day. Sovereign wealth assets exceeding $80B and minimal public debt give Libya a unique financial platform once political stability is secured.",
    exports: ["Crude Oil", "Natural Gas", "Petrochemicals", "Steel", "Refined Products"],
    imports: ["Machinery & Equipment", "Food & Beverages", "Consumer Goods", "Transport Equipment", "Pharmaceuticals"],
    tradePartners: ["Italy", "Germany", "China", "Turkey", "France"],
    sectors: [{ name: "Industry (Oil & Gas)", share: "60%", pct: 60 }, { name: "Services", share: "35%", pct: 35 }, { name: "Agriculture", share: "5%", pct: 5 }],
    recentEvents: [
      { date: "Apr 2025", title: "Oil Production", value: "1.21M bpd", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "5.0%", impact: "low" },
      { date: "Feb 2025", title: "FX Reserve Update", value: "$88B", impact: "medium" },
    ],
  },

  MAR: {
    code: "MAR", name: "Morocco", flag: "🇲🇦", region: "North Africa", capital: "Rabat",
    currency: "MAD", gdp: "$142B", gdpGrowth: "+3.4%", gdpGrowthPositive: true, gdpPerCapita: "$3,800",
    population: "37M", inflation: "2.8%", interestRate: "3.00%", rating: "BB+", ratingTier: "strong",
    unemployment: "12.9%", debtToGDP: "70%", fxReserves: "$37B", currentAccount: "-0.9%",
    description: "Morocco is Africa's gateway economy, commanding the world's largest phosphate reserves and fast becoming the continent's green hydrogen and automotive manufacturing hub. Strategic geography — straddling the Atlantic and Mediterranean — underpins a booming services sector in tourism, logistics, and finance. The 2030 FIFA World Cup co-hosting role and a $52B green hydrogen pipeline are set to cement Morocco's position as Africa's preeminent investment destination.",
    exports: ["Phosphates & Fertilisers", "Automobiles", "Electronic Components", "Textiles", "Tourism"],
    imports: ["Fuel & Energy", "Capital Goods", "Food & Grain", "Consumer Electronics", "Chemicals"],
    tradePartners: ["France", "Spain", "India", "United States", "Italy"],
    sectors: [{ name: "Services", share: "56%", pct: 56 }, { name: "Industry", share: "28%", pct: 28 }, { name: "Agriculture", share: "16%", pct: 16 }],
    recentEvents: [
      { date: "Apr 2025", title: "BAM Rate Decision", value: "3.00%", impact: "medium" },
      { date: "Apr 2025", title: "Inflation Rate", value: "2.8%", impact: "medium" },
      { date: "Mar 2025", title: "Trade Balance", value: "-MAD 22B", impact: "medium" },
    ],
  },

  SDN: {
    code: "SDN", name: "Sudan", flag: "🇸🇩", region: "North Africa", capital: "Khartoum",
    currency: "SDG", gdp: "$30B", gdpGrowth: "-2.5%", gdpGrowthPositive: false, gdpPerCapita: "$650",
    population: "46M", inflation: "256%", interestRate: "17.00%", rating: "NR", ratingTier: "weak",
    unemployment: "19.5%", debtToGDP: "212%", fxReserves: "$1.8B", currentAccount: "-5.3%",
    description: "Sudan is navigating a profound economic and humanitarian crisis compounded by the civil conflict that erupted in April 2023, displacing over 8 million people. The country possesses enormous agricultural potential — fertile Nile floodplains, significant gold deposits, and vast livestock herds — that have historically underpinned the economy. Stability restoration and debt relief under the HIPC initiative remain prerequisites for unlocking Sudan's long-term development potential.",
    exports: ["Gold", "Sesame Seeds", "Livestock", "Gum Arabic", "Cotton"],
    imports: ["Fuel & Energy", "Machinery & Equipment", "Food & Medicine", "Chemicals", "Consumer Goods"],
    tradePartners: ["UAE", "China", "Saudi Arabia", "India", "Egypt"],
    sectors: [{ name: "Agriculture", share: "39%", pct: 39 }, { name: "Services", share: "41%", pct: 41 }, { name: "Industry", share: "20%", pct: 20 }],
    recentEvents: [
      { date: "Apr 2025", title: "Inflation Rate", value: "256%", impact: "high" },
      { date: "Mar 2025", title: "GDP Estimate", value: "-2.5%", impact: "high" },
      { date: "Feb 2025", title: "Gold Exports", value: "$320M", impact: "medium" },
    ],
  },

  TUN: {
    code: "TUN", name: "Tunisia", flag: "🇹🇳", region: "North Africa", capital: "Tunis",
    currency: "TND", gdp: "$47B", gdpGrowth: "+1.8%", gdpGrowthPositive: true, gdpPerCapita: "$3,900",
    population: "12M", inflation: "7.9%", interestRate: "8.00%", rating: "Caa1", ratingTier: "weak",
    unemployment: "16.4%", debtToGDP: "80%", fxReserves: "$8.3B", currentAccount: "-3.0%",
    description: "Tunisia is a Mediterranean economy with a highly educated, skilled workforce and deep European trade integration — over 80% of exports head to the EU. The country is balancing painful IMF-required structural adjustments against social pressures, while trying to diversify into digital services, automotive parts, and renewables. Tunisia's political trajectory under presidential concentration of power adds uncertainty to the medium-term investment outlook.",
    exports: ["Olive Oil", "Phosphates & Fertilisers", "Automotive Parts", "Textiles & Clothing", "Dates"],
    imports: ["Fuel & Energy", "Capital Goods", "Consumer Goods", "Food & Grain", "Chemicals"],
    tradePartners: ["France", "Italy", "Germany", "Libya", "Turkey"],
    sectors: [{ name: "Services", share: "62%", pct: 62 }, { name: "Industry", share: "26%", pct: 26 }, { name: "Agriculture", share: "12%", pct: 12 }],
    recentEvents: [
      { date: "Apr 2025", title: "BCT Rate Decision", value: "8.00%", impact: "medium" },
      { date: "Apr 2025", title: "Inflation Rate", value: "7.9%", impact: "high" },
      { date: "Mar 2025", title: "Trade Balance", value: "-TND 1.8B", impact: "medium" },
    ],
  },

  // ── West Africa ───────────────────────────────────────────────────────────────

  BEN: {
    code: "BEN", name: "Benin", flag: "🇧🇯", region: "West Africa", capital: "Porto-Novo",
    currency: "XOF", gdp: "$17B", gdpGrowth: "+6.4%", gdpGrowthPositive: true, gdpPerCapita: "$1,300",
    population: "13M", inflation: "2.8%", interestRate: "3.50%", rating: "B+", ratingTier: "moderate",
    unemployment: "2.4%", debtToGDP: "52%", fxReserves: "$2.1B", currentAccount: "-4.8%",
    description: "Benin is a fast-growing West African frontier market punching above its weight as a regional transit hub, re-exporting goods to landlocked Niger, Burkina Faso, and Mali. Cotton remains the backbone of rural incomes while the port of Cotonou is a strategic logistics gateway. The government's Agenda 2025 prioritises agriculture modernisation, digital infrastructure, and tourism to sustain above-regional-average growth.",
    exports: ["Cotton", "Cashews", "Shea Butter", "Pineapple", "Reexports to Neighbours"],
    imports: ["Food & Consumer Goods", "Capital Equipment", "Fuel & Energy", "Pharmaceuticals", "Construction Materials"],
    tradePartners: ["India", "Bangladesh", "Nigeria", "China", "France"],
    sectors: [{ name: "Services", share: "50%", pct: 50 }, { name: "Agriculture", share: "32%", pct: 32 }, { name: "Industry", share: "18%", pct: 18 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+6.4%", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "2.8%", impact: "low" },
      { date: "Feb 2025", title: "Cotton Harvest", value: "720K tonnes", impact: "medium" },
    ],
  },

  BFA: {
    code: "BFA", name: "Burkina Faso", flag: "🇧🇫", region: "West Africa", capital: "Ouagadougou",
    currency: "XOF", gdp: "$19B", gdpGrowth: "+3.6%", gdpGrowthPositive: true, gdpPerCapita: "$860",
    population: "22M", inflation: "3.5%", interestRate: "3.50%", rating: "CCC", ratingTier: "weak",
    unemployment: "5.4%", debtToGDP: "62%", fxReserves: "$1.2B", currentAccount: "-5.1%",
    description: "Burkina Faso is one of West Africa's leading gold producers, with mining revenues accounting for over 70% of export earnings. The economy faces significant headwinds from Sahelian insecurity disrupting agricultural supply chains and displacing nearly 2 million people internally. Despite these challenges, the country's young population, growing telecoms sector, and gold mining expansion offer pathways to recovery once stability improves.",
    exports: ["Gold", "Cotton", "Zinc", "Cashews", "Sesame Seeds"],
    imports: ["Capital Goods", "Food & Grain", "Fuel & Energy", "Pharmaceuticals", "Consumer Electronics"],
    tradePartners: ["Switzerland", "India", "Ivory Coast", "Ghana", "France"],
    sectors: [{ name: "Agriculture", share: "35%", pct: 35 }, { name: "Services", share: "41%", pct: 41 }, { name: "Industry", share: "24%", pct: 24 }],
    recentEvents: [
      { date: "Apr 2025", title: "Gold Production", value: "+4.2%", impact: "medium" },
      { date: "Mar 2025", title: "Inflation Rate", value: "3.5%", impact: "low" },
      { date: "Feb 2025", title: "IMF Review", value: "Delayed", impact: "high" },
    ],
  },

  CPV: {
    code: "CPV", name: "Cape Verde", flag: "🇨🇻", region: "West Africa", capital: "Praia",
    currency: "CVE", gdp: "$2.3B", gdpGrowth: "+5.0%", gdpGrowthPositive: true, gdpPerCapita: "$4,100",
    population: "600K", inflation: "4.1%", interestRate: "1.50%", rating: "B", ratingTier: "weak",
    unemployment: "11.2%", debtToGDP: "128%", fxReserves: "$820M", currentAccount: "-6.5%",
    description: "Cape Verde is an Atlantic island nation with one of Africa's most stable democracies and highest governance scores. Tourism is the economic centrepiece, contributing over 25% of GDP and recovering strongly post-pandemic. The country's currency is pegged to the euro at a fixed rate backed by Portugal, providing monetary stability, while diaspora remittances from Europe and the US are a critical income source for households.",
    exports: ["Tourism Services", "Clothing & Footwear", "Fish & Shellfish", "Salt", "Bananas"],
    imports: ["Food & Beverages", "Fuel & Energy", "Machinery & Equipment", "Vehicles", "Consumer Goods"],
    tradePartners: ["Portugal", "Spain", "Netherlands", "China", "Italy"],
    sectors: [{ name: "Services", share: "77%", pct: 77 }, { name: "Industry", share: "17%", pct: 17 }, { name: "Agriculture", share: "6%", pct: 6 }],
    recentEvents: [
      { date: "Apr 2025", title: "Tourism Arrivals", value: "+12.3%", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "4.1%", impact: "low" },
      { date: "Feb 2025", title: "GDP Forecast", value: "+5.0%", impact: "medium" },
    ],
  },

  GMB: {
    code: "GMB", name: "Gambia", flag: "🇬🇲", region: "West Africa", capital: "Banjul",
    currency: "GMD", gdp: "$2.2B", gdpGrowth: "+5.3%", gdpGrowthPositive: true, gdpPerCapita: "$840",
    population: "2.6M", inflation: "17.2%", interestRate: "16.00%", rating: "NR", ratingTier: "weak",
    unemployment: "9.9%", debtToGDP: "80%", fxReserves: "$620M", currentAccount: "-4.0%",
    description: "The Gambia — West Africa's smallest country — is charting a post-dictatorship economic recovery path anchored in tourism, remittances, and agriculture. As a narrow strip of land along the Gambia River, the country's geographic setting drives both a thriving birdwatching and beach tourism industry and significant re-export trade. Large diaspora remittances from Europe constitute the largest single source of household income, equalling nearly 25% of GDP.",
    exports: ["Groundnuts & Groundnut Oil", "Fish & Shellfish", "Cotton", "Tourism", "Re-exports"],
    imports: ["Food & Beverages", "Machinery", "Fuel & Energy", "Vehicles", "Consumer Goods"],
    tradePartners: ["Senegal", "China", "UK", "India", "Germany"],
    sectors: [{ name: "Services", share: "60%", pct: 60 }, { name: "Agriculture", share: "25%", pct: 25 }, { name: "Industry", share: "15%", pct: 15 }],
    recentEvents: [
      { date: "Apr 2025", title: "Inflation Rate", value: "17.2%", impact: "high" },
      { date: "Mar 2025", title: "CBG Rate Decision", value: "16.00%", impact: "medium" },
      { date: "Feb 2025", title: "Remittance Inflows", value: "+8.5%", impact: "medium" },
    ],
  },

  GHA: {
    code: "GHA", name: "Ghana", flag: "🇬🇭", region: "West Africa", capital: "Accra",
    currency: "GHS", gdp: "$75B", gdpGrowth: "+2.9%", gdpGrowthPositive: true, gdpPerCapita: "$2,300",
    population: "33M", inflation: "20.9%", interestRate: "29.00%", rating: "SD", ratingTier: "weak",
    unemployment: "3.5%", debtToGDP: "89%", fxReserves: "$5.9B", currentAccount: "-2.8%",
    description: "Ghana is West Africa's most stable democracy and a resource-rich economy historically shaped by gold, cocoa, and oil exports. Following a 2022 sovereign debt default — the first in its history — Ghana is implementing a bold IMF-supported restructuring programme, having completed domestic debt exchanges and negotiating with external creditors. Accra remains a dynamic business hub and a gateway for foreign investment across the region.",
    exports: ["Gold", "Cocoa & Products", "Oil", "Timber", "Tuna"],
    imports: ["Oil & Gas", "Machinery & Equipment", "Vehicles", "Plastics", "Food"],
    tradePartners: ["UAE", "China", "Switzerland", "India", "South Africa"],
    sectors: [{ name: "Services", share: "47%", pct: 47 }, { name: "Industry", share: "30%", pct: 30 }, { name: "Agriculture", share: "23%", pct: 23 }],
    recentEvents: [
      { date: "May 2025", title: "Budget Statement", value: "Deficit 4.7%", impact: "high" },
      { date: "Apr 2025", title: "Inflation Rate", value: "20.9%", impact: "high" },
      { date: "Apr 2025", title: "BOG Rate Decision", value: "29.00%", impact: "high" },
    ],
  },

  GIN: {
    code: "GIN", name: "Guinea", flag: "🇬🇳", region: "West Africa", capital: "Conakry",
    currency: "GNF", gdp: "$16B", gdpGrowth: "+5.6%", gdpGrowthPositive: true, gdpPerCapita: "$1,200",
    population: "13M", inflation: "10.5%", interestRate: "12.50%", rating: "NR", ratingTier: "weak",
    unemployment: "4.1%", debtToGDP: "38%", fxReserves: "$1.4B", currentAccount: "-9.2%",
    description: "Guinea holds the world's largest bauxite reserves — estimated at 40 billion tonnes — making it the leading global supplier to the aluminium industry. Major Chinese and international investments in the Simandou iron ore project, the world's largest untapped high-grade deposit, are transforming Guinea into a future iron ore giant. Hydropower potential on the Fouta Djallon plateau, often called 'the water tower of West Africa', adds to the country's immense resource endowment.",
    exports: ["Bauxite & Alumina", "Gold", "Diamonds", "Cashews", "Coffee"],
    imports: ["Capital Goods", "Fuel & Energy", "Food", "Consumer Goods", "Pharmaceuticals"],
    tradePartners: ["China", "UAE", "India", "Spain", "Russia"],
    sectors: [{ name: "Industry", share: "38%", pct: 38 }, { name: "Agriculture", share: "31%", pct: 31 }, { name: "Services", share: "31%", pct: 31 }],
    recentEvents: [
      { date: "Apr 2025", title: "Bauxite Exports", value: "+7.8%", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "10.5%", impact: "medium" },
      { date: "Feb 2025", title: "Simandou Update", value: "On track", impact: "high" },
    ],
  },

  GNB: {
    code: "GNB", name: "Guinea-Bissau", flag: "🇬🇼", region: "West Africa", capital: "Bissau",
    currency: "XOF", gdp: "$1.7B", gdpGrowth: "+4.5%", gdpGrowthPositive: true, gdpPerCapita: "$810",
    population: "2.1M", inflation: "3.8%", interestRate: "3.50%", rating: "NR", ratingTier: "weak",
    unemployment: "8.9%", debtToGDP: "77%", fxReserves: "$290M", currentAccount: "-4.2%",
    description: "Guinea-Bissau is the world's sixth-largest cashew exporter, with the nut accounting for over 90% of export revenues — making the economy highly vulnerable to commodity price swings. Vast untapped offshore oil blocks and phosphate deposits represent a potential economic transformation, subject to governance improvements. The country uses the CFA franc and benefits from WAEMU monetary union structures, providing monetary stability in an otherwise challenging political environment.",
    exports: ["Cashews", "Fish & Shrimp", "Phosphates", "Timber", "Peanuts"],
    imports: ["Food & Beverages", "Fuel & Energy", "Consumer Goods", "Machinery", "Pharmaceuticals"],
    tradePartners: ["India", "Vietnam", "Singapore", "Portugal", "Senegal"],
    sectors: [{ name: "Agriculture", share: "50%", pct: 50 }, { name: "Services", share: "36%", pct: 36 }, { name: "Industry", share: "14%", pct: 14 }],
    recentEvents: [
      { date: "Apr 2025", title: "Cashew Campaign", value: "180K tonnes", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "3.8%", impact: "low" },
      { date: "Feb 2025", title: "Offshore Oil Survey", value: "Positive", impact: "high" },
    ],
  },

  CIV: {
    code: "CIV", name: "Ivory Coast", flag: "🇨🇮", region: "West Africa", capital: "Yamoussoukro",
    currency: "XOF", gdp: "$73B", gdpGrowth: "+6.8%", gdpGrowthPositive: true, gdpPerCapita: "$2,700",
    population: "27M", inflation: "4.2%", interestRate: "3.50%", rating: "BB-", ratingTier: "moderate",
    unemployment: "3.0%", debtToGDP: "57%", fxReserves: "$8.1B", currentAccount: "-5.0%",
    description: "Ivory Coast is the economic anchor of Francophone West Africa and the world's undisputed cocoa leader, producing over 40% of global supply. Abidjan is the sub-region's largest port and financial centre, attracting multinationals and development financing at scale. Ongoing diversification into cashews, rubber, palm oil, and a rapidly growing telecoms and fintech sector is broadening the base of one of Africa's most consistently high-growth economies.",
    exports: ["Cocoa & Products", "Coffee", "Cashews", "Rubber", "Palm Oil"],
    imports: ["Fuel & Energy", "Capital Goods", "Food", "Pharmaceuticals", "Vehicles"],
    tradePartners: ["Netherlands", "USA", "France", "Belgium", "Germany"],
    sectors: [{ name: "Services", share: "49%", pct: 49 }, { name: "Industry", share: "28%", pct: 28 }, { name: "Agriculture", share: "23%", pct: 23 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+6.8%", impact: "high" },
      { date: "Apr 2025", title: "Cocoa Prices", value: "$9,200/tonne", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "4.2%", impact: "low" },
    ],
  },

  LBR: {
    code: "LBR", name: "Liberia", flag: "🇱🇷", region: "West Africa", capital: "Monrovia",
    currency: "LRD", gdp: "$3.9B", gdpGrowth: "+4.8%", gdpGrowthPositive: true, gdpPerCapita: "$720",
    population: "5.4M", inflation: "8.5%", interestRate: "20.00%", rating: "NR", ratingTier: "weak",
    unemployment: "3.7%", debtToGDP: "55%", fxReserves: "$680M", currentAccount: "-14.0%",
    description: "Liberia is rebuilding its economy after two brutal civil wars, with iron ore, rubber, timber, and gold exports forming the productive core. The country hosts the world's largest ship registry by tonnage, generating meaningful government revenues. Major mining investments — including the revival of the Yekepa iron ore range — alongside improved port infrastructure and energy access are laying the foundations for a post-conflict economic revival.",
    exports: ["Iron Ore", "Rubber", "Gold", "Timber", "Diamond"],
    imports: ["Food & Beverages", "Machinery & Equipment", "Fuel", "Manufactured Goods", "Chemicals"],
    tradePartners: ["China", "South Korea", "Japan", "USA", "Netherlands"],
    sectors: [{ name: "Agriculture", share: "42%", pct: 42 }, { name: "Services", share: "40%", pct: 40 }, { name: "Industry", share: "18%", pct: 18 }],
    recentEvents: [
      { date: "Apr 2025", title: "Iron Ore Output", value: "+12.0%", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "8.5%", impact: "medium" },
      { date: "Feb 2025", title: "CBL Rate", value: "20.00%", impact: "medium" },
    ],
  },

  MLI: {
    code: "MLI", name: "Mali", flag: "🇲🇱", region: "West Africa", capital: "Bamako",
    currency: "XOF", gdp: "$19B", gdpGrowth: "+3.2%", gdpGrowthPositive: true, gdpPerCapita: "$860",
    population: "22M", inflation: "4.2%", interestRate: "3.50%", rating: "NR", ratingTier: "weak",
    unemployment: "8.1%", debtToGDP: "52%", fxReserves: "$2.3B", currentAccount: "-5.8%",
    description: "Mali is one of Africa's largest gold producers, with the metal accounting for over 70% of export receipts. The Malian economy remains structurally dependent on rainfed agriculture and artisanal mining despite considerable mineral wealth. Political instability following two military coups since 2020, combined with Sahelian insecurity in the north and centre, is constraining investment and donor support, though gold revenues continue to sustain fiscal accounts.",
    exports: ["Gold", "Cotton", "Livestock", "Salt", "Shea Butter"],
    imports: ["Capital Goods", "Food & Grain", "Fuel & Energy", "Machinery", "Pharmaceuticals"],
    tradePartners: ["Switzerland", "UAE", "South Africa", "Senegal", "China"],
    sectors: [{ name: "Agriculture", share: "39%", pct: 39 }, { name: "Services", share: "39%", pct: 39 }, { name: "Industry", share: "22%", pct: 22 }],
    recentEvents: [
      { date: "Apr 2025", title: "Gold Production", value: "+3.1%", impact: "medium" },
      { date: "Mar 2025", title: "Inflation Rate", value: "4.2%", impact: "low" },
      { date: "Feb 2025", title: "Cotton Output", value: "550K tonnes", impact: "medium" },
    ],
  },

  MRT: {
    code: "MRT", name: "Mauritania", flag: "🇲🇷", region: "West Africa", capital: "Nouakchott",
    currency: "MRU", gdp: "$10B", gdpGrowth: "+4.6%", gdpGrowthPositive: true, gdpPerCapita: "$2,200",
    population: "4.6M", inflation: "4.9%", interestRate: "8.00%", rating: "NR", ratingTier: "weak",
    unemployment: "10.8%", debtToGDP: "50%", fxReserves: "$1.9B", currentAccount: "-6.0%",
    description: "Mauritania is on the cusp of an economic transformation driven by the Grand Tortue Ahmeyim LNG project — one of West Africa's largest offshore gas developments, straddling the maritime border with Senegal. Already a major iron ore exporter through the SNIM mining company, and with the world's most productive fishing grounds off its Atlantic coast, Mauritania's resource wealth is being incrementally diversified. Gas revenues from 2024 onwards are expected to reshape fiscal dynamics and fund social infrastructure.",
    exports: ["Iron Ore", "Fish & Seafood", "Gold", "Oil", "Copper"],
    imports: ["Capital Goods", "Food & Grain", "Fuel", "Consumer Goods", "Machinery"],
    tradePartners: ["China", "Switzerland", "Spain", "Japan", "Italy"],
    sectors: [{ name: "Services", share: "40%", pct: 40 }, { name: "Industry", share: "40%", pct: 40 }, { name: "Agriculture", share: "20%", pct: 20 }],
    recentEvents: [
      { date: "Apr 2025", title: "LNG Production Start", value: "Q2 2025", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "4.9%", impact: "low" },
      { date: "Feb 2025", title: "Iron Ore Exports", value: "+5.4%", impact: "medium" },
    ],
  },

  NER: {
    code: "NER", name: "Niger", flag: "🇳🇪", region: "West Africa", capital: "Niamey",
    currency: "XOF", gdp: "$16B", gdpGrowth: "+6.9%", gdpGrowthPositive: true, gdpPerCapita: "$640",
    population: "25M", inflation: "3.8%", interestRate: "3.50%", rating: "NR", ratingTier: "weak",
    unemployment: "0.5%", debtToGDP: "48%", fxReserves: "$1.5B", currentAccount: "-13.0%",
    description: "Niger holds the world's seventh-largest uranium reserves and is Africa's top producer, supplying the European nuclear power industry. The country is expanding oil production through the Agadem Rift Basin and is building the 2,000 km Niger-Benin pipeline to the Gulf of Guinea. Despite a July 2023 military coup straining relations with Western donors, the country's vast mineral potential — uranium, gold, phosphates, and oil — underpins resilient medium-term growth.",
    exports: ["Uranium", "Gold", "Oil", "Livestock", "Cowpeas"],
    imports: ["Food & Grain", "Capital Goods", "Fuel", "Consumer Goods", "Pharmaceuticals"],
    tradePartners: ["France", "China", "Nigeria", "USA", "Benin"],
    sectors: [{ name: "Agriculture", share: "40%", pct: 40 }, { name: "Services", share: "38%", pct: 38 }, { name: "Industry", share: "22%", pct: 22 }],
    recentEvents: [
      { date: "Apr 2025", title: "Oil Pipeline Output", value: "90K bpd", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "3.8%", impact: "low" },
      { date: "Feb 2025", title: "Uranium Exports", value: "+2.4%", impact: "medium" },
    ],
  },

  NGA: {
    code: "NGA", name: "Nigeria", flag: "🇳🇬", region: "West Africa", capital: "Abuja",
    currency: "NGN", gdp: "$477B", gdpGrowth: "+3.2%", gdpGrowthPositive: true, gdpPerCapita: "$2,140",
    population: "223M", inflation: "31.7%", interestRate: "27.50%", rating: "B-", ratingTier: "weak",
    unemployment: "4.3%", debtToGDP: "38%", fxReserves: "$39B", currentAccount: "+1.2%",
    description: "Nigeria is Africa's largest economy by GDP and most populous nation with 223 million people — one in five Africans. As the continent's dominant oil producer, petroleum accounts for over 80% of export earnings, though Lagos has emerged as Africa's foremost tech and fintech hub attracting billions in VC capital. The naira's 2023-2024 managed devaluation and fuel subsidy removal signal a bold macroeconomic reset, with the government targeting 6% growth through agricultural and manufacturing diversification.",
    exports: ["Crude Oil", "Petroleum Products", "Liquefied Natural Gas", "Cocoa", "Cashews"],
    imports: ["Machinery & Equipment", "Chemicals", "Transport Equipment", "Food & Grain", "Consumer Goods"],
    tradePartners: ["India", "Spain", "USA", "Netherlands", "France"],
    sectors: [{ name: "Services", share: "54%", pct: 54 }, { name: "Agriculture", share: "24%", pct: 24 }, { name: "Industry", share: "22%", pct: 22 }],
    recentEvents: [
      { date: "Apr 2025", title: "CBN Rate Decision", value: "27.50%", impact: "high" },
      { date: "Apr 2025", title: "Inflation Rate", value: "31.7%", impact: "high" },
      { date: "Apr 2025", title: "Oil Production", value: "1.55M bpd", impact: "high" },
    ],
  },

  SEN: {
    code: "SEN", name: "Senegal", flag: "🇸🇳", region: "West Africa", capital: "Dakar",
    currency: "XOF", gdp: "$31B", gdpGrowth: "+7.1%", gdpGrowthPositive: true, gdpPerCapita: "$1,820",
    population: "17M", inflation: "4.5%", interestRate: "3.50%", rating: "B+", ratingTier: "moderate",
    unemployment: "6.8%", debtToGDP: "74%", fxReserves: "$2.6B", currentAccount: "-9.5%",
    description: "Senegal is experiencing a historic economic transformation with the commencement of offshore oil and gas production in 2024 from the Sangomar field. Dakar is West Africa's most internationally connected city and a growing hub for financial services, technology, and regional headquarters. Strong institutions, democratic governance, and a strategic Atlantic location have made Senegal one of the continent's most attractive frontier investment destinations.",
    exports: ["Oil & Gas", "Fish & Seafood", "Phosphates & Fertilisers", "Tourism", "Groundnuts"],
    imports: ["Food & Grain", "Capital Goods", "Fuel & Energy", "Machinery", "Consumer Goods"],
    tradePartners: ["China", "India", "France", "Mali", "UK"],
    sectors: [{ name: "Services", share: "52%", pct: 52 }, { name: "Agriculture", share: "27%", pct: 27 }, { name: "Industry", share: "21%", pct: 21 }],
    recentEvents: [
      { date: "Apr 2025", title: "Oil Production", value: "100K bpd", impact: "high" },
      { date: "Apr 2025", title: "GDP Growth", value: "+7.1%", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "4.5%", impact: "low" },
    ],
  },

  SLE: {
    code: "SLE", name: "Sierra Leone", flag: "🇸🇱", region: "West Africa", capital: "Freetown",
    currency: "SLL", gdp: "$4.2B", gdpGrowth: "+3.9%", gdpGrowthPositive: true, gdpPerCapita: "$500",
    population: "8.4M", inflation: "40.0%", interestRate: "21.50%", rating: "NR", ratingTier: "weak",
    unemployment: "5.3%", debtToGDP: "72%", fxReserves: "$690M", currentAccount: "-9.8%",
    description: "Sierra Leone is a post-conflict frontier economy richly endowed with diamonds, rutile (titanium ore), iron ore, bauxite, and offshore oil. Freetown is rebuilding its infrastructure with significant Chinese and World Bank investment. The country's biodiversity, beaches, and warm hospitality are attracting a growing ecotourism sector. Macroeconomic stabilisation following currency depreciations and high inflation remains the IMF programme's core objective.",
    exports: ["Diamonds", "Rutile (Titanium Ore)", "Cocoa", "Coffee", "Fish"],
    imports: ["Food & Beverages", "Machinery", "Fuel & Energy", "Manufactured Goods", "Pharmaceuticals"],
    tradePartners: ["Belgium", "UAE", "China", "India", "UK"],
    sectors: [{ name: "Agriculture", share: "48%", pct: 48 }, { name: "Services", share: "37%", pct: 37 }, { name: "Industry", share: "15%", pct: 15 }],
    recentEvents: [
      { date: "Apr 2025", title: "Inflation Rate", value: "40.0%", impact: "high" },
      { date: "Mar 2025", title: "BSL Rate", value: "21.50%", impact: "medium" },
      { date: "Feb 2025", title: "Diamond Exports", value: "+6.3%", impact: "medium" },
    ],
  },

  TGO: {
    code: "TGO", name: "Togo", flag: "🇹🇬", region: "West Africa", capital: "Lomé",
    currency: "XOF", gdp: "$9.7B", gdpGrowth: "+5.9%", gdpGrowthPositive: true, gdpPerCapita: "$1,100",
    population: "8.9M", inflation: "4.0%", interestRate: "3.50%", rating: "B", ratingTier: "weak",
    unemployment: "3.8%", debtToGDP: "67%", fxReserves: "$1.1B", currentAccount: "-2.5%",
    description: "Togo is emerging as a regional logistics, banking, and services hub anchored by the Port of Lomé — the only natural deep-water port on the West African coast, handling 35 million tonnes of cargo annually. Phosphate mining is a key export earner, and Togo is diversifying into agribusiness, logistics technology, and digital banking. The country's central Atlantic Coast location and growing Lomé Special Economic Zone are attracting manufacturing and trade finance investment.",
    exports: ["Phosphates", "Cotton", "Coffee", "Cocoa", "Re-exports & Logistics"],
    imports: ["Food & Grain", "Capital Goods", "Fuel", "Consumer Electronics", "Pharmaceuticals"],
    tradePartners: ["India", "France", "Netherlands", "Burkina Faso", "Benin"],
    sectors: [{ name: "Services", share: "52%", pct: 52 }, { name: "Agriculture", share: "26%", pct: 26 }, { name: "Industry", share: "22%", pct: 22 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+5.9%", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "4.0%", impact: "low" },
      { date: "Feb 2025", title: "Port Throughput", value: "+8.2%", impact: "medium" },
    ],
  },

  // ── East Africa ───────────────────────────────────────────────────────────────

  BDI: {
    code: "BDI", name: "Burundi", flag: "🇧🇮", region: "East Africa", capital: "Gitega",
    currency: "BIF", gdp: "$2.8B", gdpGrowth: "+3.1%", gdpGrowthPositive: true, gdpPerCapita: "$230",
    population: "12M", inflation: "18.5%", interestRate: "16.00%", rating: "NR", ratingTier: "weak",
    unemployment: "1.4%", debtToGDP: "68%", fxReserves: "$280M", currentAccount: "-12.0%",
    description: "Burundi is one of the world's most densely populated and least developed countries, relying almost entirely on subsistence agriculture. Coffee and tea are the primary export crops, though nickel, cobalt, copper, and tantalum deposits offer long-term potential. The country faces profound development challenges: poor infrastructure, landlocked geography, low human capital indicators, and vulnerability to climate-related agricultural shocks.",
    exports: ["Coffee", "Tea", "Gold", "Cassiterite (Tin Ore)", "Tungsten"],
    imports: ["Capital Goods", "Food & Grain", "Fuel", "Consumer Goods", "Pharmaceuticals"],
    tradePartners: ["UAE", "Switzerland", "DRC", "Tanzania", "Belgium"],
    sectors: [{ name: "Agriculture", share: "40%", pct: 40 }, { name: "Services", share: "42%", pct: 42 }, { name: "Industry", share: "18%", pct: 18 }],
    recentEvents: [
      { date: "Apr 2025", title: "Inflation Rate", value: "18.5%", impact: "high" },
      { date: "Mar 2025", title: "Coffee Harvest", value: "22K tonnes", impact: "medium" },
      { date: "Feb 2025", title: "GDP Growth", value: "+3.1%", impact: "medium" },
    ],
  },

  COM: {
    code: "COM", name: "Comoros", flag: "🇰🇲", region: "East Africa", capital: "Moroni",
    currency: "KMF", gdp: "$1.4B", gdpGrowth: "+2.5%", gdpGrowthPositive: true, gdpPerCapita: "$1,500",
    population: "900K", inflation: "1.5%", interestRate: "1.93%", rating: "NR", ratingTier: "weak",
    unemployment: "6.5%", debtToGDP: "30%", fxReserves: "$320M", currentAccount: "-4.5%",
    description: "The Comoros is a small Indian Ocean archipelago economy, historically the world's leading ylang-ylang and clove producer. The KMF franc is pegged to the euro via a guarantee mechanism with France, providing monetary stability. Diaspora remittances from France represent the largest income source, equivalent to over 20% of GDP. The blue economy — fisheries, maritime services, and coastal tourism — holds the greatest growth potential for this island nation.",
    exports: ["Vanilla", "Ylang-Ylang (Perfume Essence)", "Cloves", "Copra", "Fish"],
    imports: ["Food & Beverages", "Fuel & Energy", "Consumer Goods", "Machinery", "Transport Equipment"],
    tradePartners: ["France", "UAE", "India", "Germany", "USA"],
    sectors: [{ name: "Services", share: "53%", pct: 53 }, { name: "Agriculture", share: "35%", pct: 35 }, { name: "Industry", share: "12%", pct: 12 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+2.5%", impact: "medium" },
      { date: "Mar 2025", title: "Inflation Rate", value: "1.5%", impact: "low" },
      { date: "Feb 2025", title: "Vanilla Export Revenue", value: "+4.2%", impact: "medium" },
    ],
  },

  DJI: {
    code: "DJI", name: "Djibouti", flag: "🇩🇯", region: "East Africa", capital: "Djibouti City",
    currency: "DJF", gdp: "$4.1B", gdpGrowth: "+6.0%", gdpGrowthPositive: true, gdpPerCapita: "$3,700",
    population: "1.1M", inflation: "2.8%", interestRate: "10.87%", rating: "NR", ratingTier: "moderate",
    unemployment: "26.0%", debtToGDP: "72%", fxReserves: "$590M", currentAccount: "-2.4%",
    description: "Djibouti commands one of the world's most strategically important maritime positions — at the mouth of the Red Sea on the Bab-el-Mandeb strait, through which 12% of global trade passes. The country is home to military bases from the USA, France, China, Japan, and Italy, generating significant rental revenues. The Doraleh Multipurpose Port and the Addis Ababa-Djibouti railway are transforming Djibouti into Ethiopia's primary logistics gateway and East Africa's pre-eminent transhipment hub.",
    exports: ["Port & Logistics Services", "Livestock", "Hides & Skins", "Scrap Metal", "Re-exports"],
    imports: ["Food & Beverages", "Transport Equipment", "Machinery", "Fuel", "Consumer Goods"],
    tradePartners: ["Ethiopia", "Somalia", "China", "France", "Saudi Arabia"],
    sectors: [{ name: "Services", share: "79%", pct: 79 }, { name: "Industry", share: "17%", pct: 17 }, { name: "Agriculture", share: "4%", pct: 4 }],
    recentEvents: [
      { date: "Apr 2025", title: "Port Throughput", value: "+9.0%", impact: "high" },
      { date: "Mar 2025", title: "GDP Growth", value: "+6.0%", impact: "high" },
      { date: "Feb 2025", title: "Inflation Rate", value: "2.8%", impact: "low" },
    ],
  },

  ERI: {
    code: "ERI", name: "Eritrea", flag: "🇪🇷", region: "East Africa", capital: "Asmara",
    currency: "ERN", gdp: "$2.1B", gdpGrowth: "+2.0%", gdpGrowthPositive: true, gdpPerCapita: "$580",
    population: "3.6M", inflation: "6.5%", interestRate: "6.50%", rating: "NR", ratingTier: "weak",
    unemployment: "9.5%", debtToGDP: "182%", fxReserves: "$210M", currentAccount: "+13.0%",
    description: "Eritrea is one of Africa's most closed economies, emerging cautiously from decades of isolation following its 2018 peace deal with Ethiopia. The Bisha gold, copper, and zinc mine operated by Nevsun has been the primary source of foreign exchange. Significant untapped potential exists in potash, copper, and offshore oil, though severe human capital constraints from years of state-directed labour conscription remain the economy's most binding constraint.",
    exports: ["Gold", "Zinc", "Copper", "Textiles & Garments", "Fish & Seafood"],
    imports: ["Capital Goods", "Food & Grain", "Fuel", "Consumer Goods", "Machinery"],
    tradePartners: ["China", "South Korea", "Sudan", "Saudi Arabia", "Italy"],
    sectors: [{ name: "Services", share: "45%", pct: 45 }, { name: "Industry", share: "33%", pct: 33 }, { name: "Agriculture", share: "22%", pct: 22 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Estimate", value: "+2.0%", impact: "medium" },
      { date: "Mar 2025", title: "Mining Output", value: "+1.8%", impact: "medium" },
      { date: "Feb 2025", title: "Inflation Rate", value: "6.5%", impact: "low" },
    ],
  },

  ETH: {
    code: "ETH", name: "Ethiopia", flag: "🇪🇹", region: "East Africa", capital: "Addis Ababa",
    currency: "ETB", gdp: "$156B", gdpGrowth: "+7.2%", gdpGrowthPositive: true, gdpPerCapita: "$1,240",
    population: "126M", inflation: "22.1%", interestRate: "7.00%", rating: "CCC", ratingTier: "weak",
    unemployment: "3.5%", debtToGDP: "29%", fxReserves: "$3.2B", currentAccount: "-3.1%",
    description: "Ethiopia is Africa's second-most populous nation and consistently one of the world's fastest-growing economies, with average GDP growth exceeding 8% over the past decade. The Grand Ethiopian Renaissance Dam (GERD) on the Blue Nile will be Africa's largest power plant, transforming Ethiopia into a continental electricity exporter. Addis Ababa is the African Union's headquarters and a growing hub for manufacturing, financial services, and aviation, anchored by Ethiopian Airlines — Africa's largest and most profitable carrier.",
    exports: ["Coffee", "Oilseeds (Sesame, Niger Seed)", "Flowers & Horticulture", "Gold", "Khat"],
    imports: ["Capital Goods", "Consumer Goods", "Fuel & Energy", "Cereals", "Chemicals"],
    tradePartners: ["China", "USA", "UAE", "Saudi Arabia", "India"],
    sectors: [{ name: "Services", share: "40%", pct: 40 }, { name: "Agriculture", share: "37%", pct: 37 }, { name: "Industry", share: "23%", pct: 23 }],
    recentEvents: [
      { date: "May 2025", title: "GDP Annual Growth", value: "+7.2%", impact: "high" },
      { date: "Apr 2025", title: "Inflation Rate", value: "22.1%", impact: "high" },
      { date: "Mar 2025", title: "NBE Rate", value: "7.00%", impact: "medium" },
    ],
  },

  KEN: {
    code: "KEN", name: "Kenya", flag: "🇰🇪", region: "East Africa", capital: "Nairobi",
    currency: "KES", gdp: "$118B", gdpGrowth: "+5.4%", gdpGrowthPositive: true, gdpPerCapita: "$2,140",
    population: "55M", inflation: "6.3%", interestRate: "13.00%", rating: "B", ratingTier: "weak",
    unemployment: "5.7%", debtToGDP: "70%", fxReserves: "$8.6B", currentAccount: "-4.2%",
    description: "Kenya is East Africa's largest economy and the birthplace of M-Pesa, the world's most successful mobile money platform with over 50 million users. Nairobi hosts the regional headquarters of hundreds of multinationals and is Africa's fourth-largest city. Strong pillars in tea, horticulture, tourism, financial services, and a booming tech ecosystem make Kenya the continent's most diversified east African economy. The country is navigating elevated debt servicing costs and fiscal consolidation pressures post-COVID.",
    exports: ["Tea", "Horticulture & Cut Flowers", "Coffee", "Refined Petroleum", "Tourism Services"],
    imports: ["Petroleum Products", "Machinery & Equipment", "Motor Vehicles", "Iron & Steel", "Plastics"],
    tradePartners: ["Uganda", "Pakistan", "USA", "Netherlands", "UK"],
    sectors: [{ name: "Services", share: "53%", pct: 53 }, { name: "Agriculture", share: "34%", pct: 34 }, { name: "Industry", share: "13%", pct: 13 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth Q1", value: "+5.4%", impact: "high" },
      { date: "Apr 2025", title: "CBK Rate Decision", value: "13.00%", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "6.3%", impact: "medium" },
    ],
  },

  MDG: {
    code: "MDG", name: "Madagascar", flag: "🇲🇬", region: "East Africa", capital: "Antananarivo",
    currency: "MGA", gdp: "$14B", gdpGrowth: "+4.2%", gdpGrowthPositive: true, gdpPerCapita: "$500",
    population: "28M", inflation: "8.1%", interestRate: "9.50%", rating: "NR", ratingTier: "weak",
    unemployment: "2.1%", debtToGDP: "48%", fxReserves: "$1.9B", currentAccount: "-3.8%",
    description: "Madagascar is an ecological wonder — the world's fourth-largest island and one of the most biodiverse places on earth, with 90% of its wildlife found nowhere else. The economy is anchored in vanilla (supplying 80% of global demand), chromite, cobalt, graphite, and ilmenite exports. Sapphire and ruby deposits have drawn artisanal miners across the island. Ambatovy, one of the world's largest integrated nickel-cobalt operations, is a cornerstone of the mining sector.",
    exports: ["Vanilla", "Cloves", "Graphite", "Chromite", "Seafood & Shrimp"],
    imports: ["Capital Goods", "Fuel & Energy", "Food", "Consumer Goods", "Chemicals"],
    tradePartners: ["France", "USA", "China", "Germany", "India"],
    sectors: [{ name: "Services", share: "50%", pct: 50 }, { name: "Agriculture", share: "35%", pct: 35 }, { name: "Industry", share: "15%", pct: 15 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+4.2%", impact: "medium" },
      { date: "Mar 2025", title: "Vanilla Export Revenue", value: "+5.8%", impact: "high" },
      { date: "Feb 2025", title: "Inflation Rate", value: "8.1%", impact: "medium" },
    ],
  },

  MWI: {
    code: "MWI", name: "Malawi", flag: "🇲🇼", region: "East Africa", capital: "Lilongwe",
    currency: "MWK", gdp: "$12B", gdpGrowth: "+1.5%", gdpGrowthPositive: true, gdpPerCapita: "$600",
    population: "20M", inflation: "28.5%", interestRate: "26.00%", rating: "NR", ratingTier: "weak",
    unemployment: "5.7%", debtToGDP: "60%", fxReserves: "$500M", currentAccount: "-13.0%",
    description: "Malawi is a densely populated landlocked country heavily dependent on rain-fed agriculture, particularly tobacco, which historically generated over 60% of export earnings. The tobacco market's structural decline has pushed the government to pursue agricultural diversification into soybeans, groundnuts, sugar, and tea. Uranium deposits at Kayelekera and rare earth elements represent long-term mineral diversification opportunities, while the services sector in trade and transport is growing steadily.",
    exports: ["Tobacco", "Tea", "Sugar", "Cotton", "Coffee"],
    imports: ["Food & Grain", "Capital Goods", "Fuel & Energy", "Machinery", "Pharmaceuticals"],
    tradePartners: ["Belgium", "Zimbabwe", "South Africa", "Germany", "USA"],
    sectors: [{ name: "Services", share: "54%", pct: 54 }, { name: "Agriculture", share: "30%", pct: 30 }, { name: "Industry", share: "16%", pct: 16 }],
    recentEvents: [
      { date: "Apr 2025", title: "Inflation Rate", value: "28.5%", impact: "high" },
      { date: "Mar 2025", title: "RBM Rate Decision", value: "26.00%", impact: "high" },
      { date: "Feb 2025", title: "Tobacco Auction", value: "100K tonnes", impact: "medium" },
    ],
  },

  MUS: {
    code: "MUS", name: "Mauritius", flag: "🇲🇺", region: "East Africa", capital: "Port Louis",
    currency: "MUR", gdp: "$14B", gdpGrowth: "+6.0%", gdpGrowthPositive: true, gdpPerCapita: "$11,000",
    population: "1.3M", inflation: "4.0%", interestRate: "4.50%", rating: "Baa2", ratingTier: "strong",
    unemployment: "6.0%", debtToGDP: "81%", fxReserves: "$7.8B", currentAccount: "-5.2%",
    description: "Mauritius is Africa's most competitive economy and ranks highest on the continent for governance, ease of doing business, and quality of life. Port Louis is a premier global financial centre and a treaty-based investment gateway to India and Africa, with the financial services sector contributing over 12% of GDP. An ambitious transition to a high-income knowledge economy — anchored in digital services, biomedical, and ocean economy — is underpinning sustained premium growth rates.",
    exports: ["Tourism Services", "Financial Services", "Textiles & Apparel", "Sugar", "Seafood"],
    imports: ["Capital Goods", "Food & Beverages", "Fuel & Energy", "Manufactured Goods", "Consumer Electronics"],
    tradePartners: ["UK", "France", "UAE", "South Africa", "India"],
    sectors: [{ name: "Services", share: "75%", pct: 75 }, { name: "Industry", share: "21%", pct: 21 }, { name: "Agriculture", share: "4%", pct: 4 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+6.0%", impact: "high" },
      { date: "Apr 2025", title: "BOM Rate Decision", value: "4.50%", impact: "medium" },
      { date: "Mar 2025", title: "Tourism Arrivals", value: "+9.2%", impact: "high" },
    ],
  },

  MOZ: {
    code: "MOZ", name: "Mozambique", flag: "🇲🇿", region: "East Africa", capital: "Maputo",
    currency: "MZN", gdp: "$18B", gdpGrowth: "+4.5%", gdpGrowthPositive: true, gdpPerCapita: "$545",
    population: "33M", inflation: "6.9%", interestRate: "14.75%", rating: "CCC", ratingTier: "weak",
    unemployment: "3.2%", debtToGDP: "103%", fxReserves: "$3.6B", currentAccount: "-28.0%",
    description: "Mozambique is sitting on one of the world's largest LNG discoveries, with proven offshore reserves exceeding 180 trillion cubic feet in the Rovuma Basin. TotalEnergies' Mozambique LNG and Eni's Coral South FLNG are transforming the country into a global LNG exporter. Despite the enormous hydrocarbon wealth ahead, Mozambique remains one of Africa's poorest countries, with high debt, Islamist insurgency in the north, and persistent vulnerability to climate-related floods and cyclones.",
    exports: ["Natural Gas (LNG)", "Coal", "Aluminium", "Tobacco", "Shrimp & Prawns"],
    imports: ["Capital Goods", "Fuel & Energy", "Consumer Goods", "Food", "Machinery"],
    tradePartners: ["India", "Netherlands", "South Africa", "UAE", "China"],
    sectors: [{ name: "Services", share: "47%", pct: 47 }, { name: "Industry", share: "27%", pct: 27 }, { name: "Agriculture", share: "26%", pct: 26 }],
    recentEvents: [
      { date: "Apr 2025", title: "LNG Exports", value: "+12.0%", impact: "high" },
      { date: "Apr 2025", title: "Inflation Rate", value: "6.9%", impact: "medium" },
      { date: "Mar 2025", title: "BM Rate Decision", value: "14.75%", impact: "medium" },
    ],
  },

  RWA: {
    code: "RWA", name: "Rwanda", flag: "🇷🇼", region: "East Africa", capital: "Kigali",
    currency: "RWF", gdp: "$14B", gdpGrowth: "+7.5%", gdpGrowthPositive: true, gdpPerCapita: "$1,000",
    population: "14M", inflation: "5.2%", interestRate: "7.00%", rating: "B+", ratingTier: "moderate",
    unemployment: "15.4%", debtToGDP: "71%", fxReserves: "$1.7B", currentAccount: "-10.8%",
    description: "Rwanda is Africa's governance benchmark — a global model of post-conflict reconstruction, institutional reform, and digital-first economic policy. Kigali is consistently ranked Africa's cleanest, safest, and most business-friendly city. The government's Vision 2050 targets upper-middle-income status through MICE tourism, financial services, technology, and manufacturing. Rwanda's leadership of the African Continental Free Trade Area secretariat reflects its continental ambitions.",
    exports: ["Coffee", "Tea", "Minerals (Coltan, Cassiterite, Wolfram)", "Tourism", "Horticulture"],
    imports: ["Capital Goods", "Food & Beverages", "Fuel & Energy", "Consumer Goods", "Pharmaceuticals"],
    tradePartners: ["UAE", "Switzerland", "China", "DRC", "Kenya"],
    sectors: [{ name: "Services", share: "49%", pct: 49 }, { name: "Agriculture", share: "26%", pct: 26 }, { name: "Industry", share: "25%", pct: 25 }],
    recentEvents: [
      { date: "May 2025", title: "NBR Rate Decision", value: "7.00%", impact: "medium" },
      { date: "Apr 2025", title: "GDP Growth Q1", value: "+7.5%", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "5.2%", impact: "low" },
    ],
  },

  SYC: {
    code: "SYC", name: "Seychelles", flag: "🇸🇨", region: "East Africa", capital: "Victoria",
    currency: "SCR", gdp: "$2.0B", gdpGrowth: "+5.5%", gdpGrowthPositive: true, gdpPerCapita: "$20,000",
    population: "100K", inflation: "3.0%", interestRate: "4.00%", rating: "B+", ratingTier: "moderate",
    unemployment: "3.3%", debtToGDP: "62%", fxReserves: "$730M", currentAccount: "-12.0%",
    description: "Seychelles has Africa's highest GDP per capita and is a global model for the blue economy, dedicating 30% of its Exclusive Economic Zone to marine protection while growing sustainable premium tourism. Victoria is a growing financial centre with offshore banking, ship registration, and reinsurance. The country's world-class coral reefs, white sand beaches, and Aldabra World Heritage site anchor a tourism industry that contributes over 55% of GDP.",
    exports: ["Tourism Services", "Fish & Canned Tuna", "Petroleum Products (Re-exports)", "Cinnamon Bark", "Vanilla"],
    imports: ["Machinery & Equipment", "Food & Beverages", "Fuel & Energy", "Consumer Goods", "Vehicles"],
    tradePartners: ["France", "UK", "Italy", "UAE", "Japan"],
    sectors: [{ name: "Services", share: "82%", pct: 82 }, { name: "Industry", share: "14%", pct: 14 }, { name: "Agriculture", share: "4%", pct: 4 }],
    recentEvents: [
      { date: "Apr 2025", title: "Tourism Revenue", value: "+8.5%", impact: "high" },
      { date: "Mar 2025", title: "GDP Growth", value: "+5.5%", impact: "high" },
      { date: "Feb 2025", title: "Inflation Rate", value: "3.0%", impact: "low" },
    ],
  },

  SOM: {
    code: "SOM", name: "Somalia", flag: "🇸🇴", region: "East Africa", capital: "Mogadishu",
    currency: "SOS", gdp: "$8.3B", gdpGrowth: "+3.0%", gdpGrowthPositive: true, gdpPerCapita: "$490",
    population: "17M", inflation: "4.5%", interestRate: "8.00%", rating: "NR", ratingTier: "weak",
    unemployment: "20.0%", debtToGDP: "76%", fxReserves: "$870M", currentAccount: "-6.5%",
    description: "Somalia is rebuilding its economy and institutions after decades of civil conflict, with the Mogadishu economy showing surprising dynamism in telecoms, mobile money (Hormuud/EVC), and trade. The country has one of the world's longest coastlines — 3,025 km — and vast untapped offshore oil and gas reserves. Livestock remains the economy's backbone, with Somalia being the world's third-largest exporter of live camels. The 2023 HIPC debt relief decision has opened the door to multilateral financing.",
    exports: ["Livestock (Camels, Goats, Cattle)", "Bananas", "Hides & Skins", "Fish", "Charcoal"],
    imports: ["Sugar", "Rice", "Fuel", "Consumer Goods", "Qat (Khat)"],
    tradePartners: ["UAE", "Oman", "Yemen", "India", "Saudi Arabia"],
    sectors: [{ name: "Services", share: "42%", pct: 42 }, { name: "Agriculture", share: "40%", pct: 40 }, { name: "Industry", share: "18%", pct: 18 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+3.0%", impact: "medium" },
      { date: "Mar 2025", title: "HIPC Relief Update", value: "On track", impact: "high" },
      { date: "Feb 2025", title: "Livestock Exports", value: "+6.0%", impact: "medium" },
    ],
  },

  SSD: {
    code: "SSD", name: "South Sudan", flag: "🇸🇸", region: "East Africa", capital: "Juba",
    currency: "SSP", gdp: "$4.6B", gdpGrowth: "+0.5%", gdpGrowthPositive: true, gdpPerCapita: "$420",
    population: "11M", inflation: "45.0%", interestRate: "15.00%", rating: "NR", ratingTier: "weak",
    unemployment: "18.4%", debtToGDP: "58%", fxReserves: "$180M", currentAccount: "-6.8%",
    description: "South Sudan, the world's youngest nation (independent 2011), holds sub-Saharan Africa's third-largest proven oil reserves, which account for nearly all government revenues. Chronic conflict, institutional fragility, and infrastructure deficits have prevented the country from translating its oil wealth into broad-based development. The 2018 peace agreement and resumed oil production along the Greater Nile pipeline are cautious steps toward stabilisation and reconstruction.",
    exports: ["Crude Oil", "Gold", "Timber", "Sesame Seeds", "Gum Arabic"],
    imports: ["Food & Beverages", "Machinery", "Fuel", "Consumer Goods", "Pharmaceuticals"],
    tradePartners: ["China", "Sudan", "Uganda", "Kenya", "UAE"],
    sectors: [{ name: "Industry (Oil)", share: "50%", pct: 50 }, { name: "Services", share: "32%", pct: 32 }, { name: "Agriculture", share: "18%", pct: 18 }],
    recentEvents: [
      { date: "Apr 2025", title: "Inflation Rate", value: "45.0%", impact: "high" },
      { date: "Mar 2025", title: "Oil Production", value: "140K bpd", impact: "high" },
      { date: "Feb 2025", title: "GDP Estimate", value: "+0.5%", impact: "medium" },
    ],
  },

  TZA: {
    code: "TZA", name: "Tanzania", flag: "🇹🇿", region: "East Africa", capital: "Dodoma",
    currency: "TZS", gdp: "$85B", gdpGrowth: "+5.1%", gdpGrowthPositive: true, gdpPerCapita: "$1,310",
    population: "65M", inflation: "4.8%", interestRate: "6.00%", rating: "B+", ratingTier: "moderate",
    unemployment: "2.6%", debtToGDP: "43%", fxReserves: "$5.7B", currentAccount: "-4.0%",
    description: "Tanzania is East Africa's third-largest economy, endowed with gold, tanzanite, diamonds, coal, and vast natural gas reserves in the offshore Rovuma Basin. Dar es Salaam is a fast-growing port and commercial hub, while Kilimanjaro and the Serengeti anchor a world-class safari and eco-tourism industry. A landmark Tanzania LNG project is in advanced development stages, potentially transforming the economy into a major natural gas exporter from the late 2020s.",
    exports: ["Gold", "Coffee", "Cashews", "Tea", "Tobacco"],
    imports: ["Capital Goods", "Fuel & Energy", "Consumer Goods", "Industrial Raw Materials", "Pharmaceuticals"],
    tradePartners: ["India", "UAE", "China", "Switzerland", "Belgium"],
    sectors: [{ name: "Services", share: "42%", pct: 42 }, { name: "Agriculture", share: "28%", pct: 28 }, { name: "Industry", share: "30%", pct: 30 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+5.1%", impact: "high" },
      { date: "Apr 2025", title: "BOT Rate", value: "6.00%", impact: "medium" },
      { date: "Mar 2025", title: "Inflation Rate", value: "4.8%", impact: "low" },
    ],
  },

  UGA: {
    code: "UGA", name: "Uganda", flag: "🇺🇬", region: "East Africa", capital: "Kampala",
    currency: "UGX", gdp: "$49B", gdpGrowth: "+5.9%", gdpGrowthPositive: true, gdpPerCapita: "$1,020",
    population: "48M", inflation: "3.7%", interestRate: "10.25%", rating: "B+", ratingTier: "moderate",
    unemployment: "9.8%", debtToGDP: "47%", fxReserves: "$3.6B", currentAccount: "-8.5%",
    description: "Uganda is on the verge of becoming a significant oil exporter through the Lake Albert Basin developments — a $10B project involving TotalEnergies and CNOOC. The country is one of Africa's fastest-growing technology ecosystems, anchored by a young, entrepreneurial population in Kampala. Strong agricultural exports in coffee (the continent's second-largest producer), tea, and horticulture provide a resilient foundation while the economy diversifies into oil, services, and manufacturing.",
    exports: ["Coffee", "Gold", "Fish & Fish Products", "Tea", "Tobacco"],
    imports: ["Capital Goods", "Fuel & Energy", "Consumer Goods", "Pharmaceuticals", "Machinery"],
    tradePartners: ["UAE", "China", "Kenya", "DRC", "India"],
    sectors: [{ name: "Services", share: "44%", pct: 44 }, { name: "Agriculture", share: "31%", pct: 31 }, { name: "Industry", share: "25%", pct: 25 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+5.9%", impact: "high" },
      { date: "Apr 2025", title: "BOU Rate Decision", value: "10.25%", impact: "medium" },
      { date: "Mar 2025", title: "Inflation Rate", value: "3.7%", impact: "low" },
    ],
  },

  ZMB: {
    code: "ZMB", name: "Zambia", flag: "🇿🇲", region: "East Africa", capital: "Lusaka",
    currency: "ZMW", gdp: "$29B", gdpGrowth: "+3.2%", gdpGrowthPositive: true, gdpPerCapita: "$1,450",
    population: "20M", inflation: "12.5%", interestRate: "13.50%", rating: "CCC", ratingTier: "weak",
    unemployment: "12.9%", debtToGDP: "127%", fxReserves: "$3.1B", currentAccount: "-0.5%",
    description: "Zambia is the world's eighth-largest copper producer and holds some of the richest copper-cobalt deposits in the Copperbelt — a critical asset for the global green energy transition. The country completed a landmark $6.3B external debt restructuring in 2023, its first sovereign debt agreement since the 2020 default, which is now unlocking new multilateral and bilateral financing. A shift toward value-added copper processing and the development of emerald, gold, and cobalt deposits are reshaping the growth outlook.",
    exports: ["Copper", "Cobalt", "Gold", "Tobacco", "Sugar"],
    imports: ["Capital Goods", "Fuel & Energy", "Consumer Goods", "Food", "Machinery"],
    tradePartners: ["Switzerland", "China", "Democratic Republic of Congo", "UAE", "India"],
    sectors: [{ name: "Services", share: "52%", pct: 52 }, { name: "Industry", share: "30%", pct: 30 }, { name: "Agriculture", share: "18%", pct: 18 }],
    recentEvents: [
      { date: "Apr 2025", title: "Inflation Rate", value: "12.5%", impact: "medium" },
      { date: "Apr 2025", title: "BOZ Rate", value: "13.50%", impact: "medium" },
      { date: "Mar 2025", title: "Copper Output", value: "820K tonnes", impact: "high" },
    ],
  },

  ZWE: {
    code: "ZWE", name: "Zimbabwe", flag: "🇿🇼", region: "East Africa", capital: "Harare",
    currency: "ZWG", gdp: "$26B", gdpGrowth: "+3.5%", gdpGrowthPositive: true, gdpPerCapita: "$1,625",
    population: "16M", inflation: "47.6%", interestRate: "130.00%", rating: "NR", ratingTier: "weak",
    unemployment: "19.0%", debtToGDP: "97%", fxReserves: "$600M", currentAccount: "+1.4%",
    description: "Zimbabwe possesses extraordinary mineral wealth — the world's second-largest platinum reserves, significant gold, lithium, diamonds, chrome, and nickel — whose full monetisation has been hampered by two decades of economic mismanagement, hyperinflation, and external debt arrears. The 2024 introduction of the ZiG (Zimbabwe Gold) currency backed by physical gold represents the latest attempt at monetary stabilisation. Lithium deposits are attracting significant Chinese investment for the battery supply chain.",
    exports: ["Platinum Group Metals", "Gold", "Diamonds", "Tobacco", "Ferrochrome"],
    imports: ["Fuel & Energy", "Machinery & Equipment", "Consumer Goods", "Pharmaceuticals", "Food"],
    tradePartners: ["UAE", "South Africa", "China", "Belgium", "Mozambique"],
    sectors: [{ name: "Services", share: "56%", pct: 56 }, { name: "Agriculture", share: "19%", pct: 19 }, { name: "Industry", share: "25%", pct: 25 }],
    recentEvents: [
      { date: "Apr 2025", title: "Inflation Rate", value: "47.6%", impact: "high" },
      { date: "Apr 2025", title: "RBZ Rate Decision", value: "130.00%", impact: "high" },
      { date: "Mar 2025", title: "Gold Output", value: "+8.2%", impact: "medium" },
    ],
  },

  // ── Central Africa ────────────────────────────────────────────────────────────

  CMR: {
    code: "CMR", name: "Cameroon", flag: "🇨🇲", region: "Central Africa", capital: "Yaoundé",
    currency: "XAF", gdp: "$47B", gdpGrowth: "+3.8%", gdpGrowthPositive: true, gdpPerCapita: "$1,680",
    population: "28M", inflation: "5.5%", interestRate: "5.00%", rating: "B", ratingTier: "weak",
    unemployment: "3.6%", debtToGDP: "44%", fxReserves: "$4.2B", currentAccount: "-2.5%",
    description: "Cameroon is Central Africa's largest and most diversified economy — coined 'Africa in miniature' for its extraordinary agricultural, mineral, and ecological diversity. Oil revenues are declining, prompting active diversification into agriculture (cocoa, coffee, palm oil), manufacturing, and services. Douala is Central Africa's most active port and commercial hub, while the government is investing in Kribi as a modern deep-water port to serve landlocked CEMAC neighbours.",
    exports: ["Crude Oil", "Timber & Wood Products", "Cocoa", "Coffee", "Cotton"],
    imports: ["Machinery & Equipment", "Fuel", "Food & Grain", "Consumer Goods", "Chemicals"],
    tradePartners: ["China", "Netherlands", "Italy", "France", "Belgium"],
    sectors: [{ name: "Services", share: "52%", pct: 52 }, { name: "Agriculture", share: "23%", pct: 23 }, { name: "Industry", share: "25%", pct: 25 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+3.8%", impact: "medium" },
      { date: "Mar 2025", title: "Inflation Rate", value: "5.5%", impact: "medium" },
      { date: "Feb 2025", title: "BEAC Rate", value: "5.00%", impact: "medium" },
    ],
  },

  CAF: {
    code: "CAF", name: "Central African Rep.", flag: "🇨🇫", region: "Central Africa", capital: "Bangui",
    currency: "XAF", gdp: "$2.6B", gdpGrowth: "+1.0%", gdpGrowthPositive: true, gdpPerCapita: "$481",
    population: "5.4M", inflation: "4.6%", interestRate: "5.00%", rating: "NR", ratingTier: "weak",
    unemployment: "6.4%", debtToGDP: "49%", fxReserves: "$340M", currentAccount: "-10.0%",
    description: "The Central African Republic is extraordinarily rich in natural resources — diamonds, gold, uranium, timber, and fertile agricultural land — yet it remains one of the world's least developed countries due to chronic political instability and armed conflict. Diamonds are the primary export earner, though trafficking and production disruptions constrain official output. Increased Russian security cooperation since 2021 has partially stabilised southern and eastern areas, enabling limited resource extraction recovery.",
    exports: ["Diamonds", "Gold", "Timber", "Cotton", "Coffee"],
    imports: ["Food & Beverages", "Fuel & Energy", "Machinery", "Consumer Goods", "Pharmaceuticals"],
    tradePartners: ["UAE", "China", "DRC", "France", "Cameroon"],
    sectors: [{ name: "Agriculture", share: "45%", pct: 45 }, { name: "Services", share: "40%", pct: 40 }, { name: "Industry", share: "15%", pct: 15 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+1.0%", impact: "medium" },
      { date: "Mar 2025", title: "Diamond Exports", value: "112K carats", impact: "medium" },
      { date: "Feb 2025", title: "Inflation Rate", value: "4.6%", impact: "low" },
    ],
  },

  TCD: {
    code: "TCD", name: "Chad", flag: "🇹🇩", region: "Central Africa", capital: "N'Djamena",
    currency: "XAF", gdp: "$12B", gdpGrowth: "+3.9%", gdpGrowthPositive: true, gdpPerCapita: "$705",
    population: "17M", inflation: "6.4%", interestRate: "5.00%", rating: "NR", ratingTier: "weak",
    unemployment: "5.7%", debtToGDP: "51%", fxReserves: "$980M", currentAccount: "-4.2%",
    description: "Chad is a landlocked Saharan nation whose economy pivots entirely on crude oil exports — pumped via the 1,070 km Chad-Cameroon pipeline to the Atlantic. Oil revenues account for over 80% of government income, creating acute fiscal vulnerability to oil price cycles. Agriculture employs 80% of the population, with livestock and cotton as key livelihoods. Chad's strategic position as a frontline state against Boko Haram and Sudanese instability constrains both investment and human capital development.",
    exports: ["Crude Oil", "Cattle", "Cotton", "Gum Arabic", "Sesame"],
    imports: ["Capital Goods", "Food & Beverages", "Fuel (refined)", "Consumer Goods", "Pharmaceuticals"],
    tradePartners: ["USA", "China", "Netherlands", "Germany", "India"],
    sectors: [{ name: "Agriculture", share: "32%", pct: 32 }, { name: "Industry (Oil)", share: "40%", pct: 40 }, { name: "Services", share: "28%", pct: 28 }],
    recentEvents: [
      { date: "Apr 2025", title: "Oil Production", value: "115K bpd", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "6.4%", impact: "medium" },
      { date: "Feb 2025", title: "GDP Growth", value: "+3.9%", impact: "medium" },
    ],
  },

  COG: {
    code: "COG", name: "Republic of Congo", flag: "🇨🇬", region: "Central Africa", capital: "Brazzaville",
    currency: "XAF", gdp: "$15B", gdpGrowth: "+2.8%", gdpGrowthPositive: true, gdpPerCapita: "$2,460",
    population: "6.1M", inflation: "3.9%", interestRate: "5.00%", rating: "Caa2", ratingTier: "weak",
    unemployment: "9.0%", debtToGDP: "97%", fxReserves: "$1.1B", currentAccount: "+7.5%",
    description: "The Republic of Congo is a mid-sized oil producer that completed a difficult debt restructuring with China — its largest bilateral creditor — in 2021. Brazzaville faces Kinshasa across the Congo River, the world's narrowest international border between capital cities. Beyond oil, Congo has significant timber reserves and the Congo River system provides vast hydropower potential. Diversification toward potash, iron ore, and forest products is gradually reducing oil dependence.",
    exports: ["Crude Oil", "Timber & Wood Products", "Potash", "Sugar", "Cocoa"],
    imports: ["Capital Goods", "Food & Beverages", "Fuel (refined)", "Machinery", "Pharmaceuticals"],
    tradePartners: ["China", "USA", "France", "India", "Italy"],
    sectors: [{ name: "Industry (Oil)", share: "55%", pct: 55 }, { name: "Services", share: "35%", pct: 35 }, { name: "Agriculture", share: "10%", pct: 10 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+2.8%", impact: "medium" },
      { date: "Mar 2025", title: "Oil Production", value: "240K bpd", impact: "high" },
      { date: "Feb 2025", title: "Inflation Rate", value: "3.9%", impact: "low" },
    ],
  },

  COD: {
    code: "COD", name: "DR Congo", flag: "🇨🇩", region: "Central Africa", capital: "Kinshasa",
    currency: "CDF", gdp: "$65B", gdpGrowth: "+6.2%", gdpGrowthPositive: true, gdpPerCapita: "$650",
    population: "100M", inflation: "20.8%", interestRate: "11.00%", rating: "NR", ratingTier: "weak",
    unemployment: "4.5%", debtToGDP: "16%", fxReserves: "$5.6B", currentAccount: "-4.5%",
    description: "The Democratic Republic of Congo holds roughly $24 trillion in untapped mineral reserves — the world's largest cobalt producer (73% of global supply), and a significant copper, coltan, gold, and diamond exporter. These minerals are central to the green energy transition: every EV battery requires cobalt, and DRC's Copperbelt is the world's most concentrated source. Kinshasa, with 17 million people, is the world's most populous French-speaking city and a continent-scale consumer market.",
    exports: ["Cobalt", "Copper", "Gold", "Coltan (Columbite-Tantalite)", "Diamonds"],
    imports: ["Food & Beverages", "Capital Goods", "Fuel & Energy", "Consumer Goods", "Pharmaceuticals"],
    tradePartners: ["China", "UAE", "Zambia", "South Korea", "Belgium"],
    sectors: [{ name: "Services", share: "40%", pct: 40 }, { name: "Agriculture", share: "35%", pct: 35 }, { name: "Industry", share: "25%", pct: 25 }],
    recentEvents: [
      { date: "Apr 2025", title: "Cobalt Output", value: "+5.8%", impact: "high" },
      { date: "Apr 2025", title: "Inflation Rate", value: "20.8%", impact: "high" },
      { date: "Mar 2025", title: "BCC Rate", value: "11.00%", impact: "medium" },
    ],
  },

  GNQ: {
    code: "GNQ", name: "Equatorial Guinea", flag: "🇬🇶", region: "Central Africa", capital: "Malabo",
    currency: "XAF", gdp: "$11B", gdpGrowth: "-3.0%", gdpGrowthPositive: false, gdpPerCapita: "$7,300",
    population: "1.5M", inflation: "4.8%", interestRate: "5.00%", rating: "NR", ratingTier: "weak",
    unemployment: "8.9%", debtToGDP: "36%", fxReserves: "$1.2B", currentAccount: "+4.0%",
    description: "Equatorial Guinea is Sub-Saharan Africa's third-largest oil producer on a per-capita basis, but declining mature field production is compressing government revenues. The country is building Malabo II as a new administrative capital and investing in LNG infrastructure to extend the production lifecycle of ageing hydrocarbon assets. Despite high per-capita GDP, wealth concentration is extreme, and the country has some of the continent's worst human development indicators relative to its income level.",
    exports: ["Crude Oil", "Natural Gas (LNG)", "Timber", "Cocoa", "Methanol"],
    imports: ["Capital Goods", "Food & Beverages", "Consumer Goods", "Machinery", "Fuel (refined)"],
    tradePartners: ["China", "India", "Portugal", "USA", "Cameroon"],
    sectors: [{ name: "Industry (Oil & Gas)", share: "62%", pct: 62 }, { name: "Services", share: "30%", pct: 30 }, { name: "Agriculture", share: "8%", pct: 8 }],
    recentEvents: [
      { date: "Apr 2025", title: "Oil Production", value: "80K bpd", impact: "high" },
      { date: "Mar 2025", title: "Inflation Rate", value: "4.8%", impact: "low" },
      { date: "Feb 2025", title: "LNG Output", value: "3.7MT", impact: "medium" },
    ],
  },

  GAB: {
    code: "GAB", name: "Gabon", flag: "🇬🇦", region: "Central Africa", capital: "Libreville",
    currency: "XAF", gdp: "$20B", gdpGrowth: "+2.5%", gdpGrowthPositive: true, gdpPerCapita: "$8,700",
    population: "2.3M", inflation: "3.3%", interestRate: "5.00%", rating: "B-", ratingTier: "weak",
    unemployment: "21.0%", debtToGDP: "73%", fxReserves: "$1.8B", currentAccount: "+5.2%",
    description: "Gabon is an upper-middle-income oil producer and the world's second-largest manganese exporter, with the Moanda deposit among the richest on earth. Over 88% of Gabon's land is forested — the country has committed to keeping this intact in exchange for carbon credits, making it a pioneer in 'debt-for-nature' swaps. A military coup in August 2023 has introduced political uncertainty, though manganese, timber, and oil production have continued largely uninterrupted.",
    exports: ["Crude Oil", "Manganese", "Timber & Wood Products", "Uranium", "Rubber"],
    imports: ["Capital Goods", "Food & Beverages", "Consumer Goods", "Machinery", "Pharmaceuticals"],
    tradePartners: ["China", "South Korea", "Australia", "India", "France"],
    sectors: [{ name: "Industry (Oil & Mining)", share: "55%", pct: 55 }, { name: "Services", share: "40%", pct: 40 }, { name: "Agriculture", share: "5%", pct: 5 }],
    recentEvents: [
      { date: "Apr 2025", title: "Manganese Output", value: "+3.4%", impact: "medium" },
      { date: "Mar 2025", title: "Oil Production", value: "185K bpd", impact: "high" },
      { date: "Feb 2025", title: "Inflation Rate", value: "3.3%", impact: "low" },
    ],
  },

  STP: {
    code: "STP", name: "São Tomé & Príncipe", flag: "🇸🇹", region: "Central Africa", capital: "São Tomé",
    currency: "STN", gdp: "$0.7B", gdpGrowth: "+2.7%", gdpGrowthPositive: true, gdpPerCapita: "$3,040",
    population: "230K", inflation: "18.0%", interestRate: "10.00%", rating: "NR", ratingTier: "weak",
    unemployment: "14.0%", debtToGDP: "78%", fxReserves: "$80M", currentAccount: "-11.0%",
    description: "São Tomé and Príncipe is a tiny island nation in the Gulf of Guinea — Africa's smallest Portuguese-speaking country — with an economy historically rooted in cocoa. The islands sit atop offshore oil blocks that have attracted exploration interest for decades, though commercial production has not yet materialised. Premium eco-tourism, organic cocoa, and a growing financial services sector are providing diversification pathways. The dobra is pegged to the euro via a Portugal-guaranteed arrangement.",
    exports: ["Cocoa", "Coffee", "Copra (Coconut Palm)", "Palm Oil", "Tourism Services"],
    imports: ["Food & Beverages", "Fuel & Energy", "Consumer Goods", "Machinery", "Pharmaceuticals"],
    tradePartners: ["Netherlands", "Portugal", "France", "Belgium", "Angola"],
    sectors: [{ name: "Services", share: "65%", pct: 65 }, { name: "Agriculture", share: "20%", pct: 20 }, { name: "Industry", share: "15%", pct: 15 }],
    recentEvents: [
      { date: "Apr 2025", title: "Inflation Rate", value: "18.0%", impact: "high" },
      { date: "Mar 2025", title: "Tourism Arrivals", value: "+11.0%", impact: "medium" },
      { date: "Feb 2025", title: "Cocoa Output", value: "2,800 tonnes", impact: "medium" },
    ],
  },

  // ── Southern Africa ───────────────────────────────────────────────────────────

  AGO: {
    code: "AGO", name: "Angola", flag: "🇦🇴", region: "Southern Africa", capital: "Luanda",
    currency: "AOA", gdp: "$84B", gdpGrowth: "+1.1%", gdpGrowthPositive: true, gdpPerCapita: "$2,330",
    population: "36M", inflation: "22.3%", interestRate: "19.50%", rating: "B-", ratingTier: "weak",
    unemployment: "30.0%", debtToGDP: "88%", fxReserves: "$14B", currentAccount: "+1.8%",
    description: "Angola is Sub-Saharan Africa's second-largest oil producer, with petroleum generating over 90% of export receipts and 60% of fiscal revenues. Luanda is the continent's most expensive city for expatriates, reflecting an oil-driven consumption boom. President Lourenço's anti-corruption drive and privatisation programme have attracted renewed investor interest, and diversification into agriculture, fishing, diamonds, and manufacturing is beginning to bear fruit. The Lobito Atlantic Railway corridor is positioning Angola as a regional logistics hub.",
    exports: ["Crude Oil", "Diamonds", "Refined Petroleum", "Natural Gas", "Coffee"],
    imports: ["Machinery & Equipment", "Vehicles", "Food & Grain", "Pharmaceuticals", "Consumer Goods"],
    tradePartners: ["China", "India", "UAE", "South Korea", "USA"],
    sectors: [{ name: "Industry (Oil)", share: "40%", pct: 40 }, { name: "Services", share: "42%", pct: 42 }, { name: "Agriculture", share: "18%", pct: 18 }],
    recentEvents: [
      { date: "Apr 2025", title: "Oil Production", value: "1.1M bpd", impact: "high" },
      { date: "Apr 2025", title: "Inflation Rate", value: "22.3%", impact: "high" },
      { date: "Mar 2025", title: "BNA Rate Decision", value: "19.50%", impact: "medium" },
    ],
  },

  BWA: {
    code: "BWA", name: "Botswana", flag: "🇧🇼", region: "Southern Africa", capital: "Gaborone",
    currency: "BWP", gdp: "$19B", gdpGrowth: "+3.7%", gdpGrowthPositive: true, gdpPerCapita: "$7,300",
    population: "2.6M", inflation: "5.8%", interestRate: "2.65%", rating: "BBB+", ratingTier: "strong",
    unemployment: "24.5%", debtToGDP: "22%", fxReserves: "$4.7B", currentAccount: "-3.4%",
    description: "Botswana is Africa's longest-running economic success story — transforming from one of the world's poorest countries at independence (1966) to an upper-middle-income nation through prudent management of diamond wealth. Diamonds, dominated by the De Beers-Botswana government Debswana partnership, account for over 70% of export revenue. Gaborone is a growing financial and services hub, and the country's investment grade credit rating (one of only two in Sub-Saharan Africa) reflects fiscal discipline and institutional quality.",
    exports: ["Diamonds", "Copper & Nickel", "Beef & Cattle", "Textiles", "Soda Ash"],
    imports: ["Machinery & Equipment", "Vehicles", "Food & Beverages", "Fuel", "Consumer Goods"],
    tradePartners: ["India", "Belgium", "UAE", "South Africa", "Israel"],
    sectors: [{ name: "Services", share: "57%", pct: 57 }, { name: "Industry (Mining)", share: "37%", pct: 37 }, { name: "Agriculture", share: "6%", pct: 6 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+3.7%", impact: "medium" },
      { date: "Apr 2025", title: "BOB Rate", value: "2.65%", impact: "medium" },
      { date: "Mar 2025", title: "Diamond Exports", value: "+2.8%", impact: "high" },
    ],
  },

  SWZ: {
    code: "SWZ", name: "Eswatini", flag: "🇸🇿", region: "Southern Africa", capital: "Mbabane",
    currency: "SZL", gdp: "$4.7B", gdpGrowth: "+2.0%", gdpGrowthPositive: true, gdpPerCapita: "$3,920",
    population: "1.2M", inflation: "4.6%", interestRate: "7.50%", rating: "NR", ratingTier: "weak",
    unemployment: "23.0%", debtToGDP: "43%", fxReserves: "$530M", currentAccount: "+3.5%",
    description: "Eswatini (formerly Swaziland) is a small landlocked kingdom entirely surrounded by South Africa and Mozambique, with its economy deeply integrated into the South African customs union (SACU). Sugar and soft drink concentrates (for Coca-Cola) are the leading export industries, while textile manufacturing and coal mining provide additional employment. The lilangeni is pegged 1:1 to the South African rand, importing South Africa's monetary policy.",
    exports: ["Sugar & Sugar Products", "Soft Drink Concentrates", "Textiles & Apparel", "Coal", "Wood Pulp"],
    imports: ["Food & Beverages", "Machinery", "Vehicles", "Fuel & Energy", "Chemicals"],
    tradePartners: ["South Africa", "USA", "UK", "Mozambique", "China"],
    sectors: [{ name: "Services", share: "65%", pct: 65 }, { name: "Industry", share: "26%", pct: 26 }, { name: "Agriculture", share: "9%", pct: 9 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+2.0%", impact: "medium" },
      { date: "Mar 2025", title: "Inflation Rate", value: "4.6%", impact: "low" },
      { date: "Feb 2025", title: "SACU Revenue", value: "+5.2%", impact: "medium" },
    ],
  },

  LSO: {
    code: "LSO", name: "Lesotho", flag: "🇱🇸", region: "Southern Africa", capital: "Maseru",
    currency: "LSL", gdp: "$2.9B", gdpGrowth: "+2.1%", gdpGrowthPositive: true, gdpPerCapita: "$1,320",
    population: "2.2M", inflation: "6.4%", interestRate: "7.75%", rating: "NR", ratingTier: "weak",
    unemployment: "27.0%", debtToGDP: "54%", fxReserves: "$510M", currentAccount: "-5.0%",
    description: "Lesotho is a mountainous kingdom completely enclosed within South Africa, known as the 'Kingdom in the Sky'. The Lesotho Highlands Water Project — one of Africa's largest infrastructure programmes — exports water to South Africa's water-scarce Gauteng province, generating royalties that contribute significantly to government revenues. Diamond mining (notably at the Letseng mine, home to some of the world's largest gem diamonds) and textile manufacturing for the US AGOA market are key economic pillars.",
    exports: ["Water (Highlands Water Project)", "Diamonds", "Textiles & Clothing", "Wool & Mohair", "Food"],
    imports: ["Food & Beverages", "Machinery & Equipment", "Fuel & Energy", "Consumer Goods", "Pharmaceuticals"],
    tradePartners: ["South Africa", "USA", "Belgium", "UK", "Taiwan"],
    sectors: [{ name: "Services", share: "72%", pct: 72 }, { name: "Industry", share: "15%", pct: 15 }, { name: "Agriculture", share: "13%", pct: 13 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+2.1%", impact: "medium" },
      { date: "Mar 2025", title: "Inflation Rate", value: "6.4%", impact: "medium" },
      { date: "Feb 2025", title: "Diamond Exports", value: "+9.0%", impact: "high" },
    ],
  },

  NAM: {
    code: "NAM", name: "Namibia", flag: "🇳🇦", region: "Southern Africa", capital: "Windhoek",
    currency: "NAD", gdp: "$13B", gdpGrowth: "+4.2%", gdpGrowthPositive: true, gdpPerCapita: "$4,800",
    population: "2.7M", inflation: "5.4%", interestRate: "7.75%", rating: "BB", ratingTier: "moderate",
    unemployment: "33.4%", debtToGDP: "69%", fxReserves: "$2.9B", currentAccount: "-8.5%",
    description: "Namibia is an upper-middle-income country with one of the world's least dense populations (3 people per km²) and some of Africa's strongest governance institutions. Uranium and diamonds are the primary export earners, while Namibia is fast becoming Africa's green hydrogen powerhouse — with a $10B Hyphen project targeting 300,000 tonnes of green hydrogen per year. Offshore oil discoveries (Graff and Venus fields) could transform the economy in the early 2030s.",
    exports: ["Diamonds", "Uranium", "Gold", "Zinc", "Fish & Seafood"],
    imports: ["Machinery & Equipment", "Fuel & Energy", "Food & Beverages", "Consumer Goods", "Vehicles"],
    tradePartners: ["South Africa", "Botswana", "China", "UK", "Netherlands"],
    sectors: [{ name: "Services", share: "60%", pct: 60 }, { name: "Industry (Mining)", share: "27%", pct: 27 }, { name: "Agriculture", share: "13%", pct: 13 }],
    recentEvents: [
      { date: "Apr 2025", title: "GDP Growth", value: "+4.2%", impact: "high" },
      { date: "Apr 2025", title: "BON Rate Decision", value: "7.75%", impact: "medium" },
      { date: "Mar 2025", title: "Uranium Output", value: "+6.1%", impact: "medium" },
    ],
  },

  ZAF: {
    code: "ZAF", name: "South Africa", flag: "🇿🇦", region: "Southern Africa", capital: "Pretoria",
    currency: "ZAR", gdp: "$373B", gdpGrowth: "+0.6%", gdpGrowthPositive: true, gdpPerCapita: "$6,220",
    population: "60M", inflation: "3.2%", interestRate: "8.25%", rating: "BB-", ratingTier: "moderate",
    unemployment: "32.1%", debtToGDP: "72%", fxReserves: "$62B", currentAccount: "-1.6%",
    description: "South Africa is Africa's most industrialised economy and commands the continent's deepest capital markets — the Johannesburg Stock Exchange lists over $1 trillion in market capitalisation. The country is a global leader in platinum group metals, chrome, manganese, and gold production. Persistent structural constraints — power supply shortages (loadshedding), high unemployment, and infrastructure bottlenecks — are gradually being addressed through the energy transition, Operation Vulindlela reforms, and the Government of National Unity formed in 2024.",
    exports: ["Gold", "Platinum Group Metals", "Coal", "Iron Ore", "Motor Vehicles & Parts"],
    imports: ["Machinery & Equipment", "Petroleum Products", "Chemicals", "Electronics", "Motor Vehicle Parts"],
    tradePartners: ["China", "USA", "Germany", "Japan", "India"],
    sectors: [{ name: "Services", share: "69%", pct: 69 }, { name: "Industry", share: "24%", pct: 24 }, { name: "Agriculture", share: "7%", pct: 7 }],
    recentEvents: [
      { date: "Apr 2025", title: "SARB Rate Decision", value: "8.25%", impact: "high" },
      { date: "Apr 2025", title: "CPI Inflation", value: "3.2%", impact: "high" },
      { date: "Mar 2025", title: "Unemployment Rate", value: "32.1%", impact: "high" },
    ],
  },
};
