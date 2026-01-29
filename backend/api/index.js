import { createServer } from "vercel-node-server";
import express from "express";
import cors from "cors";
import app from "../index.js"; // Original Express app

const server = express();

// Apply CORS
server.use(cors({
  origin: "https://sellora-omega.vercel.app",
  credentials: true
}));

// Mount app directly (no extra /api)
server.use(app);

// Handle OPTIONS preflight
server.options("*", cors({
  origin: "https://sellora-omega.vercel.app",
  credentials: true
}));

export default createServer(server);
