# 📱 Signal Notifications Setup Guide

Get real-time African economic alerts delivered directly to your Signal messenger. Perfect for staying updated on market movements, currency changes, and breaking economic news.

## 🚀 Quick Overview

Signal notifications in Afconomy provide:
- **Real-time market alerts** (currency volatility, GDP changes)
- **Breaking economic news** from African markets
- **Macro indicator updates** (inflation, unemployment)
- **Custom threshold alerts** for currencies and indicators

## 📋 Setup Options

### Option 1: Signal Webhook (Recommended)
Use a Signal webhook service for easy integration.

### Option 2: Signal CLI Bot
Set up your own Signal bot using signal-cli.

### Option 3: Third-party Signal API
Use services like signal-api or similar.

---

## 🔧 Option 1: Signal Webhook Setup

### Step 1: Create Signal Webhook
1. **Use a Signal webhook service** like:
   - [signal-webhook.com](https://signal-webhook.com) (example)
   - [signalbot.io](https://signalbot.io) (example)
   - Or set up your own using signal-cli

2. **Get your webhook URL**:
   ```
   https://your-signal-webhook-service.com/webhook/your-token
   ```

### Step 2: Configure Afconomy
1. **Update your `.env` file**:
   ```bash
   SIGNAL_WEBHOOK_URL="https://your-webhook-url"
   ENABLE_SIGNAL_NOTIFICATIONS="true"
   NEXT_PUBLIC_ENABLE_SIGNAL_NOTIFICATIONS="true"
   ```

2. **Restart your application**:
   ```bash
   npm run dev
   ```

### Step 3: Test Connection
1. Click the **notification bell** in the navbar
2. Click the **settings gear** icon
3. Click **Test** button
4. Check your Signal for the test message

---

## 🤖 Option 2: Signal CLI Bot Setup

### Prerequisites
- Linux/macOS system (or WSL on Windows)
- Java 8+ installed
- Signal account

### Step 1: Install signal-cli
```bash
# Download signal-cli
wget https://github.com/AsamK/signal-cli/releases/download/v0.12.2/signal-cli-0.12.2.tar.gz
tar xf signal-cli-0.12.2.tar.gz
cd signal-cli-0.12.2

# Add to PATH
export PATH=$PATH:$(pwd)/bin
```

### Step 2: Register Signal Bot
```bash
# Register new number (or link existing)
signal-cli -u +1234567890 register

# Verify with SMS code
signal-cli -u +1234567890 verify CODE_FROM_SMS
```

### Step 3: Create Webhook Server
Create a simple webhook server that forwards to Signal:

```javascript
// signal-webhook.js
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const { message } = req.body;
  const phoneNumber = '+1234567890'; // Your Signal number
  const recipient = '+0987654321'; // Recipient number
  
  exec(`signal-cli -u ${phoneNumber} send -m "${message}" ${recipient}`, 
    (error, stdout, stderr) => {
      if (error) {
        console.error('Signal send error:', error);
        return res.status(500).json({ error: 'Failed to send' });
      }
      res.json({ success: true });
    }
  );
});

app.listen(3001, () => {
  console.log('Signal webhook server running on port 3001');
});
```

### Step 4: Configure Afconomy
```bash
# In your .env file
SIGNAL_WEBHOOK_URL="http://localhost:3001/webhook"
ENABLE_SIGNAL_NOTIFICATIONS="true"
NEXT_PUBLIC_ENABLE_SIGNAL_NOTIFICATIONS="true"
```

---

## 🔔 Notification Types

### 1. Market Alerts
- **Currency volatility** (>2% change)
- **Threshold breaches** (custom limits)
- **Market opening/closing** alerts

**Example**:
```
🚨 NGN/USD Volatility Alert
Nigerian Naira has moved -3.2% in the last hour
Current rate: 1,487.50
```

### 2. Macro Indicators
- **GDP growth** changes
- **Inflation rate** updates
- **Unemployment** figures

**Example**:
```
📈 NGA GDP Growth Update
GDP Growth changed from 3.1% to 4.1% (+1.0%)
Source: World Bank API
```

### 3. Breaking News
- **Economic policy** announcements
- **Central bank** decisions
- **Trade agreements**

**Example**:
```
📰 Policy News
African Central Banks Coordinate Monetary Policy Response to Global Inflation
Source: African Business
```

### 4. Currency Alerts
- **Rate thresholds** (high/low)
- **Significant movements**
- **Cross-currency** alerts

**Example**:
```
💱 USD/ZAR Alert
USD to ZAR is now 16.85 (above threshold of 16.50)
```

---

## ⚙️ Configuration Options

### Environment Variables
```bash
# Signal Configuration
SIGNAL_WEBHOOK_URL="your_webhook_url"
SIGNAL_BOT_TOKEN="optional_bot_token"
SIGNAL_CHAT_ID="optional_chat_id"
ENABLE_SIGNAL_NOTIFICATIONS="true"
NEXT_PUBLIC_ENABLE_SIGNAL_NOTIFICATIONS="true"
```

### Notification Settings
Access via the notification center in your app:

1. **Enable/Disable** Signal notifications
2. **Set webhook URL**
3. **Test connection**
4. **View recent notifications**

---

## 📊 API Endpoints

### Send Custom Notification
```bash
POST /api/notifications/signal
Content-Type: application/json

{
  "type": "market_alert",
  "title": "Custom Alert",
  "message": "Your custom message",
  "countryCode": "NGA",
  "priority": "high"
}
```

### Test Signal Connection
```bash
POST /api/notifications/test
```

### Get Recent Notifications
```bash
GET /api/notifications/signal?limit=10
```

---

## 🎯 Use Cases

### For Traders
- **Currency pair alerts** when rates hit targets
- **Volatility notifications** for risk management
- **Economic calendar** reminders

### For Analysts
- **Macro data updates** for research
- **Policy announcements** for analysis
- **Regional economic** developments

### For Investors
- **Market sentiment** changes
- **Investment opportunities** alerts
- **Risk factor** notifications

---

## 🔍 Troubleshooting

### Common Issues

**"Test failed" message:**
- Check webhook URL is correct
- Verify Signal service is running
- Test webhook manually with curl

**No notifications received:**
- Check `ENABLE_SIGNAL_NOTIFICATIONS="true"`
- Verify webhook endpoint is accessible
- Check Signal app permissions

**Webhook errors:**
- Check server logs for errors
- Verify JSON payload format
- Test with simple message first

### Debug Commands
```bash
# Test webhook manually
curl -X POST http://your-webhook-url \
  -H "Content-Type: application/json" \
  -d '{"message": "Test from curl"}'

# Check Afconomy logs
npm run dev # Check console for errors
```

---

## 🚀 Advanced Features

### Custom Alert Rules
Create custom monitoring rules in your app:

```typescript
// Monitor specific currency pairs
monitorCurrencyRate('USD', 'NGN', currentRate, previousRate, {
  high: 1500,
  low: 1400
});

// Monitor macro indicators
monitorMacroIndicator('NGA', 'Inflation Rate', 18.5, 16.2);
```

### Batch Notifications
Send multiple alerts efficiently:

```typescript
// Send multiple currency alerts
const alerts = [
  { from: 'USD', to: 'NGN', rate: 1487 },
  { from: 'USD', to: 'ZAR', rate: 16.85 },
  { from: 'USD', to: 'KES', rate: 129.50 }
];

alerts.forEach(alert => sendCurrencyAlert(alert));
```

---

## 💡 Pro Tips

1. **Start with low priority** notifications to avoid spam
2. **Use country filters** to focus on relevant markets
3. **Set reasonable thresholds** to avoid false alerts
4. **Test thoroughly** before enabling all notifications
5. **Monitor webhook reliability** and have fallbacks

---

## 📈 Benefits

### Real-time Intelligence
- **Instant alerts** on market changes
- **Never miss** important economic updates
- **Stay ahead** of market movements

### Professional Workflow
- **Mobile notifications** while away from desk
- **Customizable alerts** for your focus areas
- **Historical tracking** of all notifications

### Risk Management
- **Threshold monitoring** for risk limits
- **Volatility alerts** for position management
- **Policy updates** affecting investments

---

**Setup Time**: 10-30 minutes (depending on method)  
**Cost**: Free (with your own Signal account)  
**Value**: Real-time African economic intelligence 📱📊

---

*Need help? Check the troubleshooting section or create an issue in the repository.*