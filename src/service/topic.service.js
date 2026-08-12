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
      const sectionsData = await models.Section.getSectionsByTopicId(topic.topic_id);

      const sectionsWithProgress = await Promise.all(
        sectionsData.sections.map(async (section) => {
          const progress = await models.Section.getSectionProgress(user_id, section.section_id);
          return parseFloat(progress.progress_percentage) || 0;
        }),
      );

      const section_count = sectionsData.section_count;
      const progress =
        section_count > 0
          ? sectionsWithProgress.reduce((sum, p) => sum + p, 0) / section_count
          : 0;

      return {
        ...topic,
        section_count: sectionsData.section_count,
        progress,
      };
    }),
  );

  return topicsWithProgress;
};

module.exports = { getTopicById, getAllTopics };
