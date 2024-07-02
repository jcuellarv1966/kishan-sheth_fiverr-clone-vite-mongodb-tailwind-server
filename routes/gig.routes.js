import express from "express";
import multer from "multer";
import {
  addGig,
  getUserAuthGigs,
  getGigData,
  deleteGig,
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add", verifyToken, upload.array("images"), addGig);
router.get("/get-user-gigs", verifyToken, getUserAuthGigs);
router.get("/get-gig-data/:gigId", getGigData);
router.delete("/delete-gig/:gigId", verifyToken, deleteGig);

export default router;
