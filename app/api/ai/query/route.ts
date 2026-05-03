import { NextRequest, NextResponse } from "next/server";
import { parseNaturalLanguageQuery } from "@/lib/aiService";
import { fetchIMFSeries, IMF_INDICATORS } from "@/lib/imfService";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query required" }, { status: 400 });
    }

    // 1. Parse the NLQ
    const params = await parseNaturalLanguageQuery(query);
    if (!params) {
      return NextResponse.json({ error: "Could not understand query logic." }, { status: 422 });
    }

    // 2. Map indicator string to IMF code
    const indicatorMap: Record<string, string> = {
      "GDP_GROWTH": IMF_INDICATORS.GDP_GROWTH,
      "INFLATION": IMF_INDICATORS.INFLATION,
      "UNEMPLOYMENT": IMF_INDICATORS.UNEMPLOYMENT
    };

    const imfCode = indicatorMap[params.indicator] || IMF_INDICATORS.GDP_GROWTH;

    // 3. Fetch data for each country
    const dataPromises = params.countries.map(async (isoCode: string) => {
      const data = await fetchIMFSeries(imfCode, isoCode);
      return {
        isoCode,
        data: Array.isArray(data) ? data.slice(-params.timeframe) : []
      };
    });

    const results = await Promise.all(dataPromises);

    return NextResponse.json({
      params,
      results,
      summary: `Comparing ${params.indicator} for ${params.countries.join(", ")} over the last ${params.timeframe} years.`
    });

  } catch (error) {
    console.error("NLQ API Error:", error);
    return NextResponse.json({ error: "Failed to process natural language intelligence." }, { status: 500 });
  }
}
