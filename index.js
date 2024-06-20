import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Connected Successfully!");
  } catch (error) {
    console.error(error);
  }
};

app.use(cors({}));
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!🤔";

  return res.status(errorStatus).send(errorMessage);
});

const port = process.env.PORT;

app.listen(port, () => {
  connectMongodb();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
