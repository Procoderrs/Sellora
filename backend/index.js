import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import createAdmin from "./utils/createAdmin.js";
import { seedCategories } from "./utils/seedCategories.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import customerAuthRoutes from "./routes/customerAuthRoutes.js";
import customerDashboardRoutes from "./routes/customerDashboardRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import publicProductsRoutes from './routes/publicProductsRoutes.js';
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

// Routes
app.use("/api/admin", adminAuthRoutes);
app.use("/api/customers", customerAuthRoutes);
app.use('/api/customerDashboard', customerDashboardRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/products", productRoutes);
app.use('/api/products', publicProductsRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler caught:", err);
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
});

// **Connect DB and seed admin/categories**
const init = async () => {
  try {
    await connectDb();
    await createAdmin();
    await seedCategories();
    console.log("Backend initialized");
  } catch (error) {
    console.error("Initialization error:", error);
  }
};
init();

// ✅ Export app for serverless deployment
export default app;
