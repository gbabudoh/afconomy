import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ user: null });
    }

    // Return the user object from the session
    return NextResponse.json({ user: session.user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
