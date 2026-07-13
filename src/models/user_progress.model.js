const pool = require("../config/db");

const getWordsByMasteryZeroByTopic = async (
  user_id,
  topic_id,
  limit,
  executor = pool,
) => {
  const result = await executor.query(
    `select w.*
     from words w
     left join user_progress p
       on p.word_id = w.word_id
       and p.user_id = $1
     where w.topic_id = $2
       and (p.user_progress_id is null
         or (p.recognition_mastery + p.listening_mastery + p.writing_mastery) / 3.0 = 0)
     limit $3`,
    [user_id, topic_id, limit],
  );
  return result.rows;
};

const getWordsByLowestMasteryByTopic = async (
  user_id,
  topic_id,
  limit,
  executor = pool,
) => {
  const result = await executor.query(
    `select w.*, up.mastery
     from user_progress up
     join words w on up.word_id = w.word_id
     where up.user_id = $1 and up.mastery > 0 and w.topic_id = $2
     order by up.mastery asc
     limit $3`,
    [user_id, topic_id, limit],
  );
  return result.rows;
};

const getFlashcardWord = async (user_id, limit, executor = pool) => {
  const result = await executor.query(
    `SELECT w.id AS word_id, w.word
      FROM words w
      WHERE NOT EXISTS (
          SELECT 1 FROM user_progress up
          WHERE up.word_id = w.id AND up.user_id = $1
      )
      LIMIT $2;`,
    [user_id, limit],
  );
  return result.rows;
};

module.exports = {
  getWordsByMasteryZeroByTopic,
  getWordsByLowestMasteryByTopic,
  getFlashcardWord,
};