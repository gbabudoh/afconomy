import type { Metadata } from "next";
import Link from "next/link";
import { Radio, CalendarClock, History } from "lucide-react";
import AutoRefresh from "@/components/AutoRefresh";
import LiveTV from "@/components/LiveTV";
import SiteHeader from "@/components/SiteHeader";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Live TV — Afconomy" };

type Row = Awaited<ReturnType<typeof getBroadcasts>>[number];

async function getBroadcasts() {
  return prisma.broadcast.findMany({
    where: {
      OR: [
        { status: { in: ["LIVE", "SCHEDULED"] } },
        { status: "ENDED", endedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      ],
    },
    orderBy: [{ status: "desc" }, { scheduledAt: "asc" }, { endedAt: "desc" }],
    include: { host: { select: { name: true, role: true } } },
  });
}

function toLive(b: Row) {
  return { roomName: b.roomName, title: b.title, status: b.status, hostName: b.host?.name ?? null, scheduledAt: b.scheduledAt };
}

function Card({ b }: { b: Row }) {
  const live = b.status === "LIVE";
  return (
    <Link
      href={`/live/${b.roomName}`}
      className={`block rounded-xl border p-5 transition ${
        live ? "bg-rose-50 border-rose-200 hover:border-rose-600" : "bg-af-panel border-af-border hover:border-slate-300"
      }`}
    >
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        {live ? (
          <span className="flex items-center gap-1.5 text-rose-500">
            <span className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" /> Live now
          </span>
        ) : (
          <span className="text-slate-500">{b.status === "SCHEDULED" ? "Upcoming" : "Ended"}</span>
        )}
        <span className="ml-auto text-amber-600">{b.requiredTier === "FREE" ? "Free" : "Premium"}</span>
      </div>
      <h3 className="mt-2 font-bold text-slate-900">{b.title}</h3>
      {b.host && (
        <p className="text-xs text-slate-500 mt-1">
          {b.host.name}, {b.host.role}
        </p>
      )}
      {b.status === "SCHEDULED" && b.scheduledAt && (
        <p className="text-xs text-slate-500 font-mono mt-2">{b.scheduledAt.toUTCString()}</p>
      )}
    </Link>
  );
}

function Section({ title, icon: Icon, rows }: { title: string; icon: typeof Radio; rows: Row[] }) {
  if (rows.length === 0) return null;
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        <Icon className="w-4 h-4" /> {title}
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {rows.map((b) => (
          <Card key={b.id} b={b} />
        ))}
      </div>
    </section>
  );
}

export default async function LiveIndexPage() {
  const [user, broadcasts] = await Promise.all([getCurrentUser(), getBroadcasts()]);
  const canHost = hasRole(user, "JOURNALIST");
  // On-air show first, otherwise the next scheduled one
  const featured =
    broadcasts.find((b) => b.status === "LIVE") ?? broadcasts.find((b) => b.status === "SCHEDULED") ?? null;

  return (
    <>
      <SiteHeader canPublish={canHost} />
      <AutoRefresh seconds={20} />
      <main className="max-w-5xl mx-auto w-full p-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Afconomy Live TV</h1>
          {canHost && (
            <Link href="/studio" className="text-xs font-bold bg-af-red hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Open studio
            </Link>
          )}
        </div>
        <LiveTV broadcast={featured && toLive(featured)} showLinks={false} />
        {broadcasts.length === 0 && <p className="text-sm text-slate-500">No broadcasts scheduled.</p>}
        <Section title="On air" icon={Radio} rows={broadcasts.filter((b) => b.status === "LIVE")} />
        <Section title="Upcoming" icon={CalendarClock} rows={broadcasts.filter((b) => b.status === "SCHEDULED")} />
        <Section title="Recently ended" icon={History} rows={broadcasts.filter((b) => b.status === "ENDED")} />
      </main>
    </>
  );
}
