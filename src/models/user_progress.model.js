const pool = require("../config/db");

const deleteByCollectionId = async (collection_id, executor = pool) => {
  const result = await executor.query(
    `delete from user_progress 
     where word_id in (
       select word_id from words 
       where topic_id in (
         select topic_id from topics 
         where collection_id = $1
       )
     )`,
    [collection_id],
  );
  return result;
};

const deleteByWordId = async (word_id, executor = pool) => {
  const result = await executor.query(
    "delete from user_progress where word_id = $1",
    [word_id],
  );
  return result;
};

module.exports = {
  deleteByCollectionId,
  deleteByWordId,
};