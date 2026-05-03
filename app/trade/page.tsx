"use client";

import SectorLayout from "@/components/SectorLayout";
import { Ship, Package, Anchor, Truck, ShoppingCart } from "lucide-react";

export default function TradePage() {
  const metrics = [
    { label: "Trade Balance", value: "+$12.8B", change: "+$2.1B", isUp: true, icon: Ship },
    { label: "Export Volume", value: "4.2M Tons", change: "+8.4%", isUp: true, icon: Package },
    { label: "Import Volume", value: "3.8M Tons", change: "-1.2%", isUp: true, icon: Anchor },
    { label: "Logistics Index", value: "82.4", change: "+4.1", isUp: true, icon: Truck },
  ];

  const chartData = [
    { name: "Mon", value: 45 },
    { name: "Tue", value: 52 },
    { name: "Wed", value: 48 },
    { name: "Thu", value: 61 },
    { name: "Fri", value: 55 },
    { name: "Sat", value: 67 },
    { name: "Sun", value: 72 },
  ];

  const tableData = [
    { name: "Crude Oil", category: "Exports", value: "$45B", change: "+12%", isUp: true, projection: 88 },
    { name: "Electronics", category: "Imports", value: "$18B", change: "+4%", isUp: false, projection: 70 },
    { name: "Agricultural Machinery", category: "Imports", value: "$12B", change: "+25%", isUp: true, projection: 95 },
    { name: "Textiles", category: "Exports", value: "$8B", change: "+15%", isUp: true, projection: 82 },
    { name: "Refined Petroleum", category: "Imports", value: "$22B", change: "-5%", isUp: true, projection: 65 },
  ];

  return (
    <SectorLayout 
      title="Trade & Logistics" 
      subtitle="Cross-Border Import/Export Flow & Supply Chain Data" 
      sectorId="trade"
      initialMetrics={metrics}
      initialChartData={chartData}
      initialTableData={tableData}
    />
  );
}
