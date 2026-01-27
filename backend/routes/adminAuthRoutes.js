import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getDashboard,getTopSellingProducts,getTopCustomers } from "../controllers/adminController.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/stats", authMiddleware,adminOnly, getDashboard);
// routes/adminDashboardRoutes.js
router.get("/top-products",authMiddleware,adminOnly,getTopSellingProducts);

router.get('/top-customer',authMiddleware,adminOnly,getTopCustomers);


export default router;
