import express from "express";
import {
  getPaymentMonth,
  getTenantPaymentSummary,
  getTenantPaymentHistory,
  getPayment,
  getLatestPaymentUnits,
  getLandlordPayments,
  getPaymentMonthSummary,
  getLandlordPaymentHistorySummary,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/payments-month", verifyToken, getPaymentMonth);
router.get("/payments-month-summary", verifyToken, getPaymentMonthSummary);
router.get("/tenant-payment/summary", verifyToken, getTenantPaymentSummary);
router.get("/tenant-payment/history", verifyToken, getTenantPaymentHistory);
router.get("/payment/:id", verifyToken, getPayment);
router.get("/expected-payment", verifyToken, getLatestPaymentUnits);
router.get("/landlord-payments", verifyToken, getLandlordPayments);
router.get("/landlord-payment-history-summary", verifyToken, getLandlordPaymentHistorySummary);

export default router;
