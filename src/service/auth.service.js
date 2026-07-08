const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const register = async (username, email, password) => {
  const existingUser = await userModel.findByEmail(email);
  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await userModel.register(username, email, hashedPassword);
  return result;
};

const login = async (email, password) => {
  const result = await userModel.login(email);

  if (!result) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  const isMatch = await bcrypt.compare(password, result.password);

  if (!isMatch) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  // Tạo token
  const token = jwt.sign(
    {
      user_id: result.user_id,
      email: result.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  return {
    token,
    user_id: result.user_id,
    username: result.username,
    email: result.email,
  };
};

module.exports = {
  register,
  login,
};
