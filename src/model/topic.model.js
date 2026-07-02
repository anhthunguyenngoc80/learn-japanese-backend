const pool = require("../config/db");

const createTopic = async (user_id, name) => {
  const result = await pool.query(
    "insert into topics (user_id, name) values ($1, $2) returning user_id, name",
    [user_id, name],
  );
  return result;
};

const getAllTopics = async (user_id) => {
  const result = await pool.query("select * from topics where user_id=$1", [
    user_id,
  ]);
  return result;
};

const getTopicById = async (user_id, topic_id) => {
  const result = await pool.query(
    "select * from topics where user_id=$1 and topic_id=$2",
    [user_id, topic_id],
  );
  return result;
};

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
};
