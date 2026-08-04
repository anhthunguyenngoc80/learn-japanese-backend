const answerService = require("../service/answer.service");

const createAnswers = async (req, res) => {
  const { questionId } = req.params;
  const { answers } = req.body;

  try {
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Answers array is required" });
    }

    const answersWithLearningItem = answers.map((ans) => ({
      ...ans,
      learning_item_id: questionId,
    }));
    const result = await answerService.createAnswers(answersWithLearningItem);
    res.status(201).json({ message: "Create answers successfully", data: result });
  } catch (error) {
    console.log("Create answers failed", error);
    res.status(500).json({ message: "Create answers failed" });
  }
};

const getAnswersByLearningItemId = async (req, res) => {
  const { questionId } = req.params;

  try {
    const result = await answerService.getAnswersByLearningItemId(questionId);
    res.status(200).json({ message: "Get answers successfully", data: result });
  } catch (error) {
    console.log("Get answers failed", error);
    res.status(500).json({ message: "Get answers failed" });
  }
};

const updateAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { content, is_correct } = req.body;

  try {
    const result = await answerService.updateAnswer(answerId, content, is_correct);
    if (!result) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json({ message: "Update answer successfully", data: result });
  } catch (error) {
    console.log("Update answer failed", error);
    res.status(500).json({ message: "Update answer failed" });
  }
};

const updateAnswersBulk = async (req, res) => {
  const { answers } = req.body;

  try {
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Answers array is required" });
    }

    const result = await answerService.updateAnswers(answers);
    res.status(200).json({ message: "Update answers successfully", data: result });
  } catch (error) {
    console.log("Update answers failed", error);
    res.status(500).json({ message: "Update answers failed" });
  }
};

const deleteAnswer = async (req, res) => {
  const { answerId } = req.params;

  try {
    const result = await answerService.deleteAnswer(answerId);
    if (!result) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json({ message: "Delete answer successfully", data: result });
  } catch (error) {
    console.log("Delete answer failed", error);
    res.status(500).json({ message: "Delete answer failed" });
  }
};

module.exports = {
  createAnswers,
  getAnswersByLearningItemId,
  updateAnswer,
  updateAnswersBulk,
  deleteAnswer,
};
