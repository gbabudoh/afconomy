import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { optionId } = await request.json();

    const result = await prisma.$transaction([
      prisma.pollOption.update({
        where: { id: optionId },
        data: { votes: { increment: 1 } },
      }),
      prisma.poll.updateMany({
        where: { options: { some: { id: optionId } } },
        data: { totalVotes: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ success: true, option: result[0] });
  } catch (error) {
    console.error("Failed to vote:", error);
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}
