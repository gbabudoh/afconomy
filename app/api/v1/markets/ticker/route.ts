import { NextResponse, type NextRequest } from "next/server";
import { getLatestTicker } from "@/lib/markets";

/** GET /api/v1/markets/ticker?symbol=USD/NGN — latest OHLCV row for an asset. */
export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ success: false, error: "Missing symbol" }, { status: 400 });
  }

  try {
    const ticker = await getLatestTicker(symbol);
    if (!ticker) {
      return NextResponse.json({ success: false, error: "Unknown symbol" }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, ...ticker },
      { headers: { "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10" } }
    );
  } catch (err) {
    console.error("Ticker API failure:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
