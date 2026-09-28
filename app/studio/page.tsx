import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { createBroadcast } from "@/app/actions/broadcasts";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasRole } from "@/lib/session";

export const metadata: Metadata = { title: "Studio — Afconomy Live" };

const input =
  "w-full bg-af-bg border border-af-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500";

export default async function StudioPage() {
  const user = await getCurrentUser();
  if (!hasRole(user, "JOURNALIST") || !user?.author) {
    return (
      <>
        <SiteHeader />
        <p className="p-8 text-center text-sm text-slate-500">The studio is restricted to newsroom staff.</p>
      </>
    );
  }

  const broadcasts = await prisma.broadcast.findMany({
    where: { status: { not: "ENDED" } },
    orderBy: [{ status: "desc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <SiteHeader canPublish />
      <main className="max-w-3xl mx-auto w-full p-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold tracking-tight">Broadcast studio</h1>

        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Your shows</h2>
          {broadcasts.length === 0 && <p className="text-sm text-slate-500">No upcoming shows.</p>}
          <ul className="divide-y divide-af-border border border-af-border rounded-xl bg-af-panel">
            {broadcasts.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <div className="text-sm font-semibold">{b.title}</div>
                  <div className="text-[10px] font-mono text-slate-500">{b.roomName}</div>
                </div>
                <div className="flex items-center gap-3">
                  {b.status === "LIVE" && <span className="text-[10px] font-bold text-rose-500 uppercase">On air</span>}
                  <Link
                    href={`/studio/${b.roomName}`}
                    className="text-xs font-bold bg-af-red hover:bg-red-600 text-white px-3 py-1.5 rounded-lg"
                  >
                    Enter studio
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-af-panel border border-af-border rounded-xl p-5 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">New broadcast</h2>
          <form action={createBroadcast} className="space-y-4">
            <input name="title" required maxLength={255} placeholder="e.g. CBN MPC Decision: Instant Reaction" className={input} />
            <textarea name="description" rows={3} placeholder="What the show covers" className={input} />
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="isFree" /> Free to watch (otherwise Premium only)
            </label>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg">
              <Plus className="w-4 h-4" /> Create and open studio
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
