import { NextRequest, NextResponse } from 'next/server';
import { getAfricanCurrencyRates, convertCurrency, fetchExchangeRates } from '@/lib/api/currency';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get('base') || 'USD';
  const target = searchParams.get('target');
  const amount = searchParams.get('amount');

  try {
    if (target && amount) {
      // Convert specific amount between currencies
      const result = await convertCurrency(
        parseFloat(amount),
        base,
        target
      );

      if (result === null) {
        return NextResponse.json(
          { success: false, error: 'Currency conversion failed' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        conversion: {
          from: base,
          to: target,
          amount: parseFloat(amount),
          result,
          timestamp: new Date().toISOString()
        }
      });
    }

    if (target) {
      // Get exchange rate for specific currency pair
      const rates = await fetchExchangeRates(base);
      
      if (!rates || !rates.conversion_rates[target]) {
        return NextResponse.json(
          { success: false, error: 'Currency pair not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        rate: {
          from: base,
          to: target,
          rate: rates.conversion_rates[target],
          lastUpdated: rates.time_last_update_utc
        }
      });
    }

    // Get all African currency rates
    const africanRates = await getAfricanCurrencyRates();
    
    if (africanRates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch currency rates' },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      baseCurrency: 'USD',
      rates: africanRates,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Currency rates API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch currency rates',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversions } = body;

    if (!conversions || !Array.isArray(conversions)) {
      return NextResponse.json(
        { success: false, error: 'Conversions array is required' },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      conversions.map(async (conversion: { from: string; to: string; amount: number }) => {
        try {
          const result = await convertCurrency(
            conversion.amount,
            conversion.from,
            conversion.to
          );

          return {
            ...conversion,
            result,
            success: result !== null
          };
        } catch (error) {
          return {
            ...conversion,
            result: null,
            success: false,
            error: error instanceof Error ? error.message : 'Conversion failed'
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      conversions: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Bulk currency conversion API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process bulk conversions',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}