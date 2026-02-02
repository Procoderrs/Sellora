// routes/stripeWebhook.js
import express from "express";
import Stripe from "stripe";
import Order from "../models/orderModel.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe needs RAW body
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook signature failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Payment successful
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata.orderId;

      try {
        const order = await Order.findById(orderId);
        if (order && order.paymentStatus !== "paid") {
          order.paymentStatus = "paid";      // mark as paid
          order.status = "packing";          // update order stage
          order.stockLocked = false;         // release stock lock
          await order.save();
          console.log(`Order ${orderId} marked as paid via webhook`);
        }
      } catch (err) {
        console.error("Webhook DB update error:", err);
      }
    }

    res.json({ received: true });
  }
);

export default router;
