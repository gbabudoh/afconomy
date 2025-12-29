import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all countries
export async function GET() {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const countries = await prisma.country.findMany({
      include: {
        _count: {
          select: { metrics: true, news: true, marketData: true }
        }
      },
      orderBy: { name: "asc" }
    });

    return NextResponse.json(countries);
  } catch (error) {
    console.error("Admin countries GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST new country
export async function POST(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, code, region, flagUrl, description, capital, currency, population, gdp } = body;

    if (!name || !code || !region) {
      return NextResponse.json({ error: "Name, Code, and Region are required" }, { status: 400 });
    }

    const country = await prisma.country.create({
      data: {
        name,
        code,
        region,
        flagUrl,
        description,
        capital,
        currency,
        population: population ? BigInt(population) : null,
        gdp: gdp ? parseFloat(gdp) : null,
      }
    });

    // Convert BigInt for JSON response
    return NextResponse.json({
      ...country,
      population: country.population ? country.population.toString() : null
    });
  } catch (error) {
    console.error("Admin country POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE country
export async function DELETE(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Country ID is required" }, { status: 400 });
    }

    await prisma.country.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Country removed successfully" });
  } catch (error) {
    console.error("Admin country DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH update country
export async function PATCH(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, population, gdp, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Country ID is required" }, { status: 400 });
    }

    const data: any = { ...updateData };
    if (population !== undefined) data.population = population ? BigInt(population) : null;
    if (gdp !== undefined) data.gdp = gdp ? parseFloat(gdp) : null;

    const updatedCountry = await prisma.country.update({
      where: { id },
      data
    });

    return NextResponse.json({
      ...updatedCountry,
      population: updatedCountry.population ? updatedCountry.population.toString() : null
    });
  } catch (error) {
    console.error("Admin country PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
