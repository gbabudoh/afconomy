export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-3
  flag: string; // Emoji flag
  region: string;
  capital: string;
  currency: string;
}

export const africanCountries: Country[] = [
  // North Africa
  { name: "Algeria", code: "DZA", flag: "🇩🇿", region: "North Africa", capital: "Algiers", currency: "DZD" },
  { name: "Egypt", code: "EGY", flag: "🇪🇬", region: "North Africa", capital: "Cairo", currency: "EGP" },
  { name: "Libya", code: "LBY", flag: "🇱🇾", region: "North Africa", capital: "Tripoli", currency: "LYD" },
  { name: "Morocco", code: "MAR", flag: "🇲🇦", region: "North Africa", capital: "Rabat", currency: "MAD" },
  { name: "Tunisia", code: "TUN", flag: "🇹🇳", region: "North Africa", capital: "Tunis", currency: "TND" },
  { name: "Sudan", code: "SDN", flag: "🇸🇩", region: "North Africa", capital: "Khartoum", currency: "SDG" },
  
  // West Africa
  { name: "Benin", code: "BEN", flag: "🇧🇯", region: "West Africa", capital: "Porto-Novo", currency: "XOF" },
  { name: "Burkina Faso", code: "BFA", flag: "🇧🇫", region: "West Africa", capital: "Ouagadougou", currency: "XOF" },
  { name: "Cape Verde", code: "CPV", flag: "🇨🇻", region: "West Africa", capital: "Praia", currency: "CVE" },
  { name: "Côte d'Ivoire", code: "CIV", flag: "🇨🇮", region: "West Africa", capital: "Yamoussoukro", currency: "XOF" },
  { name: "Gambia", code: "GMB", flag: "🇬🇲", region: "West Africa", capital: "Banjul", currency: "GMD" },
  { name: "Ghana", code: "GHA", flag: "🇬🇭", region: "West Africa", capital: "Accra", currency: "GHS" },
  { name: "Guinea", code: "GIN", flag: "🇬🇳", region: "West Africa", capital: "Conakry", currency: "GNF" },
  { name: "Guinea-Bissau", code: "GNB", flag: "🇬🇼", region: "West Africa", capital: "Bissau", currency: "XOF" },
  { name: "Liberia", code: "LBR", flag: "🇱🇷", region: "West Africa", capital: "Monrovia", currency: "LRD" },
  { name: "Mali", code: "MLI", flag: "🇲🇱", region: "West Africa", capital: "Bamako", currency: "XOF" },
  { name: "Mauritania", code: "MRT", flag: "🇲🇷", region: "West Africa", capital: "Nouakchott", currency: "MRU" },
  { name: "Niger", code: "NER", flag: "🇳🇪", region: "West Africa", capital: "Niamey", currency: "XOF" },
  { name: "Nigeria", code: "NGA", flag: "🇳🇬", region: "West Africa", capital: "Abuja", currency: "NGN" },
  { name: "Senegal", code: "SEN", flag: "🇸🇳", region: "West Africa", capital: "Dakar", currency: "XOF" },
  { name: "Sierra Leone", code: "SLE", flag: "🇸🇱", region: "West Africa", capital: "Freetown", currency: "SLL" },
  { name: "Togo", code: "TGO", flag: "🇹🇬", region: "West Africa", capital: "Lomé", currency: "XOF" },
  
  // East Africa
  { name: "Burundi", code: "BDI", flag: "🇧🇮", region: "East Africa", capital: "Gitega", currency: "BIF" },
  { name: "Comoros", code: "COM", flag: "🇰🇲", region: "East Africa", capital: "Moroni", currency: "KMF" },
  { name: "Djibouti", code: "DJI", flag: "🇩🇯", region: "East Africa", capital: "Djibouti", currency: "DJF" },
  { name: "Eritrea", code: "ERI", flag: "🇪🇷", region: "East Africa", capital: "Asmara", currency: "ERN" },
  { name: "Ethiopia", code: "ETH", flag: "🇪🇹", region: "East Africa", capital: "Addis Ababa", currency: "ETB" },
  { name: "Kenya", code: "KEN", flag: "🇰🇪", region: "East Africa", capital: "Nairobi", currency: "KES" },
  { name: "Madagascar", code: "MDG", flag: "🇲🇬", region: "East Africa", capital: "Antananarivo", currency: "MGA" },
  { name: "Mauritius", code: "MUS", flag: "🇲🇺", region: "East Africa", capital: "Port Louis", currency: "MUR" },
  { name: "Rwanda", code: "RWA", flag: "🇷🇼", region: "East Africa", capital: "Kigali", currency: "RWF" },
  { name: "Seychelles", code: "SYC", flag: "🇸🇨", region: "East Africa", capital: "Victoria", currency: "SCR" },
  { name: "Somalia", code: "SOM", flag: "🇸🇴", region: "East Africa", capital: "Mogadishu", currency: "SOS" },
  { name: "South Sudan", code: "SSD", flag: "🇸🇸", region: "East Africa", capital: "Juba", currency: "SSP" },
  { name: "Tanzania", code: "TZA", flag: "🇹🇿", region: "East Africa", capital: "Dodoma", currency: "TZS" },
  { name: "Uganda", code: "UGA", flag: "🇺🇬", region: "East Africa", capital: "Kampala", currency: "UGX" },
  
  // Central Africa
  { name: "Angola", code: "AGO", flag: "🇦🇴", region: "Central Africa", capital: "Luanda", currency: "AOA" },
  { name: "Cameroon", code: "CMR", flag: "🇨🇲", region: "Central Africa", capital: "Yaoundé", currency: "XAF" },
  { name: "Central African Republic", code: "CAF", flag: "🇨🇫", region: "Central Africa", capital: "Bangui", currency: "XAF" },
  { name: "Chad", code: "TCD", flag: "🇹🇩", region: "Central Africa", capital: "N'Djamena", currency: "XAF" },
  { name: "Congo", code: "COG", flag: "🇨🇬", region: "Central Africa", capital: "Brazzaville", currency: "XAF" },
  { name: "DR Congo", code: "COD", flag: "🇨🇩", region: "Central Africa", capital: "Kinshasa", currency: "CDF" },
  { name: "Equatorial Guinea", code: "GNQ", flag: "🇬🇶", region: "Central Africa", capital: "Malabo", currency: "XAF" },
  { name: "Gabon", code: "GAB", flag: "🇬🇦", region: "Central Africa", capital: "Libreville", currency: "XAF" },
  { name: "São Tomé and Príncipe", code: "STP", flag: "🇸🇹", region: "Central Africa", capital: "São Tomé", currency: "STN" },
  
  // Southern Africa
  { name: "Botswana", code: "BWA", flag: "🇧🇼", region: "Southern Africa", capital: "Gaborone", currency: "BWP" },
  { name: "Eswatini", code: "SWZ", flag: "🇸🇿", region: "Southern Africa", capital: "Mbabane", currency: "SZL" },
  { name: "Lesotho", code: "LSO", flag: "🇱🇸", region: "Southern Africa", capital: "Maseru", currency: "LSL" },
  { name: "Malawi", code: "MWI", flag: "🇲🇼", region: "Southern Africa", capital: "Lilongwe", currency: "MWK" },
  { name: "Mozambique", code: "MOZ", flag: "🇲🇿", region: "Southern Africa", capital: "Maputo", currency: "MZN" },
  { name: "Namibia", code: "NAM", flag: "🇳🇦", region: "Southern Africa", capital: "Windhoek", currency: "NAD" },
  { name: "South Africa", code: "ZAF", flag: "🇿🇦", region: "Southern Africa", capital: "Pretoria", currency: "ZAR" },
  { name: "Zambia", code: "ZMB", flag: "🇿🇲", region: "Southern Africa", capital: "Lusaka", currency: "ZMW" },
  { name: "Zimbabwe", code: "ZWE", flag: "🇿🇼", region: "Southern Africa", capital: "Harare", currency: "ZWL" },
];

export const regions = [
  "All Regions",
  "North Africa",
  "West Africa",
  "East Africa",
  "Central Africa",
  "Southern Africa",
];

export function getCountriesByRegion(region: string): Country[] {
  if (region === "All Regions") {
    return africanCountries;
  }
  return africanCountries.filter((country) => country.region === region);
}
