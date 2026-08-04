const pool = require("../config/db");

const createWord = async (learning_item_id, word, executor = pool) => {
  const result = await executor.query(
    "insert into words (learning_item_id, text, sv_word, reading, meaning, part_of_speech) values ($1, $2, $3, $4, $5, $6) returning *",
    [
      learning_item_id,
      word.text,
      word.sv_word,
      word.reading,
      word.meaning,
      word.part_of_speech,
    ],
  );
  return result.rows[0];
};

const getAllWords = async (section_id, user_id, executor = pool) => {
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
    join learning_items li on w.learning_item_id = li.learning_item_id
    left join user_progress up
    on w.learning_item_id = up.word_id and up.user_id = $2
    where li.section_id=$1`,
    [section_id, user_id],
  );
  return result.rows;
};

const getWordsByLimit = async (user_id, section_id, limit, executor = pool) => {
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
    join learning_items li on w.learning_item_id = li.learning_item_id
    left join user_progress up
    on w.learning_item_id = up.word_id and up.user_id = $1
    where li.section_id=$2 limit $3`,

    [user_id, section_id, limit],
  );
  return result.rows;
};

const getWordById = async (learning_item_id, executor = pool) => {
  const result = await executor.query("select * from words where learning_item_id=$1", [
    learning_item_id,
  ]);
  return result.rows;
};

const createWords = async (learning_item_id, words, executor = pool) => {
  if (!words || words.length === 0) return [];
  const values = [];
  const params = [];
  let paramIndex = 1;

  for (const w of words) {
    params.push(
      `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, $${paramIndex + 5})`
    );
    values.push(
      learning_item_id,
      w.text,
      w.sv_word,
      w.reading,
      w.meaning,
      w.part_of_speech,
    );
    paramIndex += 6;
  }

  const query = `insert into words (learning_item_id, text, sv_word, reading, meaning, part_of_speech) values ${params.join(
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

    values.push(w.learning_item_id);
    const query = `update words set ${fields.join(", ")} where learning_item_id = $${paramIndex} returning *`;
    const result = await executor.query(query, values);
    results.push(result.rows[0]);
  }

  return results;
};

const deleteWord = async (learning_item_id, executor = pool) => {
  const result = await executor.query("delete from words where learning_item_id=$1 returning *", [
    learning_item_id,
  ]);
  return result.rows[0];
};

module.exports = {
  createWord,
  createWords,
  updateWords,
  getAllWords,
  getWordById,
  deleteWord,
  getWordsByLimit,
};