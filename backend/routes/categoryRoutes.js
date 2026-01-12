import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,getCategoryTree
} from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

// Admin-only category routes
router.post("/", authMiddleware,adminOnly, createCategory);        // Create category
router.get("/category-tree",authMiddleware,adminOnly, getCategoryTree);
router.get("/", authMiddleware, getCategories);         // List all categories
router.put("/:id", authMiddleware,adminOnly, updateCategory);     // Update category
router.delete("/:id", authMiddleware,adminOnly, deleteCategory);  // Delete category


export default router;
