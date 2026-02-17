import express from "express";
import {getAllProducts,getProductBySlug,getProductsByCategory,getPublicTopSellingProducts,
} from "../controllers/publicProductController.js";

const router = express.Router();

// Public routes (NO AUTH)
router.get("/", getAllProducts);
router.get("/top-selling", getPublicTopSellingProducts); // MUST be BEFORE /:slug
router.get("/category/:slug", getProductsByCategory);
router.get("/:slug", getProductBySlug);



export default router;
