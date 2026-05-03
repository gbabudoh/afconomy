import { NextResponse } from "next/server";

const IMF_BASE_URL = "https://www.imf.org/external/datamapper/api/v1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const indicator = searchParams.get("indicator");
  const countryCode = searchParams.get("countryCode");

  if (!indicator || !countryCode) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const response = await fetch(`${IMF_BASE_URL}/${indicator}/${countryCode}`);
    if (!response.ok) throw new Error("IMF API Error");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch IMF data" }, { status: 500 });
  }
}
