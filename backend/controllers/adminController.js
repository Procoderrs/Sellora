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

    const coffee = stats.find(s => s._id === "coffee")?.count || 0;
    const brownie   = stats.find(s => s._id === "brownie")?.count || 0;
    const cake  = stats.find(s => s._id === "cakes")?.count || 0;
    const cupcake  = stats.find(s => s._id === "cupcakes")?.count || 0;
console.log(coffee,brownie,cake,cupcake);

    res.json({ coffee,brownie,cake,cupcake });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// controllers/adminController.js

export const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid"   // only real sales
        }
      },

      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" }
        }
      },

      { $sort: { totalSold: -1 } },
      { $limit: 5 },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },

      { $unwind: "$product" },

      {
        $project: {
          _id: 1,
          totalSold: 1,
          name: "$product.title",
          price: "$product.price",
          image: { $arrayElemAt: ["$product.images", 0] }
        }
      }
    ]);





    /* 
    
    
    
    
    
    */
    console.log("TOP PRODUCTS:", topProducts);

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
