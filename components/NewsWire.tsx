import Link from "next/link";
import { Lock, Newspaper } from "lucide-react";
import type { ArticleSummary } from "@/lib/news";
import { CATEGORY_LABELS, REGION_LABELS, formatPublished } from "@/lib/constants";

export default function NewsWire({
  articles,
  title = "Afconomy Wire",
}: {
  articles: ArticleSummary[];
  title?: string;
}) {
  return (
    <div className="w-full bg-af-panel border border-af-border rounded-xl overflow-hidden shadow-panel">
      <div className="p-4 border-b border-af-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-af-red" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{title}</span>
        </div>
        <Link href="/news" className="text-[10px] font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider">
          All briefs →
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="p-6 text-center text-xs text-slate-500">No briefs match your filters yet.</p>
      ) : (
        <ul className="divide-y divide-af-border/60">
          {articles.map((a) => (
            <li key={a.id}>
              <Link href={`/news/${a.slug}`} className="block p-4 hover:bg-af-bg/60 transition group">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-blue-600">{REGION_LABELS[a.region]}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{CATEGORY_LABELS[a.category]}</span>
                  {a.isPremium && (
                    <span className="ml-auto flex items-center gap-1 text-amber-600">
                      <Lock className="w-3 h-3" /> Premium
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 text-sm font-semibold text-slate-800 group-hover:text-slate-900 leading-snug">
                  {a.title}
                </h3>
                {a.excerpt && <p className="mt-1 text-xs text-slate-500 line-clamp-2">{a.excerpt}</p>}
                <div className="mt-2 text-[10px] text-slate-500 font-mono">
                  {a.author?.name} · {formatPublished(a.publishedAt)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
