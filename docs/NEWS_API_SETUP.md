# 📰 News API Setup Guide

Get live African economic news in your Afconomy application by setting up the free NewsAPI integration.

## 🚀 Quick Setup (2 minutes)

### Step 1: Get Your Free API Key
1. Visit [newsapi.org](https://newsapi.org/)
2. Click "Get API Key" 
3. Sign up with your email (free account)
4. Copy your API key from the dashboard

### Step 2: Add to Environment
1. Open your `.env` file
2. Find the line: `NEWS_API_KEY=""`
3. Replace with: `NEWS_API_KEY="your_actual_api_key_here"`
4. Save the file

### Step 3: Restart Your App
```bash
# Stop your dev server (Ctrl+C)
# Then restart:
npm run dev
```

## ✅ Verification

After setup, you should see:
- **Live Feed** indicator (instead of "Mock Data")
- Real African economic news from Reuters, Bloomberg, BBC
- Fresh articles updated every 15 minutes

## 📊 What You Get

### Free Tier Includes:
- **1,000 requests per day** (more than enough)
- **Live news from major sources**:
  - Reuters Africa
  - Bloomberg Africa  
  - BBC Africa
  - Financial Times
  - African Business
  - Africanews.com

### News Categories:
- **Macro**: GDP, inflation, economic policy
- **Financial**: Banking, markets, investment
- **Trade**: Import/export, AfCFTA, commerce
- **Policy**: Government decisions, regulations

## 🔧 Current Status Without API Key

Your app currently shows **enhanced mock data** including:
- Sample African economic headlines
- Realistic publication dates
- Proper categorization
- Country-specific filtering

This provides a professional experience while you set up the live feed.

## 🚨 Troubleshooting

### Common Issues:

**"Mock Data" still showing after setup:**
- Check your API key is correct (no extra spaces)
- Restart your development server
- Verify the key works at [newsapi.org/account](https://newsapi.org/account)

**401 Unauthorized Error:**
- Your API key is invalid or expired
- Check you're using the correct key from your NewsAPI dashboard

**Rate Limit Exceeded:**
- Free tier allows 1,000 requests/day
- Consider upgrading if you need more

## 💡 Pro Tips

1. **Test your key**: Visit `http://localhost:3000/api/news` after setup
2. **Monitor usage**: Check your NewsAPI dashboard for request counts
3. **Upgrade if needed**: $449/month for 1M requests (enterprise use)

## 🌍 Impact

With NewsAPI configured, your users get:
- **Real-time African economic intelligence**
- **Authoritative news sources**
- **Fresh content every 15 minutes**
- **Country-specific filtering**

---

**Setup time**: ~2 minutes  
**Cost**: Free (1,000 requests/day)  
**Value**: Live African economic news feed 📈