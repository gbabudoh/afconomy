"use client";

import React, { useEffect, useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
  VideoTrack,
  useTracks,
  useConnectionState,
  isTrackReference,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import { Lock, RefreshCw, RadioTower, AlertTriangle } from "lucide-react";
import "@livekit/components-styles";
import TVScreen from "@/components/TVScreen";

interface Props {
  roomName: string;
  title?: string;
  subtitle?: string | null;
}

type StreamState =
  | { kind: "loading" }
  | { kind: "error"; message: string; locked: boolean }
  | { kind: "ready"; token: string };

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-slate-400">
      {children}
    </div>
  );
}

/** Full-frame program output: screen share if the host is sharing, else their camera. */
function Stage() {
  const connection = useConnectionState();
  const tracks = useTracks(
    [
      { source: Track.Source.ScreenShare, withPlaceholder: false },
      { source: Track.Source.Camera, withPlaceholder: false },
    ],
    { onlySubscribed: true }
  ).filter(isTrackReference);

  const program =
    tracks.find((t) => t.source === Track.Source.ScreenShare) ??
    tracks.find((t) => t.source === Track.Source.Camera);
  // Picture-in-picture host camera while a screen share is on air
  const pip =
    program?.source === Track.Source.ScreenShare
      ? tracks.find((t) => t.source === Track.Source.Camera)
      : undefined;

  if (connection !== ConnectionState.Connected) {
    return (
      <Centered>
        <RefreshCw className="w-7 h-7 animate-spin text-blue-500" />
        <p className="text-sm">Tuning in…</p>
      </Centered>
    );
  }

  if (!program) {
    return (
      <Centered>
        <RadioTower className="w-8 h-8 text-slate-500" />
        <p className="text-sm font-medium">Waiting for the presenter to go on air…</p>
      </Centered>
    );
  }

  return (
    <>
      <VideoTrack trackRef={program} className="absolute inset-0 w-full h-full object-contain bg-black" />
      {pip && (
        <VideoTrack
          trackRef={pip}
          className="absolute top-3 left-3 w-1/4 aspect-video object-cover rounded-md border border-white/20 shadow-2xl z-10"
        />
      )}
    </>
  );
}

export default function PremiumLiveStream({ roomName, title, subtitle }: Props) {
  const [state, setState] = useState<StreamState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/v1/livekit/token?room=${encodeURIComponent(roomName)}`)
      .then(async (res) => {
        const data = await res.json();
        if (cancelled) return;
        if (res.ok && data.success) setState({ kind: "ready", token: data.token });
        else
          setState({
            kind: "error",
            message: data.error ?? "Failed to authenticate stream access.",
            locked: res.status === 401 || res.status === 403,
          });
      })
      .catch(() => {
        if (!cancelled) setState({ kind: "error", message: "Could not reach the stream service.", locked: false });
      });
    return () => {
      cancelled = true;
    };
  }, [roomName]);

  return (
    <TVScreen live title={title} subtitle={subtitle}>
      {state.kind === "loading" && (
        <Centered>
          <RefreshCw className="w-7 h-7 animate-spin text-blue-500" />
          <p className="text-sm">Checking your access…</p>
        </Centered>
      )}

      {state.kind === "error" && (
        <Centered>
          {state.locked ? <Lock className="w-8 h-8 text-amber-400" /> : <AlertTriangle className="w-8 h-8 text-rose-400" />}
          <p className="text-base font-bold text-white">
            {state.locked ? "Premium live broadcast" : "Stream unavailable"}
          </p>
          <p className="text-xs max-w-sm">{state.message}</p>
          {state.locked && (
            <button className="mt-1 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-5 py-2 rounded-lg text-xs">
              Upgrade to Premium
            </button>
          )}
        </Centered>
      )}

      {state.kind === "ready" && (
        <LiveKitRoom
          token={state.token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL ?? "ws://localhost:7880"}
          // Viewers are subscribe-only — never request camera/mic
          video={false}
          audio={false}
          connectOptions={{ autoSubscribe: true }}
          data-lk-theme="default"
          className="absolute inset-0 bg-black"
        >
          <Stage />
          <RoomAudioRenderer />
          {/* Browsers block autoplay audio until the viewer interacts */}
          <StartAudio
            label="🔊 Tap for sound"
            className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-black/75 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
          />
        </LiveKitRoom>
      )}
    </TVScreen>
  );
}
