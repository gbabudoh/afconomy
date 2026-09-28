import { NextResponse, type NextRequest } from "next/server";
import { createRoomToken, livekitConfigured } from "@/lib/livekit";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasTier } from "@/lib/session";

/**
 * GET /api/v1/livekit/token?room=brent-crude-analysis
 * Issues a subscribe-only LiveKit token if the viewer's tier meets the
 * broadcast's required tier.
 */
export async function GET(request: NextRequest) {
  const room = request.nextUrl.searchParams.get("room");
  if (!room) {
    return NextResponse.json({ success: false, error: "Missing room parameter" }, { status: 400 });
  }
  if (!livekitConfigured()) {
    return NextResponse.json({ success: false, error: "Live streaming is not configured." }, { status: 503 });
  }

  try {
    const [user, broadcast] = await Promise.all([
      getCurrentUser(),
      prisma.broadcast.findUnique({ where: { roomName: room } }),
    ]);

    if (!broadcast || broadcast.status === "ENDED") {
      return NextResponse.json({ success: false, error: "This broadcast is not available." }, { status: 404 });
    }
    if (!user) {
      return NextResponse.json({ success: false, error: "Sign in to watch live broadcasts." }, { status: 401 });
    }
    if (!hasTier(user, broadcast.requiredTier)) {
      return NextResponse.json(
        { success: false, error: "Access denied. Upgrade to Premium to access live broadcasts." },
        { status: 403 }
      );
    }

    const token = await createRoomToken({
      room,
      userId: user.id,
      name: user.name ?? user.email,
      role: "viewer",
    });

    return NextResponse.json({ success: true, token }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (err) {
    console.error("LiveKit token generation failed:", err);
    return NextResponse.json({ success: false, error: "Internal Authorization Error" }, { status: 500 });
  }
}
