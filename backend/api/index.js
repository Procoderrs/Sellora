import { createServer } from "vercel-node-server";
import express from "express";
import cors from "cors";
import app from '../index.js'; // original Express app

// New wrapper server
const server = express();

// --- Apply CORS here ---
server.use(cors({
  origin: "https://sellora-omega.vercel.app", // frontend Vercel URL
  credentials: true
}));

// Use your original app routes
server.use(app);

// Handle OPTIONS preflight (important for credentials)
server.options("*", cors({
  origin: "https://sellora-omega.vercel.app",
  credentials: true
}));

// Export Vercel server
export default createServer(server);
