const models = require("../models");

const createAnswers = async (answers) => {
  return await models.Answer.createAnswers(answers);
};

const getAnswersByLearningItemId = async (learning_item_id) => {
  return await models.Answer.getAnswersByLearningItemId(learning_item_id);
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
  getAnswersByLearningItemId,
  updateAnswer,
  updateAnswers,
  deleteAnswer,
};
