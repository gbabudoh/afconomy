import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all news
export async function GET(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        include: {
          country: {
            select: { name: true, code: true }
          }
        },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.news.count()
    ]);

    return NextResponse.json({
      news,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Admin news GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST new news
export async function POST(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, summary, category, countryId, imageUrl, url } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        summary,
        category,
        imageUrl,
        url,
        countryId: countryId || null,
        publishedAt: new Date(),
      }
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("Admin news POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE news
export async function DELETE(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "News ID is required" }, { status: 400 });
    }

    await prisma.news.delete({
      where: { id }
    });

    return NextResponse.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Admin news DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH news
export async function PATCH(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "News ID is required" }, { status: 400 });
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error("Admin news PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
