"use client";

import SectorLayout from "@/components/SectorLayout";
import { Coins, RefreshCcw, Landmark, CreditCard, Wallet } from "lucide-react";

export default function CurrencyPage() {
  const metrics = [
    { label: "Stability Index", value: "84.2", change: "+1.5", isUp: true, icon: Coins },
    { label: "FX Liquidity", value: "High", change: "+4.2%", isUp: true, icon: RefreshCcw },
    { label: "Reserve Coverage", value: "8.4 Months", change: "+0.2", isUp: true, icon: Landmark },
    { label: "Digital Adoption", value: "24.1%", change: "+5.8%", isUp: true, icon: CreditCard },
  ];

  const chartData = [
    { name: "USD/NGN", value: 1520 },
    { name: "USD/ZAR", value: 18.9 },
    { name: "USD/KES", value: 130 },
    { name: "USD/EGP", value: 48 },
    { name: "USD/GHS", value: 14.5 },
  ];

  const tableData = [
    { name: "Nigerian Naira (NGN)", category: "Fiat", value: "1,525.50", change: "+0.8%", isUp: false, projection: 45 },
    { name: "SA Rand (ZAR)", category: "Fiat", value: "18.95", change: "+0.3%", isUp: true, projection: 78 },
    { name: "Kenyan Shilling (KES)", category: "Fiat", value: "129.50", change: "-0.2%", isUp: true, projection: 82 },
    { name: "Egyptian Pound (EGP)", category: "Fiat", value: "40.65", change: "-2.2%", isUp: false, projection: 60 },
    { name: "eNaira", category: "CBDC", value: "Fixed", change: "0.0%", isUp: true, projection: 95 },
  ];

  return (
    <SectorLayout 
      title="Currency & FX" 
      subtitle="Monetary Stability & Exchange Rate Intelligence" 
      sectorId="currency"
      initialMetrics={metrics}
      initialChartData={chartData}
      initialTableData={tableData}
    />
  );
}
