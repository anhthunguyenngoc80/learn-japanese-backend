const models = require("../models");

const createAnswers = async (answers) => {
  return await models.Answer.createAnswers(answers);
};

const getAnswersByQuestionId = async (question_id) => {
  return await models.Answer.getAnswersByQuestionId(question_id);
};

const updateAnswer = async (answer_id, content, is_correct) => {
  return await models.Answer.updateAnswer(answer_id, content, is_correct);
};

const updateAnswers = async (answers) => {
  return await models.Answer.updateAnswers(answers);
};

const deleteAnswer = async (answer_id) => {
  return await models.Answer.deleteAnswer(answer_id);
};

module.exports = {
  createAnswers,
  getAnswersByQuestionId,
  updateAnswer,
  updateAnswers,
  deleteAnswer,
};