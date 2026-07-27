const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topic.controller");
const sectionController = require("../controllers/section.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const { TopicIdParams, CreateSectionsBulkSchema } = require("../schema");

router.get("/:topicId", verifyToken, validate(TopicIdParams), topicController.getTopicById);
router.post("/:topicId/sections/bulk", verifyToken, validate(CreateSectionsBulkSchema), sectionController.createSections);

module.exports = router;
