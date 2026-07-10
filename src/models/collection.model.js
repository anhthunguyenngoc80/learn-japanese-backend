const pool = require("../config/db");

const createCollection = async (user_id, name, visibility, executor = pool) => {
  const result = await executor.query(
    "insert into collections (creator_id, name, visibility) values ($1, $2, $3) returning *",
    [user_id, name, visibility],
  );
  return result.rows[0];
};

const getAllCollections = async (user_id, executor = pool) => {
  const result = await executor.query(
    `select c.*, coalesce(t.topic_count, 0) as topic_count
     from collections c
     left join (
       select collection_id, count(*) as topic_count
       from topics
       group by collection_id
     ) t on c.collection_id = t.collection_id
     where c.visibility = 'public' or (c.visibility = 'private' and c.creator_id = $1)`,
    [user_id],
  );
  return result.rows;
};

const getCollectionById = async (collection_id, executor = pool) => {
  const result = await executor.query(
    "select * from collections where collection_id=$1",
    [collection_id],
  );
  return result.rows;
};

const deleteCollection = async (collection_id, executor = pool) => {
  const result = await executor.query(
    "delete from collections where collection_id=$1 returning collection_id",
    [collection_id],
  );
  return result.rows[0];
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
  deleteCollection,
};
