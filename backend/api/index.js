import { createServer } from "vercel-node-server";
import app from '../index.js';

// microCors hatado yahan se, Express wala kafi hai
export default createServer(app);