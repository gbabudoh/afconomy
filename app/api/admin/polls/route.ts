import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all polls
export async function GET() {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const polls = await prisma.poll.findMany({
      include: {
        options: true
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(polls);
  } catch (error) {
    console.error("Admin polls GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST new poll
export async function POST(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question, options } = await req.json();

    if (!question || !options || !Array.isArray(options)) {
      return NextResponse.json({ error: "Question and options array are required" }, { status: 400 });
    }

    const poll = await prisma.poll.create({
      data: {
        question,
        options: {
          create: options.map((opt: string) => ({ text: opt }))
        }
      },
      include: {
        options: true
      }
    });

    return NextResponse.json(poll);
  } catch (error) {
    console.error("Admin polls POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE poll
export async function DELETE(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Poll ID is required" }, { status: 400 });
    }

    // Must delete options first if not using cascade in DB
    await prisma.pollOption.deleteMany({
      where: { pollId: id }
    });

    await prisma.poll.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Poll deleted successfully" });
  } catch (error) {
    console.error("Admin poll DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH toggle poll active status
export async function PATCH(req: Request) {
  try {
    const session = await getSession() as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, active } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Poll ID is required" }, { status: 400 });
    }

    const updatedPoll = await prisma.poll.update({
      where: { id },
      data: { active }
    });

    return NextResponse.json(updatedPoll);
  } catch (error) {
    console.error("Admin poll PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
