import express from "express";
import mongoose from "mongoose";

import wordsRoutes from "./routes/words.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const MONGODB_URI =
  "mongodb+srv://sandro:z6hE16hJP6wXx0zl@cluster0.zutnl.mongodb.net/mutext";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/words", wordsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({
    confirmation: "fail",
    message: message,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
