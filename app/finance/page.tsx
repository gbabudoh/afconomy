"use client";

import SectorLayout from "@/components/SectorLayout";
import { CircleDollarSign, PiggyBank, Receipt, Scale, Landmark } from "lucide-react";

export default function FinancePage() {
  const metrics = [
    { label: "Market Cap", value: "$1.2T", change: "+4.5%", isUp: true, icon: CircleDollarSign },
    { label: "Interest Rate", value: "18.5%", change: "Fixed", isUp: true, icon: Landmark },
    { label: "FDI Inflow", value: "$42.8B", change: "+12%", isUp: true, icon: PiggyBank },
    { label: "Credit Rating", value: "B+", change: "Stable", isUp: true, icon: Scale },
  ];

  const chartData = [
    { name: "Q1", value: 2400 },
    { name: "Q2", value: 3600 },
    { name: "Q3", value: 3100 },
    { name: "Q4", value: 4200 },
  ];

  const tableData = [
    { name: "Commercial Banks", category: "Banking", value: "$840B Assets", change: "+8.2%", isUp: true, projection: 85 },
    { name: "Microfinance", category: "Credit", value: "$12B Assets", change: "+15%", isUp: true, projection: 92 },
    { name: "Insurance", category: "Risk", value: "$45B Premium", change: "+4.1%", isUp: true, projection: 70 },
    { name: "Fintech", category: "Technology", value: "$18B Volume", change: "+45%", isUp: true, projection: 99 },
    { name: "Sovereign Funds", category: "Investment", value: "$120B", change: "+1.5%", isUp: true, projection: 88 },
  ];

  return (
    <SectorLayout 
      title="Financial Markets" 
      subtitle="Capital Allocation & Institutional Investment Flows" 
      sectorId="finance"
      initialMetrics={metrics}
      initialChartData={chartData}
      initialTableData={tableData}
    />
  );
}
