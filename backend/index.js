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

/* ---------------- CORS ---------------- */
app.use(
  cors({
    origin: [
      "https://sellora-egyc.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

/* ---------------- BODY PARSER ---------------- */
app.use(express.json());

/* ---------------- DB + SEED (CONTROLLED) ---------------- */
let isDbConnected = false;
let isSeeded = false;

app.use(async (req, res, next) => {
  try {
    if (!isDbConnected) {
      await connectDb();
      isDbConnected = true;
      console.log("MongoDB connected");

      // ⚠️ RUN SEED ONLY ON FIRST CONNECTION PER INSTANCE
      if (!isSeeded) {
        await createAdmin();
        await seedCategories();
        isSeeded = true;
        console.log("Admin & categories ensured");
      }
    }
    next();
  } catch (error) {
    console.error("Initialization error:", error);
    res.status(500).json({ message: "Server initialization failed" });
  }
});

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.status(200).json({ message: "API running" });
});

app.use("/api/authentication", authRoutes);
app.use("/api/customerDashboard", customerDashboardRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/products", publicProductsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

/* ---------------- GLOBAL ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
});

/* ---------------- EXPORT FOR VERCEL ---------------- */
export default app;


/* 
/* 

backend---main-folder
api-folder-->server.js 
inside code-
// backend/api/server.js
import app from "../index.js"; // path to your exported app
import { createServer } from "http";

const server = createServer(app);

export default server;


config-folder-
db conection -
import mongoose from 'mongoose'

const connectDb=async()=>{
  
  try {
    const connection=await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected: ${connection.connection.host}`);
  } catch (error) {
    console.log('mongodb not connected',error.message);
    process.exit(1);

  }
}

export default connectDb;

--controllers
--middlewares
--models
--node-modules
--routes
--utils
env
gitignore
indexjs
packge lock json
pkg json
vercel json


*/
