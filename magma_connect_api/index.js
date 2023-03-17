import express from "express";
const app = express();
const port = process.env.PORT || 8800;
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import adminRoutes from "./routes/admins.js";
import bodyparser from "body-parser";
import stripe from "stripe";

const stripeInstance = stripe(
  "sk_test_51MjHDhIEmwpzpx2CGoiDIpUEfhrkpP1nVmhlCymV7sABjegHCxctfP1RTyKARhlGaCvDSrACzTYy4QYYttDjobxN00eUIe3RY4"
);

import { v4 as uuidv4 } from "uuid";
const myUuid = uuidv4();

import cors from "cors";
import cookieParser from "cookie-parser";

//middleware routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/admins", adminRoutes);

app.listen(port, () => {
  console.log("API listening on");
});
