import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession() as any;
  if (!session || !session.user || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await (prisma as any).calendarEvent.findMany({
      orderBy: { date: "asc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Admin calendar GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const event = await (prisma as any).calendarEvent.create({
      data: {
        title: body.title,
        country: body.country,
        countryCode: body.countryCode,
        category: body.category,
        date: new Date(body.date),
        time: body.time || null,
        impact: body.impact || "medium",
        actual: body.actual || null,
        forecast: body.forecast || null,
        previous: body.previous || null,
        description: body.description || null,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Admin calendar POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...data } = body;

    if (data.date) {
      data.date = new Date(data.date);
    }

    const event = await (prisma as any).calendarEvent.update({
      where: { id },
      data,
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error("Admin calendar PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    await (prisma as any).calendarEvent.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin calendar DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
