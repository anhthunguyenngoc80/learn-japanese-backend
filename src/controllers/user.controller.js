const authService = require("../service/auth.service");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await authService.register(username, email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", data: result.rows });
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
      token: result.token,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(401).json({ error: "Invalid email or password" });
  }
};

module.exports = {
  register,
  login,
};
