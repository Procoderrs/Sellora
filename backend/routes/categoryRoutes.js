import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,getCategoryTree
} from "../controllers/categoryController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Admin-only category routes
router.post("/", adminAuth, createCategory);        // Create category
router.get("/category-tree",adminAuth, getCategoryTree);
router.get("/", adminAuth, getCategories);         // List all categories
router.put("/:id", adminAuth, updateCategory);     // Update category
router.delete("/:id", adminAuth, deleteCategory);  // Delete category


export default router;
