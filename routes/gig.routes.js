import express from "express";
import multer from "multer";
import { addGig, getUserAuthGigs } from "../controllers/gig.controller.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add", verifyToken, upload.array("images"), addGig);
router.get("/get-user-gigs", verifyToken, getUserAuthGigs);

export default router;
