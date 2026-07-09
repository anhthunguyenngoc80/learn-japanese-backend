const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topic.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.post("collections/:collectionId/topics", verifyToken, topicController.createTopic);
router.get("collections/:collectionId/topics", verifyToken, topicController.getAllTopics);
router.get("topics/:topicId", verifyToken, topicController.getTopicById);

module.exports = router;
