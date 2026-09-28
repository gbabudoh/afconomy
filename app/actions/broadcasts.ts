"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/news";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasRole } from "@/lib/session";

async function requireHost() {
  const user = await getCurrentUser();
  if (!hasRole(user, "JOURNALIST") || !user?.author) {
    throw new Error("Only newsroom staff can manage broadcasts.");
  }
  return user.author;
}

export async function createBroadcast(formData: FormData) {
  const author = await requireHost();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const isFree = formData.get("isFree") === "on";
  if (!title) throw new Error("Title is required.");

  // LiveKit room names: keep them short and URL-safe
  let roomName = slugify(title).slice(0, 80) || "broadcast";
  if (await prisma.broadcast.findUnique({ where: { roomName }, select: { id: true } })) {
    roomName = `${roomName.slice(0, 70)}-${Date.now().toString(36)}`;
  }

  await prisma.broadcast.create({
    data: {
      roomName,
      title,
      description,
      hostId: author.id,
      requiredTier: isFree ? "FREE" : "PREMIUM",
      status: "SCHEDULED",
    },
  });

  redirect(`/studio/${roomName}`);
}

export async function setBroadcastStatus(roomName: string, status: "LIVE" | "ENDED") {
  await requireHost();

  await prisma.broadcast.update({
    where: { roomName },
    data:
      status === "LIVE"
        ? { status, startedAt: new Date(), endedAt: null }
        : { status, endedAt: new Date() },
  });

  revalidatePath("/");
  revalidatePath("/live");
  revalidatePath(`/live/${roomName}`);
  revalidatePath(`/studio/${roomName}`);
}
