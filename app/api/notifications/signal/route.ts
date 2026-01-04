import { NextRequest, NextResponse } from 'next/server';
import { signalNotifications } from '@/lib/notifications/signal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, message, countryCode, priority = 'medium' } = body;

    if (!type || !title || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: type, title, message' },
        { status: 400 }
      );
    }

    let notification;

    switch (type) {
      case 'market_alert':
        notification = signalNotifications.createMarketAlert(title, message, countryCode, priority);
        break;
      
      case 'currency_alert':
        const { fromCurrency, toCurrency, rate, threshold } = body;
        if (!fromCurrency || !toCurrency || !rate || !threshold) {
          return NextResponse.json(
            { success: false, error: 'Currency alert requires: fromCurrency, toCurrency, rate, threshold' },
            { status: 400 }
          );
        }
        notification = signalNotifications.createCurrencyAlert(fromCurrency, toCurrency, rate, threshold, priority);
        break;
      
      case 'macro_change':
        const { indicator, oldValue, newValue } = body;
        if (!countryCode || !indicator || oldValue === undefined || newValue === undefined) {
          return NextResponse.json(
            { success: false, error: 'Macro alert requires: countryCode, indicator, oldValue, newValue' },
            { status: 400 }
          );
        }
        notification = signalNotifications.createMacroAlert(countryCode, indicator, oldValue, newValue, priority);
        break;
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid notification type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      notification: {
        id: notification.id,
        type: notification.type,
        title: notification.title,
        timestamp: notification.timestamp
      }
    });

  } catch (error) {
    console.error('Signal notification API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send notification',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const notifications = signalNotifications.getRecentNotifications(limit);
    
    return NextResponse.json({
      success: true,
      notifications,
      count: notifications.length
    });

  } catch (error) {
    console.error('Get notifications API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get notifications',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Clear old notifications
    signalNotifications.clearOldNotifications(24);
    
    return NextResponse.json({
      success: true,
      message: 'Old notifications cleared'
    });

  } catch (error) {
    console.error('Clear notifications API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to clear notifications',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}