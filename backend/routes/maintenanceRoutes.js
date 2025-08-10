import express from "express";
import {
  postMaintenanceRequest,
  getTenantMaintenance,
  getLandlordMaintenance,
  getLandlordMaintenanceDashboard,
  markAsInProgress,
  getMaintenance,
  putMaintenance,
} from "../controllers/maintenance.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/maintenance", verifyToken, postMaintenanceRequest);
router.get("/tenant-maintenance", verifyToken, getTenantMaintenance);
router.get("/landlord-maintenance", verifyToken, getLandlordMaintenance);
router.get(
  "/landlord-latest-maintenance",
  verifyToken,
  getLandlordMaintenanceDashboard
);
router.put("/inprogress-maintenance", verifyToken, markAsInProgress);
router.get("/maintenance/:id", verifyToken, getMaintenance);
router.put("/maintenance/:id", verifyToken, putMaintenance);

export default router;
