const models = require("../models");

const createSections = async (topic_id, sections) => {
  const sectionsWithTopic = sections.map((section) => ({
    ...section,
    topic_id,
  }));
  return await models.Section.createSections(sectionsWithTopic);
};

const getSectionsByTopicId = async (topic_id) => {
  return await models.Section.getSectionsByTopicId(topic_id);
};

const updateSections = async (sections) => {
  return await models.Section.updateSections(sections);
};

module.exports = { createSections, getSectionsByTopicId, updateSections };
