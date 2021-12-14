import express from "express";
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(` server running at http://localhost:${PORT}/`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

export { app, io };
