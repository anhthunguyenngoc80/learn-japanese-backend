const express = require("express");
const router = express.Router();

const sectionController = require("../controllers/section.controller");
const questionController = require("../controllers/question.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const {
  SectionIdParams,
  CreateQuestionsBulkSchema,
  UpdateQuestionsBulkSchema,
  QuestionIdParams,
  UpdateQuestionSchema,
} = require("../schema");

router.get("/:sectionId/questions", verifyToken, validate(SectionIdParams), questionController.getQuestionsBySectionId);
router.post("/:sectionId/questions/bulk", verifyToken, validate(CreateQuestionsBulkSchema), questionController.createQuestions);
router.put("/:sectionId/questions/bulk", verifyToken, validate(UpdateQuestionsBulkSchema), questionController.updateQuestionsBulk);

module.exports = router;