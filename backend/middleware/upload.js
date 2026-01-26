import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream";

// Multer memory storage
const storage = multer.memoryStorage();

const upload = multer({
	storage,
	limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
});

// Middleware to upload to Cloudinary
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
					},
				);

				const readable = new Readable();
				readable._read = () => {};
				readable.push(file.buffer);
				readable.push(null);
				readable.pipe(stream);
			});
		});

		const uploadedUrls = await Promise.all(uploadPromises);
		req.cloudinaryUrls = uploadedUrls;
		next();
	} catch (error) {
		console.error("Cloudinary upload error:", error);
		res
			.status(500)
			.json({ message: "Image upload failed", error: error.message });
	}
};

export default upload;
