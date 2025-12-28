import { TrendingUp, DollarSign, Activity, Globe, LucideIcon } from "lucide-react";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: "Macro" | "Financial" | "Trade" | "Policy";
  date: string;
  countryCode?: string; // Optional for global news
  icon: LucideIcon;
  fullContent?: string;
}

export const newsData: NewsItem[] = [
  // Global/Continental
  {
    id: "g1",
    title: "Economic recovery expected in West African trade blocks by Q3 2026",
    summary: "New data suggests that recent policy changes in major economies are beginning to yield positive results for regional stability and growth.",
    category: "Macro",
    date: "Dec 28, 2024",
    icon: Activity
  },
  {
    id: "g2",
    title: "AfCFTA Progress: Intra-African trade reaches new high in 2024",
    summary: "The implementation of the African Continental Free Trade Area has seen an 18% increase in intra-continental trade volume.",
    category: "Trade",
    date: "Dec 27, 2024",
    icon: Globe
  },
  // Egypt (EGY)
  {
    id: "egy1",
    title: "Suez Canal revenues show resilience despite regional tensions",
    summary: "Official reports indicate that Suez Canal revenues have maintained a steady flow, contributing significantly to Egypt's foreign currency reserves.",
    category: "Trade",
    date: "Dec 28, 2024",
    countryCode: "EGY",
    icon: Globe
  },
  {
    id: "egy2",
    title: "Egypt's Central Bank maintains high interest rates to curb inflation",
    summary: "The CBE decided to keep the overnight deposit rate at 27.25% in its latest meeting, citing persistent inflationary pressures.",
    category: "Financial",
    date: "Dec 26, 2024",
    countryCode: "EGY",
    icon: DollarSign
  },
  // Nigeria (NGA)
  {
    id: "nga1",
    title: "Nigeria's energy sector reforms attract $2B in new investment",
    summary: "Recent policy adjustments in the power sector have triggered a surge in private capital interest for renewable energy projects.",
    category: "Policy",
    date: "Dec 28, 2024",
    countryCode: "NGA",
    icon: TrendingUp
  },
  {
    id: "nga2",
    title: "CBN continues FX market stabilization efforts",
    summary: "The Central Bank of Nigeria has cleared a significant backlog of FX obligations, leading to a stabilization of the Naira in the parallel market.",
    category: "Financial",
    date: "Dec 27, 2024",
    countryCode: "NGA",
    icon: DollarSign
  },
  // South Africa (ZAF)
  {
    id: "zaf1",
    title: "South Africa's mining output exceeds expectations in Q4",
    summary: "Production of platinum group metals and coal saw a stronger-than-anticipated rebound, supporting GDP growth projections.",
    category: "Macro",
    date: "Dec 28, 2024",
    countryCode: "ZAF",
    icon: Activity
  },
  {
    id: "zaf2",
    title: "JSE Top 40 reaches historic peak amid tech rally",
    summary: "The Johannesburg Stock Exchange saw a record day as technology and mining stocks rallied on positive global sentiment.",
    category: "Financial",
    date: "Dec 26, 2024",
    countryCode: "ZAF",
    icon: DollarSign
  },
  // Kenya (KEN)
  {
    id: "ken1",
    title: "Kenya's tech ecosystem secures fresh funding for AI startups",
    summary: "Nairobi continues to solidify its position as Africa's Silicon Savannah with a new $500M fund dedicated to local tech innovation.",
    category: "Macro",
    date: "Dec 28, 2024",
    countryCode: "KEN",
    icon: TrendingUp
  },
  {
    id: "ken2",
    title: "Tea exports to Asian markets surge by 15%",
    summary: "Kenya's agricultural exports have seen a significant boost following new bilateral trade agreements signed earlier this year.",
    category: "Trade",
    date: "Dec 27, 2024",
    countryCode: "KEN",
    icon: Globe
  },
  // Ghana (GHA)
  {
    id: "gha1",
    title: "Ghana's gold production surges 12% in year-on-year growth",
    summary: "New mining policies and increased efficiency in small-scale mining sectors have boosted Ghana's position as a top gold producer in Africa.",
    category: "Trade",
    date: "Dec 28, 2024",
    countryCode: "GHA",
    icon: Globe
  },
  {
    id: "gha2",
    title: "Inflation slows down in Ghana as food prices stabilize",
    summary: "The Ghana Statistical Service reported a significant drop in inflation, attributed to improved local agricultural output and currency stability.",
    category: "Macro",
    date: "Dec 27, 2024",
    countryCode: "GHA",
    icon: Activity
  },
  // Morocco (MAR)
  {
    id: "mar1",
    title: "Morocco's automotive sector exports reach record milestone",
    summary: "The Kingdom continues to solidify its position as a global automotive hub, with exports to Europe and Africa hitting new quarterly highs.",
    category: "Trade",
    date: "Dec 28, 2024",
    countryCode: "MAR",
    icon: Globe
  },
  {
    id: "mar2",
    title: "Green Energy: Morocco launches world's largest solar expansion phase",
    summary: "The Noor Ouarzazate complex is set to increase its capacity by 25%, further reducing the country's reliance on energy imports.",
    category: "Policy",
    date: "Dec 26, 2024",
    countryCode: "MAR",
    icon: TrendingUp
  },
  // Ethiopia (ETH)
  {
    id: "eth1",
    title: "Ethiopian Airlines expands cargo hub to meet AfCFTA demand",
    summary: "The national carrier has announced new logistics routes across Central and West Africa to facilitate faster intra-continental trade.",
    category: "Trade",
    date: "Dec 28, 2024",
    countryCode: "ETH",
    icon: Globe
  },
  {
    id: "eth2",
    title: "Ethiopia opens banking sector to foreign competition",
    summary: "In a historic policy shift, the National Bank of Ethiopia has started issuing licenses to regional and international financial institutions.",
    category: "Policy",
    date: "Dec 27, 2024",
    countryCode: "ETH",
    icon: TrendingUp
  },
  // Rwanda (RWA)
  {
    id: "rwa1",
    title: "Kigali International Financial Centre attracts 15 new firms",
    summary: "Rwanda's ambition to become a regional fintech hub receives a boost as major investment groups register their continental headquarters in Kigali.",
    category: "Financial",
    date: "Dec 28, 2024",
    countryCode: "RWA",
    icon: DollarSign
  },
  {
    id: "rwa2",
    title: "Rwanda's service sector contributes 48% to national GDP",
    summary: "The Ministry of Finance reports that ICT and tourism have overtaken traditional agriculture as the primary drivers of economic growth.",
    category: "Macro",
    date: "Dec 26, 2024",
    countryCode: "RWA",
    icon: Activity
  },
  // Côte d'Ivoire (CIV)
  {
    id: "civ1",
    title: "Cocoa prices hit historic high, boosting Ivorian exports",
    summary: "Global supply constraints have pushed cocoa prices to record levels, providing a significant revenue windfall for the world's top producer.",
    category: "Trade",
    date: "Dec 28, 2024",
    countryCode: "CIV",
    icon: Globe
  },
  {
    id: "civ2",
    title: "Ivory Coast's infrastructure spend targets regional rail link",
    summary: "The government has secured funding for a new rail corridor connecting Abidjan to landlocked neighbours, enhancing regional trade logistics.",
    category: "Policy",
    date: "Dec 27, 2024",
    countryCode: "CIV",
    icon: TrendingUp
  }
];
