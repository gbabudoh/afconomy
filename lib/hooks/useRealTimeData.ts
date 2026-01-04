import { useState, useEffect, useCallback } from 'react';

// Hook for fetching real-time macro data
export function useMacroData(countryCode?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = countryCode 
        ? `/api/macro-data?country=${countryCode}`
        : '/api/macro-data';

      const response = await fetch(url);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch macro data');
      }

      setData(result.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [countryCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchData
  };
}

// Hook for fetching real-time currency rates
export function useCurrencyRates(baseCurrency: string = 'USD') {
  const [rates, setRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchRates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/currency-rates?base=${baseCurrency}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch currency rates');
      }

      setRates(result.rates || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  useEffect(() => {
    fetchRates();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchRates]);

  return {
    rates,
    loading,
    error,
    lastUpdated,
    refetch: fetchRates
  };
}

// Hook for fetching real-time news
export function useNews(country?: string, pageSize: number = 20) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        pageSize: pageSize.toString()
      });

      if (country) {
        params.append('country', country);
      }

      const response = await fetch(`/api/news?${params}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch news');
      }

      setArticles(result.articles || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [country, pageSize]);

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchNews]);

  return {
    articles,
    loading,
    error,
    lastUpdated,
    refetch: fetchNews
  };
}

// Hook for currency conversion
export function useCurrencyConverter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(async (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        base: fromCurrency,
        target: toCurrency,
        amount: amount.toString()
      });

      const response = await fetch(`/api/currency-rates?${params}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Conversion failed');
      }

      return result.conversion;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    convert,
    loading,
    error
  };
}

// Hook for bulk data operations
export function useBulkDataFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBulkMacroData = useCallback(async (
    countries: string[],
    indicators?: string[],
    startYear?: number,
    endYear?: number
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/macro-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          countries,
          indicators,
          startYear,
          endYear
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch bulk data');
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bulk fetch failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchBulkMacroData,
    loading,
    error
  };
}