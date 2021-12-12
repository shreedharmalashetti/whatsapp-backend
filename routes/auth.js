import express from "express";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = new User({ name: "raju" });
    await user.save();
    res.send(`${user.name} signed up`);
  } catch (error) {
    next(error);
  }
});


export default router;
