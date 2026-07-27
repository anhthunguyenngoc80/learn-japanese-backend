const models = require("../models");

const createSections = async (topic_id, sections) => {
  const sectionsWithTopic = sections.map((section) => ({
    ...section,
    topic_id,
  }));
  return await models.Section.createSections(sectionsWithTopic);
};

module.exports = { createSections };