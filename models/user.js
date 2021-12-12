import db from "./db.js";
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
}); // schema

const User = db.model("user", userSchema); //model

// async function queryUser(usr) {
//   console.log("querying");
//   const res = await User.find(usr);
//   console.log("get user", res);
// }

// queryUser({ name: "shree" });

// async function deleteUser(usr) {
//   const res = await User.deleteOne(usr);
//   console.log("user deleted", res);
// }

// //deleteUser({name:'shree'})

export { User };
