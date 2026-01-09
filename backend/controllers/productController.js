



import Product from "../models/productModel.js";
import slugify from "slugify";
import { uploadImage } from "../utils/cloudinary.js";
// CREATE PRODUCT

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, discount, stock, category, status } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const slug = slugify(title, { lower: true });

    const exists = await Product.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const images = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const url = await uploadImage(file);
        images.push(url);
      }
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

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};




// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "category",
        select: "name slug parent", // include parent field
        populate: { path: "parent", select: "name slug" } // nested populate parent
      })
      .sort({ createdAt: -1 });

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


/**
 * GET SINGLE PRODUCT BY ID
 */
/* export const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name slug");

  if (!product || product.status !== "active") {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};
 */
// UPDATE PRODUCT


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = { ...req.body };

    if (req.body.title) {
      updatedData.slug = slugify(req.body.title, { lower: true });
    }

    if (req.files?.length) {
      const images = [];
      for (const file of req.files) {
        const url = await uploadImage(file);
        images.push(url);
      }
      updatedData.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
