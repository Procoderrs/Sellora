import stripe from "../config/stripe.js";
import Order from "../models/orderModel.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.params;

    // 1️⃣ Fetch order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2️⃣ Prevent double payment
    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    // 3️⃣ Create Stripe session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: order.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),

      metadata: {
        orderId: order._id.toString(),
      },

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    // 4️⃣ Return Stripe URL
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ message: "Stripe checkout failed" });
  }
};
