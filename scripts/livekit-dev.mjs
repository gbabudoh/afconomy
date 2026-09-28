// Runs a local LiveKit server in dev mode (API key "devkey", secret "secret",
// ws://localhost:7880) — matches the LIVEKIT_* values in .env.
// Uses .tools/livekit/livekit-server(.exe) if present, else livekit-server on PATH.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const local = join(".tools", "livekit", process.platform === "win32" ? "livekit-server.exe" : "livekit-server");
const bin = existsSync(local) ? local : "livekit-server";

const child = spawn(bin, ["--dev", "--bind", "0.0.0.0"], { stdio: "inherit" });
child.on("error", () => {
  console.error(
    "livekit-server not found. Download it from https://github.com/livekit/livekit/releases " +
      "into .tools/livekit/, or use LiveKit Cloud and set LIVEKIT_* in .env."
  );
  process.exit(1);
});
child.on("exit", (code) => process.exit(code ?? 0));
