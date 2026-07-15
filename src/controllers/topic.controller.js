const topicService = require("../service/topic.service");
const topicModel = require("../models/topic.model");

const createTopic = async (req, res) => {
  const { collectionId } = req.params;
  const { name } = req.body;

  try {
    const result = await topicModel.createTopic(collectionId, name);
    res.status(201).json({ message: "Create successfull", data: result });
  } catch (error) {
    console.log("Create topic failed", error);
    res.status(401).json({ message: "Create failed" });
  }
};

const getAllTopics = async (req, res) => {
  const { collectionId } = req.params;
  const user_id = req.user.user_id;
  try {
    const result = await topicModel.getAllTopics(collectionId, user_id);
    res.status(201).json({ message: "Get Topics successfully", data: result });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

const getTopicById = async (req, res) => {
  const { topicId } = req.params;
  const user_id = req.user.user_id;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
  try {
    const result = await topicService.getTopicById(user_id, topicId, limit);
    if (!result) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json({ message: "Get Topic successfully", data: result });
  } catch (error) {
    console.log("Query failed", error);
    res.status(500).json({ message: "Query failed" });
  }
};

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
};
