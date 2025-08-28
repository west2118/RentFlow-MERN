import express from "express";
import {
  putUser,
  getUser,
  getLandlordTenants,
  getSpecificUser,
  getLandlordAllTenants,
  editUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/user", verifyToken, putUser);
router.get("/user", verifyToken, getUser);
router.put("/update-user", verifyToken, editUser);
router.get("/landlord-tenants", verifyToken, getLandlordTenants);
router.get("/specific-user/:id", verifyToken, getSpecificUser);
router.get("/landlord-all-tenants", verifyToken, getLandlordAllTenants);

export default router;
