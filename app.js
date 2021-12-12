import { app } from "./server.js";

import authRoute from "./routes/auth.js";

app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.send("hello world");
});
