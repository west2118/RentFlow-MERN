import express from "express";
import {
  getPaymentMonth,
  getTenantPayment,
  getPayment,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/payments-month", verifyToken, getPaymentMonth);
router.get("/tenant-payment", verifyToken, getTenantPayment);
router.get("/payment/:id", verifyToken, getPayment);

export default router;
