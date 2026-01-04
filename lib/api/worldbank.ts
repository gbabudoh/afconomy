// World Bank API integration for African economic data
export interface WorldBankIndicator {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export interface WorldBankResponse {
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

const WORLD_BANK_BASE_URL = process.env.WORLD_BANK_API_URL || 'https://api.worldbank.org/v2';

// Key economic indicators for African countries
export const INDICATORS = {
  GDP_GROWTH: 'NY.GDP.MKTP.KD.ZG',
  INFLATION: 'FP.CPI.TOTL.ZG',
  UNEMPLOYMENT: 'SL.UEM.TOTL.ZS',
  POPULATION: 'SP.POP.TOTL',
  TRADE_BALANCE: 'NE.RSB.GNFS.ZS',
  DEBT_TO_GDP: 'GC.DOD.TOTL.GD.ZS',
  LITERACY_RATE: 'SE.ADT.LITR.ZS',
  SCHOOL_ENROLLMENT: 'SE.PRM.NENR'
} as const;

export async function fetchWorldBankData(
  countryCode: string, 
  indicator: string, 
  startYear: number = 2019,
  endYear: number = 2024
): Promise<WorldBankIndicator[]> {
  try {
    const url = `${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/${indicator}?date=${startYear}:${endYear}&format=json&per_page=100`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Afconomy/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`World Bank API error: ${response.status}`);
    }

    const data = await response.json();
    
    // World Bank returns [metadata, data] array
    if (Array.isArray(data) && data.length > 1) {
      return data[1] || [];
    }
    
    return [];
  } catch (error) {
    console.error(`Failed to fetch World Bank data for ${countryCode}:`, error);
    return [];
  }
}

export async function fetchMultipleIndicators(
  countryCode: string,
  indicators: string[],
  year: number = 2024
): Promise<Record<string, number | null>> {
  const results: Record<string, number | null> = {};
  
  try {
    const promises = indicators.map(async (indicator) => {
      const data = await fetchWorldBankData(countryCode, indicator, year, year);
      const latestValue = data.find(item => item.value !== null)?.value || null;
      return { indicator, value: latestValue };
    });

    const responses = await Promise.all(promises);
    
    responses.forEach(({ indicator, value }) => {
      results[indicator] = value;
    });

    return results;
  } catch (error) {
    console.error(`Failed to fetch multiple indicators for ${countryCode}:`, error);
    return results;
  }
}

// Get latest available data for a country (fallback to previous years if current year unavailable)
export async function getLatestCountryData(countryCode: string) {
  const currentYear = new Date().getFullYear();
  const indicators = Object.values(INDICATORS);
  
  // Try current year first, then fallback to previous years
  for (let year = currentYear; year >= currentYear - 3; year--) {
    const data = await fetchMultipleIndicators(countryCode, indicators, year);
    
    // If we have some data, return it
    const hasData = Object.values(data).some(value => value !== null);
    if (hasData) {
      return { year, data };
    }
  }
  
  return { year: currentYear, data: {} };
}