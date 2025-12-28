import { TrendingUp, Users, DollarSign, Activity, LucideIcon, GraduationCap, Briefcase, BarChart3, Globe } from "lucide-react";

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
  financial: MacroMetric[];
  education: MacroMetric[];
  employment: MacroMetric[];
  trade: MacroMetric[];
  performance: MacroMetric[];
}

export const countryMacroData: Record<string, CountryMacro> = {
  // Continental Fallback
  default: {
    metrics: [
      { name: "GDP Growth", value: "3.2%", trend: "+0.4%", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "12.8%", trend: "-1.2%", icon: Activity, color: "text-primary" },
      { name: "Population", value: "1.4B", trend: "+2.1%", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "+$4.2B", trend: "+$0.8B", icon: DollarSign, color: "text-emerald-600" },
    ],
    gdpData: [
      { year: "2019", growth: 3.4 }, { year: "2020", growth: -2.1 }, { year: "2021", growth: 4.5 },
      { year: "2022", growth: 3.8 }, { year: "2023", growth: 3.2 }, { year: "2024", growth: 3.6 },
    ],
    inflationData: [
      { year: "2019", rate: 8.5 }, { year: "2020", rate: 10.2 }, { year: "2021", rate: 9.8 },
      { year: "2022", rate: 14.5 }, { year: "2023", rate: 12.8 }, { year: "2024", rate: 11.5 },
    ],
    financial: [
      { name: "Central Bank Rate", value: "14.5%", trend: "Stable", icon: Building2Icon, color: "text-primary" },
      { name: "M2 Money Supply", value: "$420B", trend: "+8.2%", icon: DollarSign, color: "text-emerald-600" },
    ],
    education: [
      { name: "Literacy Rate", value: "67.4%", trend: "+1.2%", icon: GraduationCap, color: "text-blue-600" },
      { name: "Primary Enrollment", value: "88.2%", trend: "+0.5%", icon: GraduationCap, color: "text-blue-600" },
    ],
    employment: [
      { name: "Unemployment", value: "10.4%", trend: "-0.2%", icon: Briefcase, color: "text-red-500" },
      { name: "Youth Unemployment", value: "24.5%", trend: "-1.1%", icon: Briefcase, color: "text-red-500" },
    ],
    trade: [
      { name: "Main Export", value: "Commodities", trend: "70%", icon: Globe, color: "text-emerald-600" },
      { name: "Import Coverage", value: "4.2 Months", trend: "+0.2", icon: Globe, color: "text-emerald-600" },
    ],
    performance: [
      { name: "Ease of Business", value: "114/190", trend: "+2", icon: BarChart3, color: "text-primary" },
      { name: "Industrial Output", value: "+2.4%", trend: "Growing", icon: BarChart3, color: "text-emerald-600" },
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
      { year: "2019", growth: 5.6 }, { year: "2020", growth: 3.6 }, { year: "2021", growth: 3.3 },
      { year: "2022", growth: 6.6 }, { year: "2023", growth: 3.8 }, { year: "2024", growth: 4.2 },
    ],
    inflationData: [
      { year: "2019", rate: 9.2 }, { year: "2020", rate: 5.0 }, { year: "2021", rate: 5.2 },
      { year: "2022", rate: 13.9 }, { year: "2023", rate: 33.9 }, { year: "2024", rate: 35.8 },
    ],
    financial: [
      { name: "Central Bank Rate", value: "27.25%", trend: "High", icon: Building2Icon, color: "text-red-500" },
      { name: "External Debt", value: "$164B", trend: "Rising", icon: DollarSign, color: "text-red-500" },
    ],
    education: [
      { name: "Literacy Rate", value: "71.4%", trend: "+0.8%", icon: GraduationCap, color: "text-blue-600" },
      { name: "Tertiary Enrollment", value: "35.2%", trend: "+2.1%", icon: GraduationCap, color: "text-blue-600" },
    ],
    employment: [
      { name: "Unemployment", value: "6.9%", trend: "-0.3%", icon: Briefcase, color: "text-emerald-600" },
      { name: "Youth Unemployment", value: "24.1%", trend: "-0.8%", icon: Briefcase, color: "text-red-500" },
    ],
    trade: [
      { name: "Main Export", value: "Natural Gas", trend: "32%", icon: Globe, color: "text-emerald-600" },
      { name: "Suez Canal Rev", value: "$9.4B", trend: "-20%", icon: Globe, color: "text-red-500" },
    ],
    performance: [
      { name: "Ease of Business", value: "114/190", trend: "+1", icon: BarChart3, color: "text-primary" },
      { name: "Manufacturing PMI", value: "48.1", trend: "Contraction", icon: BarChart3, color: "text-red-500" },
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
      { year: "2019", growth: 2.2 }, { year: "2020", growth: -1.8 }, { year: "2021", growth: 3.6 },
      { year: "2022", growth: 3.3 }, { year: "2023", growth: 2.7 }, { year: "2024", growth: 3.2 },
    ],
    inflationData: [
      { year: "2019", rate: 11.4 }, { year: "2020", rate: 13.2 }, { year: "2021", rate: 16.9 },
      { year: "2022", rate: 18.8 }, { year: "2023", rate: 24.5 }, { year: "2024", rate: 31.7 },
    ],
    financial: [
      { name: "MPR Rate", value: "24.75%", trend: "+400bps", icon: Building2Icon, color: "text-red-500" },
      { name: "FX Reserves", value: "$34.4B", trend: "Dropping", icon: DollarSign, color: "text-red-500" },
    ],
    education: [
      { name: "Literacy Rate", value: "62.0%", trend: "+0.5%", icon: GraduationCap, color: "text-blue-600" },
      { name: "Tertiary Enrollment", value: "11.8%", trend: "+0.2%", icon: GraduationCap, color: "text-blue-600" },
    ],
    employment: [
      { name: "Unemployment", value: "33.3%", trend: "Stagnant", icon: Briefcase, color: "text-red-500" },
      { name: "Underemployment", value: "22.8%", trend: "+1.2%", icon: Briefcase, color: "text-red-500" },
    ],
    trade: [
      { name: "Main Export", value: "Crude Oil", trend: "85%", icon: Globe, color: "text-emerald-600" },
      { name: "Non-Oil Export", value: "$4.5B", trend: "+15%", icon: Globe, color: "text-emerald-600" },
    ],
    performance: [
      { name: "Ease of Business", value: "131/190", trend: "+15", icon: BarChart3, color: "text-emerald-600" },
      { name: "Power Generation", value: "4.5GW", trend: "Critical", icon: BarChart3, color: "text-red-500" },
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
      { year: "2019", growth: 0.1 }, { year: "2020", growth: -6.3 }, { year: "2021", growth: 4.7 },
      { year: "2022", growth: 1.9 }, { year: "2023", growth: 0.6 }, { year: "2024", growth: 0.9 },
    ],
    inflationData: [
      { year: "2019", rate: 4.1 }, { year: "2020", rate: 3.3 }, { year: "2021", rate: 4.6 },
      { year: "2022", rate: 6.9 }, { year: "2023", rate: 6.0 }, { year: "2024", rate: 5.4 },
    ],
    financial: [
      { name: "Repo Rate", value: "8.25%", trend: "Hold", icon: Building2Icon, color: "text-emerald-600" },
      { name: "Market Cap/GDP", value: "280%", trend: "Highest", icon: DollarSign, color: "text-emerald-600" },
    ],
    education: [
      { name: "Literacy Rate", value: "95.0%", trend: "Stable", icon: GraduationCap, color: "text-blue-600" },
      { name: "Education Spend", value: "6.2% GDP", trend: "High", icon: GraduationCap, color: "text-blue-600" },
    ],
    employment: [
      { name: "Unemployment", value: "32.9%", trend: "+0.2%", icon: Briefcase, color: "text-red-500" },
      { name: "Youth Unemployment", value: "45.5%", trend: "Crisis", icon: Briefcase, color: "text-red-500" },
    ],
    trade: [
      { name: "Main Export", value: "Platinum/Gold", trend: "42%", icon: Globe, color: "text-emerald-600" },
      { name: "Top Partner", value: "China", trend: "25%", icon: Globe, color: "text-emerald-600" },
    ],
    performance: [
      { name: "Ease of Business", value: "84/190", trend: "Falling", icon: BarChart3, color: "text-red-500" },
      { name: "Logistics Index", value: "3.2/5", trend: "Improving", icon: BarChart3, color: "text-emerald-600" },
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
      { year: "2019", growth: 5.0 }, { year: "2020", growth: -0.3 }, { year: "2021", growth: 7.6 },
      { year: "2022", growth: 4.8 }, { year: "2023", growth: 5.2 }, { year: "2024", growth: 5.4 },
    ],
    inflationData: [
      { year: "2019", rate: 5.2 }, { year: "2020", rate: 5.4 }, { year: "2021", rate: 6.1 },
      { year: "2022", rate: 7.7 }, { year: "2023", rate: 6.8 }, { year: "2024", rate: 7.1 },
    ],
    financial: [
      { name: "Central Bank Rate", value: "13.0%", trend: "Rising", icon: Building2Icon, color: "text-red-500" },
      { name: "Public Debt", value: "70% GDP", trend: "Warning", icon: DollarSign, color: "text-red-500" },
    ],
    education: [
      { name: "Literacy Rate", value: "81.5%", trend: "+1.5%", icon: GraduationCap, color: "text-blue-600" },
      { name: "Primary Enrollment", value: "99.0%", trend: "Universal", icon: GraduationCap, color: "text-blue-600" },
    ],
    employment: [
      { name: "Unemployment", value: "5.5%", trend: "Stable", icon: Briefcase, color: "text-emerald-600" },
      { name: "Informal Sector", value: "83%", trend: "High", icon: Briefcase, color: "text-primary" },
    ],
    trade: [
      { name: "Main Export", value: "Tea/Coffee", trend: "28%", icon: Globe, color: "text-emerald-600" },
      { name: "Port Activity", value: "+12%", trend: "Mombasa", icon: Globe, color: "text-emerald-600" },
    ],
    performance: [
      { name: "Ease of Business", value: "56/190", trend: "Leader", icon: BarChart3, color: "text-emerald-600" },
      { name: "Mobile Money Pen.", value: "96%", trend: "Global Cap", icon: BarChart3, color: "text-emerald-600" },
    ]
  }
};

// Helper component for Building2 (since it was missing in the Lucide set I thought I had)
import { Building2 as Building2Icon } from "lucide-react";
