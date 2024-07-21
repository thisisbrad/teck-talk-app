import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";

const postRouter = express.Router();

/**
 * POST /api_v1/posts
 * @summary Create a post - Must be signed in
 * @tags Posts v1
 * @security UserAuth
 * @param {NewPost} request.body.required
 * @return {Post} 200 - The saved post
 * @return {ErrorMessage} 400 - Input Error
 */
postRouter.post("/", createPost);

/**
 * GET /api_v1/posts
 * @summary Get a list of posts
 * @tags Posts v1
 * @security UserAuth
 * @return {Post[]} 200 - A list of posts
 * @return {ErrorMessage} 500 - Internal Server Error
 */
postRouter.get("/", getAllPosts);

export default postRouter;
