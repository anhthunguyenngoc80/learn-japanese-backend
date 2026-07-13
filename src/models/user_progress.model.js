const pool = require("../config/db");

const getFlashcardWord = async (user_id, limit, executor = pool) => {
  const result = await executor.query(
    `SELECT w.*
      FROM words w
      WHERE NOT EXISTS (
          SELECT 1 FROM user_progress up
          WHERE up.word_id = w.word_id AND up.user_id = $1
      )
      LIMIT $2;`,
    [user_id, limit],
  );
  return result.rows;
};

const getWordsForReview = async (user_id, topic_id, limit, executor = pool) => {
  const result = await executor.query(
    `SELECT
        up.word_id,
        w.*,
        up.next_review_at
     FROM user_progress up
     JOIN words w ON up.word_id = w.word_id
     WHERE up.user_id = $1
       AND w.topic_id = $2
       AND up.next_review_at <= now()
     ORDER BY up.next_review_at ASC
     LIMIT $3`,
    [user_id, topic_id, limit],
  );
  return result.rows;
};

module.exports = {
  getFlashcardWord,
  getWordsForReview,
};