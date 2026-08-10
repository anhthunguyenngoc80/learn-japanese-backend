const models = require("../models");

const getTopicById = async (user_id, topic_id, limit) => {
  const topic = await models.Topic.getTopicById(topic_id);
  if (!topic) {
    return null;
  }

  const sectionsData = await models.Section.getSectionsByTopicId(topic.topic_id);

  return {
    ...topic,
    sections: sectionsData.sections,
    section_count: sectionsData.section_count,
  };
};

const getAllTopics = async (collection_id, user_id) => {
  const topics = await models.Topic.getAllTopics(collection_id);

  const topicsWithProgress = await Promise.all(
    topics.map(async (topic) => {
      const progress = await models.Topic.getTopicProgress(user_id, topic.topic_id);
      return {
        ...topic,
        word_count: progress.total_words,
        progress: progress ? parseFloat(progress.progress_percentage) : 0,
      };
    }),
  );

  return topicsWithProgress;
};

module.exports = { getTopicById, getAllTopics };
