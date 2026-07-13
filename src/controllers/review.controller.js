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

module.exports = {
  getFlashcardWordsByTopicId,
  getWordsForReview,
};
