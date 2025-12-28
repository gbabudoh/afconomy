import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("Connected to socket server");
  socket.emit("send-message", {
    user: "System Test",
    text: "Testing chat integration at " + new Date().toISOString(),
    isAdmin: true
  });
});

socket.on("receive-message", (data) => {
  console.log("Broadcast received:", data);
  process.exit(0);
});

setTimeout(() => {
  console.log("Timeout waiting for broadcast");
  process.exit(1);
}, 5000);
