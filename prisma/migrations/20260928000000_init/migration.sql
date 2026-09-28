-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('READER', 'JOURNALIST', 'EDITOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'PREMIUM', 'ELITE');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'TRIALING', 'PAST_DUE', 'CANCELED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "RegionBloc" AS ENUM ('ECOWAS', 'SADC', 'EAC', 'MAGHREB', 'ECCAS', 'PAN_AFRICAN');

-- CreateEnum
CREATE TYPE "AssetClass" AS ENUM ('STOCK', 'INDEX', 'FX', 'BOND', 'COMMODITY');

-- CreateEnum
CREATE TYPE "AlertDelivery" AS ENUM ('TERMINAL_ONLY', 'SMS', 'ALL');

-- CreateEnum
CREATE TYPE "ArticleCategory" AS ENUM ('POLICY', 'SOCIO_ECONOMIC', 'MARKETS', 'POLITICS', 'TRADE');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BroadcastStatus" AS ENUM ('SCHEDULED', 'LIVE', 'ENDED');

-- CreateEnum
CREATE TYPE "IndicatorFrequency" AS ENUM ('DAILY', 'MONTHLY', 'QUARTERLY', 'ANNUAL');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'READER',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "tier" "SubscriptionTier" NOT NULL DEFAULT 'FREE',
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "current_period_end" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trader_preferences" (
    "user_id" UUID NOT NULL,
    "regions" "RegionBloc"[],
    "asset_classes" "AssetClass"[],
    "delivery" "AlertDelivery" NOT NULL DEFAULT 'TERMINAL_ONLY',
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "trader_preferences_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "watchlist_items" (
    "user_id" UUID NOT NULL,
    "symbol" VARCHAR(20) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watchlist_items_pkey" PRIMARY KEY ("user_id","symbol")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "role" VARCHAR(100) NOT NULL DEFAULT 'Financial Analyst',
    "bio" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" UUID NOT NULL,
    "author_id" UUID,
    "title" VARCHAR(500) NOT NULL,
    "slug" VARCHAR(500) NOT NULL,
    "excerpt" VARCHAR(1000),
    "content" TEXT NOT NULL,
    "category" "ArticleCategory" NOT NULL,
    "region" "RegionBloc" NOT NULL,
    "country" CHAR(2),
    "tags" TEXT[],
    "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT',
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_assets" (
    "article_id" UUID NOT NULL,
    "symbol" VARCHAR(20) NOT NULL,

    CONSTRAINT "article_assets_pkey" PRIMARY KEY ("article_id","symbol")
);

-- CreateTable
CREATE TABLE "financial_assets" (
    "symbol" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "asset_class" "AssetClass" NOT NULL,
    "exchange" VARCHAR(100),
    "currency" VARCHAR(10) NOT NULL,
    "country" CHAR(2),
    "region" "RegionBloc" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_assets_pkey" PRIMARY KEY ("symbol")
);

-- CreateTable
CREATE TABLE "asset_prices" (
    "time" TIMESTAMPTZ NOT NULL,
    "symbol" VARCHAR(20) NOT NULL,
    "open" DECIMAL(18,4) NOT NULL,
    "high" DECIMAL(18,4) NOT NULL,
    "low" DECIMAL(18,4) NOT NULL,
    "close" DECIMAL(18,4) NOT NULL,
    "volume" DECIMAL(18,2),

    CONSTRAINT "asset_prices_pkey" PRIMARY KEY ("time","symbol")
);

-- CreateTable
CREATE TABLE "economic_indicators" (
    "id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country" CHAR(2) NOT NULL,
    "region" "RegionBloc" NOT NULL,
    "unit" VARCHAR(50) NOT NULL,
    "frequency" "IndicatorFrequency" NOT NULL,
    "source" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "economic_indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicator_observations" (
    "time" TIMESTAMPTZ NOT NULL,
    "indicator_id" UUID NOT NULL,
    "value" DECIMAL(18,4) NOT NULL,

    CONSTRAINT "indicator_observations_pkey" PRIMARY KEY ("time","indicator_id")
);

-- CreateTable
CREATE TABLE "broadcasts" (
    "id" UUID NOT NULL,
    "room_name" VARCHAR(100) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "BroadcastStatus" NOT NULL DEFAULT 'SCHEDULED',
    "required_tier" "SubscriptionTier" NOT NULL DEFAULT 'PREMIUM',
    "hls_url" TEXT,
    "host_id" UUID,
    "scheduled_at" TIMESTAMPTZ,
    "started_at" TIMESTAMPTZ,
    "ended_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "broadcasts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_user_id_key" ON "subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "subscriptions_tier_status_idx" ON "subscriptions"("tier", "status");

-- CreateIndex
CREATE UNIQUE INDEX "authors_user_id_key" ON "authors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "authors_slug_key" ON "authors"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_status_published_at_idx" ON "articles"("status", "published_at" DESC);

-- CreateIndex
CREATE INDEX "articles_category_published_at_idx" ON "articles"("category", "published_at" DESC);

-- CreateIndex
CREATE INDEX "articles_region_published_at_idx" ON "articles"("region", "published_at" DESC);

-- CreateIndex
CREATE INDEX "articles_tags_idx" ON "articles" USING GIN ("tags");

-- CreateIndex
CREATE INDEX "article_assets_symbol_idx" ON "article_assets"("symbol");

-- CreateIndex
CREATE INDEX "financial_assets_asset_class_idx" ON "financial_assets"("asset_class");

-- CreateIndex
CREATE INDEX "financial_assets_region_idx" ON "financial_assets"("region");

-- CreateIndex
CREATE INDEX "asset_prices_symbol_time_idx" ON "asset_prices"("symbol", "time" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "economic_indicators_code_key" ON "economic_indicators"("code");

-- CreateIndex
CREATE INDEX "economic_indicators_country_idx" ON "economic_indicators"("country");

-- CreateIndex
CREATE INDEX "indicator_observations_indicator_id_time_idx" ON "indicator_observations"("indicator_id", "time" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "broadcasts_room_name_key" ON "broadcasts"("room_name");

-- CreateIndex
CREATE INDEX "broadcasts_status_scheduled_at_idx" ON "broadcasts"("status", "scheduled_at");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trader_preferences" ADD CONSTRAINT "trader_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_items" ADD CONSTRAINT "watchlist_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_items" ADD CONSTRAINT "watchlist_items_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "financial_assets"("symbol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authors" ADD CONSTRAINT "authors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_assets" ADD CONSTRAINT "article_assets_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_assets" ADD CONSTRAINT "article_assets_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "financial_assets"("symbol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_prices" ADD CONSTRAINT "asset_prices_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "financial_assets"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator_observations" ADD CONSTRAINT "indicator_observations_indicator_id_fkey" FOREIGN KEY ("indicator_id") REFERENCES "economic_indicators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "broadcasts" ADD CONSTRAINT "broadcasts_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- =========================================================
-- TimescaleDB (hand-written — Prisma does not model this)
--
-- Converts the two time-series tables into hypertables when the extension is
-- installed and preloaded (e.g. the timescale/timescaledb Docker image). On
-- plain PostgreSQL they stay regular tables and the app works unchanged —
-- queries in lib/markets.ts use core-Postgres functions only.
--
-- create_default_indexes => FALSE because the composite PKs already lead with
-- "time" and the (symbol, time DESC) indexes above are declared in Prisma;
-- an extra Timescale-created index would show up as schema drift.
-- =========================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_available_extensions WHERE name = 'timescaledb')
     AND current_setting('shared_preload_libraries') LIKE '%timescaledb%' THEN

    CREATE EXTENSION IF NOT EXISTS timescaledb;

    PERFORM create_hypertable('asset_prices', by_range('time', INTERVAL '7 days'),
                              create_default_indexes => FALSE);
    PERFORM create_hypertable('indicator_observations', by_range('time', INTERVAL '1 year'),
                              create_default_indexes => FALSE);

    -- Compress ticks older than 30 days (needs the Timescale-licensed build)
    BEGIN
      ALTER TABLE asset_prices SET (
        timescaledb.compress,
        timescaledb.compress_segmentby = 'symbol',
        timescaledb.compress_orderby = 'time DESC'
      );
      PERFORM add_compression_policy('asset_prices', INTERVAL '30 days');
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'TimescaleDB compression unavailable, skipping: %', SQLERRM;
    END;
  ELSE
    RAISE NOTICE 'TimescaleDB not available — asset_prices and indicator_observations remain plain tables';
  END IF;
END $$;
