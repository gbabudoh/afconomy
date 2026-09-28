import { NextResponse, type NextRequest } from "next/server";
import { isCategory, isRegion } from "@/lib/constants";
import { listArticles } from "@/lib/news";

/** GET /api/v1/news?category=POLICY&region=ECOWAS&limit=10&offset=0 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const rawCategory = params.get("category");
  const rawRegion = params.get("region");
  const category = isCategory(rawCategory) ? rawCategory : undefined;
  const region = isRegion(rawRegion) ? rawRegion : undefined;

  if (rawCategory && !category) {
    return NextResponse.json({ success: false, error: "Unknown category" }, { status: 400 });
  }
  if (rawRegion && !region) {
    return NextResponse.json({ success: false, error: "Unknown region" }, { status: 400 });
  }

  const limit = Math.min(Math.max(Number(params.get("limit")) || 10, 1), 50);
  const offset = Math.max(Number(params.get("offset")) || 0, 0);

  try {
    const { total, articles } = await listArticles({
      category,
      region,
      limit,
      offset,
    });
    return NextResponse.json(
      { success: true, total, count: articles.length, articles },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" } }
    );
  } catch (err) {
    console.error("News API failure:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
