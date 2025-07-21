import express from "express";
import {
  putUser,
  getUser,
  getLandlordTenants,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/user", verifyToken, putUser);
router.get("/user", verifyToken, getUser);
router.get("/landlord-tenants", verifyToken, getLandlordTenants);

export default router;
