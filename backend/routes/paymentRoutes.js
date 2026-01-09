import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController.js';
import customerAuth from "../middleware/customerAuth.js";

const router=express.Router();
router.post('/checkout/:orderId',customerAuth,createCheckoutSession)
export default router;