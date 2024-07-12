import mongoose from "mongoose";

const url = "mongodb://mongodb:27017/techTalk";

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected using Mongoose"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default mongoose;
