import "server-only";
import type { ArticleCategory, RegionBloc } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const publishedWhere = () => ({
  status: "PUBLISHED" as const,
  publishedAt: { lte: new Date() },
});

export async function listArticles({
  category,
  region,
  regions,
  symbol,
  limit = 10,
  offset = 0,
}: {
  category?: ArticleCategory;
  region?: RegionBloc;
  // Match any of these blocs (e.g. a trader's saved filters)
  regions?: RegionBloc[];
  // Only stories linked to this ticker
  symbol?: string;
  limit?: number;
  offset?: number;
} = {}) {
  const where = {
    ...publishedWhere(),
    category,
    region: region ?? (regions?.length ? { in: regions } : undefined),
    assets: symbol ? { some: { symbol } } : undefined,
  };

  const [total, articles] = await prisma.$transaction([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: limit,
      skip: offset,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        region: true,
        tags: true,
        isPremium: true,
        publishedAt: true,
        author: { select: { name: true, role: true, slug: true } },
      },
    }),
  ]);

  return { total, articles };
}

export type ArticleSummary = Awaited<ReturnType<typeof listArticles>>["articles"][number];

export async function getArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: { slug, ...publishedWhere() },
    include: {
      author: true,
      assets: { include: { asset: true } },
    },
  });
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}
