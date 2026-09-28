import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CandleHistoryChart from "@/components/CandleHistoryChart";
import MiniTickerWidget from "@/components/MiniTickerWidget";
import NewsWire from "@/components/NewsWire";
import SiteHeader from "@/components/SiteHeader";
import { ASSET_CLASS_LABELS, REGION_LABELS, slugToSymbol } from "@/lib/constants";
import { getAsset } from "@/lib/markets";
import { listArticles } from "@/lib/news";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const asset = await getAsset(slugToSymbol((await params).slug));
  return { title: asset ? `${asset.symbol} · ${asset.name} — Afconomy` : "Not found — Afconomy" };
}

export default async function MarketPage({ params }: { params: Promise<Params> }) {
  const symbol = slugToSymbol((await params).slug);
  const [asset, { articles }] = await Promise.all([
    getAsset(symbol),
    listArticles({ symbol, limit: 8 }),
  ]);
  if (!asset) notFound();

  const facts = [
    ["Class", ASSET_CLASS_LABELS[asset.assetClass]],
    ["Exchange", asset.exchange ?? "—"],
    ["Currency", asset.currency],
    ["Region", REGION_LABELS[asset.region]],
  ];

  return (
    <>
      <SiteHeader />
      <main className="max-w-[1400px] mx-auto w-full p-4 grid lg:grid-cols-12 gap-4">
        <section className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{asset.name}</h1>
              <dl className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex gap-1.5">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="text-slate-700 font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <MiniTickerWidget symbol={asset.symbol} />
          </div>
          <CandleHistoryChart symbol={asset.symbol} name={asset.name} />
        </section>
        <aside className="lg:col-span-4">
          <NewsWire articles={articles} title={`Stories on ${asset.symbol}`} />
        </aside>
      </main>
    </>
  );
}
