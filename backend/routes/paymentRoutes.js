import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();
router.post('/:orderId',authMiddleware,createCheckoutSession)
export default router;