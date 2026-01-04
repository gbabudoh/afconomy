"use client";

import { useState, useMemo } from "react";
import { ArrowLeftRight, TrendingUp, Loader2 } from "lucide-react";
import { useCurrencyRates, useCurrencyConverter } from "@/lib/hooks/useRealTimeData";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [isFlipped, setIsFlipped] = useState(false);
  const [convertedResult, setConvertedResult] = useState<number | null>(null);

  // Fetch real-time currency rates
  const { rates, loading: ratesLoading, error: ratesError, lastUpdated } = useCurrencyRates();
  const { convert, loading: convertLoading, error: convertError } = useCurrencyConverter();

  // Add USD to the currencies list for conversion
  const allCurrencies = useMemo(() => {
    const usdCurrency = { code: "USD", name: "US Dollar", symbol: "$", rate: 1.0, lastUpdated: new Date().toISOString() };
    return [usdCurrency, ...rates];
  }, [rates]);

  // Handle conversion with real API
  const handleConvert = async () => {
    if (amount && !isNaN(parseFloat(amount))) {
      try {
        const result = await convert(parseFloat(amount), fromCurrency, toCurrency);
        setConvertedResult(result.result);
      } catch (error) {
        console.error("Conversion error:", error);
        setConvertedResult(null);
      }
    }
  };

  // Auto-convert when inputs change
  useMemo(() => {
    if (amount && fromCurrency && toCurrency && !ratesLoading) {
      handleConvert();
    }
  }, [amount, fromCurrency, toCurrency, ratesLoading]);

  // Calculate converted amount for display
  const convertedAmount = useMemo(() => {
    if (convertedResult !== null) {
      return convertedResult;
    }
    
    // Fallback calculation using rates
    if (amount && !isNaN(parseFloat(amount)) && rates.length > 0) {
      const fromRate = fromCurrency === 'USD' ? 1 : rates.find(r => r.code === fromCurrency)?.rate || 1;
      const toRate = toCurrency === 'USD' ? 1 : rates.find(r => r.code === toCurrency)?.rate || 1;
      return (parseFloat(amount) / fromRate) * toRate;
    }
    return 0;
  }, [amount, fromCurrency, toCurrency, rates, convertedResult]);

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

  if (ratesError) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">Failed to load currency rates: {ratesError}</p>
          <p className="text-sm text-red-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
      {/* Converter Card */}
      <div className="rounded-xl border border-secondary/10 bg-card p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Currency Converter</h3>
          <div className="flex items-center gap-2 text-xs text-secondary">
            <div className={`h-2 w-2 rounded-full ${ratesLoading ? 'bg-yellow-500' : 'bg-emerald-500'} animate-pulse`} />
            {ratesLoading ? 'Loading...' : 'Live Rates'}
            {lastUpdated && (
              <span className="text-xs text-secondary hidden sm:inline">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* From Currency */}
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-3 sm:p-4">
            <label className="text-xs font-medium text-secondary mb-2 sm:mb-3 block">From</label>
            <div className="space-y-2 sm:space-y-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent text-xl sm:text-2xl font-bold text-foreground outline-none"
                placeholder="0.00"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-2 sm:px-3 py-2 bg-card border border-secondary/20 rounded-lg text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              className="p-2 sm:p-3 rounded-full bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <ArrowLeftRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </button>
          </div>

          {/* To Currency */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 sm:p-4">
            <label className="text-xs font-medium text-secondary mb-2 sm:mb-3 block">To</label>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-full text-xl sm:text-2xl font-bold text-foreground">
                  {convertLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      <span className="text-sm sm:text-base">Converting...</span>
                    </div>
                  ) : (
                    convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  )}
                </div>
              </div>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-2 sm:px-3 py-2 bg-card border border-secondary/20 rounded-lg text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
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
        {fromCurrencyData && toCurrencyData && !ratesLoading && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-secondary/5 border border-secondary/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2">
              <span className="text-secondary">Exchange Rate</span>
              <span className="font-bold text-foreground">
                1 {fromCurrency} = {(
                  fromCurrency === 'USD' ? 
                    (toCurrencyData.rate || 1) : 
                    toCurrency === 'USD' ? 
                      (1 / (fromCurrencyData.rate || 1)) :
                      ((toCurrencyData.rate || 1) / (fromCurrencyData.rate || 1))
                ).toFixed(4)} {toCurrency}
              </span>
            </div>
            {convertError && (
              <p className="text-xs text-red-500 mt-2">{convertError}</p>
            )}
          </div>
        )}
      </div>

      {/* Popular Pairs */}
      <div className="rounded-xl border border-secondary/10 bg-card p-4 sm:p-6 shadow-sm">
        <h4 className="text-sm font-bold text-foreground mb-3 sm:mb-4">Popular Currency Pairs</h4>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {popularPairs.map((pair) => {
            const from = allCurrencies.find(c => c.code === pair.from);
            const to = allCurrencies.find(c => c.code === pair.to);
            const rate = to && from ? 
              (pair.from === 'USD' ? 
                (to.rate || 1) : 
                pair.to === 'USD' ? 
                  (1 / (from.rate || 1)) :
                  ((to.rate || 1) / (from.rate || 1))
              ).toFixed(2) : "0";
            
            return (
              <button
                key={pair.label}
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                }}
                className="p-2 sm:p-3 rounded-lg border border-secondary/10 hover:border-primary/30 hover:bg-secondary/5 transition-all text-left"
                disabled={ratesLoading}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-foreground">{pair.label}</span>
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                </div>
                <p className="text-sm font-bold text-primary">
                  {ratesLoading ? <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> : rate}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-secondary px-4">
        Exchange rates are indicative and may vary. For actual transactions, please check with your financial institution.
      </p>
    </div>
  );
}
