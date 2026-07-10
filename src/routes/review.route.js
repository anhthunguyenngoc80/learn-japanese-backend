const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.get(
  "/flashcard/:topicId",
  verifyToken,
  reviewController.getFlashcardWordsByTopicId,
);

module.exports = router;
