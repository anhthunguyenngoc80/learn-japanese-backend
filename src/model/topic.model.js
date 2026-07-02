const pool = require("../config/db");

const createTopic = async (collection_id, name) => {
  const result = await pool.query(
    "insert into topics (collection_id, name) values ($1, $2) returning collection_id, name",
    [collection_id, name],
  );
  return result;
};

const getAllTopics = async (collection_id) => {
  const result = await pool.query(
    "select * from topics where collection_id=$1",
    [collection_id],
  );
  return result;
};

const getTopicById = async (collection_id, topic_id) => {
  const result = await pool.query(
    "select * from topics where collection_id=$1 and topic_id=$2",
    [collection_id, topic_id],
  );
  return result;
};

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
};
