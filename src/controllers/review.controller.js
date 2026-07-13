const reviewService = require("../service/review.service");

const getWordsForReview = async (req, res) => {
  const user_id = req.user.user_id;
  const { topicId } = req.params;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const result = await reviewService.getWordsForReview(user_id, topicId, limit);
    res
      .status(200)
      .json({ message: "Get words due for review successfully", data: result });
  } catch (error) {
    console.log("Get words due for review failed", error);
    res.status(500).json({ message: "Get words due for review failed" });
  }
};

const getFlashcardWordsByTopicId = async (req, res) => {
  const user_id = req.user.user_id;
  const { topicId } = req.params;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const result = await reviewService.getFlashcardWordsByTopicId(
      user_id,
      topicId,
      limit,
    );
    res
      .status(200)
      .json({ message: "Get review words successfully", data: result });
  } catch (error) {
    console.log("Get review words failed", error);
    res.status(500).json({ message: "Get review words failed" });
  }
};

const updateAfterAttempt = async (req, res) => {
  const user_id = req.user.user_id;
  const { word_id, skill, is_correct, response_time_ms } = req.body;

  if (!word_id || !skill || is_correct === undefined || !response_time_ms) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const validSkills = ["recognition", "listening", "writing"];
  if (!validSkills.includes(skill)) {
    return res.status(400).json({ message: "Invalid skill value" });
  }

  try {
    const result = await reviewService.updateAfterAttempt(
      user_id,
      word_id,
      skill,
      is_correct,
      response_time_ms,
    );
    res
      .status(200)
      .json({ message: "Update skill mastery successfully", data: result });
  } catch (error) {
    console.log("Update skill mastery failed", error);
    res.status(500).json({ message: "Update skill mastery failed" });
  }
};

module.exports = {
  getFlashcardWordsByTopicId,
  getWordsForReview,
  updateAfterAttempt,
};
