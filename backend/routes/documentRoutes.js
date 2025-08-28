import express from "express";
import {
  getLandlordDocuments,
  getTenantDocuments,
  postDocument,
} from "../controllers/document.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/document", verifyToken, postDocument);
router.get("/tenant-documents", verifyToken, getTenantDocuments);
router.get("/landlord-documents", verifyToken, getLandlordDocuments);

export default router;
