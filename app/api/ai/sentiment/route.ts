import { NextRequest, NextResponse } from "next/server";
import { getSentimentScore } from "@/lib/aiService";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { country, headlines } = await request.json();

    if (!country || !headlines) {
      return NextResponse.json({ error: "Country and headlines required" }, { status: 400 });
    }

    const score = await getSentimentScore(country, headlines);
    return NextResponse.json({ score });
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 });
  }
}
