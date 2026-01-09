// backend/api/server.js
import app from "../index.js"; // path to your exported app
import { createServer } from "http";

const server = createServer(app);

export default server;
