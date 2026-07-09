const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const collectionRoutes = require("./collection.route");
const topicRoutes = require("./topic.route");
const wordRoutes = require("./word.route");

router.use("/", userRoutes);
router.use("/collections", collectionRoutes);
router.use("/", topicRoutes);
router.use("/words", wordRoutes);

module.exports = router;
