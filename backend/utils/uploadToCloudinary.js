import cloudinary from "./cloudinary.js";
import { Readable } from "stream";

export const uploadToCloudinary = (file, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(file.buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};
