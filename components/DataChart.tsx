"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface DataChartProps {
  data: Record<string, string | number>[];
  type: "line" | "bar" | "area";
  dataKey: string;
  categoryKey: string;
  color?: string;
  height?: number;
}

export default function DataChart({
  data,
  type,
  dataKey,
  categoryKey,
  color = "#ff0201",
  height = 300,
}: DataChartProps) {
  const chartColor = color;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-secondary/10 p-3 rounded-lg shadow-xl ring-1 ring-border">
          <p className="text-xs font-bold text-secondary mb-1">{label}</p>
          <p className="text-sm font-bold text-primary">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#575757" opacity={0.1} />
            <XAxis 
              dataKey={categoryKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#575757", fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#575757", fontSize: 10 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(87, 87, 87, 0.05)' }} />
            <Bar 
              dataKey={dataKey} 
              fill={chartColor} 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#575757" opacity={0.1} />
            <XAxis 
              dataKey={categoryKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#575757", fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#575757", fontSize: 10 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={chartColor} 
              fillOpacity={1} 
              fill="url(#colorGradient)" 
              strokeWidth={2}
            />
          </AreaChart>
        );
      case "line":
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#575757" opacity={0.1} />
            <XAxis 
              dataKey={categoryKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#575757", fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#575757", fontSize: 10 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={chartColor} 
              strokeWidth={2} 
              dot={{ r: 4, fill: chartColor, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
