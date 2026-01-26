import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EcomUser",
    required: true
  },

  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true
    },
    title: String,
    quantity: Number,
    price: Number
  }],

  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
   enum: [
  "pending",
  "packing",
  "shipped",
  "delivered",
  "cancelled"
],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid"
  },

  stockLocked: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Order=mongoose.model('Order',orderSchema)
export default Order;