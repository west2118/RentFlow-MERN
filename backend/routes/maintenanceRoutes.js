import express from "express";
import {
  postMaintenanceRequest,
  getTenantMaintenance,
  getLandlordMaintenance,
  markAsInProgress,
} from "../controllers/maintenance.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/maintenance", verifyToken, postMaintenanceRequest);
router.get("/tenant-maintenance", verifyToken, getTenantMaintenance);
router.get("/landlord-maintenance", verifyToken, getLandlordMaintenance);
router.put("/inprogress-maintenance", verifyToken, markAsInProgress);

export default router;
