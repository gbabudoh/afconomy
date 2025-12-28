# Walkthrough: Afconomy Platform Implementation

Afconomy is a real-time financial data platform that combines live market insights with a multimedia broadcast experience.

## Key Features

### 1. Live Dashboard & Macro Engine

The core of the platform is a high-density dashboard that tracks African economic metrics.

- **Macro Metrics**: Real-time tracking of GDP Growth, Inflation, Population, and Trade Balance.
- **Interactive Charts**: Historical data visualization using [DataChart.tsx](file:///e:/APPLICATIONS/applications/applications/afconomy/components/DataChart.tsx).
- **Market Pulse**: Live stock exchange data and currency pairs.

### 2. Mux Video Integration

The [TVPlayer.tsx](file:///e:/APPLICATIONS/applications/applications/afconomy/components/TVPlayer.tsx) component provides a "Live Now" broadcast experience.

- Uses `@mux/mux-video` for high-performance HLS streaming.
- Configurable via environment variables for easy deployment.

### 3. Real-Time Interactions

A unified sidebar for audience engagement:

- **Live Chat**: Real-time messaging powered by Socket.io.
- **Dynamic Polls**: Interactive voting system with live result updates.
- **Prisma Persistence**: All messages and poll results are stored in a PostgreSQL database.

## Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Video**: Mux Video
- **Real-time**: Socket.io & RxJS
- **Styling**: Tailwind CSS 4.0

## Repository Status

The core implementation is ready for deployment. Sensitive credentials have been moved to `.env.local` and are excluded from version control to maintain security.

---

> [!NOTE]
> To run the platform locally, ensure you have a PostgreSQL instance running and the necessary Mux credentials in your `.env.local` file.
