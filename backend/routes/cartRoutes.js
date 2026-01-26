import express from "express";
import authMiddleware from '../middleware/authMiddleware.js'
import {
  addToCart,
  getCart,
  removeFromCart,updateCartItem,mergeCart
} from "../controllers/cartcontroller.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/update/:productId", authMiddleware, updateCartItem);
router.delete("/remove/:productId", authMiddleware, removeFromCart);
router.post("/merge", authMiddleware, mergeCart);

export default router;
