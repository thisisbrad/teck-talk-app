import express from "express";
import cors from "cors";
import morgan from "morgan";
import postRouter from "./api/routes/postRoutes.js";
import userRouter from "./api/routes/userRoutes.js";
import authRouter from "./api/routes/authRoutes.js";
import ApiError from "./api/errors/ApiError.js";

import "./db/config.js";
import MongoDBSession from "connect-mongodb-session";
import session from "express-session";
import "./api/strategies/local.js";

const MongoDBStore = MongoDBSession(session);
const app = express();
const store = new MongoDBStore({
  uri: process.env.mongoUri,
  collection: 'sessions'
});

store.on('error', error=>console.log(error));


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Session Store
//This needs to replaced with a custom store. connect-mongodb-session relies upon an insecure version of lodash.
app.use(session({
  secret: "SUPERDESECRET",
  cookie: {
    maxAge: 8.64e7 * 7
  },
  store: store,
  resave: true,
  saveUninitialized: false
}));

app.use("/api_v1/posts", postRouter);
app.use("/api_v1/users", userRouter);
app.use("/api_v1/auth", authRouter)
app.get("/api_v1", async (req, res) => {
  res.status(200).json("Server is up");
});

/**
 * The final route handler if no routes are used or if an error is passed to the next function. 
 * 
 * In order for express to use this method as the final middleware it must have 4 provided arguments. ESLint does not like this because next is an unused method.
 */

app.use(
  // eslint-disable-next-line no-unused-vars
  (err, req, res, _) => {
  if (err instanceof ApiError) return res.status(err.status).json({message: err.message});
  console.error("Final error", err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
