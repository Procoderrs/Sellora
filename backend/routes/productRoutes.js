import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {createProduct,getProducts,updateProduct,deleteProduct} from "../controllers/productController.js";
import parser from '../middleware/upload.js';

const router = express.Router();

// Admin-only product routes
router.post("/", adminAuth, parser.array('images', 5),createProduct);
router.get("/", adminAuth, getProducts);
//router.get("/:id",adminAuth,getSingleProduct)
router.put("/:id", adminAuth,parser.array('images', 5), updateProduct);
router.delete("/:id", adminAuth, deleteProduct);

export default router;
