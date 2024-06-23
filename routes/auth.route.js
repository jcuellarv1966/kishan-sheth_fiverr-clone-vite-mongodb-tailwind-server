import express from "express";
import multer from "multer";
import {
  signup,
  login,
  getUserInfo,
  setUserInfo,
  setUserImage,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/profiles/" });

router.post("/signup", signup);
router.post("/login", login);
router.post("/get-user-info", verifyToken, getUserInfo);
router.post("/set-user-info", verifyToken, setUserInfo);
router.post(
  "/set-user-image",
  verifyToken,
  upload.single("images"),
  setUserImage
);

export default router;
