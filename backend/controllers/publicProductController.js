import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

/**
 * GET ALL ACTIVE PRODUCTS (PUBLIC)
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      stock: { $gt: 0 }
    })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET SINGLE PRODUCT BY SLUG (PUBLIC)
 */
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      status: "active"
    }).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET PRODUCTS BY CATEGORY SLUG (PUBLIC)
 */
export const getProductsByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      status: "active"
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({
      category: category._id,
      status: "active",
      stock: { $gt: 0 }
    }).populate("category", "name slug");

    res.json({
      category: category.name,
      products
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
