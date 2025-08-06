import { Server } from "socket.io";

let io;

export const userSocket = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["POST", "GET"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("joinUserRoom", (userId) => {
      socket.join(userId);
      userSocket.set(userId, socket.id);
      console.log(`User ${userId} joined room`);
    });
    socket.on("disconnect", () => {
      console.log("User disconneted: ", socket.id);
    });
  });

  return io;
};

export function getIo() {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
}
