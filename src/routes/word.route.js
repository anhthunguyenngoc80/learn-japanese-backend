const express = require("express");
const router = express.Router();

const wordController = require("../controllers/word.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const {
  CreateWordSchema,
  CreateWordsBulkSchema,
  UpdateWordsBulkSchema,
  TopicIdParamsWords,
  WordIdParams,
} = require("../schema");

router.post("/:topicId", verifyToken, validate(CreateWordSchema), wordController.createWord);
router.post("/:topicId/bulk", verifyToken, validate(CreateWordsBulkSchema), wordController.createWords);
router.put("/bulk", verifyToken, validate(UpdateWordsBulkSchema), wordController.updateWords);
router.get("/:topicId", verifyToken, validate(TopicIdParamsWords), wordController.getAllWords);
router.get("/:wordId", verifyToken, validate(WordIdParams), wordController.getWordById);

module.exports = router;
