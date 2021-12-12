import mongoose from "mongoose";
import db from "./db.js";

const document = new mongoose.Schema({
  size:Number,
  msgId: Number,
  attributes: [String],
});

const Document = db.model("telegramDocuments", document);

function createObjectId(id){
  return mongoose.Types.ObjectId(id)
}

export {Document,createObjectId}
