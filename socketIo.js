import { io } from "./server.js";
import jwt from "jsonwebtoken";
import { Chat, getNewId, Message } from "./models/index.js";

const jwtSecret = "jksfdkdfsfhsdajklfhrskjlhfaslkhaklsjdhkdsj";

io.use((socket, next) => {
  if (!(socket.handshake.auth && socket.handshake.auth.token))
    return next(new Error("auth token is required"));
  const token = socket.handshake.auth.token;
  jwt.verify(token, jwtSecret, async (err, user) => {
    if (err) {
      next("jwt verify error");
      return;
    }
    socket.user = user;
    const chats = await Chat.find({ userId: user.id });
    socket.chats = chats;
    next();
  });
});

io.on("connection", (socket) => {
  console.log("socket io connected", socket.user);
  socket.emit("chats", socket.chats);

  for (let c of socket.chats) {
    socket.join(c.id);
  }

  socket.on("disconnect", () => {
    console.log("socket io disconnected");
  });

<<<<<<< HEAD
  socket.on("create", async (chatName, cb) => {
    try {
      const chat = new Chat({
        userId: socket.user.id,
        id: getNewId(),
        name: chatName,
        type: "group",
      });
      await chat.save();
      socket.join(chat.id);
      cb(chat);
    } catch (error) {
      cb("", error);
    }
  });

  socket.on("join", async (chatId, cb) => {
    try {
      const chat = await Chat.findOne({ id: chatId });
      if (!chat) return cb("", "chat not found");
      let c = await Chat.findOne({ userId: socket.user.id, id: chatId });
      if (c) return cb("", "you already joined to this chat");

      c = new Chat({
        userId: socket.user.id,
        id: chat.id,
        name: chat.name,
        type: "group",
      });

      await c.save();
      socket.join(c.id);
      cb(c);
    } catch (error) {
      cb("", error);
    }
  });

  socket.on("message", (chat, msg) => {
    const toChatId = chat.id;
    socket.to(toChatId).emit("message", chat, msg);
=======
  socket.on("message-from-client", (msg) => {
    console.log("received from client: " + msg);
    socket.broadcast.emit("message-from-server", msg);
>>>>>>> bda6b2d7ace7b748a667f966b6c393c5abe7ec29
  });
});
