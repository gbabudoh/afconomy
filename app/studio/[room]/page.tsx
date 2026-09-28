import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BroadcastStudio from "@/components/BroadcastStudio";
import SiteHeader from "@/components/SiteHeader";
import { createRoomToken, livekitConfigured } from "@/lib/livekit";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasRole } from "@/lib/session";

export const metadata: Metadata = { title: "Studio — Afconomy Live" };

export default async function StudioRoomPage({ params }: { params: Promise<{ room: string }> }) {
  const { room } = await params;
  const [user, broadcast] = await Promise.all([
    getCurrentUser(),
    prisma.broadcast.findUnique({ where: { roomName: room } }),
  ]);
  if (!broadcast) notFound();

  if (!hasRole(user, "JOURNALIST") || !user) {
    return (
      <>
        <SiteHeader />
        <p className="p-8 text-center text-sm text-slate-500">The studio is restricted to newsroom staff.</p>
      </>
    );
  }

  if (!livekitConfigured()) {
    return (
      <>
        <SiteHeader canPublish />
        <p className="p-8 text-center text-sm text-slate-500">
          LiveKit is not configured — set LIVEKIT_API_KEY, LIVEKIT_API_SECRET and NEXT_PUBLIC_LIVEKIT_URL.
        </p>
      </>
    );
  }

  const token = await createRoomToken({
    room,
    userId: user.id,
    name: user.author?.name ?? user.name ?? user.email,
    role: "host",
  });

  return (
    <>
      <SiteHeader canPublish />
      <main className="max-w-5xl mx-auto w-full p-4 py-6 space-y-4">
        <BroadcastStudio
          roomName={room}
          title={broadcast.title}
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL ?? "ws://localhost:7880"}
          initialStatus={broadcast.status}
        />
        <p className="text-xs text-slate-500">
          You&apos;re in preview until you press <strong>Go live</strong>. Viewers only see the show while it&apos;s on air.
        </p>
      </main>
    </>
  );
}
