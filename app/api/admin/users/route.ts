import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all users
export async function GET(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      (prisma.user as any).findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          _count: {
            select: { messages: true }
          }
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count()
    ]);

    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Admin users GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Prevent self-deletion
    if (id === session.user.id) {
      return NextResponse.json({ error: "Cannot delete your own admin account" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Admin user DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH update user (role)
export async function PATCH(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, role } = await req.json();

    if (!id || !role) {
      return NextResponse.json({ error: "ID and role are required" }, { status: 400 });
    }

    // Update role
    const updatedUser = await (prisma.user as any).update({
      where: { id },
      data: { role },
      select: { id: true, email: true, name: true, role: true }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Admin user PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
