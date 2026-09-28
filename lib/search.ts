import "server-only";
import { Meilisearch } from "meilisearch";

export interface ArticleSearchDoc {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  region: string;
  category: string;
  tags: string[];
  publishedAt: number;
}

function adminClient() {
  const host = process.env.MEILISEARCH_HOST;
  const apiKey = process.env.MEILISEARCH_ADMIN_KEY;
  return host && apiKey ? new Meilisearch({ host, apiKey }) : null;
}

/**
 * Pushes articles into the Meilisearch `articles` index used by TerminalSearch.
 * Search is a secondary store — failures are logged, never thrown, so a
 * search outage can't block publishing.
 */
export async function indexArticles(docs: ArticleSearchDoc[]) {
  const client = adminClient();
  if (!client || docs.length === 0) return;
  try {
    await client.index("articles").addDocuments(docs, { primaryKey: "id" });
  } catch (err) {
    console.error("Meilisearch indexing failed:", err);
  }
}
