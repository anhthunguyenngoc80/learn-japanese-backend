const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const { ReviewSectionParams, UpdateMasterySchema } = require("../schema");

router.get(
  "/flashcard/:sectionId",
  verifyToken,
  validate(ReviewSectionParams),
  reviewController.getFlashcardWordsBySectionId,
);

router.get(
  "/practice/:sectionId",
  verifyToken,
  validate(ReviewSectionParams),
  reviewController.getWordsForReview,
);

router.put(
  "/update-mastery",
  verifyToken,
  validate(UpdateMasterySchema),
  reviewController.updateAfterAttempt,
);

module.exports = router;
