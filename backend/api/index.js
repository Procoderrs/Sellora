import { createServer } from "vercel-node-server";
import express from "express";
import cors from "cors";
import app from "../index.js"; // Original Express app

const server = express();

// --- Apply CORS first ---
server.use(cors({
  origin: "https://sellora-omega.vercel.app", // your frontend
  credentials: true
}));

// Use original app routes
server.use("/api", app);  // Important: prefix with /api

// Handle OPTIONS preflight
server.options("*", cors({
  origin: "https://sellora-omega.vercel.app",
  credentials: true
}));

export default createServer(server);
