import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  getAllOrders,
  updateOrderStatus
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get("/", adminAuth, getAllOrders);
router.put("/:id/status", adminAuth, updateOrderStatus);

export default router;
