const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);

module.exports = router;
