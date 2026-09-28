import React from "react";

/**
 * The Afconomy TV frame: bezel, channel bug, LIVE badge and a lower-third.
 * Whatever is passed as children fills the 16:9 picture area.
 */
export default function TVScreen({
  live = false,
  title,
  subtitle,
  children,
}: {
  live?: boolean;
  title?: string;
  subtitle?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-2xl bg-linear-to-b from-zinc-800 to-zinc-900 p-2 sm:p-2.5 shadow-2xl shadow-black/60 ring-1 ring-white/10">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-black">
        {children}

        {/* Channel bug */}
        <div className="pointer-events-none absolute top-3 right-3 z-20 flex items-center gap-2">
          {live && (
            <span className="flex items-center gap-1.5 rounded bg-af-red px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
            </span>
          )}
          <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-black tracking-tight text-white backdrop-blur">
            AF<span className="text-af-red">TV</span>
          </span>
        </div>

        {/* Lower third */}
        {title && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/90 via-black/60 to-transparent px-4 pb-3 pt-10">
            <div className="flex items-stretch gap-0 overflow-hidden rounded">
              <span className="bg-af-red px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white flex items-center">
                {live ? "Now" : "Next"}
              </span>
              <div className="bg-white/95 px-3 py-1 min-w-0">
                <div className="truncate text-xs sm:text-sm font-bold text-zinc-900">{title}</div>
                {subtitle && <div className="truncate text-[10px] sm:text-[11px] text-zinc-600">{subtitle}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Test-card style slate for when nothing is on air. */
export function OffAirSlate({ next }: { next?: string | null }) {
  const bars = ["#e5e5e5", "#e5e500", "#00e5e5", "#00e500", "#e500e5", "#e50000", "#0000e5"];
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 flex opacity-25">
        {bars.map((c) => (
          <div key={c} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 text-center px-6">
        <div className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          AFCONOMY<span className="text-af-red"> TV</span>
        </div>
        <div className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-slate-300">Off air</div>
        {next && <div className="mt-1 text-[11px] sm:text-xs font-mono text-slate-300">{next}</div>}
      </div>
    </div>
  );
}
