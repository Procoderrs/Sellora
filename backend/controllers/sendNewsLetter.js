import Newsletter from "../models/newsletter.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendNewsletter = async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ message: "Subject & content required" });
    }

    // Active subscribers fetch
    const subscribers = await Newsletter.find({ status: "active" });

    if (!subscribers.length) {
      return res.status(404).json({ message: "No subscribers found" });
    }

    // Subscribers emails array
    const emails = subscribers.map((sub) => sub.email);

    // Send email
    await sendEmail({
      to: process.env.EMAIL_USER, // Admin email ya placeholder
      bcc: emails,                // BCC me subscribers
      subject,
      html: `<div>${content}</div>`,
    });

    res.json({ message: "Newsletter sent successfully" });
  } catch (error) {
    console.log("send newsletter error", error);
    res.status(500).json({ message: "Server error" });
  }
};
