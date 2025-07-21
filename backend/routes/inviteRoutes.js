import express from "express";
import { sendInvite, getUserInvite } from "../controllers/invite.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/invite", verifyToken, sendInvite);
router.get("/invite/:id", verifyToken, getUserInvite);

export default router;
