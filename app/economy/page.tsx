"use client";

import SectorLayout from "@/components/SectorLayout";
import { TrendingUp, BarChart3, Globe, Zap, PieChart } from "lucide-react";

export default function EconomyPage() {
  const metrics = [
    { label: "GDP Growth", value: "4.2%", change: "+0.8%", isUp: true, icon: TrendingUp },
    { label: "Inflation Rate", value: "12.4%", change: "-2.1%", isUp: true, icon: Zap },
    { label: "Public Debt", value: "62% of GDP", change: "+1.2%", isUp: false, icon: BarChart3 },
    { label: "Foreign Reserves", value: "$38.4B", change: "+4.5%", isUp: true, icon: Globe },
  ];

  const chartData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
    { name: "Aug", value: 4000 },
    { name: "Sep", value: 3000 },
    { name: "Oct", value: 2000 },
    { name: "Nov", value: 2780 },
    { name: "Dec", value: 3890 },
  ];

  const tableData = [
    { name: "Nigeria", category: "West Africa", value: "$477B GDP", change: "+3.2%", isUp: true, projection: 85 },
    { name: "South Africa", category: "Southern Africa", value: "$405B GDP", change: "+1.9%", isUp: true, projection: 72 },
    { name: "Egypt", category: "North Africa", value: "$398B GDP", change: "+4.1%", isUp: true, projection: 90 },
    { name: "Kenya", category: "East Africa", value: "$110B GDP", change: "+5.5%", isUp: true, projection: 95 },
    { name: "Ethiopia", category: "East Africa", value: "$111B GDP", change: "+6.2%", isUp: true, projection: 98 },
  ];

  return (
    <SectorLayout 
      title="Macro Economy" 
      subtitle="Continental Financial Stability & Growth Metrics" 
      sectorId="economy"
      initialMetrics={metrics}
      initialChartData={chartData}
      initialTableData={tableData}
    />
  );
}
