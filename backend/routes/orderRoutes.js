import express from "express";
import customerAuth from "../middleware/customerAuth.js";
import {createOrder,getMyOrders} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/", customerAuth, createOrder);
router.get("/my-orders", customerAuth, getMyOrders);

export default router;
