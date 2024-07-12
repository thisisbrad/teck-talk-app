import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./db/config.js";
import postRouter from "./api/routes/postRoutes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api_v1/posts", postRouter);

app.get("/api_v1", async (req, res) => {
  res.status(200).json("Server is up");
});

app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
