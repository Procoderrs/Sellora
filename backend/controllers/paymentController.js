import stripe from "../config/stripe.js";
import Order from "../models/orderModel.js";



export const createCheckoutSession = async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: order.items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),

    success_url: `${process.env.FRONTEND_URL}/payment-success?orderId=${order._id}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,

    metadata: {
      orderId: order._id.toString(), // ✅ webhook needs this
    },
  });

  res.json({ url: session.url });
};
