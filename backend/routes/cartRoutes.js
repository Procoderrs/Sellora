import express from "express";
import customerAuth from '../middleware/customerAuth.js'
import {
  addToCart,
  getCart,
  removeFromCart,updateCartItem
} from "../controllers/cartcontroller.js";

const router = express.Router();

router.post("/add", customerAuth, addToCart);
router.get("/", customerAuth, getCart);
router.put("/update/:productId", customerAuth, updateCartItem);
router.delete("/remove/:productId", customerAuth, removeFromCart);

export default router;
