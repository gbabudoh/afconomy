import { useState, useEffect, useCallback } from 'react';
import { signalNotifications, SignalNotification, NotificationTemplates } from '@/lib/notifications/signal';

// Hook for managing notifications and Signal integration
export function useNotifications() {
  const [notifications, setNotifications] = useState<SignalNotification[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Load initial notifications
    setNotifications(signalNotifications.getRecentNotifications());
    
    // Check if notifications are enabled
    setIsEnabled(process.env.NEXT_PUBLIC_ENABLE_SIGNAL_NOTIFICATIONS === 'true');
    
    // Set up periodic refresh
    const interval = setInterval(() => {
      setNotifications(signalNotifications.getRecentNotifications());
      // Clean up old notifications
      signalNotifications.clearOldNotifications(24);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const sendMarketAlert = useCallback((
    title: string, 
    message: string, 
    countryCode?: string, 
    priority: SignalNotification['priority'] = 'medium'
  ) => {
    const notification = signalNotifications.createMarketAlert(title, message, countryCode, priority);
    setNotifications(prev => [notification, ...prev]);
    return notification;
  }, []);

  const sendCurrencyAlert = useCallback((
    fromCurrency: string,
    toCurrency: string,
    rate: number,
    threshold: number,
    priority: SignalNotification['priority'] = 'medium'
  ) => {
    const notification = signalNotifications.createCurrencyAlert(
      fromCurrency, 
      toCurrency, 
      rate, 
      threshold, 
      priority
    );
    setNotifications(prev => [notification, ...prev]);
    return notification;
  }, []);

  const sendMacroAlert = useCallback((
    countryCode: string,
    indicator: string,
    oldValue: number,
    newValue: number,
    priority: SignalNotification['priority'] = 'medium'
  ) => {
    const notification = signalNotifications.createMacroAlert(
      countryCode,
      indicator,
      oldValue,
      newValue,
      priority
    );
    setNotifications(prev => [notification, ...prev]);
    return notification;
  }, []);

  const testConnection = useCallback(async () => {
    return await signalNotifications.testConnection();
  }, []);

  const updateConfig = useCallback((config: { webhookUrl?: string; enabled?: boolean }) => {
    signalNotifications.updateConfig(config);
    setIsEnabled(config.enabled ?? isEnabled);
  }, [isEnabled]);

  return {
    notifications,
    isEnabled,
    sendMarketAlert,
    sendCurrencyAlert,
    sendMacroAlert,
    testConnection,
    updateConfig,
    templates: NotificationTemplates
  };
}

// Hook for monitoring data changes and triggering alerts
export function useDataMonitoring() {
  const { sendMarketAlert, sendCurrencyAlert, sendMacroAlert } = useNotifications();

  // Monitor currency rate changes
  const monitorCurrencyRate = useCallback((
    fromCurrency: string,
    toCurrency: string,
    currentRate: number,
    previousRate?: number,
    thresholds?: { high: number; low: number }
  ) => {
    if (!previousRate) return;

    const changePercent = ((currentRate - previousRate) / previousRate) * 100;
    
    // Alert on significant changes (>2%)
    if (Math.abs(changePercent) > 2) {
      sendCurrencyAlert(
        fromCurrency,
        toCurrency,
        currentRate,
        previousRate,
        Math.abs(changePercent) > 5 ? 'high' : 'medium'
      );
    }

    // Alert on threshold breaches
    if (thresholds) {
      if (currentRate > thresholds.high && previousRate <= thresholds.high) {
        sendMarketAlert(
          `🚨 ${fromCurrency}/${toCurrency} High Alert`,
          `Rate exceeded ${thresholds.high} threshold: ${currentRate.toFixed(4)}`,
          undefined,
          'high'
        );
      } else if (currentRate < thresholds.low && previousRate >= thresholds.low) {
        sendMarketAlert(
          `🚨 ${fromCurrency}/${toCurrency} Low Alert`,
          `Rate fell below ${thresholds.low} threshold: ${currentRate.toFixed(4)}`,
          undefined,
          'high'
        );
      }
    }
  }, [sendMarketAlert, sendCurrencyAlert]);

  // Monitor macro indicator changes
  const monitorMacroIndicator = useCallback((
    countryCode: string,
    indicator: string,
    currentValue: number,
    previousValue?: number
  ) => {
    if (!previousValue) return;

    const change = Math.abs(currentValue - previousValue);
    
    // Define thresholds for different indicators
    const thresholds = {
      'GDP Growth': 1.0,
      'Inflation Rate': 2.0,
      'Unemployment': 1.5
    };

    const threshold = thresholds[indicator as keyof typeof thresholds] || 1.0;
    
    if (change > threshold) {
      let priority: SignalNotification['priority'] = 'medium';
      
      // Special cases for urgent alerts
      if (indicator === 'Inflation Rate' && currentValue > 15) priority = 'urgent';
      if (indicator === 'Unemployment' && currentValue > 25) priority = 'high';
      if (indicator === 'GDP Growth' && currentValue < -2) priority = 'high';
      
      sendMacroAlert(countryCode, indicator, previousValue, currentValue, priority);
    }
  }, [sendMacroAlert]);

  return {
    monitorCurrencyRate,
    monitorMacroIndicator
  };
}