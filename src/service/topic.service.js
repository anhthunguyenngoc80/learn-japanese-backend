const models = require("../models");

const getTopicById = async (user_id, topic_id, limit) => {
  const topic = await models.Topic.getTopicById(topic_id);
  if (!topic) {
    return null;
  }

  const words = limit
    ? await models.Word.getWordsByLimit(user_id, topic.topic_id, limit)
    : await models.Word.getAllWords(topic.topic_id, user_id);

  const wordsWithExamples = await Promise.all(
    words.map(async (word) => {
      const examples = await models.Example.getExamplesByWordId(word.word_id);
      return {
        ...word,
        examples,
        };
    }),
  );

  const progressData = await models.Topic.getTopicProgress(user_id, topic.topic_id);
  const word_count = progressData ? parseInt(progressData.total_words, 10) : 0;
  const progress = progressData ? parseFloat(progressData.progress_percentage) : 0;

  return {
    ...topic,
    words: wordsWithExamples,
    word_count,
    progress,
  };
};

const getAllTopics = async (collection_id, user_id) => {
  const topics = await models.Topic.getAllTopics(collection_id);

  const topicsWithProgress = await Promise.all(
    topics.map(async (topic) => {
      const progress = await models.Topic.getTopicProgress(user_id, topic.topic_id);
      return {
        ...topic,
        word_count: progress ? parseInt(progress.total_words, 10) : 0,
        progress: progress ? parseFloat(progress.progress_percentage) : 0,
      };
    }),
  );

  return topicsWithProgress;
};

module.exports = { getTopicById, getAllTopics };
