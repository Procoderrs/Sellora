import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

// seed utils
import createAdmin from "./utils/createAdmin.js";
import { seedCategories } from "./utils/seedCategories.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import customerDashboardRoutes from "./routes/customerDashboardRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import publicProductsRoutes from "./routes/publicProductsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://sellora-egyc.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

/* DB + Seed */
let isDbConnected = false;
let isSeeded = false;

app.use(async (req, res, next) => {
  if (!isDbConnected) {
    try {
      await connectDb();
      isDbConnected = true;

      if (!isSeeded) {
        await createAdmin();
        await seedCategories();
        isSeeded = true;
      }
    } catch (error) {
      console.error("DB init error:", error);
      return res.status(500).json({ message: "Server initialization failed" });
    }
  }
  next();
});

/* Routes */
app.get("/", (req, res) => res.json({ message: "API running" }));

app.use("/api/authentication", authRoutes);
app.use("/api/customerDashboard", customerDashboardRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/products", publicProductsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

export default app;
