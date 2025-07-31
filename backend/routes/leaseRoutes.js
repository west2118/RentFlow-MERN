import express from "express";
import { postLease, getLease } from "../controllers/lease.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/lease/:id", verifyToken, postLease);
router.get("/lease/:id", verifyToken, getLease);

export default router;
