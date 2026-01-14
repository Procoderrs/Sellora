import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import upload, { handleImageUpload } from '../middleware/upload.js';
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

// Admin-only product routes
router.post("/", authMiddleware,adminOnly ,upload.array("images", 2), handleImageUpload, createProduct);
router.get("/",  getProducts);
router.put("/:id", authMiddleware, upload.array("images", 2), handleImageUpload, updateProduct);
router.delete("/:id", authMiddleware,adminOnly, deleteProduct);

export default router;
