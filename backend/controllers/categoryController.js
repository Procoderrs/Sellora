import Category from "../models/categoryModel.js";
import slugify from "slugify";

// Create category (main or sub)
export const createCategory = async (req, res) => {
  try {
    const { name, parent, status, description } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required" });

    // Optional parent for subcategory
    const payload = {
      name,
      slug: slugify(name),
      parent: parent || null,
      status: status || "active",
      description: description || ""
    };

    const category = await Category.create(payload);
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent", "name");
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent, status, description } = req.body;

    const updated = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
        parent: parent || null,
        status,
        description
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated", category: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getCategoryTree = async (req, res) => {
  try {
    const parents = await Category.find({ parent: null, status: "active" });

    const result = await Promise.all(
      parents.map(async (parent) => {
        const children = await Category.find({
          parent: parent._id,
          status: "active"
        });

        return {
          _id: parent._id,
          name: parent.name,
          slug: parent.slug,
          subcategories: children
        };
      })
    );

    res.json({ categories: result });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
