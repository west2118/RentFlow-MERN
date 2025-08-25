import express from "express";
import {
  postNotification,
  readNotifications,
} from "../controllers/notification.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/notification", verifyToken, postNotification);
router.put("/read-notification", verifyToken, readNotifications);

export default router;
