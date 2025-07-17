import express from "express";
import { putUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/user", verifyToken, putUser);

export default router;
