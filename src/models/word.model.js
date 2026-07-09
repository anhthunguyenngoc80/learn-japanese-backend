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

const getAllWords = async (topic_id, executor = pool) => {
  const result = await executor.query("select * from words where topic_id=$1", [
    topic_id,
  ]);
  return result.rows;
};

const getWordsByLimit = async (topic_id, limit, executor = pool) => {
  const result = await executor.query(
    "select * from words where topic_id=$1 order by random() limit $2",
    [topic_id, limit],
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

module.exports = {
  createWord,
  getAllWords,
  getWordById,
  deleteByCollectionId,
  getWordsByLimit,
};
