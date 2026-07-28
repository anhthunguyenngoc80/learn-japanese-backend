const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const collectionRoutes = require("./collection.route");
const topicRoutes = require("./topic.route");
const wordRoutes = require("./word.route");
const exampleRoutes = require("./example.route");
const reviewRoutes = require("./review.route");
const sectionRoutes = require("./section.route");
const questionRoutes = require("./question.route");

router.use("/", userRoutes);
router.use("/collections", collectionRoutes);
router.use("/topics", topicRoutes);
router.use("/words", wordRoutes);
router.use("/examples", exampleRoutes);
router.use("/review", reviewRoutes);
router.use("/sections", sectionRoutes);
router.use("/questions", questionRoutes);

module.exports = router;
