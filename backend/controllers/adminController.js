import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import User from "../models/UserModel.js";

export const getDashboard = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      // Join subcategory
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "subcategory"
        }
      },
      { $unwind: "$subcategory" },

      // Join parent category (Men/Women/Kids)
      {
        $lookup: {
          from: "categories",
          localField: "subcategory.parent",
          foreignField: "_id",
          as: "parentCategory"
        }
      },
      { $unwind: "$parentCategory" },

      // Group by parent category slug
      {
        $group: {
          _id: "$parentCategory.slug",
          count: { $sum: 1 }
        }
      }
    ]);

    const women = stats.find(s => s._id === "women")?.count || 0;
    const men   = stats.find(s => s._id === "men")?.count || 0;
    const kids  = stats.find(s => s._id === "kids")?.count || 0;

    res.json({ women, men, kids });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// controllers/adminController.js

export const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      // 1️⃣ Sirf completed & paid orders
      {
        $match: {
          paymentStatus: "paid",
          status: "delivered"
        }
      },

      // 2️⃣ items ko alag karo
      { $unwind: "$items" },

      // 3️⃣ product-wise total quantity
      {
        $group: {
          _id: "$items.product",
          name: { $first: "$items.title" },
          totalSold: { $sum: "$items.quantity" }
        }
      },

      // 4️⃣ Highest selling first
      { $sort: { totalSold: -1 } },

      // 5️⃣ Top 5
      { $limit: 5 }
    ]);

    res.json(topProducts);
  } catch (error) {
    console.error("TOP SELLING ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



export const getTopCustomers = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      // Only paid orders
      {
        $match: { paymentStatus: "paid" }
      },

      // Group by user & sum revenue
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$totalAmount" },
          ordersCount: { $sum: 1 }
        }
      },

      // Sort by revenue desc
      { $sort: { totalSpent: -1 } },

      // Limit top 5
      { $limit: 5 },

      // Join users
      {
        $lookup: {
          from: "ecomusers", // ⚠️ collection name
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },

      // Final shape
      {
        $project: {
          _id: 0,
          name: "$user.name",
          email: "$user.email",
          totalSpent: 1,
          ordersCount: 1
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    console.error("TOP CUSTOMERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
