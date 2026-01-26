import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {createOrder,getMyOrders,getOrderById} from "../controllers/OrderController.js";
import Order from "../models/orderModel.js";
const router = express.Router();


router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById); // <--- Add this
// routes/orderRoutes.js



// Create new order

// ✅ Mark order as paid (learning mode, no webhook)
router.put("/:id/mark-paid", authMiddleware, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.paymentStatus = "paid";
  order.status = "pending"; // ✅ VALID ENUM
  await order.save();

  res.json({ message: "Order marked as paid" });
});



export default router;
