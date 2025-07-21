import express from "express";
import {
  postUnit,
  getUnitWithLeaseStatus,
} from "../controllers/unit.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/unit", verifyToken, postUnit);
router.get("/unit", verifyToken, getUnitWithLeaseStatus);

export default router;
