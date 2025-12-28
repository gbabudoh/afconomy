# Afconomy - African Financial Data & Multimedia Platform

Afconomy is a premium financial intelligence platform designed to track and analyze economic performance across the African continent. It combines high-density macro indicators with real-time market data and a live broadcast experience.

## 🚀 Features

- **Macro Engine**: Real-time tracking of GDP, Inflation, and Trade metrics for 54 African nations.
- **Market Pulse**: Live stock exchange feeds (NGX, JSE, NSE) and currency exchange rates.
- **Live TV**: Integrated Mux Video player for real-time market analysis and news broadcasts.
- **Interactive Deep Dives**: Sector performance analysis and regional trade insights.
- **Real-time Engagement**: Live chat and dynamic polls for the investment community.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS 4.0, Recharts
- **Backend**: Node.js, Socket.io (Real-time relay)
- **Database**: PostgreSQL with Prisma ORM
- **Video**: Mux Video (HLS Streaming)
- **State Management**: RxJS & React Hooks

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

## 📂 Documentation

Detailed documentation can be found in the [brain](./brain) directory:

- [Implementation Plan](./brain/implementation.md)
- [Project Task List](./brain/task.md)
- [Final Walkthrough](./brain/walkthrough.md)

## 📄 License

MIT
