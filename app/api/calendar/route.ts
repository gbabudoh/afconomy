import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const events = await (prisma as any).calendarEvent.findMany({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      orderBy: { date: "asc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Calendar GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
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
    console.error("Calendar POST error:", error);
    return NextResponse.json(
      { error: "Failed to create calendar event" },
      { status: 500 }
    );
  }
}
