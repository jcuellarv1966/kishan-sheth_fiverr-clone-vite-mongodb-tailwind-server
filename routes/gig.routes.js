import express from "express";
import multer from "multer";
import { addGig } from "../controllers/gig.controller.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add", verifyToken, addGig);

export default router;
