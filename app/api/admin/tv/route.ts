import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all streams
export async function GET(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const activeOnly = searchParams.get("activeOnly") === "true";

    const where: any = {};
    if (type) where.type = type;
    if (activeOnly) where.isActive = true;

    const streams = await (prisma as any).stream.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ streams });
  } catch (error) {
    console.error("Admin TV GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST new stream
export async function POST(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, url, thumbnailUrl, type, isActive } = body;

    if (!title || !url) {
      return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
    }

    const stream = await (prisma as any).stream.create({
      data: {
        title,
        description,
        url,
        thumbnailUrl,
        type: type || "LIVE",
        isActive: isActive !== undefined ? isActive : true,
      }
    });

    return NextResponse.json(stream);
  } catch (error) {
    console.error("Admin TV POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE stream
export async function DELETE(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Stream ID is required" }, { status: 400 });
    }

    await (prisma as any).stream.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Stream deleted successfully" });
  } catch (error) {
    console.error("Admin TV DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH stream
export async function PATCH(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Stream ID is required" }, { status: 400 });
    }

    const updatedStream = await (prisma as any).stream.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updatedStream);
  } catch (error) {
    console.error("Admin TV PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
