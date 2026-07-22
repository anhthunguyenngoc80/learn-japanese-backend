const wordModel = require("../models/word.model");

const createWord = async (req, res) => {
  const { topicId } = req.params;
  const { text, sv_word, reading, meaning, part_of_speech } = req.body;
  try {
    const result = await wordModel.createWord(
      topicId,
      { text, sv_word, reading, meaning, part_of_speech },
    );
    res.status(201).json({ message: "Create successfull", data: result });
  } catch (error) {
    console.log("Create word failed", error);
    res.status(401).json({ message: "Create failed" });
  }
};

const createWords = async (req, res) => {
  const { topicId } = req.params;
  const { words } = req.body;
  try {
    if (!Array.isArray(words) || words.length === 0) {
      return res.status(400).json({ message: "Words array is required" });
    }
    const result = await wordModel.createWords(topicId, words);
    res.status(201).json({ message: "Create words successfully", data: result });
  } catch (error) {
    console.log("Create words failed", error);
    res.status(401).json({ message: "Create failed" });
  }
};

const getAllWords = async (req, res) => {
  const { topicId } = req.params;
  const user_id = req.user.user_id;
  try {
    const result = await wordModel.getAllWords(topicId, user_id);
    res.status(200).json({ message: "Get words successfully", data: result });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

const getWordById = async (req, res) => {
  const { wordId } = req.params;
  try {
    const result = await wordModel.getWordById(wordId);
    res.status(200).json({ message: "Get word successfully", data: result });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

const updateWords = async (req, res) => {
  const { words } = req.body;
  try {
    const result = await wordModel.updateWords(words);
    res.status(200).json({ message: "Update words successfully", data: result });
  } catch (error) {
    console.log("Update words failed", error);
    res.status(500).json({ message: "Update words failed" });
  }
};

module.exports = {
  createWord,
  createWords,
  updateWords,
  getAllWords,
  getWordById,
};
