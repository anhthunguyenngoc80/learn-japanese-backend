const userProgressModel = require("../models/user_progress.model");

const DEFAULT_LIMIT = 10;

const getFlashcardWordsByTopicId = async (
  user_id,
  topic_id,
  limit = DEFAULT_LIMIT,
) => {
  // Try to get words with mastery = 0 first
  const masteryZeroWords = await userProgressModel.getWordsByMasteryZeroByTopic(
    user_id,
    topic_id,
    limit,
  );

  if (masteryZeroWords.length > 0) {
    return masteryZeroWords;
  }

  // If no words with mastery = 0, get words with lowest mastery first
  const lowestMasteryWords =
    await userProgressModel.getWordsByLowestMasteryByTopic(
      user_id,
      topic_id,
      limit,
    );

  return lowestMasteryWords;
};

module.exports = {
  getFlashcardWordsByTopicId,
};
