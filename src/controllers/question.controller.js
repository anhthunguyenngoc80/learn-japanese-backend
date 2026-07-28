const questionService = require("../service/question.service");

const createQuestions = async (req, res) => {
  const { sectionId } = req.params;
  const { questions } = req.body;

  try {
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Questions array is required" });
    }

    const questionsWithSection = questions.map((q) => ({
      ...q,
      section_id: sectionId,
    }));
    const result = await questionService.createQuestions(questionsWithSection);
    res.status(201).json({ message: "Create questions successfully", data: result });
  } catch (error) {
    console.log("Create questions failed", error);
    res.status(500).json({ message: "Create questions failed" });
  }
};

const getQuestionsBySectionId = async (req, res) => {
  const { sectionId } = req.params;

  try {
    const result = await questionService.getQuestionsBySectionId(sectionId);
    res.status(200).json({ message: "Get questions successfully", data: result });
  } catch (error) {
    console.log("Get questions failed", error);
    res.status(500).json({ message: "Get questions failed" });
  }
};

const updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { question_type, content } = req.body;

  try {
    const result = await questionService.updateQuestion(questionId, question_type, content);
    if (!result) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Update question successfully", data: result });
  } catch (error) {
    console.log("Update question failed", error);
    res.status(500).json({ message: "Update question failed" });
  }
};

const updateQuestionsBulk = async (req, res) => {
  const { questions } = req.body;

  try {
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Questions array is required" });
    }

    const result = await questionService.updateQuestions(questions);
    res.status(200).json({ message: "Update questions successfully", data: result });
  } catch (error) {
    console.log("Update questions failed", error);
    res.status(500).json({ message: "Update questions failed" });
  }
};

const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    const result = await questionService.deleteQuestion(questionId);
    if (!result) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Delete question successfully", data: result });
  } catch (error) {
    console.log("Delete question failed", error);
    res.status(500).json({ message: "Delete question failed" });
  }
};

module.exports = {
  createQuestions,
  getQuestionsBySectionId,
  updateQuestion,
  updateQuestionsBulk,
  deleteQuestion,
};