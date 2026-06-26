import express from "express";
import {
  postUnit,
  getUserUnitAndLease,
  getUserUnitAndUserInfo,
  getLandlordUnits,
  getLandlordDashboardSummary,
  getTotalLastMonthUnits,
  getUnitWithLeaseStatus,
  getUnit,
  putUnit,
  getUserUnitLeasePayment,
} from "../controllers/unit.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/unit", verifyToken, postUnit);
router.get("/unit", verifyToken, getUnitWithLeaseStatus);
router.get("/unit-user/:id", verifyToken, getUserUnitAndUserInfo);
router.get("/unit-lease", verifyToken, getUserUnitLeasePayment);
router.get("/tenant-unit-lease", verifyToken, getUserUnitAndLease);
router.get("/last-month-count", verifyToken, getTotalLastMonthUnits);
router.get("/landlord-units", verifyToken, getLandlordUnits);
router.get("/landlord-dashboard/summary", verifyToken, getLandlordDashboardSummary);
router.get("/unit/:id", verifyToken, getUnit);
router.put("/unit/:id", verifyToken, putUnit);

export default router;
