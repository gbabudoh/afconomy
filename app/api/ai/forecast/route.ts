import { NextRequest, NextResponse } from "next/server";
import { getEconomicForecast } from "@/lib/aiService";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { country, historicalData } = await request.json();

    if (!country || !historicalData) {
      return NextResponse.json({ error: "Country and historical data required" }, { status: 400 });
    }

    const forecast = await getEconomicForecast(country, historicalData);
    return NextResponse.json({ forecast });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate forecast" }, { status: 500 });
  }
}
