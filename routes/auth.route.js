import express from "express";
import { signup, login, getUserInfo } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/get-user-info", verifyToken, getUserInfo);

export default router;
