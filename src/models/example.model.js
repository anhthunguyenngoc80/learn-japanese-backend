const pool = require("../config/db");

const createExample = async (word_id, content, meaning, executor = pool) => {
  const result = await executor.query(
    "insert into examples (word_id, content, meaning) values ($1, $2, $3) returning *",
    [word_id, content, meaning],
  );
  return result.rows;
};

module.exports = { createExample };