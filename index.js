import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.route.js";
import gigRoutes from "./routes/gig.routes.js";

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

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/public/uploads/profiles", express.static(path.join(__dirname, "./uploads/profiles")));

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);

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
