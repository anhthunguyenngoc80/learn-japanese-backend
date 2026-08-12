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

const getSectionById = async (user_id, section_id, limit) => {
  const section = await models.Section.getSectionById(section_id);
  if (!section) {
    return null;
  }

  let words = [];
  if (section.section_type === "vocabulary") {
    const progress = await models.Section.getSectionProgress(user_id, section_id);
    if (limit) {
      words = await models.Word.getWordsByLimit(user_id, section_id, limit);
    } else {
      words = await models.Word.getAllWords(section_id, user_id);
    }

    const wordsWithExamples = await Promise.all(
      words.map(async (word) => {
        const examples = await models.Example.getExamplesByWordId(word.learning_item_id);
        return {
          ...word,
          examples,
        };
      }),
    );

    return {
      ...section,
      words: wordsWithExamples,
      word_count: progress?.total_words ?? 0,
      progress_percentage: progress.progress_percentage,
    };
  }

  return {
    ...section
  };
};

module.exports = { createSections, getSectionsByTopicId, updateSections, getSectionById };
