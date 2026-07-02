const express = require("express");
const router = express.Router();

const collectionController = require("../controllers/collection.controller");

router.post("/", collectionController.createCollection);
router.get("/", collectionController.getAllCollections);
router.get("/:collectionId", collectionController.getCollectionById);

module.exports = router;
