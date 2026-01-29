/* import { createServer } from "vercel-node-server";
import express from "express";
import cors from "cors";
import app from "../index.js"; // Make sure this path is correct

const server = express();

// Apply CORS for frontend
server.use(cors({
  origin: "https://sellora-omega.vercel.app",
  credentials: true
}));

// Mount the original Express app directly (no extra /api prefix)
server.use(app);

// Handle OPTIONS preflight
server.options("*", cors({
  origin: "https://sellora-omega.vercel.app",
  credentials: true
}));

export default createServer(server);
 */