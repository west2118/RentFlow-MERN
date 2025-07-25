import express from "express";
import {
  postReceipt,
  getReceipt,
  acceptReceipt,
  rejectReceipt,
} from "../controllers/receipt.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/receipt", verifyToken, postReceipt);
router.get("/receipt/:id", verifyToken, getReceipt);
router.put("/accept-receipt/:id", verifyToken, acceptReceipt);
router.put("/reject-receipt/:id", verifyToken, rejectReceipt);

export default router;
