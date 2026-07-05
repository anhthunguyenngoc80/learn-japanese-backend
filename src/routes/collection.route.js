const express = require("express");
const router = express.Router();

const collectionController = require("../controllers/collection.controller");
const { verifyToken } = require("../middlewave/auth.middleware");

router.post("/", verifyToken, collectionController.createCollection);
router.get("/", verifyToken, collectionController.getAllCollections);
router.get(
  "/:collectionId",
  verifyToken,
  collectionController.getCollectionById,
);

module.exports = router;
