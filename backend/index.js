import express from "express";
import dotenv from "dotenv";
import connectDb from './config/db.js';
import cors from 'cors'
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
import publicCategoryRoutes from './routes/publicCategoryRoutes.js'
import paymentRoutes from "./routes/paymentRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "https://sellora-4ta9.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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
connectDb()
  .then(async () => {
    console.log("Database connected");
    await createAdmin();
    await seedCategories();
    console.log("Admin and categories seeded");
  })
  .catch((error) => {
    console.error("Server startup error:", error);
  });

// Export the app (no CORS here)
export default app;

// Local dev
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

/* 

main folder
1: backend folder
2: frontend folder
backend folder mein -
--api folder
--config folder
--middleware folder
--models-folder
--routes folder
-- utils folder
-- env file
-- gitignore
-- index js
--package json
--package lock json
....



*/