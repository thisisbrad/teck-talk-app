import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  voteCount: { type: Number },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
