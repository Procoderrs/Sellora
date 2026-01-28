import { createServer } from "vercel-node-server";
import app from "../index.js";

export default createServer(app);