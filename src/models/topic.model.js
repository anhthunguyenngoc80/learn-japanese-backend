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
    `select t.*, coalesce(w.word_count, 0) as word_count
     from topics t
     left join (
       select topic_id, count(*) as word_count
       from words
       group by topic_id
     ) w on t.topic_id = w.topic_id
     where t.collection_id=$1`,
    [collection_id],
  );
  return result.rows;
};

const getTopicById = async (topic_id, executor = pool) => {
  const result = await executor.query(
    `select t.*, coalesce(w.word_count, 0) as word_count
     from topics t
     left join (
       select topic_id, count(*) as word_count
       from words
       group by topic_id
     ) w on t.topic_id = w.topic_id
     where t.topic_id=$1`,
    [topic_id],
  );
  return result.rows[0];
};

const deleteByCollectionId = async (collection_id, executor = pool) => {
  const result = await executor.query(
    "delete from topics where collection_id = $1",
    [collection_id],
  );
  return result;
};

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
  deleteByCollectionId,
};
