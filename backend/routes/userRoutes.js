import express from "express";
import {
  putUser,
  getUser,
  getLandlordTenants,
  getSpecificUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/user", verifyToken, putUser);
router.get("/user", verifyToken, getUser);
router.get("/landlord-tenants", verifyToken, getLandlordTenants);
router.get("/specific-user/:id", verifyToken, getSpecificUser);

export default router;
