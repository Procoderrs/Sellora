// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import createAdmin from "./utils/createAdmin.js";
import { seedCategories } from "./utils/seedCategories.js";
//import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import customerDashboardRoutes from "./routes/customerDashboardRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import publicProductsRoutes from './routes/publicProductsRoutes.js';
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://sellora-egyc.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is running"));

//app.use("/api/admin", adminAuthRoutes);
app.use("/api/authentication", authRoutes);
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

// Connect DB and seed admin/categories
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

// ✅ Detect if running locally and start server on port 5000
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

// ✅ Export app for Vercel serverless deployment
export default app;
