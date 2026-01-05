import { NextRequest, NextResponse } from 'next/server';
import { fetchWorldBankData, getLatestCountryData, INDICATORS as WB_INDICATORS } from '@/lib/api/worldbank';
import { fetchIMFData, IMF_INDICATORS, getLatestIMFValue } from '@/lib/api/imf';
import { africanCountries } from '@/lib/countries';

const INDICATORS = { ...WB_INDICATORS, ...IMF_INDICATORS };

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const indicator = searchParams.get('indicator');
  const year = searchParams.get('year');

  try {
    if (country && indicator) {
      // Fetch specific indicator for a country
      const data = await fetchWorldBankData(
        country, 
        indicator, 
        year ? parseInt(year) : 2019,
        year ? parseInt(year) : 2024
      );
      
      return NextResponse.json({ 
        success: true, 
        data,
        country,
        indicator 
      });
    }

    if (country) {
      // Fetch all latest data for a specific country
      const wbResult = await getLatestCountryData(country);
      
      // Also fetch IMF data for 2026 projections
      const imfData = await fetchIMFData(
        [
          IMF_INDICATORS.GDP_GROWTH, 
          IMF_INDICATORS.INFLATION, 
          IMF_INDICATORS.POPULATION,
          IMF_INDICATORS.CURRENT_ACCOUNT_TOTAL
        ],
        [country]
      );

      const result: any = { 
        year: wbResult.year,
        data: {} 
      };

      // Map WB data to rich objects
      Object.entries(wbResult.data).forEach(([key, value]) => {
        result.data[key] = value !== null ? {
          value: value,
          year: wbResult.year.toString(),
          unit: key === WB_INDICATORS.POPULATION ? 'Total' : 'Percent'
        } : null;
      });
      
      if (imfData) {
        result.data = {
          ...result.data,
          [IMF_INDICATORS.GDP_GROWTH]: {
            value: getLatestIMFValue(imfData, IMF_INDICATORS.GDP_GROWTH, country, '2026'),
            year: '2026',
            unit: 'Percent'
          },
          [IMF_INDICATORS.INFLATION]: {
            value: getLatestIMFValue(imfData, IMF_INDICATORS.INFLATION, country, '2026'),
            year: '2026',
            unit: 'Percent'
          },
          [IMF_INDICATORS.POPULATION]: {
            value: getLatestIMFValue(imfData, IMF_INDICATORS.POPULATION, country, '2026'),
            year: '2026',
            unit: 'Millions'
          },
          [IMF_INDICATORS.CURRENT_ACCOUNT_TOTAL]: {
            value: getLatestIMFValue(imfData, IMF_INDICATORS.CURRENT_ACCOUNT_TOTAL, country, '2026'),
            year: '2026',
            unit: 'Billions'
          }
        };
      }
      
      return NextResponse.json({ 
        success: true, 
        ...result,
        country 
      });
    }

    // Fetch latest data for all African countries (limited to avoid timeout)
    const countries = africanCountries.slice(0, 10); // Limit to first 10 for demo
    const results = await Promise.all(
      countries.map(async (countryInfo) => {
        const result = await getLatestCountryData(countryInfo.code);
        return {
          country: countryInfo.code,
          name: countryInfo.name,
          ...result
        };
      })
    );

    return NextResponse.json({ 
      success: true, 
      data: results,
      indicators: INDICATORS 
    });

  } catch (error) {
    console.error('Macro data API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch macro data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { countries, indicators, startYear, endYear } = body;

    if (!countries || !Array.isArray(countries)) {
      return NextResponse.json(
        { success: false, error: 'Countries array is required' },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      countries.map(async (countryCode: string) => {
        const countryData: Record<string, any> = { country: countryCode };
        
        const indicatorList = indicators || Object.values(INDICATORS);
        
        // Split indicators into WB and IMF
        const imfIndicatorsToFetch = indicatorList.filter((id: string) => Object.values(IMF_INDICATORS).includes(id));
        const wbIndicatorsToFetch = indicatorList.filter((id: string) => !Object.values(IMF_INDICATORS).includes(id));

        // Fetch IMF Data if needed
        let imfDataResponse = null;
        if (imfIndicatorsToFetch.length > 0) {
          imfDataResponse = await fetchIMFData(imfIndicatorsToFetch, [countryCode]);
        }

        // Fetch WB Data
        for (const indicator of wbIndicatorsToFetch) {
          try {
            const data = await fetchWorldBankData(
              countryCode,
              indicator,
              startYear || 2019,
              endYear || 2024
            );
            
            const latestValue = data.find(item => item.value !== null);
            countryData[indicator] = latestValue ? {
              value: latestValue.value,
              year: latestValue.date,
              unit: latestValue.unit
            } : null;
          } catch (error) {
            console.error(`Error fetching WB ${indicator} for ${countryCode}:`, error);
            countryData[indicator] = null;
          }
        }

        // Process IMF Data
        for (const indicator of imfIndicatorsToFetch) {
          if (imfDataResponse) {
            const val = getLatestIMFValue(imfDataResponse, indicator, countryCode, endYear?.toString() || '2026');
            countryData[indicator] = val !== null ? {
              value: val,
              year: endYear?.toString() || '2026',
              unit: indicator === IMF_INDICATORS.POPULATION ? 'Millions' : 'Percent'
            } : null;
          } else {
            countryData[indicator] = null;
          }
        }
        
        return countryData;
      })
    );

    return NextResponse.json({ 
      success: true, 
      data: results 
    });

  } catch (error) {
    console.error('Bulk macro data API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch bulk macro data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}