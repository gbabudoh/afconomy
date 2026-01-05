import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  LucideIcon,
  GraduationCap,
  Briefcase,
  BarChart3,
  Globe,
  Building2 as Building2Icon,
} from "lucide-react";
import { africanCountries } from "./countries";

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

export const regionalBaselines: Record<string, CountryMacro> = {
  "North Africa": {
    metrics: [
      {
        name: "GDP Growth",
        value: "3.5%",
        trend: "+0.2%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "5.8%",
        trend: "-0.4%",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        name: "Population",
        value: "30M",
        trend: "+1.2%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "+$1.2B",
        trend: "+$0.1B",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    gdpData: [
      { year: "2019", growth: 3.2 },
      { year: "2020", growth: -2.5 },
      { year: "2021", growth: 4.8 },
      { year: "2022", growth: 3.1 },
      { year: "2023", growth: 3.4 },
      { year: "2024", growth: 3.5 },
    ],
    inflationData: [
      { year: "2019", rate: 4.2 },
      { year: "2020", rate: 3.8 },
      { year: "2021", rate: 4.5 },
      { year: "2022", rate: 7.2 },
      { year: "2023", rate: 6.4 },
      { year: "2024", rate: 5.8 },
    ],
    financial: [
      {
        name: "CB Rate",
        value: "5.2%",
        trend: "Stable",
        icon: Building2Icon,
        color: "text-emerald-600",
      },
      {
        name: "Debt/GDP",
        value: "65%",
        trend: "Moderate",
        icon: DollarSign,
        color: "text-primary",
      },
    ],
    education: [
      {
        name: "Literacy",
        value: "72%",
        trend: "+1.2%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Enrollment",
        value: "88%",
        trend: "Stable",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "11.2%",
        trend: "-0.1%",
        icon: Briefcase,
        color: "text-red-500",
      },
      {
        name: "Youth Unempl",
        value: "24.5%",
        trend: "Stable",
        icon: Briefcase,
        color: "text-red-500",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Energy/Agri",
        trend: "Balanced",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Top Partner",
        value: "EU",
        trend: "Strong",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "PMI",
        value: "51.2",
        trend: "Expansion",
        icon: BarChart3,
        color: "text-emerald-600",
      },
      {
        name: "Ease of Biz",
        value: "98/190",
        trend: "+1",
        icon: BarChart3,
        color: "text-primary",
      },
    ],
  },
  "West Africa": {
    metrics: [
      {
        name: "GDP Growth",
        value: "4.2%",
        trend: "+0.6%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "15.4%",
        trend: "+1.2%",
        icon: Activity,
        color: "text-red-500",
      },
      {
        name: "Population",
        value: "25M",
        trend: "+2.4%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "-$0.8B",
        trend: "-$0.2B",
        icon: DollarSign,
        color: "text-red-500",
      },
    ],
    gdpData: [
      { year: "2019", growth: 4.5 },
      { year: "2020", growth: 1.2 },
      { year: "2021", growth: 5.2 },
      { year: "2022", growth: 4.1 },
      { year: "2023", growth: 3.8 },
      { year: "2024", growth: 4.2 },
    ],
    inflationData: [
      { year: "2019", rate: 8.5 },
      { year: "2020", rate: 10.2 },
      { year: "2021", rate: 12.4 },
      { year: "2022", rate: 18.5 },
      { year: "2023", rate: 16.2 },
      { year: "2024", rate: 15.4 },
    ],
    financial: [
      {
        name: "CB Rate",
        value: "12.5%",
        trend: "Rising",
        icon: Building2Icon,
        color: "text-red-500",
      },
      {
        name: "Debt/GDP",
        value: "58%",
        trend: "Warning",
        icon: DollarSign,
        color: "text-red-500",
      },
    ],
    education: [
      {
        name: "Literacy",
        value: "62%",
        trend: "+2.1%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Enrollment",
        value: "82%",
        trend: "+1.2%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "8.4%",
        trend: "Stable",
        icon: Briefcase,
        color: "text-emerald-600",
      },
      {
        name: "Youth Unempl",
        value: "18.2%",
        trend: "+0.5%",
        icon: Briefcase,
        color: "text-red-500",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Cocoa/Resources",
        trend: "High",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Regional Trade",
        value: "ECOWAS",
        trend: "Growing",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "PMI",
        value: "52.4",
        trend: "Rising",
        icon: BarChart3,
        color: "text-emerald-600",
      },
      {
        name: "Ease of Biz",
        value: "124/190",
        trend: "+5",
        icon: BarChart3,
        color: "text-emerald-600",
      },
    ],
  },
  "East Africa": {
    metrics: [
      {
        name: "GDP Growth",
        value: "5.8%",
        trend: "+0.8%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "7.2%",
        trend: "-0.2%",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        name: "Population",
        value: "45M",
        trend: "+2.1%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "-$2.4B",
        trend: "Stable",
        icon: DollarSign,
        color: "text-primary",
      },
    ],
    gdpData: [
      { year: "2019", growth: 5.8 },
      { year: "2020", growth: 2.1 },
      { year: "2021", growth: 6.4 },
      { year: "2022", growth: 5.2 },
      { year: "2023", growth: 5.5 },
      { year: "2024", growth: 5.8 },
    ],
    inflationData: [
      { year: "2019", rate: 5.4 },
      { year: "2020", rate: 6.2 },
      { year: "2021", rate: 5.8 },
      { year: "2022", rate: 9.1 },
      { year: "2023", rate: 7.8 },
      { year: "2024", rate: 7.2 },
    ],
    financial: [
      {
        name: "CB Rate",
        value: "9.5%",
        trend: "Stable",
        icon: Building2Icon,
        color: "text-emerald-600",
      },
      {
        name: "Mobile Money",
        value: "High",
        trend: "Global Cap",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    education: [
      {
        name: "Literacy",
        value: "78%",
        trend: "+1.5%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Primary Enr.",
        value: "94%",
        trend: "Universal",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "5.2%",
        trend: "-0.3%",
        icon: Briefcase,
        color: "text-emerald-600",
      },
      {
        name: "Youth Unempl",
        value: "11.5%",
        trend: "Stable",
        icon: Briefcase,
        color: "text-emerald-600",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Agri/Services",
        trend: "Diverse",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "EAC Integration",
        value: "Surging",
        trend: "Strong",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "PMI",
        value: "54.1",
        trend: "High",
        icon: BarChart3,
        color: "text-emerald-600",
      },
      {
        name: "Ease of Biz",
        value: "78/190",
        trend: "+2",
        icon: BarChart3,
        color: "text-primary",
      },
    ],
  },
  "Central Africa": {
    metrics: [
      {
        name: "GDP Growth",
        value: "2.8%",
        trend: "-0.1%",
        icon: TrendingUp,
        color: "text-red-500",
      },
      {
        name: "Inflation Rate",
        value: "6.4%",
        trend: "+0.5%",
        icon: Activity,
        color: "text-red-500",
      },
      {
        name: "Population",
        value: "18M",
        trend: "+2.8%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "+$0.4B",
        trend: "-$0.1B",
        icon: DollarSign,
        color: "text-red-500",
      },
    ],
    gdpData: [
      { year: "2019", growth: 3.1 },
      { year: "2020", growth: -1.2 },
      { year: "2021", growth: 2.8 },
      { year: "2022", growth: 3.2 },
      { year: "2023", growth: 2.9 },
      { year: "2024", growth: 2.8 },
    ],
    inflationData: [
      { year: "2019", rate: 3.2 },
      { year: "2020", rate: 2.8 },
      { year: "2021", rate: 4.1 },
      { year: "2022", rate: 7.4 },
      { year: "2023", rate: 6.8 },
      { year: "2024", rate: 6.4 },
    ],
    financial: [
      {
        name: "CB Rate",
        value: "4.5%",
        trend: "Hold",
        icon: Building2Icon,
        color: "text-primary",
      },
      {
        name: "FX Reserves",
        value: "Low",
        trend: "Warning",
        icon: DollarSign,
        color: "text-red-500",
      },
    ],
    education: [
      {
        name: "Literacy",
        value: "55%",
        trend: "+0.8%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Enrollment",
        value: "75%",
        trend: "Stable",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "14.5%",
        trend: "+0.2%",
        icon: Briefcase,
        color: "text-red-500",
      },
      {
        name: "Youth Unempl",
        value: "32.1%",
        trend: "Crisis",
        icon: Briefcase,
        color: "text-red-500",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Oil/Timber",
        trend: "High",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "CEMAC Trade",
        value: "Stable",
        trend: "Fair",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "PMI",
        value: "49.1",
        trend: "Stable",
        icon: BarChart3,
        color: "text-primary",
      },
      {
        name: "Ease of Biz",
        value: "165/190",
        trend: "Low",
        icon: BarChart3,
        color: "text-red-500",
      },
    ],
  },
  "Southern Africa": {
    metrics: [
      {
        name: "GDP Growth",
        value: "1.2%",
        trend: "+0.1%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "12.2%",
        trend: "-0.5%",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        name: "Population",
        value: "14M",
        trend: "+1.8%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "+$1.5B",
        trend: "+$0.2B",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    gdpData: [
      { year: "2019", growth: 1.5 },
      { year: "2020", growth: -4.2 },
      { year: "2021", growth: 3.8 },
      { year: "2022", growth: 2.1 },
      { year: "2023", growth: 1.1 },
      { year: "2024", growth: 1.2 },
    ],
    inflationData: [
      { year: "2019", rate: 6.2 },
      { year: "2020", rate: 8.4 },
      { year: "2021", rate: 9.2 },
      { year: "2022", rate: 15.4 },
      { year: "2023", rate: 13.8 },
      { year: "2024", rate: 12.2 },
    ],
    financial: [
      {
        name: "Repo Rate",
        value: "8.5%",
        trend: "Stable",
        icon: Building2Icon,
        color: "text-emerald-600",
      },
      {
        name: "Market Cap",
        value: "Growing",
        trend: "Good",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    education: [
      {
        name: "Literacy",
        value: "88%",
        trend: "+0.4%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Enrollment",
        value: "92%",
        trend: "High",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "18.5%",
        trend: "Stable",
        icon: Briefcase,
        color: "text-red-500",
      },
      {
        name: "Youth Unempl",
        value: "38.2%",
        trend: "Crisis",
        icon: Briefcase,
        color: "text-red-500",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Min/Agri",
        trend: "Balanced",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "SADC Trade",
        value: "Intense",
        trend: "Strong",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "PMI",
        value: "50.8",
        trend: "Neutral",
        icon: BarChart3,
        color: "text-primary",
      },
      {
        name: "Ease of Biz",
        value: "105/190",
        trend: "+2",
        icon: BarChart3,
        color: "text-primary",
      },
    ],
  },
};

export function getMacroForCountry(code: string): CountryMacro {
  const upperCode = code.toUpperCase();
  if (countryMacroData[upperCode]) return countryMacroData[upperCode];

  const country = africanCountries.find((c) => c.code === upperCode);
  const baseline =
    regionalBaselines[country?.region || "West Africa"] ||
    countryMacroData.default;

  // Generate deterministic variation based on code
  const seed = upperCode.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const variation = ((seed % 20) - 10) / 100; // -0.1 to +0.1 variation

  return {
    ...baseline,
    metrics: baseline.metrics.map((m) => ({
      ...m,
      value: m.value.includes("%")
        ? `${(parseFloat(m.value) + variation).toFixed(1)}%`
        : m.value,
      trend: "Dynamic",
    })),
  };
}

export const countryMacroData: Record<string, CountryMacro> = {
  // Continental Fallback
  default: {
    metrics: [
      {
        name: "GDP Growth",
        value: "3.2%",
        trend: "+0.4%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "12.8%",
        trend: "-1.2%",
        icon: Activity,
        color: "text-primary",
      },
      {
        name: "Population",
        value: "1.4B",
        trend: "+2.1%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "+$4.2B",
        trend: "+$0.8B",
        icon: DollarSign,
        color: "text-emerald-600",
      },
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
    ],
    financial: [
      {
        name: "Central Bank Rate",
        value: "14.5%",
        trend: "Stable",
        icon: Building2Icon,
        color: "text-primary",
      },
      {
        name: "M2 Money Supply",
        value: "$420B",
        trend: "+8.2%",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    education: [
      {
        name: "Literacy Rate",
        value: "67.4%",
        trend: "+1.2%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Primary Enrollment",
        value: "88.2%",
        trend: "+0.5%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "10.4%",
        trend: "-0.2%",
        icon: Briefcase,
        color: "text-red-500",
      },
      {
        name: "Youth Unemployment",
        value: "24.5%",
        trend: "-1.1%",
        icon: Briefcase,
        color: "text-red-500",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Commodities",
        trend: "70%",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Import Coverage",
        value: "4.2 Months",
        trend: "+0.2",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "Ease of Business",
        value: "114/190",
        trend: "+2",
        icon: BarChart3,
        color: "text-primary",
      },
      {
        name: "Industrial Output",
        value: "+2.4%",
        trend: "Growing",
        icon: BarChart3,
        color: "text-emerald-600",
      },
    ],
  },
  // Egypt (EGY)
  EGY: {
    metrics: [
      {
        name: "GDP Growth",
        value: "4.2%",
        trend: "+0.2%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "23.4%",
        trend: "-1.6%",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        name: "Population",
        value: "114M",
        trend: "+1.6%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "-$14.2B",
        trend: "-$1.5B",
        icon: DollarSign,
        color: "text-red-500",
      },
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
      { year: "2024", rate: 23.4 },
    ],
    financial: [
      {
        name: "Central Bank Rate",
        value: "27.25%",
        trend: "Stable",
        icon: Building2Icon,
        color: "text-primary",
      },
      {
        name: "External Debt",
        value: "$164B",
        trend: "Rising",
        icon: DollarSign,
        color: "text-red-500",
      },
    ],
    education: [
      {
        name: "Literacy Rate",
        value: "71.4%",
        trend: "+0.8%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Tertiary Enrollment",
        value: "35.2%",
        trend: "+2.1%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "6.9%",
        trend: "-0.3%",
        icon: Briefcase,
        color: "text-emerald-600",
      },
      {
        name: "Youth Unemployment",
        value: "24.1%",
        trend: "-0.8%",
        icon: Briefcase,
        color: "text-red-500",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Natural Gas",
        trend: "32%",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Suez Canal Rev",
        value: "$9.4B",
        trend: "-20%",
        icon: Globe,
        color: "text-red-500",
      },
    ],
    performance: [
      {
        name: "Ease of Business",
        value: "114/190",
        trend: "+1",
        icon: BarChart3,
        color: "text-primary",
      },
      {
        name: "Manufacturing PMI",
        value: "48.1",
        trend: "Contraction",
        icon: BarChart3,
        color: "text-red-500",
      },
    ],
  },
  // Nigeria (NGA)
  NGA: {
    metrics: [
      { name: "GDP Growth", value: "4.49%", trend: "+1.29% (CBN)", icon: TrendingUp, color: "text-emerald-600" },
      { name: "Inflation Rate", value: "12.7%", trend: "-19.0% (CBN)", icon: Activity, color: "text-emerald-600" },
      { name: "Population", value: "239.9M", trend: "+4.3% (Real-time)", icon: Users, color: "text-blue-600" },
      { name: "Trade Balance", value: "+$18.81B", trend: "Surplus (CBN)", icon: DollarSign, color: "text-emerald-600" },
    ],
    gdpData: [
      { year: "2021", growth: 3.6 }, { year: "2022", growth: 3.3 }, { year: "2023", growth: 2.7 },
      { year: "2024", growth: 3.2 }, { year: "2025", growth: 3.8 }, { year: "2026", growth: 4.49 },
    ],
    inflationData: [
      { year: "2021", rate: 16.9 }, { year: "2022", rate: 18.8 }, { year: "2023", rate: 24.5 },
      { year: "2024", rate: 31.7 }, { year: "2025", rate: 18.2 }, { year: "2026", rate: 12.7 },
    ],
    financial: [
      { name: "MPR Rate", value: "24.75%", trend: "Stable", icon: Building2Icon, color: "text-primary" },
      { name: "FX Reserves", value: "$34.4B", trend: "Stabilizing", icon: DollarSign, color: "text-emerald-600" },
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
      { name: "Current Account", value: "+$18.81B", trend: "Surplus", icon: Globe, color: "text-emerald-600" },
      { name: "Main Export", value: "Crude Oil", trend: "85%", icon: Globe, color: "text-emerald-600" },
    ],
    performance: [
      { name: "Ease of Business", value: "131/190", trend: "+15", icon: BarChart3, color: "text-emerald-600" },
      { name: "Power Generation", value: "4.5GW", trend: "Critical", icon: BarChart3, color: "text-red-500" },
    ]
  },
  // South Africa (ZAF)
  ZAF: {
    metrics: [
      {
        name: "GDP Growth",
        value: "0.9%",
        trend: "+0.1%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "5.4%",
        trend: "-0.2%",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        name: "Population",
        value: "62M",
        trend: "+0.9%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "+$9.1B",
        trend: "+$0.8B",
        icon: DollarSign,
        color: "text-emerald-600",
      },
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
    ],
    financial: [
      {
        name: "Repo Rate",
        value: "8.25%",
        trend: "Hold",
        icon: Building2Icon,
        color: "text-emerald-600",
      },
      {
        name: "Market Cap/GDP",
        value: "280%",
        trend: "Highest",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    education: [
      {
        name: "Literacy Rate",
        value: "95.0%",
        trend: "Stable",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Education Spend",
        value: "6.2% GDP",
        trend: "High",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "32.9%",
        trend: "+0.2%",
        icon: Briefcase,
        color: "text-red-500",
      },
      {
        name: "Youth Unemployment",
        value: "45.5%",
        trend: "Crisis",
        icon: Briefcase,
        color: "text-red-500",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Platinum/Gold",
        trend: "42%",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Top Partner",
        value: "China",
        trend: "25%",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "Ease of Business",
        value: "84/190",
        trend: "Falling",
        icon: BarChart3,
        color: "text-red-500",
      },
      {
        name: "Logistics Index",
        value: "3.2/5",
        trend: "Improving",
        icon: BarChart3,
        color: "text-emerald-600",
      },
    ],
  },
  // Kenya (KEN)
  KEN: {
    metrics: [
      {
        name: "GDP Growth",
        value: "5.4%",
        trend: "+0.4%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "6.8%",
        trend: "+0.2%",
        icon: Activity,
        color: "text-red-500",
      },
      {
        name: "Population",
        value: "56M",
        trend: "+1.9%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "-$5.2B",
        trend: "-$0.4B",
        icon: DollarSign,
        color: "text-red-500",
      },
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
    ],
    financial: [
      {
        name: "Central Bank Rate",
        value: "13.0%",
        trend: "Rising",
        icon: Building2Icon,
        color: "text-red-500",
      },
      {
        name: "Public Debt",
        value: "70% GDP",
        trend: "Warning",
        icon: DollarSign,
        color: "text-red-500",
      },
    ],
    education: [
      {
        name: "Literacy Rate",
        value: "81.5%",
        trend: "+1.5%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Primary Enrollment",
        value: "99.0%",
        trend: "Universal",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "5.5%",
        trend: "Stable",
        icon: Briefcase,
        color: "text-emerald-600",
      },
      {
        name: "Informal Sector",
        value: "83%",
        trend: "High",
        icon: Briefcase,
        color: "text-primary",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Tea/Coffee",
        trend: "28%",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Port Activity",
        value: "+12%",
        trend: "Mombasa",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "Ease of Business",
        value: "56/190",
        trend: "Leader",
        icon: BarChart3,
        color: "text-emerald-600",
      },
      {
        name: "Mobile Money Pen.",
        value: "96%",
        trend: "Global Cap",
        icon: BarChart3,
        color: "text-emerald-600",
      },
    ],
  },
  // Ghana (GHA)
  GHA: {
    metrics: [
      {
        name: "GDP Growth",
        value: "4.7%",
        trend: "+0.5%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "23.2%",
        trend: "-8.1%",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        name: "Population",
        value: "34M",
        trend: "+2.0%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "+$2.1B",
        trend: "+$0.4B",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    gdpData: [
      { year: "2019", growth: 6.5 },
      { year: "2020", growth: 0.5 },
      { year: "2021", growth: 5.4 },
      { year: "2022", growth: 3.1 },
      { year: "2023", growth: 2.9 },
      { year: "2024", growth: 4.7 },
    ],
    inflationData: [
      { year: "2019", rate: 8.7 },
      { year: "2020", rate: 9.9 },
      { year: "2021", rate: 10.0 },
      { year: "2022", rate: 31.5 },
      { year: "2023", rate: 54.1 },
      { year: "2024", rate: 23.2 },
    ],
    financial: [
      {
        name: "Monetary Policy Rate",
        value: "29.0%",
        trend: "Stable",
        icon: Building2Icon,
        color: "text-primary",
      },
      {
        name: "Public Debt",
        value: "85% GDP",
        trend: "Refining",
        icon: DollarSign,
        color: "text-red-500",
      },
    ],
    education: [
      {
        name: "Literacy Rate",
        value: "79.0%",
        trend: "+1.3%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Education Spend",
        value: "18.5% Budget",
        trend: "High",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "13.9%",
        trend: "+0.5%",
        icon: Briefcase,
        color: "text-red-500",
      },
      {
        name: "Youth Employment",
        value: "32.8%",
        trend: "Focus Area",
        icon: Briefcase,
        color: "text-red-500",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Gold/Cocoa",
        trend: "65%",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Non-Trad Export",
        value: "$3.8B",
        trend: "+12%",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "Ease of Business",
        value: "118/190",
        trend: "+2",
        icon: BarChart3,
        color: "text-primary",
      },
      {
        name: "Digital Economy",
        value: "High",
        trend: "Pan-Africa Leader",
        icon: BarChart3,
        color: "text-emerald-600",
      },
    ],
  },
  // Morocco (MAR)
  MAR: {
    metrics: [
      {
        name: "GDP Growth",
        value: "3.1%",
        trend: "+0.3%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "2.3%",
        trend: "-0.5%",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        name: "Population",
        value: "38M",
        trend: "+1.1%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "-$12.5B",
        trend: "-$0.8B",
        icon: DollarSign,
        color: "text-red-500",
      },
    ],
    gdpData: [
      { year: "2019", growth: 2.9 },
      { year: "2020", growth: -6.7 },
      { year: "2021", growth: 7.9 },
      { year: "2022", growth: 1.3 },
      { year: "2023", growth: 2.4 },
      { year: "2024", growth: 3.1 },
    ],
    inflationData: [
      { year: "2019", rate: 0.2 },
      { year: "2020", rate: 0.7 },
      { year: "2021", rate: 1.4 },
      { year: "2022", rate: 6.6 },
      { year: "2023", rate: 6.1 },
      { year: "2024", rate: 2.3 },
    ],
    financial: [
      {
        name: "Central Bank Rate",
        value: "3.0%",
        trend: "Stable",
        icon: Building2Icon,
        color: "text-emerald-600",
      },
      {
        name: "FDI Inflow",
        value: "$3.5B",
        trend: "+20%",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    education: [
      {
        name: "Literacy Rate",
        value: "77.2%",
        trend: "+1.1%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Vocation Training",
        value: "450k Enrolled",
        trend: "Expanding",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "12.1%",
        trend: "+0.3%",
        icon: Briefcase,
        color: "text-red-500",
      },
      {
        name: "Industrial Jobs",
        value: "28.5%",
        trend: "+2.1%",
        icon: Briefcase,
        color: "text-emerald-600",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Automotive/Phos",
        trend: "45%",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Tourism Revenue",
        value: "$10.2B",
        trend: "+15%",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "Ease of Business",
        value: "53/190",
        trend: "+7",
        icon: BarChart3,
        color: "text-emerald-600",
      },
      {
        name: "Green Energy",
        value: "42%",
        trend: "Global Leader",
        icon: BarChart3,
        color: "text-emerald-600",
      },
    ],
  },
  // Ethiopia (ETH)
  ETH: {
    metrics: [
      {
        name: "GDP Growth",
        value: "6.1%",
        trend: "+0.2%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "24.5%",
        trend: "-2.1%",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        name: "Population",
        value: "126M",
        trend: "+2.6%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "-$10.2B",
        trend: "-$0.5B",
        icon: DollarSign,
        color: "text-red-500",
      },
    ],
    gdpData: [
      { year: "2019", growth: 9.0 },
      { year: "2020", growth: 6.1 },
      { year: "2021", growth: 5.6 },
      { year: "2022", growth: 6.4 },
      { year: "2023", growth: 5.9 },
      { year: "2024", growth: 6.1 },
    ],
    inflationData: [
      { year: "2019", rate: 15.8 },
      { year: "2020", rate: 20.4 },
      { year: "2021", rate: 26.8 },
      { year: "2022", rate: 33.9 },
      { year: "2023", rate: 28.2 },
      { year: "2024", rate: 24.5 },
    ],
    financial: [
      {
        name: "Central Bank Rate",
        value: "None",
        trend: "Transitioning",
        icon: Building2Icon,
        color: "text-primary",
      },
      {
        name: "New Stock Exch.",
        value: "ESX",
        trend: "Launching 2024",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    education: [
      {
        name: "Literacy Rate",
        value: "51.8%",
        trend: "+2.1%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Higher Ed Growth",
        value: "+15%",
        trend: "Expanding",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "3.5%",
        trend: "Stable",
        icon: Briefcase,
        color: "text-emerald-600",
      },
      {
        name: "Urban Unempl.",
        value: "18.2%",
        trend: "Stressed",
        icon: Briefcase,
        color: "text-red-500",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Coffee/Gold",
        trend: "40%",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Airlines Rev",
        value: "$6.1B",
        trend: "+20%",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "Ease of Business",
        value: "159/190",
        trend: "+2",
        icon: BarChart3,
        color: "text-primary",
      },
      {
        name: "Energy Output",
        value: "5.2GW",
        trend: "GERD Focus",
        icon: BarChart3,
        color: "text-emerald-600",
      },
    ],
  },
  // Rwanda (RWA)
  RWA: {
    metrics: [
      {
        name: "GDP Growth",
        value: "7.2%",
        trend: "+0.8%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "5.1%",
        trend: "-1.2%",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        name: "Population",
        value: "14M",
        trend: "+2.3%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "-$2.1B",
        trend: "Stable",
        icon: DollarSign,
        color: "text-primary",
      },
    ],
    gdpData: [
      { year: "2019", growth: 9.4 },
      { year: "2020", growth: -3.4 },
      { year: "2021", growth: 10.9 },
      { year: "2022", growth: 8.2 },
      { year: "2023", growth: 6.6 },
      { year: "2024", growth: 7.2 },
    ],
    inflationData: [
      { year: "2019", rate: 2.4 },
      { year: "2020", rate: 7.7 },
      { year: "2021", rate: 0.8 },
      { year: "2022", rate: 13.9 },
      { year: "2023", rate: 10.2 },
      { year: "2024", rate: 5.1 },
    ],
    financial: [
      {
        name: "Repo Rate",
        value: "7.5%",
        trend: "Hold",
        icon: Building2Icon,
        color: "text-emerald-600",
      },
      {
        name: "KIFC Ranking",
        value: "Top 50",
        trend: "Fin Hub",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    education: [
      {
        name: "Literacy Rate",
        value: "75.0%",
        trend: "+1.5%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "ICT Literacy",
        value: "45.0%",
        trend: "+5.1%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "17.2%",
        trend: "-0.5%",
        icon: Briefcase,
        color: "text-emerald-600",
      },
      {
        name: "Youth Unempl.",
        value: "22.4%",
        trend: "-1.1%",
        icon: Briefcase,
        color: "text-emerald-600",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Coffee/Ores",
        trend: "35%",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Re-exports",
        value: "25%",
        trend: "Growing",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "Ease of Business",
        value: "38/190",
        trend: "Africa #2",
        icon: BarChart3,
        color: "text-emerald-600",
      },
      {
        name: "Service Index",
        value: "+8.5%",
        trend: "IT Focused",
        icon: BarChart3,
        color: "text-emerald-600",
      },
    ],
  },
  // Côte d'Ivoire (CIV)
  CIV: {
    metrics: [
      {
        name: "GDP Growth",
        value: "6.8%",
        trend: "+0.4%",
        icon: TrendingUp,
        color: "text-emerald-600",
      },
      {
        name: "Inflation Rate",
        value: "4.2%",
        trend: "+0.1%",
        icon: Activity,
        color: "text-red-500",
      },
      {
        name: "Population",
        value: "29M",
        trend: "+2.5%",
        icon: Users,
        color: "text-blue-600",
      },
      {
        name: "Trade Balance",
        value: "+$1.8B",
        trend: "+$0.2B",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    gdpData: [
      { year: "2019", growth: 6.2 },
      { year: "2020", growth: 2.0 },
      { year: "2021", growth: 7.4 },
      { year: "2022", growth: 6.7 },
      { year: "2023", growth: 6.4 },
      { year: "2024", growth: 6.8 },
    ],
    inflationData: [
      { year: "2019", rate: 0.8 },
      { year: "2020", rate: 2.4 },
      { year: "2021", rate: 4.2 },
      { year: "2022", rate: 5.2 },
      { year: "2023", rate: 4.8 },
      { year: "2024", rate: 4.2 },
    ],
    financial: [
      {
        name: "BCEAO Rate",
        value: "3.5%",
        trend: "Hold",
        icon: Building2Icon,
        color: "text-emerald-600",
      },
      {
        name: "Debt/GDP",
        value: "56%",
        trend: "Sustainable",
        icon: DollarSign,
        color: "text-emerald-600",
      },
    ],
    education: [
      {
        name: "Literacy Rate",
        value: "54.0%",
        trend: "+2.4%",
        icon: GraduationCap,
        color: "text-blue-600",
      },
      {
        name: "Vocational Focus",
        value: "25%",
        trend: "Expanding",
        icon: GraduationCap,
        color: "text-blue-600",
      },
    ],
    employment: [
      {
        name: "Unemployment",
        value: "3.2%",
        trend: "Stable",
        icon: Briefcase,
        color: "text-emerald-600",
      },
      {
        name: "Casual Labor",
        value: "65%",
        trend: "Transitioning",
        icon: Briefcase,
        color: "text-primary",
      },
    ],
    trade: [
      {
        name: "Main Export",
        value: "Cocoa/Oil",
        trend: "60%",
        icon: Globe,
        color: "text-emerald-600",
      },
      {
        name: "Cocoa Price",
        value: "+40%",
        trend: "Historic High",
        icon: Globe,
        color: "text-emerald-600",
      },
    ],
    performance: [
      {
        name: "Ease of Business",
        value: "110/190",
        trend: "+12",
        icon: BarChart3,
        color: "text-emerald-600",
      },
      {
        name: "Agri Processing",
        value: "35%",
        trend: "Surging",
        icon: BarChart3,
        color: "text-emerald-600",
      },
    ],
  },
};

// End of data
