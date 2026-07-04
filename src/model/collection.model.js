const pool = require("../config/db");

const createCollection = async (user_id, name) => {
  const result = await pool.query(
    "insert into collections (user_id, name) values ($1, $2) returning user_id, name",
    [user_id, name],
  );
  return result.rows;
};

const getAllCollections = async (user_id) => {
  const result = await pool.query(
    "select * from collections where user_id=$1",
    [user_id],
  );
  return result.rows;
};

const getCollectionById = async (user_id, collection_id) => {
  const result = await pool.query(
    "select * from collections where user_id=$1 and collection_id=$2",
    [user_id, collection_id],
  );
  return result.rows;
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
};
