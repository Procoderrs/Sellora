import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from './config/db.js';

// seed utils
import createAdmin from "../utils/createAdmin.js";
import { seedCategories } from "../utils/seedCategories.js";

// routes
import authRoutes from "../routes/authRoutes.js";
import customerDashboardRoutes from "../routes/customerDashboardRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import publicProductsRoutes from "../routes/publicProductsRoutes.js";
import cartRoutes from "../routes/cartRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import adminOrderRoutes from "../routes/adminOrderRoutes.js";
import publicCategoryRoutes from '../routes/publicCategoryRoutes.js'
import paymentRoutes from "../routes/paymentRoutes.js";
import adminUserRoutes from "../routes/adminUserRoutes.js";
import adminAuthRoutes from "../routes/adminAuthRoutes.js";


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
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/dashboard", adminAuthRoutes);
app.use("/api/customerDashboard", customerDashboardRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/products", publicProductsRoutes);
app.use("/api/categories", publicCategoryRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/checkout", paymentRoutes);

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

/* DB + Seed */
const startServer = async () => {
  try {
    await connectDb();
    console.log("Database connected");

    // Seed admin and categories on every server start
    await createAdmin();
    await seedCategories();
    console.log("Admin and categories seeded");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1); // stop server if DB fails
  }
};

startServer();


/* 

backend 
1:api
2:config
3:controllers
4:middleware
5:models
6:nodemodules
7:routes
8:utils
env 
gitignore
pkg json
pkg lock json
vercel json



*/