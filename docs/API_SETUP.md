# API Setup Guide for Afconomy

Your application now uses real-time APIs instead of hardcoded data. Follow this guide to set up the required API keys.

## 🚀 Quick Start

1. **World Bank API** - Already working (no key required)
2. **Currency Exchange API** - Working with free tier
3. **News API** - Requires free registration

## 📊 API Integrations

### 1. World Bank API (✅ Ready)
- **Status**: Already configured
- **Cost**: Free
- **Data**: GDP, inflation, unemployment, population
- **URL**: https://api.worldbank.org/v2
- **No API key required**

### 2. Currency Exchange API (✅ Ready)
- **Status**: Using ExchangeRate-API free tier
- **Cost**: Free (1,500 requests/month)
- **Data**: Real-time currency rates for African currencies
- **URL**: https://api.exchangerate-api.com
- **No API key required for basic usage**

### 3. News API (⚠️ Setup Required)
- **Status**: Needs API key
- **Cost**: Free tier (1,000 requests/day)
- **Data**: African economic news
- **Setup**:
  1. Go to https://newsapi.org/
  2. Sign up for free account
  3. Get your API key
  4. Add to `.env`: `NEWS_API_KEY=your_key_here`

## 🔧 Environment Variables

Update your `.env` file:

```bash
# News API - Get your free key from https://newsapi.org/
NEWS_API_KEY=your_news_api_key_here

# World Bank API (already configured)
WORLD_BANK_API_URL="https://api.worldbank.org/v2"

# Currency API (no key needed for basic usage)
CURRENCY_API_KEY=""
```

## 📈 What's Fixed

### Before (Hardcoded Data Issues):
- ❌ Nigeria inflation: 31.7% (outdated)
- ❌ Egypt inflation: 35.8% (crisis-level, likely wrong)
- ❌ All currency rates from December 2024
- ❌ News from Dec 26-28, 2024 only
- ❌ No real-time updates

### After (Real API Data):
- ✅ Live World Bank macro indicators
- ✅ Real-time currency exchange rates
- ✅ Fresh economic news (with API key)
- ✅ Auto-refresh every 5-15 minutes
- ✅ Error handling and fallbacks

## 🎯 API Endpoints Created

### Macro Data
- `GET /api/macro-data?country=NGA` - Get data for specific country
- `GET /api/macro-data` - Get data for all countries
- `POST /api/macro-data` - Bulk fetch for multiple countries

### Currency Rates
- `GET /api/currency-rates` - Get all African currency rates
- `GET /api/currency-rates?target=NGN&amount=100&base=USD` - Convert currencies
- `POST /api/currency-rates` - Bulk currency conversions

### News
- `GET /api/news` - Get African economic news
- `GET /api/news?country=Nigeria` - Get country-specific news
- `POST /api/news` - Advanced filtering

## 🔄 Real-Time Features

### Auto-Refresh Intervals:
- **Currency rates**: Every 5 minutes
- **News**: Every 15 minutes
- **Macro data**: On-demand (World Bank updates monthly/quarterly)

### Manual Refresh:
- All components have refresh buttons
- Error states with retry options
- Loading indicators

## 🛠️ Components Updated

1. **CurrencyConverter** - Now uses live exchange rates
2. **NewsFeed** - Fetches real African economic news
3. **RealTimeMacroData** - New component with World Bank data

## 📱 Usage Examples

### In your components:
```typescript
import { useMacroData, useCurrencyRates, useNews } from '@/lib/hooks/useRealTimeData';

// Get macro data for Nigeria
const { data, loading, error } = useMacroData('NGA');

// Get live currency rates
const { rates, loading } = useCurrencyRates('USD');

// Get African economic news
const { articles, loading } = useNews();
```

## 🚨 Rate Limits & Costs

### Free Tiers:
- **World Bank**: Unlimited (no key required)
- **ExchangeRate-API**: 1,500 requests/month
- **NewsAPI**: 1,000 requests/day

### Upgrade Options:
- **NewsAPI Pro**: $449/month for 1M requests
- **ExchangeRate-API Pro**: $9.99/month for 100K requests

## 🔍 Testing

Test your APIs:
```bash
# Test macro data
curl "http://localhost:3000/api/macro-data?country=NGA"

# Test currency rates
curl "http://localhost:3000/api/currency-rates"

# Test news (requires API key)
curl "http://localhost:3000/api/news"
```

## 🎉 Next Steps

1. **Get NewsAPI key** for real-time news
2. **Monitor API usage** in your dashboards
3. **Add more indicators** from World Bank
4. **Implement caching** for better performance
5. **Add WebSocket** for real-time market data

Your African economic data is now live and accurate! 🌍📊