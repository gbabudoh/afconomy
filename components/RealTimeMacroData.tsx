"use client";

import { useMacroData } from "@/lib/hooks/useRealTimeData";
import { useCountry } from "@/lib/CountryContext";
import { TrendingUp, TrendingDown, Activity, Users, DollarSign, Loader2, RefreshCw } from "lucide-react";
import { INDICATORS } from "@/lib/api/worldbank";

export default function RealTimeMacroData() {
  const { selectedCountries } = useCountry();
  const countryCode = selectedCountries[0]; // Use first selected country
  
  const { data, loading, error, lastUpdated, refetch } = useMacroData(countryCode);

  if (loading) {
    return (
      <div className="rounded-xl border border-secondary/10 bg-card p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-sm text-secondary">Loading macro data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="text-center">
          <p className="text-red-600 font-medium">Failed to load macro data</p>
          <p className="text-sm text-red-500 mt-1">{error}</p>
          <button 
            onClick={refetch}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data || !countryCode) {
    return (
      <div className="rounded-xl border border-secondary/10 bg-card p-6">
        <div className="text-center py-8">
          <Activity className="h-8 w-8 mx-auto mb-2 text-secondary/50" />
          <p className="text-sm text-secondary">Select a country to view macro data</p>
        </div>
      </div>
    );
  }

  const formatValue = (value: number | null, indicator: string) => {
    if (value === null) return "N/A";
    
    switch (indicator) {
      case INDICATORS.GDP_GROWTH:
      case INDICATORS.INFLATION:
      case INDICATORS.UNEMPLOYMENT:
        return `${value.toFixed(1)}%`;
      case INDICATORS.POPULATION:
        return value > 1000000 ? `${(value / 1000000).toFixed(1)}M` : value.toLocaleString();
      case INDICATORS.DEBT_TO_GDP:
        return `${value.toFixed(1)}%`;
      case INDICATORS.LITERACY_RATE:
      case INDICATORS.SCHOOL_ENROLLMENT:
        return `${value.toFixed(1)}%`;
      default:
        return value.toLocaleString();
    }
  };

  const getIcon = (indicator: string) => {
    switch (indicator) {
      case INDICATORS.GDP_GROWTH:
        return TrendingUp;
      case INDICATORS.INFLATION:
        return Activity;
      case INDICATORS.UNEMPLOYMENT:
        return Users;
      case INDICATORS.POPULATION:
        return Users;
      case INDICATORS.TRADE_BALANCE:
        return DollarSign;
      default:
        return Activity;
    }
  };

  const getColor = (value: number | null, indicator: string) => {
    if (value === null) return "text-secondary";
    
    switch (indicator) {
      case INDICATORS.GDP_GROWTH:
        return value > 0 ? "text-emerald-600" : "text-red-500";
      case INDICATORS.INFLATION:
        return value < 5 ? "text-emerald-600" : value < 10 ? "text-yellow-600" : "text-red-500";
      case INDICATORS.UNEMPLOYMENT:
        return value < 10 ? "text-emerald-600" : value < 20 ? "text-yellow-600" : "text-red-500";
      default:
        return "text-blue-600";
    }
  };

  const indicators = [
    { key: INDICATORS.GDP_GROWTH, name: "GDP Growth", data: data.data[INDICATORS.GDP_GROWTH] },
    { key: INDICATORS.INFLATION, name: "Inflation Rate", data: data.data[INDICATORS.INFLATION] },
    { key: INDICATORS.UNEMPLOYMENT, name: "Unemployment", data: data.data[INDICATORS.UNEMPLOYMENT] },
    { key: INDICATORS.POPULATION, name: "Population", data: data.data[INDICATORS.POPULATION] },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-foreground">Real-Time Macro Data</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            disabled={loading}
            className="p-1 hover:bg-secondary/10 rounded transition-colors"
            title="Refresh data"
          >
            <RefreshCw className={`h-3 w-3 text-secondary ${loading ? 'animate-spin' : ''}`} />
          </button>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 uppercase tracking-tighter">
            World Bank
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {indicators.map(({ key, name, data: indicatorData }) => {
          const Icon = getIcon(key);
          const value = indicatorData?.value || null;
          const year = indicatorData?.year || data.year;
          const color = getColor(value, key);

          return (
            <div key={key} className="rounded-lg border border-secondary/10 bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs font-medium text-secondary">{name}</span>
              </div>
              <div className="space-y-1">
                <p className={`text-lg font-bold ${color}`}>
                  {formatValue(value, key)}
                </p>
                <p className="text-xs text-secondary">
                  {year ? `${year} data` : 'Latest available'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {lastUpdated && (
        <p className="text-xs text-secondary text-center">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}