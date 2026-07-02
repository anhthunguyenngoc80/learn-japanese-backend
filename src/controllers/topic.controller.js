const topicModel = require("../model/topic.model");

const createTopic = async (req, res) => {
  const { user_id, name } = req.body;
  try {
    const result = await topicModel.createTopic(user_id, name);
    res.status(201).json({ message: "Create successfull", data: result.rows });
  } catch (error) {
    console.log("Create topic failed", error);
    res.status(401).json({ message: "Create failed" });
  }
};

const getAllTopics = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await topicModel.getAllTopics(user_id);
    res
      .status(201)
      .json({ message: "Get Topics successfully", data: result.rows });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

const getTopicById = async (req, res) => {
  const { user_id } = req.body;
  const { topicId } = req.params;
  try {
    const result = await topicModel.getTopicById(user_id, topicId);
    res
      .status(201)
      .json({ message: "Get Topic successfully", data: result.rows });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
};
