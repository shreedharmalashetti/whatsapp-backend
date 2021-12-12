import { server } from "./server.js";
import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("socket io connected");
  socket.on("disconnect", () => {
    console.log("socket io disconnected");
  });

  socket.on("message-from-client", (msg) => {
    console.log("received from client: " + msg);
    socket.emit("message-from-server", msg);
  });
});
