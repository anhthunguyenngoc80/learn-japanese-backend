const pool = require("../config/db");

const createCollection = async (user_id, name, executor = pool) => {
  const result = await executor.query(
    "insert into collections (user_id, name) values ($1, $2) returning collection_id, user_id, name",
    [user_id, name],
  );
  return result.rows[0];
};

const getAllCollections = async (user_id, executor = pool) => {
  const result = await executor.query(
    "select * from collections where user_id=$1",
    [user_id],
  );
  return result.rows;
};

const getCollectionById = async (user_id, collection_id, executor = pool) => {
  const result = await executor.query(
    "select * from collections where user_id=$1 and collection_id=$2",
    [user_id, collection_id],
  );
  return result.rows;
};

const deleteCollection = async (user_id, collection_id, executor = pool) => {
  const result = await executor.query(
    "delete from collections where user_id=$1 and collection_id=$2 returning collection_id",
    [user_id, collection_id],
  );
  return result.rows[0];
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
  deleteCollection,
};
