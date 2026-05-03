const IMF_BASE_URL = "https://www.imf.org/external/datamapper/api/v1";

export interface IMFData {
  indicator: string;
  country: string;
  value: number;
  year: number;
}

export async function fetchIMFIndicator(indicator: string, countryCode: string) {
  const series = await fetchIMFSeries(indicator, countryCode);
  return series ? series[series.length - 1] : null;
}

export async function fetchIMFSeries(indicator: string, countryCode: string) {
  try {
    const response = await fetch(`/api/imf?indicator=${indicator}&countryCode=${countryCode}`);
    if (!response.ok) throw new Error("IMF API Error");
    const data = await response.json();
    
    const values = data.values?.[indicator]?.[countryCode];
    if (!values) return null;

    return Object.entries(values)
      .map(([year, value]) => ({
        name: year,
        value: Number(value)
      }))
      .sort((a, b) => Number(a.name) - Number(b.name));
  } catch (error) {
    console.error(`Error fetching IMF series for ${countryCode}:`, error);
    return null;
  }
}

export const IMF_INDICATORS = {
  GDP_GROWTH: "NGDP_RPCH",
  INFLATION: "PCPIPCH",
  UNEMPLOYMENT: "LUR"
};
