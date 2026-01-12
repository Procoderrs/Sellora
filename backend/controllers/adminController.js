
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


