import { TrendingUp, Users, DollarSign, Activity, LucideIcon } from "lucide-react";

export interface MacroMetric {
  name: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  color: string;
}

export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface CountryMacro {
  metrics: MacroMetric[];
  gdpData: ChartDataPoint[];
  inflationData: ChartDataPoint[];
}

export const countryMacroData: Record<string, CountryMacro> = {
  // Continental Fallback (Continental Average/Total)
  default: {
    metrics: [
      { name: "GDP Growth", value: "3.2%", trend: "+0.4%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "12.8%", trend: "-1.2%", icon: Activity, color: "text-primary" },
      { name: "Population", value: "1.4B", trend: "+2.1%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "+$4.2B", trend: "+$0.8B", icon: DollarSign, color: "text-emerald-600" },
    ],
    gdpData: [
      { year: "2019", growth: 3.4 },
      { year: "2020", growth: -2.1 },
      { year: "2021", growth: 4.5 },
      { year: "2022", growth: 3.8 },
      { year: "2023", growth: 3.2 },
      { year: "2024", growth: 3.6 },
    ],
    inflationData: [
      { year: "2019", rate: 8.5 },
      { year: "2020", rate: 10.2 },
      { year: "2021", rate: 9.8 },
      { year: "2022", rate: 14.5 },
      { year: "2023", rate: 12.8 },
      { year: "2024", rate: 11.5 },
    ]
  },
  // Egypt (EGY)
  EGY: {
    metrics: [
      { name: "GDP Growth", value: "4.2%", trend: "+0.2%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "35.8%", trend: "+2.1%", icon: Activity, color: "text-red-500" },
      { name: "Population", value: "114M", trend: "+1.6%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "-$14.2B", trend: "-$1.5B", icon: DollarSign, color: "text-red-500" },
    ],
    gdpData: [
      { year: "2019", growth: 5.6 },
      { year: "2020", growth: 3.6 },
      { year: "2021", growth: 3.3 },
      { year: "2022", growth: 6.6 },
      { year: "2023", growth: 3.8 },
      { year: "2024", growth: 4.2 },
    ],
    inflationData: [
      { year: "2019", rate: 9.2 },
      { year: "2020", rate: 5.0 },
      { year: "2021", rate: 5.2 },
      { year: "2022", rate: 13.9 },
      { year: "2023", rate: 33.9 },
      { year: "2024", rate: 35.8 },
    ]
  },
  // Nigeria (NGA)
  NGA: {
    metrics: [
      { name: "GDP Growth", value: "3.2%", trend: "+0.3%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "31.7%", trend: "+1.2%", icon: Activity, color: "text-red-500" },
      { name: "Population", value: "230M", trend: "+2.4%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "+$2.5B", trend: "+$0.3B", icon: DollarSign, color: "text-emerald-600" },
    ],
    gdpData: [
      { year: "2019", growth: 2.2 },
      { year: "2020", growth: -1.8 },
      { year: "2021", growth: 3.6 },
      { year: "2022", growth: 3.3 },
      { year: "2023", growth: 2.7 },
      { year: "2024", growth: 3.2 },
    ],
    inflationData: [
      { year: "2019", rate: 11.4 },
      { year: "2020", rate: 13.2 },
      { year: "2021", rate: 16.9 },
      { year: "2022", rate: 18.8 },
      { year: "2023", rate: 24.5 },
      { year: "2024", rate: 31.7 },
    ]
  },
  // South Africa (ZAF)
  ZAF: {
    metrics: [
      { name: "GDP Growth", value: "0.9%", trend: "+0.1%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "5.4%", trend: "-0.2%", icon: Activity, color: "text-emerald-600" },
      { name: "Population", value: "62M", trend: "+0.9%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "+$9.1B", trend: "+$0.8B", icon: DollarSign, color: "text-emerald-600" },
    ],
    gdpData: [
      { year: "2019", growth: 0.1 },
      { year: "2020", growth: -6.3 },
      { year: "2021", growth: 4.7 },
      { year: "2022", growth: 1.9 },
      { year: "2023", growth: 0.6 },
      { year: "2024", growth: 0.9 },
    ],
    inflationData: [
      { year: "2019", rate: 4.1 },
      { year: "2020", rate: 3.3 },
      { year: "2021", rate: 4.6 },
      { year: "2022", rate: 6.9 },
      { year: "2023", rate: 6.0 },
      { year: "2024", rate: 5.4 },
    ]
  },
  // Kenya (KEN)
  KEN: {
    metrics: [
      { name: "GDP Growth", value: "5.4%", trend: "+0.4%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "6.8%", trend: "+0.2%", icon: Activity, color: "text-red-500" },
      { name: "Population", value: "56M", trend: "+1.9%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "-$5.2B", trend: "-$0.4B", icon: DollarSign, color: "text-red-500" },
    ],
    gdpData: [
      { year: "2019", growth: 5.0 },
      { year: "2020", growth: -0.3 },
      { year: "2021", growth: 7.6 },
      { year: "2022", growth: 4.8 },
      { year: "2023", growth: 5.2 },
      { year: "2024", growth: 5.4 },
    ],
    inflationData: [
      { year: "2019", rate: 5.2 },
      { year: "2020", rate: 5.4 },
      { year: "2021", rate: 6.1 },
      { year: "2022", rate: 7.7 },
      { year: "2023", rate: 6.8 },
      { year: "2024", rate: 7.1 },
    ]
  },
  // Ghana (GHA)
  GHA: {
    metrics: [
      { name: "GDP Growth", value: "3.5%", trend: "+0.7%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "25.4%", trend: "-2.5%", icon: Activity, color: "text-emerald-600" },
      { name: "Population", value: "35M", trend: "+2.1%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "+$1.4B", trend: "+$0.2B", icon: DollarSign, color: "text-emerald-600" },
    ],
    gdpData: [
      { year: "2019", growth: 6.5 },
      { year: "2020", growth: 0.4 },
      { year: "2021", growth: 5.4 },
      { year: "2022", growth: 3.1 },
      { year: "2023", growth: 2.3 },
      { year: "2024", growth: 3.5 },
    ],
    inflationData: [
      { year: "2019", rate: 7.1 },
      { year: "2020", rate: 9.9 },
      { year: "2021", rate: 10.0 },
      { year: "2022", rate: 31.5 },
      { year: "2023", rate: 40.1 },
      { year: "2024", rate: 25.4 },
    ]
  },
  // Morocco (MAR)
  MAR: {
    metrics: [
      { name: "GDP Growth", value: "2.8%", trend: "+0.4%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "4.2%", trend: "-0.3%", icon: Activity, color: "text-emerald-600" },
      { name: "Population", value: "38M", trend: "+1.1%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "-$6.4B", trend: "+$0.5B", icon: DollarSign, color: "text-emerald-600" },
    ],
    gdpData: [
      { year: "2019", growth: 2.9 },
      { year: "2020", growth: -6.7 },
      { year: "2021", growth: 7.9 },
      { year: "2022", growth: 1.3 },
      { year: "2023", growth: 2.4 },
      { year: "2024", growth: 2.8 },
    ],
    inflationData: [
      { year: "2019", rate: 0.2 },
      { year: "2020", rate: 0.6 },
      { year: "2021", rate: 1.4 },
      { year: "2022", rate: 6.6 },
      { year: "2023", rate: 6.1 },
      { year: "2024", rate: 4.2 },
    ]
  },
    // Ethiopia (ETH)
  ETH: {
    metrics: [
      { name: "GDP Growth", value: "6.2%", trend: "-0.2%", icon: TrendingUp, color: "text-red-500" },
      { name: "Inflation Rate", value: "28.5%", trend: "-1.5%", icon: Activity, color: "text-emerald-600" },
      { name: "Population", value: "128M", trend: "+2.6%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "-$13.8B", trend: "-$1.1B", icon: DollarSign, color: "text-red-500" },
    ],
    gdpData: [
      { year: "2019", growth: 9.0 },
      { year: "2020", growth: 6.1 },
      { year: "2021", growth: 6.3 },
      { year: "2022", growth: 6.4 },
      { year: "2023", growth: 6.4 },
      { year: "2024", growth: 6.2 },
    ],
    inflationData: [
      { year: "2019", rate: 15.8 },
      { year: "2020", rate: 20.4 },
      { year: "2021", rate: 26.8 },
      { year: "2022", rate: 33.9 },
      { year: "2023", rate: 30.2 },
      { year: "2024", rate: 28.5 },
    ]
  }
};
