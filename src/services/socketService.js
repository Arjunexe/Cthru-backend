import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["POST", "GET"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
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
