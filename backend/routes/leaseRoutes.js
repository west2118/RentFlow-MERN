import express from "express";
import { postLease } from "../controllers/lease.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/lease/:id", verifyToken, postLease);

export default router;
