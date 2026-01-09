import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

/**
 * GET ALL ORDERS (ADMIN)
 */
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json({ orders });
};

/**
 * UPDATE ORDER STATUS (ADMIN)
 */

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  const order = await Order.findById(orderId).populate("items.product");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  /**
   * 🔒 INVENTORY SAFETY CHECK
   * Reduce stock ONLY once
   */
  if (status === "paid" && order.paymentStatus !== "paid") {
    for (let item of order.items) {
      const product = await Product.findById(item.product._id);

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.title}`
        });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    order.paymentStatus = "paid";
  }

  /**
   * RESTORE INVENTORY IF ORDER CANCELLED
   */
  if (status === "cancelled" && order.paymentStatus === "paid") {
    for (let item of order.items) {
      const product = await Product.findById(item.product._id);
      product.stock += item.quantity;
      await product.save();
    }

    order.paymentStatus = "unpaid";
  }

  order.status = status;
  await order.save();

  res.json({
    message: "Order status updated & inventory synced",
    order
  });
};
