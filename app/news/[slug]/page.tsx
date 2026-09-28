import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { CATEGORY_LABELS, REGION_LABELS, formatPublished, symbolToSlug } from "@/lib/constants";
import { getCloseAt } from "@/lib/markets";
import { getArticleBySlug } from "@/lib/news";
import { getCurrentUser, hasRole, hasTier } from "@/lib/session";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug);
  if (!article) return { title: "Not found — Afconomy" };
  return { title: `${article.title} — Afconomy`, description: article.excerpt ?? undefined };
}

/** Price of each linked ticker when the story broke vs. now. */
async function MarketAtPublication({ symbols, publishedAt }: { symbols: { symbol: string; name: string }[]; publishedAt: Date }) {
  const rows = await Promise.all(
    symbols.map(async (a) => ({
      ...a,
      then: await getCloseAt(a.symbol, publishedAt),
      now: await getCloseAt(a.symbol, new Date()),
    }))
  );

  return (
    <div className="bg-af-panel border border-af-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-af-border text-[10px] font-bold uppercase tracking-wider text-slate-500">
        Market reaction since publication
      </div>
      <table className="w-full text-[11px] font-mono">
        <tbody className="divide-y divide-af-border/60">
          {rows.map((r) => {
            const change = r.then && r.now ? ((r.now.close - r.then.close) / r.then.close) * 100 : null;
            const up = (change ?? 0) >= 0;
            return (
              <tr key={r.symbol}>
                <td className="px-4 py-2.5 font-sans">
                  <Link href={`/markets/${symbolToSlug(r.symbol)}`} className="font-bold text-slate-800 hover:text-slate-900">
                    {r.symbol}
                  </Link>
                  <div className="text-[10px] text-slate-500">{r.name}</div>
                </td>
                <td className="px-3 py-2.5 text-right text-slate-500">{r.then?.close.toFixed(2) ?? "—"}</td>
                <td className="px-3 py-2.5 text-right text-slate-900">{r.now?.close.toFixed(2) ?? "—"}</td>
                <td className={`px-4 py-2.5 text-right font-bold ${up ? "text-emerald-600" : "text-rose-600"}`}>
                  {change === null ? "—" : `${up ? "+" : ""}${change.toFixed(2)}%`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [article, user] = await Promise.all([getArticleBySlug(slug), getCurrentUser()]);
  if (!article) notFound();

  const locked = article.isPremium && !hasTier(user, "PREMIUM");

  return (
    <>
      <SiteHeader canPublish={hasRole(user, "JOURNALIST")} />
      <main className="max-w-3xl mx-auto w-full p-4 py-8 space-y-6">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
          <span className="text-blue-600">{REGION_LABELS[article.region]}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{CATEGORY_LABELS[article.category]}</span>
          {article.isPremium && <span className="text-amber-600">· Premium</span>}
        </div>

        <h1 className="text-3xl font-bold tracking-tight leading-tight">{article.title}</h1>
        {article.excerpt && <p className="text-lg text-slate-500">{article.excerpt}</p>}

        <div className="text-xs text-slate-500 border-y border-af-border py-3">
          {article.author && (
            <span className="text-slate-700 font-semibold">
              {article.author.name}
              <span className="text-slate-500 font-normal">, {article.author.role}</span>
            </span>
          )}
          <span className="block font-mono mt-0.5">{formatPublished(article.publishedAt)}</span>
        </div>

        {locked ? (
          <div className="bg-af-panel border border-amber-200 rounded-xl p-8 text-center">
            <Lock className="w-6 h-6 text-amber-600 mx-auto mb-3" />
            <h2 className="font-bold text-slate-900">Premium analysis</h2>
            <p className="text-sm text-slate-500 mt-1">Upgrade to Premium to read the full brief.</p>
          </div>
        ) : (
          <article className="space-y-4 text-[15px] leading-7 text-slate-800">
            {article.content.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>
        )}

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded bg-af-panel border border-af-border text-[11px] text-slate-500">
                {t}
              </span>
            ))}
          </div>
        )}

        {article.assets.length > 0 && article.publishedAt && (
          <MarketAtPublication
            symbols={article.assets.map((a) => ({ symbol: a.symbol, name: a.asset.name }))}
            publishedAt={article.publishedAt}
          />
        )}
      </main>
    </>
  );
}
