"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoTrack,
  isTrackReference,
  useConnectionState,
  useParticipants,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import { Radio, Square, Users, ExternalLink, VideoOff } from "lucide-react";
import "@livekit/components-styles";
import { setBroadcastStatus } from "@/app/actions/broadcasts";

interface Props {
  roomName: string;
  title: string;
  token: string;
  serverUrl: string;
  initialStatus: "SCHEDULED" | "LIVE" | "ENDED";
}

function Preview() {
  const tracks = useTracks(
    [
      { source: Track.Source.ScreenShare, withPlaceholder: false },
      { source: Track.Source.Camera, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  ).filter((t) => isTrackReference(t) && t.participant.isLocal);

  const program =
    tracks.find((t) => t.source === Track.Source.ScreenShare) ??
    tracks.find((t) => t.source === Track.Source.Camera);

  if (!program || !isTrackReference(program)) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-500">
        <VideoOff className="w-8 h-8" />
        <p className="text-sm">Camera is off — enable it below</p>
      </div>
    );
  }
  return <VideoTrack trackRef={program} className="absolute inset-0 w-full h-full object-contain bg-black" />;
}

function StudioStatusBar({
  roomName,
  status,
  onChange,
}: {
  roomName: string;
  status: Props["initialStatus"];
  onChange: (s: "LIVE" | "ENDED") => void;
}) {
  const connection = useConnectionState();
  // Everyone except the host is a viewer
  const viewers = useParticipants().filter((p) => !p.isLocal).length;
  const [pending, startTransition] = useTransition();
  const connected = connection === ConnectionState.Connected;

  function change(next: "LIVE" | "ENDED") {
    startTransition(async () => {
      await setBroadcastStatus(roomName, next);
      onChange(next);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-af-panel border-b border-af-border">
      {status === "LIVE" ? (
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500">
          <span className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-pulse" /> On air
        </span>
      ) : (
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
          {status === "ENDED" ? "Ended" : "Off air — preview"}
        </span>
      )}
      <span className="flex items-center gap-1.5 text-xs text-slate-500">
        <Users className="w-3.5 h-3.5" /> {viewers} watching
      </span>
      <span className={`text-[10px] font-mono ${connected ? "text-emerald-600" : "text-amber-600"}`}>
        {connection}
      </span>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href={`/live/${roomName}`}
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 px-3 py-2"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Viewer page
        </Link>
        {status === "LIVE" ? (
          <button
            onClick={() => change("ENDED")}
            disabled={pending}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg"
          >
            <Square className="w-3.5 h-3.5" /> End broadcast
          </button>
        ) : (
          <button
            onClick={() => change("LIVE")}
            disabled={pending || !connected}
            className="flex items-center gap-2 bg-af-red hover:bg-red-600 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            <Radio className="w-3.5 h-3.5" /> {status === "ENDED" ? "Go live again" : "Go live"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function BroadcastStudio({ roomName, title, token, serverUrl, initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full bg-af-bg border border-af-border rounded-xl overflow-hidden shadow-panel">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        video={true}
        audio={true}
        onError={(e) => setError(e.message)}
        onMediaDeviceFailure={() => setError("Camera or microphone access was blocked. Allow it in your browser.")}
        data-lk-theme="default"
      >
        <StudioStatusBar roomName={roomName} status={status} onChange={setStatus} />
        <div className="relative aspect-video w-full bg-black">
          <Preview />
          <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded">
            {title}
          </div>
        </div>
        <ControlBar
          variation="minimal"
          controls={{ microphone: true, camera: true, screenShare: true, chat: false, leave: false }}
        />
        <RoomAudioRenderer muted />
      </LiveKitRoom>
      {error && (
        <div className="px-4 py-3 text-xs text-rose-600 bg-rose-50 border-t border-rose-200">{error}</div>
      )}
    </div>
  );
}
