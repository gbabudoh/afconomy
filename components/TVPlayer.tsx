"use client";

import { useRef, useEffect, useState } from "react";
import "@mux/mux-video";

/**
 * Interface for the Mux Video element to avoid 'any' and resolve lint errors.
 */
interface MuxVideoElement extends HTMLElement {
  muted: boolean;
}

export default function TVPlayer() {
  const videoRef = useRef<MuxVideoElement>(null);
  
  // TODO: Replace with your actual Mux Playback ID from https://dashboard.mux.com/
  // For now, showing a placeholder message instead of trying to load an invalid stream
  const playbackId = process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID || ""; 
  
  // Compute initial error state based on playback ID
  const initialError = !playbackId 
    ? "No stream configured. Add NEXT_PUBLIC_MUX_PLAYBACK_ID to your .env.local file."
    : null;
  
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    if (!playbackId) {
      return;
    }

    // Ensuring the video element is muted for autoplay support if needed
    if (videoRef.current) {
      videoRef.current.muted = true;
    }

    const currentVideo = videoRef.current;
    
    // Custom error event listener for mux-video
    const handleError = (e: Event) => {
      console.error("Mux Video Error:", e);
      setError("Failed to load live stream. Please verify your Mux playback ID.");
    };

    if (currentVideo) {
      currentVideo.addEventListener("error", handleError);
    }

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener("error", handleError);
      }
    };
  }, [playbackId]);

  return (
    <div className="relative w-full h-full group bg-black">
      {error || !playbackId ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Live Stream Placeholder</p>
            <p className="text-xs text-white/60 max-w-xs">
              {error || "Configure your Mux stream to enable live broadcasting"}
            </p>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-muted/10 border border-border/20">
            <p className="text-[10px] font-mono text-white/40">
              Add to .env.local:<br/>
              NEXT_PUBLIC_MUX_PLAYBACK_ID=your_id
            </p>
          </div>
        </div>
      ) : (
        <>
          <mux-video
            ref={videoRef}
            playback-id={playbackId}
            metadata-video-title="Afconomy Live"
            metadata-viewer-user-id="user-id-007"
            stream-type="live"
            controls
            autoPlay
            muted
            className="w-full h-full object-contain"
          />
          
          {/* Overlay when not playing or loading */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white text-sm font-bold">Connecting to Stream...</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
