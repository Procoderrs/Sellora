import Product from "../models/productModel.js";

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
