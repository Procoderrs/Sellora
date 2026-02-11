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



export const mergeCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;

    // Guard: items must be an array
    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: "Invalid merge payload (items must be array)",
      });
    }

    // Fetch existing cart or create a dummy array for merge
    const existingCart = await Cart.findOne({ user: userId });
    const mergedItems = existingCart ? [...existingCart.items] : [];

    // Merge guest cart items into mergedItems
    for (const guestItem of items) {
      if (!guestItem.product || !guestItem.quantity) continue;

      const productId = guestItem.product.toString();

      const existingItem = mergedItems.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        mergedItems.push({
          product: productId,
          title: guestItem.title || "Product",
          images:
            guestItem.images && guestItem.images.length
              ? guestItem.images
              : ["/placeholder.jpg"],
          price:
            typeof guestItem.price === "number" && guestItem.price >= 0
              ? guestItem.price
              : 0,
          quantity: guestItem.quantity > 0 ? guestItem.quantity : 1,
        });
      }
    }

    // HARD dedupe by product id
    const uniqueMap = {};
    mergedItems.forEach((item) => {
      const key = item.product.toString();
      if (uniqueMap[key]) {
        uniqueMap[key].quantity += item.quantity;
      } else {
        uniqueMap[key] = item;
      }
    });

    const finalItems = Object.values(uniqueMap);

    // Calculate totalPrice
    const totalPrice = finalItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Safely update cart in one operation
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: finalItems, totalPrice } },
      { new: true, upsert: true } // create if not exists
    );

    res.json({
      message: "Cart merged safely",
      cart,
    });
  } catch (err) {
    console.error("MERGE CART ERROR:", err);
    res.status(500).json({
      message: "Merge cart failed",
      error: err.message,
    });
  }
};


