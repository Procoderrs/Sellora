import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getDashboard } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", authMiddleware, getDashboard);

export default router;
