import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";
import { getAllUsers } from "../controllers/adminAllIUsers.js";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getAllUsers);

export default router;
