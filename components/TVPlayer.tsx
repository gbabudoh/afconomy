"use client";

import { useEffect, useState } from "react";
import "@mux/mux-video";
import { Loader2, Radio, PlayCircle } from "lucide-react";

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
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#f8f9fa] p-6 text-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-6 shadow-[0_0_20px_rgba(255,2,1,0.2)]" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">
          Syncing Market Feed...
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
          className="w-full h-full object-cover opacity-80"
        >
          {DEMO_SOURCES.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <div className="flex items-center gap-2.5 glass-panel border-white/20 px-4 py-2 rounded-2xl shadow-2xl">
            <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse glow-emerald" style={{ boxShadow: '0 0 10px rgba(250, 204, 21, 0.4)' }} />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
              Archive Data Stream
            </span>
          </div>
        </div>
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
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
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={stream.url}
          controls
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={stream.thumbnailUrl || ""}
        />
      )}

      {/* Connection indicator */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-2.5 glass-panel border-white/20 px-4 py-2 rounded-2xl shadow-2xl">
          <div className={`h-2 w-2 rounded-full ${stream.type === "LIVE" ? "bg-red-500 animate-pulse glow-primary" : "bg-blue-500 glow-primary"}`} />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
            {stream.type === "LIVE" ? "Live Intelligence" : "VOD Analysis"}
          </span>
        </div>
      </div>
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
    </div>
  );
}
