import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all financial assets
export async function GET() {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [currencies, marketData] = await Promise.all([
      prisma.currency.findMany({ orderBy: { code: "asc" } }),
      prisma.marketData.findMany({ 
         orderBy: { timestamp: "desc" },
         take: 100,
         include: { country: { select: { name: true, code: true } } }
      })
    ]);

    return NextResponse.json({ currencies, marketData });
  } catch (error) {
    console.error("Admin financials GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST new currency
export async function POST(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { code, name, symbol, countryCode, rateToUSD } = body;

    const currency = await prisma.currency.create({
      data: {
        code,
        name,
        symbol,
        countryCode,
        rateToUSD: parseFloat(rateToUSD)
      }
    });

    return NextResponse.json(currency);
  } catch (error) {
    console.error("Admin currency POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH currency rate
export async function PATCH(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, rateToUSD } = await req.json();

    const updated = await prisma.currency.update({
      where: { id },
      data: { 
         rateToUSD: parseFloat(rateToUSD),
         lastUpdated: new Date()
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin currency PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE currency
export async function DELETE(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    await prisma.currency.delete({ where: { id } });

    return NextResponse.json({ message: "Asset liquidated successfully" });
  } catch (error) {
    console.error("Admin agency DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
