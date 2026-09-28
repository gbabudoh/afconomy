import type { Metadata } from "next";
import Link from "next/link";
import NewsWire from "@/components/NewsWire";
import SiteHeader from "@/components/SiteHeader";
import { CATEGORY_LABELS, REGION_LABELS, isCategory, isRegion } from "@/lib/constants";
import { listArticles } from "@/lib/news";
import { getCurrentUser, hasRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wire — Afconomy",
  description: "Policy, markets and socio-economic analysis across African regional blocs.",
};

const PAGE_SIZE = 20;

type SearchParams = { category?: string; region?: string; page?: string };

function href(current: SearchParams, patch: Partial<SearchParams>) {
  const next = { ...current, ...patch };
  const qs = new URLSearchParams(
    Object.entries(next).filter((e): e is [string, string] => !!e[1])
  ).toString();
  return qs ? `/news?${qs}` : "/news";
}

function Chip({ active, to, children }: { active: boolean; to: string; children: React.ReactNode }) {
  return (
    <Link
      href={to}
      className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition ${
        active
          ? "bg-af-red/10 border-af-red/60 text-af-red"
          : "bg-af-panel border-af-border text-slate-500 hover:text-slate-900"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function NewsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const category = isCategory(params.category) ? params.category : undefined;
  const region = isRegion(params.region) ? params.region : undefined;
  const page = Math.max(Number(params.page) || 1, 1);

  const [user, { total, articles }] = await Promise.all([
    getCurrentUser(),
    listArticles({ category, region, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }),
  ]);
  const pages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

  return (
    <>
      <SiteHeader canPublish={hasRole(user, "JOURNALIST")} />
      <main className="max-w-4xl mx-auto w-full p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Chip active={!category} to={href(params, { category: undefined, page: undefined })}>
            All topics
          </Chip>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Chip key={key} active={category === key} to={href(params, { category: key, page: undefined })}>
              {label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={!region} to={href(params, { region: undefined, page: undefined })}>
            All regions
          </Chip>
          {Object.entries(REGION_LABELS).map(([key, label]) => (
            <Chip key={key} active={region === key} to={href(params, { region: key, page: undefined })}>
              {label}
            </Chip>
          ))}
        </div>

        <NewsWire articles={articles} title={`${total} briefs`} />

        {pages > 1 && (
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            {page > 1 ? <Link href={href(params, { page: String(page - 1) })}>← Newer</Link> : <span />}
            <span>
              Page {page} of {pages}
            </span>
            {page < pages ? <Link href={href(params, { page: String(page + 1) })}>Older →</Link> : <span />}
          </div>
        )}
      </main>
    </>
  );
}
