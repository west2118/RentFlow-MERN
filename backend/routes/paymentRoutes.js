import express from "express";
import {
  getPaymentMonth,
  getTenantPayment,
  getPayment,
  getLatestPaymentUnits,
  getLandlordPayments,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/payments-month", verifyToken, getPaymentMonth);
router.get("/tenant-payment", verifyToken, getTenantPayment);
router.get("/payment/:id", verifyToken, getPayment);
router.get("/expected-payment", verifyToken, getLatestPaymentUnits);
router.get("/landlord-payments", verifyToken, getLandlordPayments);

export default router;
