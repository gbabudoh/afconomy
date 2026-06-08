import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "afconomy-intel-platform-secret-2024"
);

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function sign(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verify(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  try {
    const payload = await verify(token);
    const userId = (payload?.user as { id?: string })?.id;
    if (!userId) return null;

    // Verify the user still exists in the database — invalidates stale sessions
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function login(user: { id: string; name: string | null; email: string; role: string }) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await sign({ user });
  const cookieStore = await cookies();
  cookieStore.set("session", session, { ...COOKIE_OPTS, expires });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { ...COOKIE_OPTS, expires: new Date(0) });
}
