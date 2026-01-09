import express from "express";
import customerAuth from "../middleware/customerAuth.js";

const router = express.Router();

// Example: Get logged-in customer's info
router.get("/profile", customerAuth, (req, res) => {
  res.json({
    message: "Customer profile",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

export default router;
