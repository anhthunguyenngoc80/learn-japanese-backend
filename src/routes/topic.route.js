const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topic.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const { TopicIdParams } = require("../schema");

router.get("/:topicId", verifyToken, validate(TopicIdParams), topicController.getTopicById);

module.exports = router;
