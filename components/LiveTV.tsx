import Link from "next/link";
import PremiumLiveStream from "@/components/PremiumLiveStream";
import TVScreen, { OffAirSlate } from "@/components/TVScreen";

export interface LiveBroadcast {
  roomName: string;
  title: string;
  status: "SCHEDULED" | "LIVE" | "ENDED";
  hostName: string | null;
  scheduledAt: Date | null;
}

function nextLabel(b: LiveBroadcast | null) {
  if (!b || b.status !== "SCHEDULED") return null;
  return b.scheduledAt
    ? `Up next · ${b.scheduledAt.toLocaleString("en-GB", {
        timeZone: "UTC",
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })} UTC`
    : "Up next";
}

/** The channel screen: plays the live show, or the off-air slate with what's next. */
export default function LiveTV({
  broadcast,
  showLinks = true,
}: {
  broadcast: LiveBroadcast | null;
  showLinks?: boolean;
}) {
  const subtitle = broadcast?.hostName ? `with ${broadcast.hostName}` : null;

  return (
    <div className="space-y-2">
      {broadcast?.status === "LIVE" ? (
        <PremiumLiveStream roomName={broadcast.roomName} title={broadcast.title} subtitle={subtitle} />
      ) : (
        <TVScreen title={broadcast?.title} subtitle={subtitle}>
          <OffAirSlate next={nextLabel(broadcast)} />
        </TVScreen>
      )}
      {showLinks && (
        <div className="flex justify-between px-1 text-[11px] font-semibold text-slate-500">
          {broadcast ? (
            <Link href={`/live/${broadcast.roomName}`} className="hover:text-slate-900">
              Watch full screen →
            </Link>
          ) : (
            <span />
          )}
          <Link href="/live" className="hover:text-slate-900">
            All shows
          </Link>
        </div>
      )}
    </div>
  );
}
