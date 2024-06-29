import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post("/", createPost);

postRouter.get("/", getAllPosts);

export default postRouter;
