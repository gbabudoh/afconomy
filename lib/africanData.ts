export const AFRICAN_COUNTRIES_MAP: Record<string, string> = {
  "Algeria": "DZA", "Angola": "AGO", "Benin": "BEN", "Botswana": "BWA", "Burkina Faso": "BFA", 
  "Burundi": "BDI", "Cabo Verde": "CPV", "Cameroon": "CMR", "Central African Republic": "CAF", 
  "Chad": "TCD", "Comoros": "COM", "Congo (Brazzaville)": "COG", "Congo (Kinshasa)": "COD", 
  "Djibouti": "DJI", "Egypt": "EGY", "Equatorial Guinea": "GNQ", "Eritrea": "ERI", 
  "Eswatini": "SWZ", "Ethiopia": "ETH", "Gabon": "GAB", "Gambia": "GMB", "Ghana": "GHA", 
  "Guinea": "GIN", "Guinea-Bissau": "GNB", "Ivory Coast": "CIV", "Kenya": "KEN", 
  "Lesotho": "LSO", "Liberia": "LBR", "Libya": "LBY", "Madagascar": "MDG", "Malawi": "MWI", 
  "Mali": "MLI", "Mauritania": "MRT", "Mauritius": "MUS", "Morocco": "MAR", "Mozambique": "MOZ", 
  "Namibia": "NAM", "Niger": "NER", "Nigeria": "NGA", "Rwanda": "RWA", 
  "Sao Tome and Principe": "STP", "Senegal": "SEN", "Seychelles": "SYC", "Sierra Leone": "SLE", 
  "Somalia": "SOM", "South Africa": "ZAF", "South Sudan": "SSD", "Sudan": "SDN", 
  "Tanzania": "TZA", "Togo": "TGO", "Tunisia": "TUN", "Uganda": "UGA", "Zambia": "ZMB", "Zimbabwe": "ZWE"
};

export const AFRICAN_COUNTRIES = Object.keys(AFRICAN_COUNTRIES_MAP);

export interface CountryData {
  economy: {
    gdp: string;
    growth: string;
    inflation: string;
    debt: string;
  };
  employment: {
    rate: string;
    youth: string;
    literacy: string;
  };
  trade: {
    balance: string;
    exports: string[];
    imports: string[];
  };
}

export const getCountryData = (country: string): CountryData => {
  // Hash-based seed for consistent "realistic" mock data
  const seed = country.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const gdpBase = (seed % 500) + 10;
  const growthBase = ((seed % 70) / 10) + 1.5;
  const inflationBase = (seed % 25) + 3;
  const employmentBase = (seed % 20) + 5;

  return {
    economy: {
      gdp: `$${gdpBase}B`,
      growth: `${growthBase.toFixed(1)}%`,
      inflation: `${inflationBase.toFixed(1)}%`,
      debt: `${(seed % 40) + 40}%`,
    },
    employment: {
      rate: `${employmentBase.toFixed(1)}%`,
      youth: `${(employmentBase * 2.5).toFixed(1)}%`,
      literacy: `${(seed % 30) + 60}%`,
    },
    trade: {
      balance: seed % 2 === 0 ? `+$${(seed % 10).toFixed(1)}B` : `-$${(seed % 10).toFixed(1)}B`,
      exports: ["Crude Oil", "Gold", "Cocoa", "Diamonds"].slice(0, (seed % 3) + 1),
      imports: ["Machinery", "Food", "Refined Fuel", "Vehicles"].slice(0, (seed % 3) + 1),
    }
  };
};
