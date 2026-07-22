const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const { ReviewTopicParams, UpdateMasterySchema } = require("../schema");

router.get(
  "/flashcard/:topicId",
  verifyToken,
  validate(ReviewTopicParams),
  reviewController.getFlashcardWordsByTopicId,
);

router.get(
  "/practice/:topicId",
  verifyToken,
  validate(ReviewTopicParams),
  reviewController.getWordsForReview,
);

router.put(
  "/update-mastery",
  verifyToken,
  validate(UpdateMasterySchema),
  reviewController.updateAfterAttempt,
);

module.exports = router;
