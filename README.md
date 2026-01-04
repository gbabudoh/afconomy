# Afconomy - African Financial Data & Multimedia Platform

Afconomy is a premium financial intelligence platform designed to track and analyze economic performance across the African continent. It combines high-density macro indicators with real-time market data and a live broadcast experience.

## 🚀 Features

- **Macro Engine**: Real-time tracking of GDP, Inflation, and Trade metrics for 54 African nations via World Bank API.
- **Market Pulse**: Live currency exchange rates and real-time African economic data.
- **Live TV**: Integrated Mux Video player for real-time market analysis and news broadcasts.
- **Interactive Deep Dives**: Sector performance analysis and regional trade insights.
- **Real-time Engagement**: Live chat and dynamic polls for the investment community.
- **News Feed**: Live African economic news from Reuters, Bloomberg, and other major sources.
- **Signal Notifications**: Real-time alerts for market changes, currency volatility, and breaking news.
- **Mobile-First Design**: Fully responsive interface optimized for all device sizes from smartphones to desktops.

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS 4.0, Recharts
- **Backend**: Node.js, Socket.io (Real-time relay)
- **Database**: PostgreSQL with Prisma ORM
- **Video**: Mux Video (HLS Streaming)
- **APIs**: World Bank API, ExchangeRate API, NewsAPI
- **State Management**: React Hooks & Custom API Hooks

## 📦 Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file with:

   ```env
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_MUX_PLAYBACK_ID="your_playback_id"
   MUX_TOKEN_ID="..."
   MUX_TOKEN_SECRET="..."
   NEWS_API_KEY="your_newsapi_key"  # Get free key from newsapi.org
   ```

3. **Database Migration**:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the App**:
   ```bash
   npm run dev       # Client & API
   npm run socket-dev # Real-time server
   ```

## 📊 API Integration Status

| Data Source | Status | Coverage | Cost |
|-------------|--------|----------|------|
| World Bank API | ✅ Live | 54 African countries | Free |
| Currency Exchange | ✅ Live | 35+ African currencies | Free |
| News Feed | ⚠️ Setup Required | African economic news | Free |
| Signal Notifications | 🔔 Optional | Real-time alerts | Free |

## 📂 Documentation

### Quick Start
- [API Setup Guide](./docs/API_SETUP.md) - Configure API keys and data sources
- [Mobile Responsive Guide](./docs/MOBILE_RESPONSIVE_DESIGN.md) - Mobile-first design implementation
- [Signal Notifications](./docs/SIGNAL_NOTIFICATIONS_SETUP.md) - Real-time alerts via Signal
- [API Integration Complete](./docs/API_INTEGRATION_COMPLETE.md) - Comprehensive implementation guide

### Technical Documentation
- [Documentation Index](./docs/README.md) - Complete documentation overview
- [Implementation Plan](./brain/implementation.md) - Original project plan
- [Project Task List](./brain/task.md) - Development tasks
- [Final Walkthrough](./brain/walkthrough.md) - Project overview

## 🌍 Data Sources

- **World Bank Open Data**: Real-time macro indicators for African economies
- **ExchangeRate API**: Live currency conversion for African currencies  
- **NewsAPI**: African economic news from major financial outlets
- **Mux Video**: Live streaming for market analysis and broadcasts

## 🔄 Real-Time Features

- **Auto-refresh**: Currency rates every 5 minutes, news every 15 minutes
- **Live Updates**: Real-time macro data from authoritative sources
- **Error Handling**: Graceful fallbacks and retry mechanisms
- **Loading States**: Professional UX during data fetching
- **Mobile Optimized**: Touch-friendly interface with responsive design

## 📈 Recent Updates

**January 4, 2026**: ✅ **API Integration Complete**
- Replaced all hardcoded data with live APIs
- Implemented World Bank macro data integration
- Added real-time currency exchange rates
- Created comprehensive error handling and auto-refresh

## 📄 License

MIT
