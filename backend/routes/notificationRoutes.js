import express from "express";
import { postNotification } from "../controllers/notification.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/notification", verifyToken, postNotification);

export default router;
