"use client";

import SectorLayout from "@/components/SectorLayout";
import { UtensilsCrossed, Wheat, Droplets, CloudRain, Sun } from "lucide-react";

export default function FoodSecurityPage() {
  const metrics = [
    { label: "Stability Index", value: "62.4", change: "+2.1", isUp: true, icon: UtensilsCrossed },
    { label: "Cereal Production", value: "245M Tons", change: "+4.5%", isUp: true, icon: Wheat },
    { label: "Water Stress", value: "High", change: "+8%", isUp: false, icon: Droplets },
    { label: "Agri-Tech Adoption", value: "18.4%", change: "+12%", isUp: true, icon: Sun },
  ];

  const chartData = [
    { name: "Harvest 1", value: 4200 },
    { name: "Harvest 2", value: 3800 },
    { name: "Harvest 3", value: 4500 },
    { name: "Harvest 4", value: 5100 },
  ];

  const tableData = [
    { name: "Maize", category: "Staple", value: "120M Tons", change: "+5.2%", isUp: true, projection: 85 },
    { name: "Rice", category: "Staple", value: "45M Tons", change: "+8.9%", isUp: true, projection: 72 },
    { name: "Wheat", category: "Staple", value: "32M Tons", change: "-2.1%", isUp: false, projection: 60 },
    { name: "Fertilizer Usage", category: "Inputs", value: "140kg/ha", change: "+15%", isUp: true, projection: 90 },
    { name: "Irrigated Land", category: "Infrastructure", value: "12M ha", change: "+4.5%", isUp: true, projection: 75 },
  ];

  return (
    <SectorLayout 
      title="Food Security" 
      subtitle="Agricultural Productivity & Nutritional Stability Analytics" 
      sectorId="food"
      initialMetrics={metrics}
      initialChartData={chartData}
      initialTableData={tableData}
    />
  );
}
