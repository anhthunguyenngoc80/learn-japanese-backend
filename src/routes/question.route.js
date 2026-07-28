const express = require("express");
const router = express.Router();

const questionController = require("../controllers/question.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const {
  UpdateQuestionSchema,
} = require("../schema");

router.put("/questions/:questionId", verifyToken, validate(UpdateQuestionSchema), questionController.updateQuestion);

module.exports = router;