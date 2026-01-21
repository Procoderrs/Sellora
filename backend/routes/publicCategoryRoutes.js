import express from "express";
import { getPublicCategories } from "../controllers/publicProductController.js";

const router = express.Router();

router.get("/", getPublicCategories);

export default router;
