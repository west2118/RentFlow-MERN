import express from "express";
import {
  postUnit,
  getUserUnitAndLease,
  getUserUnitAndUserInfo,
  getUnitWithLeaseStatus,
} from "../controllers/unit.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/unit", verifyToken, postUnit);
router.get("/unit", verifyToken, getUnitWithLeaseStatus);
router.get("/unit-user/:id", verifyToken, getUserUnitAndUserInfo);
router.get("/unit-lease", verifyToken, getUserUnitAndLease);

export default router;
