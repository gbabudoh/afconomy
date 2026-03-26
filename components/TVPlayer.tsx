"use client";

import { useEffect, useState } from "react";
import "@mux/mux-video";
import { Loader2 } from "lucide-react";

const DEMO_SOURCES = ["/demo.mp4"];

interface StreamData {
  id: string;
  title: string;
  url: string;
  type: "LIVE" | "PRE_RECORDED";
  thumbnailUrl: string | null;
}

export default function TVPlayer() {
  const [stream, setStream] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchActiveStream = async () => {
    try {
      const res = await fetch("/api/tv");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        setStream(null);
        return;
      }
      const data = await res.json();
      setStream(data.success && data.stream ? data.stream : null);
    } catch {
      setStream(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveStream();
    const interval = setInterval(fetchActiveStream, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 p-6 text-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">
          Scanning Satellite Mesh...
        </p>
      </div>
    );
  }

  /* ── No admin stream — show demo ── */
  if (!stream) {
    return (
      <div className="relative w-full h-full bg-black">
        <video
          controls
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain"
        >
          {DEMO_SOURCES.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
            <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
              Demo Feed
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ── Admin stream active ── */
  const isHls   = (url: string) => url.includes(".m3u8");
  const isMuxId = (url: string) => url.length > 5 && !url.includes(".") && !url.includes("/");

  return (
    <div className="relative w-full h-full group bg-black">
      {isHls(stream.url) || isMuxId(stream.url) ? (
        <mux-video
          src={isHls(stream.url) ? stream.url : undefined}
          playback-id={isMuxId(stream.url) ? stream.url : undefined}
          metadata-video-title={stream.title}
          stream-type={stream.type === "LIVE" ? "live" : "on-demand"}
          controls
          autoPlay
          muted
          className="w-full h-full object-contain"
        />
      ) : (
        <video
          src={stream.url}
          controls
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
          poster={stream.thumbnailUrl || ""}
        />
      )}

      {/* Connection indicator */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
          <div className={`h-2 w-2 rounded-full ${stream.type === "LIVE" ? "bg-red-500 animate-pulse" : "bg-blue-500"}`} />
          <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
            {stream.type === "LIVE" ? "Live Signal" : "VOD Intelligence"}
          </span>
        </div>
      </div>
    </div>
  );
}
