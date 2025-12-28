"use client";

import { useState, useMemo } from "react";
import { ArrowLeftRight, TrendingUp } from "lucide-react";
import { africanCurrencies, convertCurrency } from "@/lib/currencies";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [isFlipped, setIsFlipped] = useState(false);

  // Add USD to the currencies list for conversion
  const allCurrencies = useMemo(() => [
    { code: "USD", name: "US Dollar", symbol: "$", countryCode: "USA", rateToUSD: 1.0 },
    ...africanCurrencies,
  ], []);

  // Calculate converted amount using useMemo instead of useEffect
  const convertedAmount = useMemo(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      try {
        return convertCurrency(
          parseFloat(amount),
          fromCurrency,
          toCurrency,
          allCurrencies
        );
      } catch (error) {
        console.error("Conversion error:", error);
        return 0;
      }
    }
    return 0;
  }, [amount, fromCurrency, toCurrency, allCurrencies]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setIsFlipped(!isFlipped);
  };

  const fromCurrencyData = allCurrencies.find(c => c.code === fromCurrency);
  const toCurrencyData = allCurrencies.find(c => c.code === toCurrency);

  const popularPairs = [
    { from: "USD", to: "NGN", label: "USD → NGN" },
    { from: "USD", to: "ZAR", label: "USD → ZAR" },
    { from: "USD", to: "KES", label: "USD → KES" },
    { from: "USD", to: "EGP", label: "USD → EGP" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Converter Card */}
      <div className="rounded-xl border border-secondary/10 bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Currency Converter</h3>
          <div className="flex items-center gap-2 text-xs text-secondary">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Rates
          </div>
        </div>

        {/* From Currency */}
        <div className="space-y-4">
          <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
            <label className="text-xs font-medium text-secondary mb-3 block">From</label>
            <div className="space-y-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent text-2xl font-bold text-foreground outline-none"
                placeholder="0.00"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-card border border-secondary/20 rounded-lg text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {allCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              {fromCurrencyData && (
                <p className="text-xs text-secondary">
                  {fromCurrencyData.symbol} {fromCurrencyData.name}
                </p>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              className="p-3 rounded-full bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <ArrowLeftRight className="h-5 w-5 text-primary-foreground" />
            </button>
          </div>

          {/* To Currency */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <label className="text-xs font-medium text-secondary mb-3 block">To</label>
            <div className="space-y-3">
              <div className="w-full text-2xl font-bold text-foreground">
                {convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-card border border-secondary/20 rounded-lg text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {allCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              {toCurrencyData && (
                <p className="text-xs text-secondary">
                  {toCurrencyData.symbol} {toCurrencyData.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        {fromCurrencyData && toCurrencyData && (
          <div className="mt-6 p-4 rounded-lg bg-secondary/5 border border-secondary/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary">Exchange Rate</span>
              <span className="font-bold text-foreground">
                1 {fromCurrency} = {(toCurrencyData.rateToUSD / fromCurrencyData.rateToUSD).toFixed(4)} {toCurrency}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Popular Pairs */}
      <div className="rounded-xl border border-secondary/10 bg-card p-6 shadow-sm">
        <h4 className="text-sm font-bold text-foreground mb-4">Popular Currency Pairs</h4>
        <div className="grid grid-cols-2 gap-3">
          {popularPairs.map((pair) => {
            const from = allCurrencies.find(c => c.code === pair.from);
            const to = allCurrencies.find(c => c.code === pair.to);
            const rate = to && from ? (to.rateToUSD / from.rateToUSD).toFixed(2) : "0";
            
            return (
              <button
                key={pair.label}
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                }}
                className="p-3 rounded-lg border border-secondary/10 hover:border-primary/30 hover:bg-secondary/5 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-foreground">{pair.label}</span>
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                </div>
                <p className="text-sm font-bold text-primary">{rate}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-secondary">
        Exchange rates are indicative and may vary. For actual transactions, please check with your financial institution.
      </p>
    </div>
  );
}
