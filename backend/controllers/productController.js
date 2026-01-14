import Product from "../models/productModel.js";
import slugify from "slugify";

// CREATE PRODUCT
// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, discount, stock, category, status } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Base slug from title
    const baseSlug = slugify(title, { lower: true });
    let slug = baseSlug;
    let count = 1;

    // Ensure slug is unique
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
      images: req.cloudinaryUrls || [],
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate product slug" });
    }

    res.status(500).json({ message: error.message });
  }
};



// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    // Handle slug update safely
    if (req.body.title) {
      const baseSlug = slugify(req.body.title, { lower: true });
      let slug = baseSlug;
      let count = 1;

      while (
        await Product.findOne({ slug, _id: { $ne: id } })
      ) {
        slug = `${baseSlug}-${count}`;
        count++;
      }

      updatedData.slug = slug;
    }

    // Handle image updates
    if (req.cloudinaryUrls?.length) {
      updatedData.images = req.cloudinaryUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};




// GET ALL PRODUCTS
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE PRODUCT
/* export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (req.body.title) {
      updatedData.slug = slugify(req.body.title, { lower: true });
    }

    if (req.files?.length) {
      updatedData.images = req.files.map(file => file.path); // URLs from multer-storage-cloudinary
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
 */
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
