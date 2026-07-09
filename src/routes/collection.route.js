const express = require("express");
const router = express.Router();

const collectionController = require("../controllers/collection.controller");
const topicController = require("../controllers/topic.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.post("/", verifyToken, collectionController.createCollection);
router.get("/", verifyToken, collectionController.getAllCollections);
router.get(
  "/:collectionId",
  verifyToken,
  collectionController.getCollectionById,
);
router.delete(
  "/:collectionId",
  verifyToken,
  collectionController.deleteCollection,
);

router.post("/:collectionId/topics", verifyToken, topicController.createTopic);
router.get("/:collectionId/topics", verifyToken, topicController.getAllTopics);

module.exports = router;
