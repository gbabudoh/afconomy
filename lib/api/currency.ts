// Currency exchange rate API integration
export interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: Record<string, number>;
}

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  lastUpdated: string;
}

const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest';
const FALLBACK_API_URL = 'https://api.fixer.io/latest'; // Backup option

// African currency codes we support
export const AFRICAN_CURRENCY_CODES = [
  'DZD', 'EGP', 'LYD', 'MAD', 'TND', 'SDG', // North Africa
  'XOF', 'CVE', 'GMD', 'GHS', 'GNF', 'LRD', 'MRU', 'NGN', 'SLL', // West Africa
  'XAF', 'AOA', 'CDF', 'GQE', 'STP', // Central Africa
  'ETB', 'KES', 'RWF', 'TZS', 'UGX', 'BIF', 'DJF', 'ERN', 'SOS', // East Africa
  'BWP', 'LSL', 'MWK', 'MUR', 'MZN', 'NAD', 'SCR', 'SZL', 'ZAR', 'ZMW', 'ZWL' // Southern Africa
];

export async function fetchExchangeRates(baseCurrency: string = 'USD'): Promise<ExchangeRateResponse | null> {
  try {
    const response = await fetch(`${EXCHANGE_API_URL}/${baseCurrency}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Afconomy/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Exchange rate API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Convert the response format to match our interface
    return {
      result: 'success',
      documentation: data.provider || '',
      terms_of_use: data.terms || '',
      time_last_update_unix: data.time_last_updated || Date.now() / 1000,
      time_last_update_utc: new Date(data.time_last_updated * 1000).toISOString(),
      time_next_update_unix: (data.time_last_updated || Date.now() / 1000) + 86400,
      time_next_update_utc: new Date((data.time_last_updated + 86400) * 1000).toISOString(),
      base_code: data.base || baseCurrency,
      conversion_rates: data.rates || {}
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return null;
  }
}

export async function getAfricanCurrencyRates(): Promise<CurrencyRate[]> {
  try {
    const data = await fetchExchangeRates('USD');
    
    if (!data || !data.conversion_rates) {
      return [];
    }

    const rates: CurrencyRate[] = [];
    
    AFRICAN_CURRENCY_CODES.forEach(code => {
      const rate = data.conversion_rates[code];
      if (rate) {
        rates.push({
          code,
          name: getCurrencyName(code),
          symbol: getCurrencySymbol(code),
          rate,
          lastUpdated: data.time_last_update_utc
        });
      }
    });

    return rates;
  } catch (error) {
    console.error('Failed to get African currency rates:', error);
    return [];
  }
}

export async function convertCurrency(
  amount: number, 
  fromCurrency: string, 
  toCurrency: string
): Promise<number | null> {
  try {
    const data = await fetchExchangeRates(fromCurrency);
    
    if (!data || !data.conversion_rates[toCurrency]) {
      return null;
    }

    return amount * data.conversion_rates[toCurrency];
  } catch (error) {
    console.error(`Failed to convert ${fromCurrency} to ${toCurrency}:`, error);
    return null;
  }
}

// Helper functions for currency metadata
function getCurrencyName(code: string): string {
  const names: Record<string, string> = {
    'DZD': 'Algerian Dinar',
    'EGP': 'Egyptian Pound',
    'LYD': 'Libyan Dinar',
    'MAD': 'Moroccan Dirham',
    'TND': 'Tunisian Dinar',
    'SDG': 'Sudanese Pound',
    'XOF': 'West African CFA Franc',
    'CVE': 'Cape Verdean Escudo',
    'GMD': 'Gambian Dalasi',
    'GHS': 'Ghanaian Cedi',
    'GNF': 'Guinean Franc',
    'LRD': 'Liberian Dollar',
    'MRU': 'Mauritanian Ouguiya',
    'NGN': 'Nigerian Naira',
    'SLL': 'Sierra Leonean Leone',
    'XAF': 'Central African CFA Franc',
    'AOA': 'Angolan Kwanza',
    'CDF': 'Congolese Franc',
    'ETB': 'Ethiopian Birr',
    'KES': 'Kenyan Shilling',
    'RWF': 'Rwandan Franc',
    'TZS': 'Tanzanian Shilling',
    'UGX': 'Ugandan Shilling',
    'BWP': 'Botswana Pula',
    'ZAR': 'South African Rand',
    'ZMW': 'Zambian Kwacha',
    'MUR': 'Mauritian Rupee',
    'MZN': 'Mozambican Metical',
    'NAD': 'Namibian Dollar'
  };
  return names[code] || code;
}

function getCurrencySymbol(code: string): string {
  const symbols: Record<string, string> = {
    'DZD': 'د.ج',
    'EGP': '£',
    'LYD': 'ل.د',
    'MAD': 'د.م.',
    'TND': 'د.ت',
    'SDG': 'ج.س.',
    'XOF': 'CFA',
    'CVE': '$',
    'GMD': 'D',
    'GHS': '₵',
    'GNF': 'Fr',
    'LRD': '$',
    'MRU': 'UM',
    'NGN': '₦',
    'SLL': 'Le',
    'XAF': 'FCFA',
    'AOA': 'Kz',
    'CDF': 'FC',
    'ETB': 'Br',
    'KES': 'KSh',
    'RWF': 'RWF',
    'TZS': 'TSh',
    'UGX': 'USh',
    'BWP': 'P',
    'ZAR': 'R',
    'ZMW': 'ZK',
    'MUR': '₨',
    'MZN': 'MT',
    'NAD': '$'
  };
  return symbols[code] || code;
}