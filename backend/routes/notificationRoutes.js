import express from "express";
import {
  postNotification,
  readNotifications,
  postRemindersNotification,
} from "../controllers/notification.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/notification", verifyToken, postNotification);
router.post("/notification-all", verifyToken, postRemindersNotification);
router.put("/read-notification", verifyToken, readNotifications);

export default router;
