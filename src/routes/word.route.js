const express = require("express");
const router = express.Router();

const wordController = require("../controllers/word.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.post("/:topicId", verifyToken, wordController.createWord);
router.get("/:topicId", verifyToken, wordController.getAllWords);
router.get("/:wordId", verifyToken, wordController.getWordById);

module.exports = router;
