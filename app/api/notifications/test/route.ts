import { NextRequest, NextResponse } from 'next/server';
import { signalNotifications } from '@/lib/notifications/signal';

export async function POST(request: NextRequest) {
  try {
    const testResult = await signalNotifications.testConnection();
    
    if (testResult) {
      return NextResponse.json({
        success: true,
        message: 'Signal test notification sent successfully',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Signal test failed - check webhook URL and configuration',
        timestamp: new Date().toISOString()
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Signal test API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Signal test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}