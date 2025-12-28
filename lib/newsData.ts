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
  }
];
