import { io } from "./server.js";
import jwt from "jsonwebtoken";
import { Chat, User, getNewId, Message } from "./models/index.js";

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
  console.log("socket io connected", socket.user.name);
  socket.emit("chats", socket.chats);

  socket.join(socket.user.id);
  for (let c of socket.chats) {
    socket.join(c.id);
    console.log(`${socket.user.name} joined ${c.name}`);
  }
  console.log("\n");

  socket.on("disconnect", () => {
    console.log("socket io disconnected");
  });

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
      const chat1 = await Chat.findOne({ id: chatId });
      const chat2 = await User.findOne({ id: chatId });
      const chat = chat1 || chat2;

      if (!chat) return cb("", "chat not found");

      let c = await Chat.findOne({ userId: socket.user.id, id: chatId });
      if (c) return cb("", "you already joined to this chat");

      c = new Chat({
        userId: socket.user.id,
        id: chat.id,
        name: chat.name,
        type: chat.type || "personal",
      });

      await c.save();
      socket.join(c.id);
      cb(c);
    } catch (error) {
      cb("", error);
    }
  });

  socket.on("leave", async (chat, cb) => {
    await Chat.findOneAndDelete({ id: chat.id, userId: socket.user.id });
    cb();
  });

  socket.on("message", (toChat, msg) => {
    console.log("to", toChat.id);
    let fromChat = { ...toChat };
    if (toChat.type == "personal") {
      fromChat.id = socket.user.id;
      fromChat.name = socket.user.name;
    }

    socket.to(toChat.id).emit("message", fromChat, msg);
  });
});
