const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const { RegisterSchema, LoginSchema } = require("../schema");

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);
router.get("/me", verifyToken, getMe);

module.exports = router;
