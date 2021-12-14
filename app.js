import { app } from "./server.js";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.js";

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.send("hello world");
});
