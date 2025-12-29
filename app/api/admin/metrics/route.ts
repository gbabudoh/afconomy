import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET metrics
export async function GET(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const countryId = searchParams.get("countryId");

    const metrics = await prisma.metric.findMany({
      where: countryId ? { countryId } : {},
      include: {
        country: {
          select: { name: true, code: true }
        }
      },
      orderBy: { date: "desc" },
      take: 50,
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Admin metrics GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST new metric point
export async function POST(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, value, unit, date, countryId } = body;

    if (!name || value === undefined || !unit || !date || !countryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const metric = await prisma.metric.create({
      data: {
        name,
        value: parseFloat(value),
        unit,
        date: new Date(date),
        countryId,
      }
    });

    return NextResponse.json(metric);
  } catch (error) {
    console.error("Admin metric POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE metric
export async function DELETE(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Metric ID is required" }, { status: 400 });
    }

    await prisma.metric.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Data point purged successfully" });
  } catch (error) {
    console.error("Admin metric DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
