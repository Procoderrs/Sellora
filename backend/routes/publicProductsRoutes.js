import express from "express";
import {getAllProducts,getProductBySlug,getProductsByCategory
} from "../controllers/publicProductController.js";

const router = express.Router();

// Public routes (NO AUTH)
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);
router.get("/category/:slug", getProductsByCategory);

export default router;
