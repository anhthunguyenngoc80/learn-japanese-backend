const pool = require("../config/db");

const createWord = async (topic_id, word, executor = pool) => {
  const result = await executor.query(
    "insert into words (topic_id, text, sv_word, reading, meaning, part_of_speech) values ($1, $2, $3, $4, $5, $6) returning *",
    [
      topic_id,
      word.text,
      word.sv_word,
      word.reading,
      word.meaning,
      word.part_of_speech,
    ],
  );
  return result.rows[0];
};

const getAllWords = async (topic_id, user_id, executor = pool) => {
  const result = await executor.query(
    `select w.*,
    COALESCE(up.recognition_mastery, 0) AS recognition_mastery,
    COALESCE(up.listening_mastery, 0)   AS listening_mastery,
    COALESCE(up.writing_mastery, 0)      AS writing_mastery,
    COALESCE(
        (up.recognition_mastery + up.listening_mastery + up.writing_mastery) / 3.0,
        0
    ) AS overall_mastery,
    up.next_review_at
    from words w
    left join user_progress up
    on w.word_id = up.word_id and up.user_id = $2
    where topic_id=$1`,
    [topic_id, user_id],
  );
  return result.rows;
};

const getWordsByLimit = async (user_id, topic_id, limit, executor = pool) => {
  const result = await executor.query(
    `select w.*,
    COALESCE(up.recognition_mastery, 0) AS recognition_mastery,
    COALESCE(up.listening_mastery, 0)   AS listening_mastery,
    COALESCE(up.writing_mastery, 0)      AS writing_mastery,
    COALESCE(
        (up.recognition_mastery + up.listening_mastery + up.writing_mastery) / 3.0,
        0
    ) AS overall_mastery,
    up.next_review_at
    from words w
    left join user_progress up
    on w.word_id = up.word_id and up.user_id = $1
    where topic_id=$2 limit $3`,

    [user_id, topic_id, limit],
  );
  return result.rows;
};

const getWordById = async (word_id, executor = pool) => {
  const result = await executor.query("select * from words where word_id=$1", [
    word_id,
  ]);
  return result.rows;
};

const deleteByCollectionId = async (collection_id, executor = pool) => {
  const result = await executor.query(
    `delete from words where topic_id in (
      select topic_id from topics where collection_id = $1
    )`,
    [collection_id],
  );
  return result;
};

const createWords = async (topic_id, words, executor = pool) => {
  if (!words || words.length === 0) return [];
  const values = [];
  const params = [];
  let paramIndex = 1;

  for (const w of words) {
    params.push(
      `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, $${paramIndex + 5})`
    );
    values.push(
      topic_id,
      w.text,
      w.sv_word,
      w.reading,
      w.meaning,
      w.part_of_speech,
    );
    paramIndex += 6;
  }

  const query = `insert into words (topic_id, text, sv_word, reading, meaning, part_of_speech) values ${params.join(
    ", "
  )} returning *`;
  const result = await executor.query(query, values);
  return result.rows;
};

const updateWords = async (words, executor = pool) => {
  if (!words || words.length === 0) return [];

  const results = [];

  for (const w of words) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (w.text !== undefined) {
      fields.push(`text = $${paramIndex++}`);
      values.push(w.text);
    }
    if (w.sv_word !== undefined) {
      fields.push(`sv_word = $${paramIndex++}`);
      values.push(w.sv_word);
    }
    if (w.reading !== undefined) {
      fields.push(`reading = $${paramIndex++}`);
      values.push(w.reading);
    }
    if (w.meaning !== undefined) {
      fields.push(`meaning = $${paramIndex++}`);
      values.push(w.meaning);
    }
    if (w.part_of_speech !== undefined) {
      fields.push(`part_of_speech = $${paramIndex++}`);
      values.push(w.part_of_speech);
    }

    if (fields.length === 0) continue;

    values.push(w.word_id);
    const query = `update words set ${fields.join(", ")} where word_id = $${paramIndex} returning *`;
    const result = await executor.query(query, values);
    results.push(result.rows[0]);
  }

  return results;
};

module.exports = {
  createWord,
  createWords,
  updateWords,
  getAllWords,
  getWordById,
  deleteByCollectionId,
  getWordsByLimit,
};
