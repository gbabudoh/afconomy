import { NextResponse, type NextRequest } from "next/server";
import { getCandles, isResolution } from "@/lib/markets";

/** GET /api/v1/markets/history?symbol=NGX:DANGCEM&resolution=1h — OHLCV candles. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const symbol = params.get("symbol");
  const resolution = params.get("resolution") ?? "1h";

  if (!symbol) {
    return NextResponse.json({ success: false, error: "Missing symbol" }, { status: 400 });
  }
  if (!isResolution(resolution)) {
    return NextResponse.json({ success: false, error: "Unsupported resolution" }, { status: 400 });
  }

  try {
    const data = await getCandles(symbol, resolution);
    return NextResponse.json(
      { success: true, data },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
    );
  } catch (err) {
    console.error("History API failure:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
