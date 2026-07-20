const models = require("../models");

const createWords = async (topic_id, words) => {
  const result = await models.Word.createWords(topic_id, words);
  return result;
};

module.exports = {
  createWords,
};