const pool = require("../config/db");


const deleteByWordId = async (word_id, executor = pool) => {
  const result = await executor.query(
    "delete from user_progress where word_id = $1",
    [word_id],
  );
  return result;
};

module.exports = {
  deleteByWordId,
};