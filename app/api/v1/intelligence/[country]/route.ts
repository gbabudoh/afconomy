import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/apiKey";
import prisma from "@/lib/prisma";
import { fetchIMFIndicator, IMF_INDICATORS } from "@/lib/imfService";
import { AFRICAN_COUNTRIES_MAP } from "@/lib/africanData";

export async function GET(
  request: NextRequest,
  { params }: { params: { country: string } }
) {
  const apiKey = request.headers.get("x-api-key");
  const countryQuery = params.country;

  // 1. Validate API Key
  if (!apiKey) {
    return NextResponse.json({ error: "API Key required. Provide x-api-key in header." }, { status: 401 });
  }

  const client = await validateApiKey(apiKey);
  if (!client) {
    return NextResponse.json({ error: "Invalid or inactive API Key." }, { status: 403 });
  }

  if ((client as any).limitExceeded) {
    return NextResponse.json({ error: "Monthly request limit reached for this Enterprise key." }, { status: 429 });
  }

  // 2. Fetch Data
  try {
    const isoCode = AFRICAN_COUNTRIES_MAP[countryQuery as keyof typeof AFRICAN_COUNTRIES_MAP];
    if (!isoCode) {
      return NextResponse.json({ error: `Country '${countryQuery}' not found in Afconomy directory.` }, { status: 404 });
    }

    // Fetch primary indicators in parallel
    const [gdp, inflation] = await Promise.all([
      fetchIMFIndicator(isoCode, IMF_INDICATORS.GDP_GROWTH),
      fetchIMFIndicator(isoCode, IMF_INDICATORS.INFLATION)
    ]);

    return NextResponse.json({
      success: true,
      meta: {
        client: client.client,
        country: countryQuery,
        isoCode,
        timestamp: new Date().toISOString()
      },
      data: {
        gdp_growth: gdp,
        inflation_rate: inflation
      }
    });

  } catch (error) {
    console.error("Enterprise API Error:", error);
    return NextResponse.json({ error: "Failed to retrieve intelligence data." }, { status: 500 });
  }
}
