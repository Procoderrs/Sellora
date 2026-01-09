import axios from "axios";
import FormData from "form-data";

export const uploadImage = async (file) => {
  const base64 = file.buffer.toString("base64");
  const data = new FormData();
  data.append("file", `data:${file.mimetype};base64,${base64}`);
  data.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
    data,
    { headers: data.getHeaders() }
  );

  return res.data.secure_url;
};
