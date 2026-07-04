const express = require("express");
const router = express.Router();

const wordController = require("../controllers/word.controller");

router.post("/:topicId", wordController.createWord);
router.get("/:topicId", wordController.getAllWords);
router.get("/:wordId", wordController.getWordById);

module.exports = router;
