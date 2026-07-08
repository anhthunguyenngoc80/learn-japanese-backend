const authService = require("../service/auth.service");
const userModel = require("../models/user.model");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await authService.register(username, email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", data: result });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authService.login(email, password);
    res.status(200).json({
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(401).json({ error: res.message });
  }
};

const getMe = async (req, res) => {
  try {
    const { user_id } = req.user;

    const user = await userModel.getUserById(user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
