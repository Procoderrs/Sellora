import { createServer } from "vercel-node-server";
import app from "../index.js";
import microCors from "micro-cors";

const cors = microCors({
    origin: "https://sellora-4ta9.vercel.app",
    allowMethods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowHeaders: ["Content-Type","Authorization"],
    allowCredentials: true
});

export default createServer(cors(app));
