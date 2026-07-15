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

  const totalWords = wordsWithExamples.length;
  const masteredWords = wordsWithExamples.filter(
    (w) => (w.overall_mastery || 0) > 0,
  ).length;
  const progress =
    totalWords > 0 ? Math.round((masteredWords / totalWords) * 10000) / 100 : 0;

  return {
    ...topic,
    words: wordsWithExamples,
    progress,
  };
};

module.exports = { getTopicById };
