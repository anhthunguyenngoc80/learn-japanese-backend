const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const collectionRoutes = require("./collection.route");
const topicRoutes = require("./topic.route");
const wordRoutes = require("./word.route");
const reviewRoutes = require("./review.route");

router.use("/", userRoutes);
router.use("/collections", collectionRoutes);
router.use("/topics", topicRoutes);
router.use("/words", wordRoutes);
router.use("/review", reviewRoutes);

module.exports = router;
