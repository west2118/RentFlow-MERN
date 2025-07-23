import express from "express";
import {
  getPaymentMonth,
  getTenantPayment,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/payments-month", verifyToken, getPaymentMonth);
router.get("/tenant-payment", verifyToken, getTenantPayment);

export default router;
