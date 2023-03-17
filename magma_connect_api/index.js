import express from "express";
const app = express();
const port =  process.env.PORT || 8800;
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import adminRoutes from "./routes/admins.js"

import cors from "cors"
import cookieParser from "cookie-parser"


//middleware routes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
})
);
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/admins", adminRoutes)




app.listen(port, () => {
    console.log("API listening on");

});

