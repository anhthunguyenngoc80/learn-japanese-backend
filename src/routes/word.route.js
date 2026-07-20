const express = require("express");
const router = express.Router();

const wordController = require("../controllers/word.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.post("/:topicId", verifyToken, wordController.createWord);
router.post("/:topicId/bulk", verifyToken, wordController.createWords);
router.get("/:topicId", verifyToken, wordController.getAllWords);
router.get("/:wordId", verifyToken, wordController.getWordById);

module.exports = router;
