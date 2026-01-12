import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {createOrder,getMyOrders} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);

export default router;
