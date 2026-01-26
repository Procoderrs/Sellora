import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js"
import serverless from "serverless-http";

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
    "https://sellora-ifou.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use(express.json());

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

// Connect to DB & seed on cold start
let isDbInitialized = false;

const initDb = async () => {
  if (!isDbInitialized) {
    try {
      await connectDb();
      await createAdmin();
      await seedCategories();
      isDbInitialized = true;
      console.log("DB connected and seeded");
    } catch (err) {
      console.error("DB initialization failed", err);
      throw err;
    }
  }
};

// Wrap Express app for serverless
const handler = serverless(app);

export default async (req, res) => {
  try {
    await initDb();
    return handler(req, res);
  } catch (err) {
    res.status(500).json({ message: "Server initialization failed", error: err.message });
  }
};
