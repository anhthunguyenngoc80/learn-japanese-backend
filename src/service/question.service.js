const models = require("../models");

const createQuestions = async (questions) => {
  return await models.Question.createQuestions(questions);
};

const getQuestionsBySectionId = async (section_id) => {
  return await models.Question.getQuestionsBySectionId(section_id);
};

const updateQuestion = async (question_id, question_type, content) => {
  return await models.Question.updateQuestion(question_id, question_type, content);
};

const updateQuestions = async (questions) => {
  return await models.Question.updateQuestions(questions);
};

const deleteQuestion = async (question_id) => {
  return await models.Question.deleteQuestion(question_id);
};

module.exports = {
  createQuestions,
  getQuestionsBySectionId,
  updateQuestion,
  updateQuestions,
  deleteQuestion,
};