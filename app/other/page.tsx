"use client";

import SectorLayout from "@/components/SectorLayout";
import { Layers, Zap, Cpu, Rocket, Shield } from "lucide-react";

export default function OtherSectorsPage() {
  const metrics = [
    { label: "Energy Output", value: "145GW", change: "+12%", isUp: true, icon: Zap },
    { label: "Tech Innovation", value: "84.2", change: "+5.1", isUp: true, icon: Cpu },
    { label: "Startup Funding", value: "$6.4B", change: "+24%", isUp: true, icon: Rocket },
    { label: "Security Index", value: "72.4", change: "+1.2", isUp: true, icon: Shield },
  ];

  const chartData = [
    { name: "Tech", value: 4500 },
    { name: "Energy", value: 3200 },
    { name: "Health", value: 2800 },
    { name: "Edu", value: 3100 },
    { name: "Mining", value: 5200 },
  ];

  const tableData = [
    { name: "Renewable Energy", category: "Infrastructure", value: "42GW", change: "+45%", isUp: true, projection: 99 },
    { name: "Digital Services", category: "Tech", value: "$12B Rev", change: "+18%", isUp: true, projection: 92 },
    { name: "Healthcare", category: "Social", value: "24K Units", change: "+4.1%", isUp: true, projection: 80 },
    { name: "Critical Mining", category: "Natural Resources", value: "1.2M Tons", change: "+12%", isUp: true, projection: 88 },
    { name: "Real Estate", category: "Urban", value: "$145B Val", change: "+2.5%", isUp: true, projection: 70 },
  ];

  return (
    <SectorLayout 
      title="Auxiliary Sectors" 
      subtitle="Cross-Industry Innovation & Infrastructure Metrics" 
      sectorId="other"
      initialMetrics={metrics}
      initialChartData={chartData}
      initialTableData={tableData}
    />
  );
}
