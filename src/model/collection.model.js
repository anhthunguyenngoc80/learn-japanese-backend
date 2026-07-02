const pool = require("../config/db");

const createCollection = async (user_id, name) => {
  const result = await pool.query(
    "insert into collections (user_id, name) values ($1, $2) returning user_id, name",
    [user_id, name],
  );
  return result;
};

const getAllCollections = async (user_id) => {
  const result = await pool.query(
    "select * from collections where user_id=$1",
    [user_id],
  );
  return result;
};

const getCollectionById = async (user_id, collection_id) => {
  const result = await pool.query(
    "select * from collections where user_id=$1 and collection_id=$2",
    [user_id, collection_id],
  );
  return result;
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
};
