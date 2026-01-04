import { NextRequest, NextResponse } from 'next/server';
import { fetchWorldBankData, getLatestCountryData, INDICATORS } from '@/lib/api/worldbank';
import { africanCountries } from '@/lib/countries';

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
      const result = await getLatestCountryData(country);
      
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
        
        for (const indicator of indicatorList) {
          try {
            const data = await fetchWorldBankData(
              countryCode,
              indicator,
              startYear || 2019,
              endYear || 2024
            );
            
            // Get the most recent non-null value
            const latestValue = data.find(item => item.value !== null);
            countryData[indicator] = latestValue ? {
              value: latestValue.value,
              year: latestValue.date,
              unit: latestValue.unit
            } : null;
            
          } catch (error) {
            console.error(`Error fetching ${indicator} for ${countryCode}:`, error);
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