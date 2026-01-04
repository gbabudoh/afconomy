"use client";

import { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, TrendingUp, DollarSign, Globe, Settings, TestTube } from 'lucide-react';
import { signalNotifications, SignalNotification, NotificationTemplates } from '@/lib/notifications/signal';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<SignalNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [signalEnabled, setSignalEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    // Load notifications
    setNotifications(signalNotifications.getRecentNotifications());
    
    // Check if Signal is enabled
    setSignalEnabled(process.env.NEXT_PUBLIC_ENABLE_SIGNAL_NOTIFICATIONS === 'true');
    
    // Auto-refresh notifications every 30 seconds
    const interval = setInterval(() => {
      setNotifications(signalNotifications.getRecentNotifications());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: SignalNotification['type']) => {
    switch (type) {
      case 'market_alert': return TrendingUp;
      case 'currency_alert': return DollarSign;
      case 'news_update': return Globe;
      case 'macro_change': return AlertTriangle;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: SignalNotification['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleTestSignal = async () => {
    setTestResult('Testing...');
    try {
      const success = await signalNotifications.testConnection();
      setTestResult(success ? 'Test successful! Check your Signal.' : 'Test failed. Check configuration.');
    } catch (error) {
      setTestResult('Test failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleSaveSettings = () => {
    signalNotifications.updateConfig({
      webhookUrl,
      enabled: signalEnabled
    });
    setShowSettings(false);
    setTestResult(null);
  };

  const createTestNotifications = () => {
    // Create some sample notifications for demo
    NotificationTemplates.highInflation('NGA', 18.5);
    NotificationTemplates.currencyVolatility('NGN', -3.2);
    NotificationTemplates.gdpMilestone('KEN', 5.8);
    
    // Refresh the display
    setTimeout(() => {
      setNotifications(signalNotifications.getRecentNotifications());
    }, 100);
  };

  const unreadCount = notifications.filter(n => 
    new Date().getTime() - n.timestamp.getTime() < 60 * 60 * 1000 // Last hour
  ).length;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-secondary/10 transition-colors"
      >
        <Bell className="h-5 w-5 text-secondary" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-[90vw] max-w-96 bg-card border border-border rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h3 className="font-bold text-sm sm:text-base text-foreground">Notifications</h3>
              {signalEnabled && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                  Signal Active
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1 hover:bg-secondary/10 rounded touch-target"
              >
                <Settings className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-secondary/10 rounded touch-target"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-3 sm:p-4 border-b border-border bg-secondary/5">
              <h4 className="font-medium text-sm sm:text-base text-foreground mb-3">Signal Configuration</h4>
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input
                      type="checkbox"
                      checked={signalEnabled}
                      onChange={(e) => setSignalEnabled(e.target.checked)}
                      className="rounded"
                    />
                    Enable Signal Notifications
                  </label>
                </div>
                <div>
                  <label className="block text-xs text-secondary mb-1">
                    Signal Webhook URL
                  </label>
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-signal-webhook-url"
                    className="w-full px-2 py-1 text-xs border border-border rounded"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleTestSignal}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 touch-target"
                  >
                    <TestTube className="h-3 w-3" />
                    Test
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 touch-target"
                  >
                    Save
                  </button>
                  <button
                    onClick={createTestNotifications}
                    className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 touch-target"
                  >
                    Demo
                  </button>
                </div>
                {testResult && (
                  <p className={`text-xs ${testResult.includes('successful') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {testResult}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-[50vh] sm:max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 sm:p-8 text-center text-secondary">
                <Bell className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notifications yet</p>
                <p className="text-xs mt-1">Economic alerts will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colorClass = getPriorityColor(notification.priority);
                  
                  return (
                    <div key={notification.id} className={`p-2 sm:p-3 hover:bg-secondary/5 ${colorClass}`}>
                      <div className="flex gap-2 sm:gap-3">
                        <div className="p-1 sm:p-1.5 rounded-lg bg-current/10 shrink-0">
                          <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-xs sm:text-sm font-medium truncate">
                              {notification.title}
                            </h4>
                            <span className="text-xs opacity-70 shrink-0 ml-2">
                              {notification.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-xs opacity-80 line-clamp-2">
                            {notification.message}
                          </p>
                          {notification.countryCode && (
                            <span className="inline-block mt-1 px-1.5 py-0.5 text-xs bg-current/20 rounded">
                              {notification.countryCode}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border bg-secondary/5">
            <p className="text-xs text-secondary text-center">
              {signalEnabled ? 
                '🔔 Signal notifications active' : 
                '🔕 Configure Signal to receive alerts'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}