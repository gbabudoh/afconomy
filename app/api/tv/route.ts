import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Public API to fetch the currently active broadcast stream.
 */
export async function GET() {
  console.log(">>> [API] Executing GET /api/tv");
  try {
    const stream = await (prisma as any).stream.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ 
      success: true, 
      stream 
    });
  } catch (error) {
    console.error("Public TV API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch active stream" },
      { status: 500 }
    );
  }
}
