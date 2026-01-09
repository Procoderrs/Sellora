import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { login, getDashboard } from "../controllers/adminController.js";

const router = express.Router();

// Admin login
router.post("/login", login);

// Admin dashboard (protected)
router.get("/dashboard", adminAuth, getDashboard);

export default router;
