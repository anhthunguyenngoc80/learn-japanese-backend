const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topic.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.post("/:collectionId", verifyToken, topicController.createTopic);
router.get("/:collectionId", verifyToken, topicController.getAllTopics);
router.get("/:topicId", verifyToken, topicController.getTopicById);

module.exports = router;
