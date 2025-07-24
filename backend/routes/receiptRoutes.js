import express from "express";
import { postReceipt, getReceipt } from "../controllers/receipt.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/receipt", verifyToken, postReceipt);
router.get("/receipt/:id", verifyToken, getReceipt);

export default router;
