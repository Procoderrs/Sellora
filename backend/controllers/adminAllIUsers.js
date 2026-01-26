import User from '../models/UserModel.js';

/**
 * GET ALL USERS (ADMIN ONLY)
 */
export const getAllUsers = async (req, res) => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  res.json({ users });
};
