
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const getDashboard = async (req, res) => {
  res.json({
    message: "Admin dashboard data",
    stats: {
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
      pendingOrders: 0,
    },
  });
};

export  const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Only admin allowed here
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};