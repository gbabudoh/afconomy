import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all messages (paginated)
export async function GET(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      (prisma.chatMessage as any).findMany({
        orderBy: { timestamp: "desc" },
        skip,
        take: limit,
        include: {
           author: {
              select: { name: true, email: true, role: true }
           }
        }
      }),
      prisma.chatMessage.count()
    ]);

    return NextResponse.json({
      messages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Admin chat GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE message (Moderation)
export async function DELETE(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    await prisma.chatMessage.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Signal terminated successfully" });
  } catch (error) {
    console.error("Admin chat DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
