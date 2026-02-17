import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Order from "../models/orderModel.js";

/**
 * GET ALL ACTIVE PRODUCTS (PUBLIC)
 */
// GET ALL ACTIVE PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      stock: { $gt: 0 }
    })
      .populate({
        path: "category",
        select: "name slug parent",
        populate: { path: "parent", select: "name slug" }
      })
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





export const getPublicCategories = async (req, res) => {
  try {
    const categories = await Category.find({ status: "active" })
      .populate("parent", "name slug")
      .sort({ createdAt: -1 });

    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const getPublicTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      // Only paid orders
      { $match: { paymentStatus: "paid" } },
      { $unwind: "$items" },

      // Group by product and sum quantity sold
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" }
        }
      },

      // Sort by most sold
      { $sort: { totalSold: -1 } },
      { $limit: 10 },

      // Lookup product details
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },

      // Only active and in-stock products
      {
        $match: {
          "product.status": "active",
          "product.stock": { $gt: 0 }
        }
      },

      // Lookup category details
      {
        $lookup: {
          from: "categories",
          localField: "product.category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },

      // Lookup parent category
      {
        $lookup: {
          from: "categories",
          localField: "category.parent",
          foreignField: "_id",
          as: "parentCategory"
        }
      },
      { $unwind: { path: "$parentCategory", preserveNullAndEmptyArrays: true } },

      // Project final shape
      {
        $project: {
          _id: "$product._id",
          totalSold: 1,
          title: "$product.title",
          slug: "$product.slug",
          price: "$product.price",
          images: "$product.images",
          description: "$product.description", 
          category: {
            _id: "$category._id",
            name: "$category.name",
            slug: "$category.slug",
            parent: {
              _id: "$parentCategory._id",
              name: "$parentCategory.name",
              slug: "$parentCategory.slug"
            }
          }
        }
      }
    ]);

    res.json({ products: topProducts });
  } catch (error) {
    console.error("PUBLIC TOP PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};