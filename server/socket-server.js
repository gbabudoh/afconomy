/* eslint-disable */
require('dotenv').config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send-message", async (data) => {
    try {
      const message = await prisma.chatMessage.create({
        data: {
          user: data.user,
          text: data.text,
          isAdmin: data.isAdmin || false,
        },
      });
      console.log("Message saved:", message.text);
      io.emit("receive-message", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
