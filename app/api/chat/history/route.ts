import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.chatMessage.findMany({
      orderBy: {
        timestamp: "asc",
      },
      take: 50,
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch chat history:", error);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}
