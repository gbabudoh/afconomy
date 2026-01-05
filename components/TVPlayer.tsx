"use client";

import { useRef, useEffect, useState } from "react";
import "@mux/mux-video";
import { Tv, Youtube, AlertCircle, Loader2 } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);
  
  const fetchActiveStream = async () => {
    try {
      const res = await fetch("/api/tv");
      const data = await res.json();
      if (data.success && data.stream) {
        setStream(data.stream);
      } else {
        setStream(null);
      }
    } catch (err) {
      console.error("Failed to fetch stream:", err);
      setError("Signal connectivity lost");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveStream();
    // Poll for changes every 30 seconds
    const interval = setInterval(fetchActiveStream, 30000);
    return () => clearInterval(interval);
  }, []);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const isMuxId = (url: string) => {
    // Basic check: if it's a short alphanumeric string and doesn't look like a URL
    return url.length > 5 && !url.includes(".") && !url.includes("/");
  };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 p-6 text-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Scanning Satellite Mesh...</p>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black/95 p-6 text-center">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Tv className="h-6 w-6 text-primary opacity-40" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-white uppercase tracking-wider">No Active Signal</p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Awaiting Admin Broadcast</p>
        </div>
      </div>
    );
  }

  const youtubeId = getYouTubeId(stream.url);
  const muxId = isMuxId(stream.url);

  return (
    <div className="relative w-full h-full group bg-black">
      {youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=1&showinfo=0&rel=0`}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : muxId ? (
        <mux-video
          playback-id={stream.url}
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
          className="w-full h-full object-contain"
          poster={stream.thumbnailUrl || ""}
        >
          Your browser does not support the video tag.
        </video>
      )}

      {/* Connection Indicator */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full overflow-hidden">
          <div className={`h-2 w-2 rounded-full ${stream.type === "LIVE" ? "bg-red-500 animate-pulse" : "bg-blue-500"}`} />
          <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
            {stream.type === "LIVE" ? "Live Signal" : "VOD Intelligence"}
          </span>
        </div>
      </div>
    </div>
  );
}
