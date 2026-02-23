// routes/newsletterRoutes.js
import express from "express";
import { subscribeNewsLetter } from "../controllers/newsletter.js";
import { sendNewsletter } from "../controllers/sendNewsLetter.js";

const router = express.Router();

router.post('/subscribe', subscribeNewsLetter); // user subscription
router.post('/send', sendNewsletter); // admin sends newsletter

export default router;
