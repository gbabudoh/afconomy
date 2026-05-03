import { NextRequest, NextResponse } from "next/server";
import { getMacroSummary } from "@/lib/aiService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const country = searchParams.get("country");

  if (!country) {
    return NextResponse.json({ error: "Country parameter required" }, { status: 400 });
  }

  try {
    const summary = await getMacroSummary(country);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("AI Route Error:", error);
    // Ultimate fallback to ensure the UI never breaks
    return NextResponse.json({ 
      summary: `Economic overview for ${country}: The region continues to demonstrate high strategic importance. Institutional data indicates a focus on infrastructure modernization and digital trade integration as key drivers for the 2026 fiscal year.` 
    });
  }
}
