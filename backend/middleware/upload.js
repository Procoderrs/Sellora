import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream";

// 1️⃣ Memory storage for multer
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max per file
});

// 2️⃣ Middleware to upload multiple files to Cloudinary
export const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) return next();

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );

        const readable = new Readable();
        readable._read = () => {}; // noop
        readable.push(file.buffer);
        readable.push(null);
        readable.pipe(stream);
      });
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    req.cloudinaryUrls = uploadedUrls; // Array of URLs
    next();
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
};

export default upload;
