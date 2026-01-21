import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

/**
 * ADD TO CART
 */
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);

  if (!product || product.status !== "active") {
    return res.status(404).json({ message: "Product not available" });
  }

  if (quantity > product.stock) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
      totalPrice: 0,
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      title: product.title,
      images: product.images, // 👈 Save all images here
      quantity,
      price: product.price,
    });
  }
console.log(product.images);
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  await cart.save();

  res.json({
    message: "Product added to cart",
    cart,
  });
};



/**
 * UPDATE CART ITEM QUANTITY
 */
export const updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ message: "Product not in cart" });
  }

  // Check stock
  const product = await Product.findById(productId);
  if (!product || quantity > product.stock) {
    return res.status(400).json({ message: "Invalid stock quantity" });
  }

  // Update quantity
  item.quantity = quantity;

  // Update total price
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  await cart.save();

  res.json({ message: "Cart updated", cart });
};


/**
 * GET CART
 */
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return res.json({ items: [], totalPrice: 0 });

  res.json(cart);
};


/**
 * REMOVE ITEM FROM CART
 */
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  await cart.save();

  res.json({ message: "Item removed", cart });
};
