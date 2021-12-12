import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(` server running at http://localhost:${PORT}/`);
});

export { app, server };
