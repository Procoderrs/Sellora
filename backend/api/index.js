import { createServer } from "vercel-node-server";
import app from "../index.js";
import microCors from "micro-cors";

const cors = microCors({ allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], origin: "*" });

export default createServer(cors(app));
