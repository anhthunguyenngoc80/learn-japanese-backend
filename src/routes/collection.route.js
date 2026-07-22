const express = require("express");
const router = express.Router();

const collectionController = require("../controllers/collection.controller");
const topicController = require("../controllers/topic.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const {
  CreateCollectionSchema,
  CollectionIdParams,
  CreateTopicSchema,
} = require("../schema");

router.post("/", verifyToken, validate(CreateCollectionSchema), collectionController.createCollection);
router.get("/", verifyToken, collectionController.getAllCollections);
router.get(
  "/:collectionId",
  verifyToken,
  validate(CollectionIdParams),
  collectionController.getCollectionById,
);
router.delete(
  "/:collectionId",
  verifyToken,
  validate(CollectionIdParams),
  collectionController.deleteCollection,
);

router.post("/:collectionId/topics", verifyToken, validate(CreateTopicSchema), topicController.createTopic);
router.get("/:collectionId/topics", verifyToken, validate(CollectionIdParams), topicController.getAllTopics);

module.exports = router;
