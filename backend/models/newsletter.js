import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);
newsletterSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("Newsletter", newsletterSchema);
