const express = require("express");
const router = express.Router();

const wordController = require("../controllers/word.controller");
const exampleController = require("../controllers/example.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const {
  CreateWordSchema,
  CreateWordsBulkSchema,
  UpdateWordsBulkSchema,
  TopicIdParamsWords,
  WordIdParams,
  CreateExampleSchema,
  CreateExamplesBulkSchema,
} = require("../schema");

router.post("/:topicId", verifyToken, validate(CreateWordSchema), wordController.createWord);
router.post("/:topicId/bulk", verifyToken, validate(CreateWordsBulkSchema), wordController.createWords);
router.put("/bulk", verifyToken, validate(UpdateWordsBulkSchema), wordController.updateWords);
router.get("/:topicId", verifyToken, validate(TopicIdParamsWords), wordController.getAllWords);
router.get("/:wordId", verifyToken, validate(WordIdParams), wordController.getWordById);
router.delete("/:wordId", verifyToken, validate(WordIdParams), wordController.deleteWord);
router.post("/:wordId/examples", verifyToken, validate(CreateExampleSchema), exampleController.createExample);
router.post("/:wordId/examples/bulk", verifyToken, validate(CreateExamplesBulkSchema), exampleController.createExamplesBulk);

module.exports = router;
