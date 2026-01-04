// Signal notification integration for Afconomy
import { NewsArticle } from '@/lib/api/news';

export interface SignalNotification {
  id: string;
  type: 'market_alert' | 'news_update' | 'macro_change' | 'currency_alert';
  title: string;
  message: string;
  data?: any;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  countryCode?: string;
}

export interface SignalConfig {
  webhookUrl?: string;
  botToken?: string;
  chatId?: string;
  enabled: boolean;
}

class SignalNotificationService {
  private config: SignalConfig;
  private notifications: SignalNotification[] = [];

  constructor(config: SignalConfig) {
    this.config = config;
  }

  // Send notification via Signal webhook (if configured)
  async sendSignalMessage(notification: SignalNotification): Promise<boolean> {
    if (!this.config.enabled || !this.config.webhookUrl) {
      console.log('Signal notifications disabled or not configured');
      return false;
    }

    try {
      const payload = {
        message: `🌍 *${notification.title}*\n\n${notification.message}`,
        timestamp: notification.timestamp.toISOString(),
        priority: notification.priority,
        type: notification.type,
        ...(notification.countryCode && { country: notification.countryCode })
      };

      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Afconomy/1.0'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Signal webhook failed: ${response.status}`);
      }

      console.log(`Signal notification sent: ${notification.title}`);
      return true;
    } catch (error) {
      console.error('Failed to send Signal notification:', error);
      return false;
    }
  }

  // Create market alert notification
  createMarketAlert(
    title: string, 
    message: string, 
    countryCode?: string, 
    priority: SignalNotification['priority'] = 'medium'
  ): SignalNotification {
    const notification: SignalNotification = {
      id: `market_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'market_alert',
      title,
      message,
      timestamp: new Date(),
      priority,
      countryCode
    };

    this.notifications.push(notification);
    this.sendSignalMessage(notification);
    return notification;
  }

  // Create news update notification
  createNewsAlert(article: NewsArticle, priority: SignalNotification['priority'] = 'low'): SignalNotification {
    const notification: SignalNotification = {
      id: `news_${article.id}`,
      type: 'news_update',
      title: `📰 ${article.category} News`,
      message: `${article.title}\n\n${article.description}\n\nSource: ${article.source.name}`,
      data: article,
      timestamp: new Date(article.publishedAt),
      priority,
      countryCode: article.countryCode
    };

    this.notifications.push(notification);
    this.sendSignalMessage(notification);
    return notification;
  }

  // Create macro data change notification
  createMacroAlert(
    countryCode: string,
    indicator: string,
    oldValue: number,
    newValue: number,
    priority: SignalNotification['priority'] = 'medium'
  ): SignalNotification {
    const change = ((newValue - oldValue) / oldValue * 100).toFixed(2);
    const direction = newValue > oldValue ? '📈' : '📉';
    
    const notification: SignalNotification = {
      id: `macro_${countryCode}_${indicator}_${Date.now()}`,
      type: 'macro_change',
      title: `${direction} ${countryCode} ${indicator} Update`,
      message: `${indicator} changed from ${oldValue}% to ${newValue}% (${change > '0' ? '+' : ''}${change}%)`,
      data: { countryCode, indicator, oldValue, newValue, change },
      timestamp: new Date(),
      priority,
      countryCode
    };

    this.notifications.push(notification);
    this.sendSignalMessage(notification);
    return notification;
  }

  // Create currency alert notification
  createCurrencyAlert(
    fromCurrency: string,
    toCurrency: string,
    rate: number,
    threshold: number,
    priority: SignalNotification['priority'] = 'medium'
  ): SignalNotification {
    const direction = rate > threshold ? 'above' : 'below';
    const emoji = rate > threshold ? '🚀' : '📉';
    
    const notification: SignalNotification = {
      id: `currency_${fromCurrency}_${toCurrency}_${Date.now()}`,
      type: 'currency_alert',
      title: `${emoji} ${fromCurrency}/${toCurrency} Alert`,
      message: `${fromCurrency} to ${toCurrency} is now ${rate.toFixed(4)} (${direction} threshold of ${threshold})`,
      data: { fromCurrency, toCurrency, rate, threshold },
      timestamp: new Date(),
      priority
    };

    this.notifications.push(notification);
    this.sendSignalMessage(notification);
    return notification;
  }

  // Get recent notifications
  getRecentNotifications(limit: number = 10): SignalNotification[] {
    return this.notifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Clear old notifications
  clearOldNotifications(olderThanHours: number = 24): void {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    this.notifications = this.notifications.filter(n => n.timestamp > cutoff);
  }

  // Update configuration
  updateConfig(newConfig: Partial<SignalConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Test Signal connection
  async testConnection(): Promise<boolean> {
    if (!this.config.webhookUrl) {
      return false;
    }

    const testNotification: SignalNotification = {
      id: 'test_connection',
      type: 'market_alert',
      title: '🧪 Afconomy Signal Test',
      message: 'Signal notifications are working correctly! You will receive alerts for African economic updates.',
      timestamp: new Date(),
      priority: 'low'
    };

    return await this.sendSignalMessage(testNotification);
  }
}

// Create singleton instance
const signalConfig: SignalConfig = {
  webhookUrl: process.env.SIGNAL_WEBHOOK_URL,
  botToken: process.env.SIGNAL_BOT_TOKEN,
  chatId: process.env.SIGNAL_CHAT_ID,
  enabled: process.env.ENABLE_SIGNAL_NOTIFICATIONS === 'true'
};

export const signalNotifications = new SignalNotificationService(signalConfig);

// Notification templates for common scenarios
export const NotificationTemplates = {
  // High inflation alert
  highInflation: (countryCode: string, rate: number) => 
    signalNotifications.createMacroAlert(
      countryCode, 
      'Inflation Rate', 
      5.0, 
      rate, 
      rate > 15 ? 'urgent' : 'high'
    ),

  // Currency volatility
  currencyVolatility: (currency: string, changePercent: number) =>
    signalNotifications.createMarketAlert(
      `💱 ${currency} Volatility Alert`,
      `${currency} has moved ${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}% in the last hour`,
      undefined,
      Math.abs(changePercent) > 5 ? 'high' : 'medium'
    ),

  // Breaking economic news
  breakingNews: (article: NewsArticle) =>
    signalNotifications.createNewsAlert(article, 'high'),

  // GDP growth milestone
  gdpMilestone: (countryCode: string, rate: number) =>
    signalNotifications.createMacroAlert(
      countryCode,
      'GDP Growth',
      2.0,
      rate,
      'medium'
    )
};

export default signalNotifications;