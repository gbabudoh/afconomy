import SiteHeader from "@/components/SiteHeader";
import TerminalShell from "@/components/TerminalShell";
import { getWatchlist } from "@/lib/markets";
import { listArticles } from "@/lib/news";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentUser();
  const prefs = user?.preferences;

  const [watchlist, { articles }, broadcast] = await Promise.all([
    getWatchlist(user?.id),
    listArticles({
      // Trader filters narrow the wire; Pan-African coverage always shows
      regions: prefs?.regions.length ? [...prefs.regions, "PAN_AFRICAN"] : undefined,
      limit: 12,
    }),
    prisma.broadcast.findFirst({
      where: { status: { in: ["LIVE", "SCHEDULED"] } },
      // Enum order is SCHEDULED < LIVE, so desc puts live shows first
      orderBy: [{ status: "desc" }, { scheduledAt: "asc" }],
      include: { host: { select: { name: true } } },
    }),
  ]);

  return (
    <>
      <SiteHeader canPublish={hasRole(user, "JOURNALIST")} />
      <TerminalShell
        watchlist={watchlist}
        articles={articles}
        broadcast={
          broadcast && {
            roomName: broadcast.roomName,
            title: broadcast.title,
            status: broadcast.status,
            hostName: broadcast.host?.name ?? null,
            scheduledAt: broadcast.scheduledAt,
          }
        }
        preferences={
          prefs
            ? { regions: prefs.regions, assetClasses: prefs.assetClasses, delivery: prefs.delivery }
            : null
        }
      />
    </>
  );
}
