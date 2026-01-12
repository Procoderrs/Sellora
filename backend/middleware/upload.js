// uploadMiddleware.js
import multer from "multer";
import { Readable } from "stream";
import cloudinary from "../utils/cloudinary.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const handleImageUpload = async (req, res, next) => {
  if (!req.files?.length) return next();

  try {
    const urls = [];
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "product_images" },
          (err, res) => (err ? reject(err) : resolve(res))
        );

        const readable = new Readable();
        readable._read = () => {};
        readable.push(file.buffer);
        readable.push(null);
        readable.pipe(stream);
      });
      urls.push(result.secure_url);
    }
    req.cloudinaryUrls = urls;
    next();
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    res.status(500).json({ message: "Image upload failed" });
  }
};

export default upload;
