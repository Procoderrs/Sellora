import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

/**
 * CREATE ORDER FROM CART
 */

export const createOrder = async (req, res) => {
  const userId = req.user._id;

  // 1️⃣ Get cart
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // 2️⃣ Validate stock & lock it
  for (const item of cart.items) {
    const product = await Product.findById(item.product);

    if (!product || product.stock < item.quantity) {
      return res.status(400).json({
        message: `Not enough stock for ${product?.title}`
      });
    }

    // 🔒 LOCK STOCK
    product.stock -= item.quantity;
    await product.save();
  }

  // 3️⃣ Create order
  const order = await Order.create({
    user: userId,
    items: cart.items,
    totalAmount: cart.totalPrice,
    status: "pending",
    paymentStatus: "unpaid"
  });

  // 4️⃣ Clear cart
  await Cart.findByIdAndDelete(cart._id);

  res.status(201).json({
    message: "Order created, stock locked",
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
