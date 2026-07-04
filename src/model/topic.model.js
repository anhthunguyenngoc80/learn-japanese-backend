const pool = require("../config/db");

const createTopic = async (collection_id, name) => {
  const result = await pool.query(
    "insert into topics (collection_id, name) values ($1, $2) returning collection_id, name",
    [collection_id, name],
  );
  return result.rows;
};

const getAllTopics = async (collection_id) => {
  const result = await pool.query(
    "select * from topics where collection_id=$1",
    [collection_id],
  );
  return result.rows;
};

const getTopicById = async (topic_id) => {
  const result = await pool.query("select * from topics where topic_id=$1", [
    topic_id,
  ]);
  return result.rows;
};

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
};
