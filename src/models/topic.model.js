const pool = require("../config/db");

const createTopic = async (collection_id, name, executor = pool) => {
  const result = await executor.query(
    "insert into topics (collection_id, name) values ($1, $2) returning *",
    [collection_id, name],
  );
  return result.rows[0];
};

const getAllTopics = async (collection_id, executor = pool) => {
  const result = await executor.query(
    "select * from topics where collection_id=$1",
    [collection_id],
  );
  return result.rows;
};

const getTopicById = async (topic_id, executor = pool) => {
  const result = await executor.query("select * from topics where topic_id=$1", [
    topic_id,
  ]);
  return result.rows;
};

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
};
