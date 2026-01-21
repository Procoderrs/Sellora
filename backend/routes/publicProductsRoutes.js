import express from "express";
import {getAllProducts,getProductBySlug,getProductsByCategory
} from "../controllers/publicProductController.js";

const router = express.Router();

// Public routes (NO AUTH)
router.get("/", getAllProducts);
router.get("/category/:slug", getProductsByCategory);
router.get("/:slug", getProductBySlug);


export default router;
