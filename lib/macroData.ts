import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export const countryMacroData: Record<string, any> = {
  // Continental Fallback
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
      { name: "GDP Growth", value: "3.1%", trend: "+0.2%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "33.7%", trend: "+1.5%", icon: Activity, color: "text-primary" },
      { name: "Population", value: "112M", trend: "+1.6%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "-$12.4B", trend: "-$1.2B", icon: DollarSign, color: "text-red-600" },
    ],
    gdpData: [
      { year: "2019", growth: 5.6 },
      { year: "2020", growth: 3.6 },
      { year: "2021", growth: 3.3 },
      { year: "2022", growth: 6.6 },
      { year: "2023", growth: 3.8 },
      { year: "2024", growth: 3.1 },
    ],
    inflationData: [
      { year: "2019", rate: 9.2 },
      { year: "2020", rate: 5.0 },
      { year: "2021", rate: 5.2 },
      { year: "2022", rate: 13.9 },
      { year: "2023", rate: 33.9 },
      { year: "2024", rate: 33.7 },
    ]
  },
  // Nigeria (NGA)
  NGA: {
    metrics: [
      { name: "GDP Growth", value: "2.9%", trend: "+0.1%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "28.9%", trend: "+2.1%", icon: Activity, color: "text-primary" },
      { name: "Population", value: "223M", trend: "+2.4%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "+$2.1B", trend: "+$0.4B", icon: DollarSign, color: "text-emerald-600" },
    ],
    gdpData: [
      { year: "2019", growth: 2.2 },
      { year: "2020", growth: -1.8 },
      { year: "2021", growth: 3.6 },
      { year: "2022", growth: 3.3 },
      { year: "2023", growth: 2.7 },
      { year: "2024", growth: 2.9 },
    ],
    inflationData: [
      { year: "2019", rate: 11.4 },
      { year: "2020", rate: 13.2 },
      { year: "2021", rate: 16.9 },
      { year: "2022", rate: 18.8 },
      { year: "2023", rate: 24.5 },
      { year: "2024", rate: 28.9 },
    ]
  },
  // South Africa (ZAF)
  ZAF: {
    metrics: [
      { name: "GDP Growth", value: "0.6%", trend: "-0.2%", icon: TrendingUp, color: "text-red-600" },
      { name: "Inflation Rate", value: "5.1%", trend: "-0.4%", icon: Activity, color: "text-emerald-600" },
      { name: "Population", value: "61M", trend: "+0.9%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "+$8.2B", trend: "+$1.1B", icon: DollarSign, color: "text-emerald-600" },
    ],
    gdpData: [
      { year: "2019", growth: 0.1 },
      { year: "2020", growth: -6.3 },
      { year: "2021", growth: 4.7 },
      { year: "2022", growth: 1.9 },
      { year: "2023", growth: 0.6 },
      { year: "2024", growth: 0.8 },
    ],
    inflationData: [
      { year: "2019", rate: 4.1 },
      { year: "2020", rate: 3.3 },
      { year: "2021", rate: 4.6 },
      { year: "2022", rate: 6.9 },
      { year: "2023", rate: 6.0 },
      { year: "2024", rate: 5.1 },
    ]
  }
};
