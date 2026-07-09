const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topic.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.get("/:topicId", verifyToken, topicController.getTopicById);

module.exports = router;
