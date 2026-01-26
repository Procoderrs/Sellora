import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

/**
 * CREATE ORDER FROM CART
 */

export const createOrder = async (req, res) => {
  const userId = req.user._id;
  const { shippingAddress } = req.body;

  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // Stock validation + lock
  for (const item of cart.items) {
    const product = await Product.findById(item.product);

    if (!product || product.stock < item.quantity) {
      return res.status(400).json({
        message: `Not enough stock for ${product?.title}`
      });
    }

    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    user: userId,
    items: cart.items,
    shippingAddress,
    totalAmount: cart.totalPrice,
    paymentStatus: "unpaid",
    status: "pending"
  });

  await Cart.findByIdAndDelete(cart._id);

  res.status(201).json({
    message: "Order created successfully",
    order
  });
};



/**
 * GET CUSTOMER ORDERS
 */
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.json({ orders });
};


// controllers/OrderController.js
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Make sure the logged-in user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
