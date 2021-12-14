import db from "./db.js";
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  name: String,
  hashedPassword: String,
  id: String,
}); // schema

const chatSchema = new Schema({
  userId: String,
  id: String,
  name: String,
  type: String, //personal or group
});

const messageSchema = new Schema({
  userId: String,
  fromUser: {
    name: String,
    id: String,
  },
  messageId: Number,
  message: String,
});

const User = db.model("user", userSchema); //model
const Chat = db.model("chat", chatSchema); //model
const Message = db.model("message", messageSchema); //model

const getNewId = () => {
  return new mongoose.Types.ObjectId().toString();
};

export { User, Chat, Message, getNewId };
