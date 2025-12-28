# Implementation Plan: Afconomy - Financial Data & Multimedia Platform

Afconomy is a comprehensive financial data platform focused on the African continent, balancing high-density economic metrics with a seamless live TV streaming experience.

## Proposed Changes

### Live Interactions

Design and implement a unified real-time interaction hub in the dashboard sidebar.

#### [NEW] [LiveInteractions.tsx](file:///e:/APPLICATIONS/applications/applications/afconomy/components/LiveInteractions.tsx)

- Unified component for Chat and Polls.
- State-driven switching between modes.
- RxJS integration for simulated real-time data streams.

#### [MODIFY] [Dashboard.tsx](file:///e:/APPLICATIONS/applications/applications/afconomy/components/Dashboard.tsx)

- Replace placeholder with `LiveInteractions` component.
- Adjust sidebar height and scrolling for better engagement.

### 1. Data Architecture (PostgreSQL/Prisma)

We will use Prisma to manage our PostgreSQL database, incorporating structures suitable for time-series data.

#### [NEW] [schema.prisma](file:///e:/APPLICATIONS/applications/applications/afconomy/prisma/schema.prisma)

- Define `Country` model for base profile data.
- Define `Metric` model for time-series data (Inflation, GDP, etc.).
- Define `MarketData` model for real-time/daily feeds (Stocks, Forex).
- Define `News` and `Report` models for qualitative insights.

### 2. UI/UX Layout (Next.js/Tailwind)

A split-view dashboard that prioritizes the "sticky" video player while allowing deep dives into economic data.

#### [MODIFY] [globals.css](file:///e:/APPLICATIONS/applications/applications/afconomy/app/globals.css)

- Update CSS variables with Afconomy's brand colors:
  - Primary (Red): `#E30613` (Estimated from logo)
  - Dark (Charcoal): `#333333`
  - Accent: Gold or Silver (for financial feel)

#### [MODIFY] [layout.tsx](file:///e:/APPLICATIONS/applications/applications/afconomy/app/layout.tsx)

- Implement the baseline layout with a global Navbar and a responsive container.

#### [NEW] [DashboardLayout.tsx](file:///e:/APPLICATIONS/applications/applications/afconomy/components/DashboardLayout.tsx)

- Create a 65/35 split view for desktop.
- Stacked view for mobile.

### 3. Components

#### [NEW] [TVPlayer.tsx](file:///e:/APPLICATIONS/applications/applications/afconomy/components/TVPlayer.tsx)

- Use `@mux/mux-video` for HLS streaming.
- Add Picture-in-Picture functionality.

#### [NEW] [MetricChart.tsx](file:///e:/APPLICATIONS/applications/applications/afconomy/components/charts/MetricChart.tsx)

- Reusable chart component for time-series data using a chart library (Recharts or similar).

### 4. API & Data Fetching

- Implement Server Actions or API routes for fetching data from World Bank or other sources.
- Use ISR for performance on heavy economic reports.

## Verification Plan

### Automated Tests

- `prisma generate` to ensure schema validity.
- `npm run build` to verify Next.js build and ISR configurations.

### Manual Verification

- Test responsiveness on Chrome DevTools (Mobile views).
- Verify video streaming playback and sticky behavior.
- Check tab switching between data modules.
