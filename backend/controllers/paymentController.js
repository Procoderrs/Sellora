import stripe from "../config/stripe.js";
import Order from "../models/orderModel.js";



export const createCheckoutSession = async (req, res) => {
  console.log("FRONTEND_URL AT RUNTIME =", JSON.stringify(process.env.FRONTEND_URL));

  if (
    !process.env.FRONTEND_URL ||
    !process.env.FRONTEND_URL.startsWith("https://")
  ) {
    return res.status(500).json({
      message: "Invalid FRONTEND_URL on server",
      value: process.env.FRONTEND_URL,
      
    });
  }

      console.log(process.env.FRONTEND_URL);

  const order = await Order.findById(req.params.orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],

    line_items: order.items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),

   success_url: "https://sellora-omega.vercel.app/payment-success?orderId=" + order._id,
cancel_url: "https://sellora-omega.vercel.app/payment-cancel",

    metadata: { orderId: order._id.toString() },
  });

  res.json({ url: session.url });
};

