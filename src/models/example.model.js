const pool = require("../config/db");

const createExample = async (word_id, content, meaning, executor = pool) => {
  const result = await executor.query(
    "insert into examples (word_id, content, meaning) values ($1, $2, $3) returning *",
    [word_id, content, meaning],
  );
  return result.rows;
};

const deleteByCollectionId = async (collection_id, executor = pool) => {
  const result = await executor.query(
    `delete from examples where word_id in (
      select w.word_id from words w
      join topics t on w.topic_id = t.topic_id
      where t.collection_id = $1
    )`,
    [collection_id],
  );
  return result;
};

const getExamplesByWordId = async (word_id, executor = pool) => {
  const result = await executor.query(
    "select * from examples where word_id=$1",
    [word_id],
  );
  return result.rows;
};

module.exports = { createExample, deleteByCollectionId, getExamplesByWordId };
