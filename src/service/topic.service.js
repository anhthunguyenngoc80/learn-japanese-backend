const models = require("../models");

const getTopicById = async (user_id, topic_id, limit) => {
  const topic = await models.Topic.getTopicById(topic_id);
  if (!topic) {
    return null;
  }

  const words = limit
    ? await models.Word.getWordsByLimit(user_id, topic.topic_id, limit)
    : await models.Word.getAllWords(topic.topic_id);

  const wordsWithExamples = await Promise.all(
    words.map(async (word) => {
      const examples = await models.Example.getExamplesByWordId(word.word_id);
      return {
        ...word,
        examples,
        };
    }),
  );

  return {
    ...topic,
    words: wordsWithExamples,
  };
};

module.exports = { getTopicById };
