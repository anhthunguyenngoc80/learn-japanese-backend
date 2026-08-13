const pool = require("../config/db");

const getFlashcardWord = async (user_id, section_id, limit, executor = pool) => {
  const result = await executor.query(
    `SELECT w.*
      FROM words w
      JOIN learning_items li ON w.learning_item_id = li.learning_item_id
      WHERE li.section_id = $2
      AND NOT EXISTS (
          SELECT 1 FROM user_progress up
          WHERE up.learning_item_id = w.learning_item_id AND up.user_id = $1
      )
      LIMIT $3;`,
    [user_id, section_id, limit],
  );
  return result.rows;
};

const getWordsForReview = async (user_id, section_id, limit, executor = pool) => {
  const result = await executor.query(
    `SELECT
        up.learning_item_id,
        w.*,
        up.next_review_at
     FROM user_progress up
     JOIN words w ON up.learning_item_id = w.learning_item_id
     JOIN learning_items li ON w.learning_item_id = li.learning_item_id
     WHERE up.user_id = $1
       AND li.section_id = $2
     ORDER BY up.next_review_at ASC
     LIMIT $3`,
    [user_id, section_id, limit],
  );
  return result.rows;
};

const updateAfterAttempt = async (
  user_id,
  word_id,
  skill,
  is_correct,
  response_time_ms,
  executor = pool,
) => {
  const result = await executor.query(
    `SELECT update_after_attempt($1, $2, $3, $4, $5)`,
    [user_id, word_id, skill, is_correct, response_time_ms],
  );
  return result.rows[0];
};

module.exports = {
  getFlashcardWord,
  getWordsForReview,
  updateAfterAttempt,
};
