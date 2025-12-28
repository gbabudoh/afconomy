import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    let poll = await prisma.poll.findFirst({
      where: { active: true },
      include: { options: true },
      orderBy: { createdAt: "desc" },
    });

    // If no active poll exists, create a default one
    if (!poll) {
      poll = await prisma.poll.create({
        data: {
          question: "How do you see the Naira performing in Q2?",
          options: {
            create: [
              { text: "Steady Recovery", votes: 0 },
              { text: "Continued Volatility", votes: 0 },
              { text: "Significant Gains", votes: 0 },
            ],
          },
        },
        include: { options: true },
      });
    }

    return NextResponse.json(poll);
  } catch (error) {
    console.error("Failed to fetch poll status:", error);
    return NextResponse.json({ error: "Failed to fetch poll status" }, { status: 500 });
  }
}
