import "server-only";
import { AccessToken } from "livekit-server-sdk";

export function livekitConfigured() {
  return !!(process.env.LIVEKIT_API_KEY && process.env.LIVEKIT_API_SECRET);
}

/**
 * Signs a LiveKit access token. Hosts can publish camera/mic/screen; viewers
 * are subscribe-only. Identities are prefixed by role so an editor watching
 * their own show in another tab doesn't kick the host connection out.
 */
export async function createRoomToken({
  room,
  userId,
  name,
  role,
}: {
  room: string;
  userId: string;
  name: string;
  role: "host" | "viewer";
}) {
  const identity =
    role === "host" ? `host-${userId}` : `viewer-${userId}-${crypto.randomUUID().slice(0, 8)}`;

  const token = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, {
    identity,
    name,
    ttl: role === "host" ? "6h" : "2h",
    metadata: JSON.stringify({ role }),
  });
  token.addGrant({
    roomJoin: true,
    room,
    canSubscribe: true,
    canPublish: role === "host",
    canPublishData: false,
  });
  return token.toJwt();
}
