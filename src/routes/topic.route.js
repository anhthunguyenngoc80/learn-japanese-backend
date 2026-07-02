const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topic.controller");

router.post("/:collectionId", topicController.createTopic);
router.get("/:collectionId", topicController.getAllTopics);
router.get(":topicId", topicController.getTopicById);

module.exports = router;
