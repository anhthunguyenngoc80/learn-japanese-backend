const express = require("express");
const router = express.Router();

const answerController = require("../controllers/answer.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const {
    UpdateAnswerSchema,
    AnswerIdParams,
} = require("../schema");

router.put("/answers/:answerId", verifyToken, validate(UpdateAnswerSchema), answerController.updateAnswer);
router.delete("/answers/:answerId", verifyToken, validate(AnswerIdParams), answerController.deleteAnswer);

module.exports = router;