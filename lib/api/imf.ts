/**
 * IMF DataMapper API Utility
 * Provides access to real-time macroeconomic indicators and projections.
 */

const IMF_BASE_URL = process.env.IMF_API_URL || 'https://www.imf.org/external/datamapper/api/v1';

export const IMF_INDICATORS = {
  GDP_GROWTH: 'NGDP_RPCH',         // Real GDP growth (Annual percent change)
  INFLATION: 'PCPIPCH',            // Inflation rate, average consumer prices (Annual percent change)
  POPULATION: 'LP',                 // Population (Millions)
  CURRENT_ACCOUNT_TOTAL: 'BCA',    // Current account balance (Billions of U.S. dollars)
  CURRENT_ACCOUNT_PROPORTION: 'BCA_NGDPD' // Current account balance (% of GDP)
};

export interface IMFDataResponse {
  values: {
    [indicator: string]: {
      [country: string]: {
        [year: string]: number;
      };
    };
  };
}

/**
 * Fetches data from IMF DataMapper API
 * @param indicators Array of indicator codes (e.g. NGDP_RPCH)
 * @param countries Array of country ISO alpha-3 codes (e.g. NGA)
 */
export async function fetchIMFData(indicators: string[], countries: string[]): Promise<IMFDataResponse | null> {
  try {
    const indicatorString = indicators.join('/');
    const countryString = countries.join('/');
    const url = `${IMF_BASE_URL}/${indicatorString}/${countryString}`;

    const response = await fetch(url, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`IMF API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch IMF data:', error);
    return null;
  }
}

/**
 * Simplifies IMF data response for a specific year
 */
export function getLatestIMFValue(data: IMFDataResponse, indicator: string, country: string, year: string = '2026') {
  return data.values?.[indicator]?.[country]?.[year] || null;
}
