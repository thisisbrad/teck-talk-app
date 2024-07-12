import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res
      .status(201)
      .json({ message: "Post added successfully", post: req.body });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};
