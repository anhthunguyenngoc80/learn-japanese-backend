const pool = require("../config/db");

const createWord = async (
  topic_id,
  text,
  sv_word,
  reading,
  meaning,
  part_of_speech,
) => {
  const result = await pool.query(
    "insert into words (topic_id, text, sv_word, reading, meaning, part_of_speech) values ($1, $2, $3, $4, $5, $6) returning *",
    [topic_id, text, sv_word, reading, meaning, part_of_speech],
  );
  return result.rows;
};

const getAllWords = async (topic_id) => {
  const result = await pool.query("select * from words where topic_id=$1", [
    topic_id,
  ]);
  return result.rows;
};

const getWordById = async (word_id) => {
  const result = await pool.query("select * from words where word_id=$1", [
    word_id,
  ]);
  return result.rows;
};

module.exports = {
  createWord,
  getAllWords,
  getWordById,
};
