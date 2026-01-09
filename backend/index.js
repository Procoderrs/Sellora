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
import publicProductsRoutes from './routes/publicProductsRoutes.js'
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
/* import paymentRoutes from './routes/paymentRoutes.js';
 */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;

// Routes
/* app.use("/api/auth", authRoutes);  */      // admin login
app.use("/api/admin", adminAuthRoutes);     // protected admin endpoints
app.use("/api/customers", customerAuthRoutes); // customer login/register
app.use('/api/customerDashboard',customerDashboardRoutes)
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/products", productRoutes);
app.use('/api/products',publicProductsRoutes);
app.use('/api/cart',cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
/* app.use('/api/payment',paymentRoutes)
 */

// Global error handler (optional but recommended)
 // Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler caught:", err);
  res.status(500).json({
    message: "Server error",
    error: err.message, // send actual error message for debugging
  });
});


const startServer = async () => {
  try {
    await connectDb();
    await createAdmin(); // ensure admin exists after DB is ready
     await seedCategories() 

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();

