const express = require("express");
const router = express.Router();

const questionController = require("../controllers/question.controller");
const answerController = require("../controllers/answer.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const {
  QuestionIdParams,
  SectionIdParams,
  UpdateQuestionSchema,
  CreateAnswersBulkSchema,
  UpdateAnswersBulkSchema,
  AnswerIdParams,
} = require("../schema");

router.put("/:questionId", verifyToken, validate(UpdateQuestionSchema), questionController.updateQuestion);
router.delete("/:questionId", verifyToken, validate(QuestionIdParams), questionController.deleteQuestion);

router.get("/:questionId/answers", verifyToken, validate(QuestionIdParams), answerController.getAnswersByQuestionId);
router.post("/:questionId/answers/bulk", verifyToken, validate(CreateAnswersBulkSchema), answerController.createAnswers);
router.put("/:questionId/answers/bulk", verifyToken, validate(UpdateAnswersBulkSchema), answerController.updateAnswersBulk);


module.exports = router;