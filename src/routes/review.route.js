const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.get(
  "/flashcard/:topicId",
  verifyToken,
  reviewController.getFlashcardWordsByTopicId,
);

router.get(
  "/practice/:topicId",
  verifyToken,
  reviewController.getWordsForReview,
);

router.put(
  "/update-mastery",
  verifyToken,
  reviewController.updateAfterAttempt,
);

module.exports = router;
