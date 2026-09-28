import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AutoRefresh from "@/components/AutoRefresh";
import LiveTV from "@/components/LiveTV";
import SiteHeader from "@/components/SiteHeader";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasRole } from "@/lib/session";

export const dynamic = "force-dynamic";

type Params = { room: string };

async function getBroadcast(room: string) {
  return prisma.broadcast.findUnique({
    where: { roomName: room },
    include: { host: { select: { name: true, role: true } } },
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const broadcast = await getBroadcast((await params).room);
  return { title: broadcast ? `${broadcast.title} — Afconomy Live` : "Not found — Afconomy" };
}

export default async function LivePage({ params }: { params: Promise<Params> }) {
  const [broadcast, user] = await Promise.all([getBroadcast((await params).room), getCurrentUser()]);
  if (!broadcast) notFound();
  const canHost = hasRole(user, "JOURNALIST");

  return (
    <>
      <SiteHeader canPublish={canHost} />
      {/* Pick up the show going live (or ending) without a manual reload */}
      {broadcast.status !== "LIVE" && <AutoRefresh seconds={10} />}
      <main className="max-w-5xl mx-auto w-full p-4 py-6 space-y-4">
        {broadcast.status === "ENDED" ? (
          <div className="aspect-video bg-af-panel border border-af-border rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest text-slate-500">
            Broadcast ended
          </div>
        ) : (
          <LiveTV
            showLinks={false}
            broadcast={{
              roomName: broadcast.roomName,
              title: broadcast.title,
              status: broadcast.status,
              hostName: broadcast.host?.name ?? null,
              scheduledAt: broadcast.scheduledAt,
            }}
          />
        )}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{broadcast.title}</h1>
            {broadcast.host && (
              <p className="text-sm text-slate-500 mt-1">
                {broadcast.host.name}, {broadcast.host.role}
              </p>
            )}
            {broadcast.description && <p className="text-sm text-slate-700 mt-3">{broadcast.description}</p>}
          </div>
          {canHost && broadcast.status !== "ENDED" && (
            <Link
              href={`/studio/${broadcast.roomName}`}
              className="text-xs font-bold border border-af-border hover:border-slate-400 px-4 py-2 rounded-lg"
            >
              Present this show
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
