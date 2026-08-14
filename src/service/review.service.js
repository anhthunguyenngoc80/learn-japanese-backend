const userProgressModel = require("../models/review.model");
const topicModel = require("../models/topic.model");
const sectionModel = require("../models/section.model");

const DEFAULT_LIMIT = 10;

const getWordsForReview = async (user_id, section_id, limit = DEFAULT_LIMIT) => {
  // Get section info
  const section = await sectionModel.getSectionById(section_id);

  const words = await userProgressModel.getWordsForReview(
    user_id,
    section_id,
    limit,
  );

  return {
    ...section,
    words,
  };
};

const getFlashcardWordsBySectionId = async (
  user_id,
  section_id,
  limit = DEFAULT_LIMIT,
) => {
  // Get section info
  const section = await sectionModel.getSectionById(section_id);

  // Try to get words with mastery = 0 first
  const masteryZeroWords = await userProgressModel.getFlashcardWord(
    user_id,
    section_id,
    limit,
  );

  let words;
  if (masteryZeroWords.length > 0) {
    words = masteryZeroWords;
  } else {
    // If no words with mastery = 0, get words with lowest mastery first
    words = await userProgressModel.getWordsForReview(user_id, section_id, limit);
  }

  return {
    ...section,
    words,
  };
};

const updateAfterAttempt = async (
  user_id,
  word_id,
  skill,
  is_correct,
  response_time_ms,
) => {
  const result = await userProgressModel.updateAfterAttempt(
    user_id,
    word_id,
    skill,
    is_correct,
    response_time_ms,
  );
  return result;
};

module.exports = {
  getFlashcardWordsBySectionId,
  getWordsForReview,
  updateAfterAttempt,
};
