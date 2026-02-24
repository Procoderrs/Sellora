// routes/newsletterRoutes.js
import express from "express";
import { subscribeNewsLetter } from "../controllers/newsletter.js";
import { sendNewsletter } from "../controllers/sendNewsLetter.js";
import Newsletter from "../models/newsletter.js"; // add this

const router = express.Router();

router.post('/subscribe', subscribeNewsLetter); // user subscription
router.post('/send', sendNewsletter); // admin sends newsletter
// routes/newsletter.js
router.get("/count", async (req, res) => {
  try {
    const count = await Newsletter.countDocuments({ status: "active" });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
