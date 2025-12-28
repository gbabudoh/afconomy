export interface CurrencyData {
  code: string;
  name: string;
  symbol: string;
  countryCode: string;
  rateToUSD: number; // Approximate rates - should be updated from API
}

export const africanCurrencies: CurrencyData[] = [
  // North Africa
  { code: "DZD", name: "Algerian Dinar", symbol: "د.ج", countryCode: "DZA", rateToUSD: 134.5 },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", countryCode: "EGY", rateToUSD: 30.85 },
  { code: "LYD", name: "Libyan Dinar", symbol: "ل.د", countryCode: "LBY", rateToUSD: 4.82 },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م.", countryCode: "MAR", rateToUSD: 10.12 },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت", countryCode: "TUN", rateToUSD: 3.15 },
  { code: "SDG", name: "Sudanese Pound", symbol: "ج.س.", countryCode: "SDN", rateToUSD: 601.5 },
  
  // West Africa (CFA Franc BCEAO)
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA", countryCode: "BEN", rateToUSD: 615.0 },
  
  // West Africa (Other)
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "$", countryCode: "CPV", rateToUSD: 103.5 },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D", countryCode: "GMB", rateToUSD: 67.5 },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", countryCode: "GHA", rateToUSD: 15.2 },
  { code: "GNF", name: "Guinean Franc", symbol: "Fr", countryCode: "GIN", rateToUSD: 8650.0 },
  { code: "LRD", name: "Liberian Dollar", symbol: "$", countryCode: "LBR", rateToUSD: 193.5 },
  { code: "MRU", name: "Mauritanian Ouguiya", symbol: "UM", countryCode: "MRT", rateToUSD: 39.8 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", countryCode: "NGA", rateToUSD: 1485.5 },
  { code: "SLL", name: "Sierra Leonean Leone", symbol: "Le", countryCode: "SLE", rateToUSD: 22500.0 },
  
  // East Africa
  { code: "BIF", name: "Burundian Franc", symbol: "Fr", countryCode: "BDI", rateToUSD: 2850.0 },
  { code: "KMF", name: "Comorian Franc", symbol: "Fr", countryCode: "COM", rateToUSD: 461.5 },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fr", countryCode: "DJI", rateToUSD: 177.7 },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk", countryCode: "ERI", rateToUSD: 15.0 },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", countryCode: "ETH", rateToUSD: 123.5 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", countryCode: "KEN", rateToUSD: 128.3 },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar", countryCode: "MDG", rateToUSD: 4520.0 },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨", countryCode: "MUS", rateToUSD: 46.2 },
  { code: "RWF", name: "Rwandan Franc", symbol: "Fr", countryCode: "RWA", rateToUSD: 1385.0 },
  { code: "SCR", name: "Seychellois Rupee", symbol: "₨", countryCode: "SYC", rateToUSD: 13.8 },
  { code: "SOS", name: "Somali Shilling", symbol: "Sh", countryCode: "SOM", rateToUSD: 571.0 },
  { code: "SSP", name: "South Sudanese Pound", symbol: "£", countryCode: "SSD", rateToUSD: 1305.0 },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", countryCode: "TZA", rateToUSD: 2520.0 },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", countryCode: "UGA", rateToUSD: 3685.0 },
  
  // Central Africa (CFA Franc BEAC)
  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA", countryCode: "CMR", rateToUSD: 615.0 },
  
  // Central Africa (Other)
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz", countryCode: "AGO", rateToUSD: 925.0 },
  { code: "CDF", name: "Congolese Franc", symbol: "Fr", countryCode: "COD", rateToUSD: 2820.0 },
  { code: "STN", name: "São Tomé and Príncipe Dobra", symbol: "Db", countryCode: "STP", rateToUSD: 23.0 },
  
  // Southern Africa
  { code: "BWP", name: "Botswana Pula", symbol: "P", countryCode: "BWA", rateToUSD: 13.6 },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "L", countryCode: "SWZ", rateToUSD: 18.45 },
  { code: "LSL", name: "Lesotho Loti", symbol: "L", countryCode: "LSO", rateToUSD: 18.45 },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK", countryCode: "MWI", rateToUSD: 1735.0 },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT", countryCode: "MOZ", rateToUSD: 63.8 },
  { code: "NAD", name: "Namibian Dollar", symbol: "$", countryCode: "NAM", rateToUSD: 18.45 },
  { code: "ZAR", name: "South African Rand", symbol: "R", countryCode: "ZAF", rateToUSD: 18.45 },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK", countryCode: "ZMB", rateToUSD: 27.2 },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "$", countryCode: "ZWE", rateToUSD: 13500.0 },
];

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  currencies: CurrencyData[]
): number {
  const from = currencies.find(c => c.code === fromCurrency);
  const to = currencies.find(c => c.code === toCurrency);
  
  if (!from || !to) {
    throw new Error("Currency not found");
  }
  
  // Convert to USD first, then to target currency
  const amountInUSD = amount / from.rateToUSD;
  const convertedAmount = amountInUSD * to.rateToUSD;
  
  return convertedAmount;
}

export function formatCurrency(amount: number, currencyCode: string, currencies: CurrencyData[]): string {
  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) return amount.toFixed(2);
  
  return `${currency.symbol} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
