import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EcomUser",
    required: true,
    unique: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      title: { type: String, required: true },
      images: [{ type: String, required: true }], // store snapshot of product images
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    },
  ],

  totalPrice: { type: Number, default: 0 },
}, { timestamps: true });


cartSchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 3 } // 3 days
);


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
