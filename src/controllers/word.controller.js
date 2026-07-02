const topicModel = require("../model/topic.model");

const createWord = async (req, res) => {
  const { topicId } = req.params;
  const { text, sv_word, reading, meaning, part_of_speech } = req.body;
  try {
    const result = await topicModel.createWord(
      topicId,
      text,
      sv_word,
      reading,
      meaning,
      part_of_speech,
    );
    res.status(201).json({ message: "Create successfull", data: result.rows });
  } catch (error) {
    console.log("Create word failed", error);
    res.status(401).json({ message: "Create failed" });
  }
};

const getAllWords = async (req, res) => {
  const { topicId } = req.params;
  try {
    const result = await topicModel.getAllWords(topicId);
    res
      .status(201)
      .json({ message: "Get Topics successfully", data: result.rows });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

const getWordById = async (req, res) => {
  const { wordId } = req.params;
  try {
    const result = await topicModel.getWordById(wordId);
    res
      .status(201)
      .json({ message: "Get Topic successfully", data: result.rows });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

module.exports = {
  createWord,
  getAllWords,
  getWordById,
};
