import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllOrders,
  updateOrderStatus
} from "../controllers/adminOrderController.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/", authMiddleware,adminOnly, getAllOrders);
router.put("/:id/status", authMiddleware, adminOnly,updateOrderStatus);

export default router;
