// backend/controllers/productController.js
import Product from "../models/productModel.js";
import slugify from "slugify";
import Category from "../models/categoryModel.js";

/* ---------------- CREATE PRODUCT ---------------- */
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, discount, stock, category, status } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    // Check if category exists
    const categoryExists = await Category.findById(category);
    console.log("CATEGORY EXISTS:", categoryExists); // 👈 yeh line

    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Handle images uploaded via Cloudinary middleware
    const images = req.cloudinaryUrls || [];

    // Generate unique slug
    const baseSlug = slugify(title, { lower: true });
    let slug = baseSlug;
    let count = 1;
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const product = await Product.create({
      title,
      slug,
      description,
      price,
      discount,
      stock,
      category,
      status,
      images,
    });

    // Populate category with parent
    const populatedProduct = await Product.findById(product._id)
      .populate({
        path: "category",
        select: "name slug parent",
        populate: { path: "parent", select: "name slug" },
      });

    res.status(201).json({ message: "Product created successfully", product: populatedProduct });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate product slug" });
    }
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- UPDATE PRODUCT ---------------- */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      discount,
      stock,
      status,
      category,
      existingImages = "[]"
    } = req.body;

    // Parse existing images
    let oldImages = [];
    try {
      oldImages = JSON.parse(existingImages);
    } catch {
      oldImages = [];
    }

    // Merge new uploaded images
    const newImages = req.cloudinaryUrls || [];
    let finalImages = [...oldImages];
    newImages.forEach((url, index) => {
      finalImages[index] = url;
    });

    const updatedData = {
      title,
      description,
      price,
      discount,
      stock,
      status,
      category,
      images: finalImages,
    };

    // Slug logic
    if (title) {
      const baseSlug = slugify(title, { lower: true });
      let slug = baseSlug;
      let count = 1;
      while (await Product.findOne({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${count}`;
        count++;
      }
      updatedData.slug = slug;
    }

    await Product.findByIdAndUpdate(id, updatedData, { new: true });

    // Populate after update
    const populatedProduct = await Product.findById(id)
      .populate({
        path: "category",
        select: "name slug parent",
        populate: { path: "parent", select: "name slug" },
      });

    if (!populatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: populatedProduct });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET ALL PRODUCTS ---------------- */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "category",
        select: "name slug parent",
        populate: { path: "parent", select: "name slug" },
      })
      .sort({ createdAt: -1 });

    res.json({ products });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ---------------- DELETE PRODUCT ---------------- */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};