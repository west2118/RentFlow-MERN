import express from "express";
import {
  register,
  login,
  logout,
  refresh,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh); // Or post, depending on standard. We'll use GET for reading cookie.

export default router;
