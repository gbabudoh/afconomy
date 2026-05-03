"use client";

import SectorLayout from "@/components/SectorLayout";
import { Briefcase, Users, GraduationCap, Award, Search } from "lucide-react";

export default function EmploymentPage() {
  const metrics = [
    { label: "Unemployment Rate", value: "14.2%", change: "-0.5%", isUp: true, icon: Briefcase },
    { label: "Youth Employment", value: "48.6%", change: "+2.4%", isUp: true, icon: Users },
    { label: "Skill Literacy", value: "72.1%", change: "+1.2%", isUp: true, icon: GraduationCap },
    { label: "Workforce Size", value: "450M", change: "+5.1M", isUp: true, icon: Award },
  ];

  const chartData = [
    { name: "2020", value: 380 },
    { name: "2021", value: 400 },
    { name: "2022", value: 420 },
    { name: "2023", value: 435 },
    { name: "2024", value: 450 },
  ];

  const tableData = [
    { name: "Tech Sector", category: "Services", value: "12M Jobs", change: "+15%", isUp: true, projection: 95 },
    { name: "Agriculture", category: "Primary", value: "180M Jobs", change: "-2%", isUp: false, projection: 60 },
    { name: "Manufacturing", category: "Secondary", value: "45M Jobs", change: "+4%", isUp: true, projection: 75 },
    { name: "Renewable Energy", category: "Infrastructure", value: "2.4M Jobs", change: "+25%", isUp: true, projection: 99 },
    { name: "Education", category: "Services", value: "18M Jobs", change: "+1.5%", isUp: true, projection: 80 },
  ];

  return (
    <SectorLayout 
      title="Employment Hub" 
      subtitle="Labor Market Dynamics & Workforce Analytics" 
      sectorId="employment"
      initialMetrics={metrics}
      initialChartData={chartData}
      initialTableData={tableData}
    />
  );
}
