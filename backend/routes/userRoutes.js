import express from "express";
import { putUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/user", verifyToken, putUser);
router.get("/user", verifyToken, getUser);

export default router;
