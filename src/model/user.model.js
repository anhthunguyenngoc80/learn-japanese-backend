const pool = require("../config/db");

const register = async (username, email, password) => {
  const result = await pool.query(
    "insert into users (username, email, password) values ($1, $2, $3) returning user_id, username, email",
    [username, email, password],
  );
  return result.rows;
};

const findByEmail = async (email) => {
  const result = await pool.query(
    "select user_id from users where email = $1",
    [email],
  );
  return result.rows;
};

const login = async (email) => {
  const result = await pool.query(
    "select user_id, username, email, password from users where email = $1",
    [email],
  );
  return result.rows[0];
};

const getUserById = async (user_id) => {
  const result = await pool.query(
    "SELECT user_id, username, email FROM users WHERE user_id = $1",
    [user_id],
  );

  return result.rows[0];
};

module.exports = {
  register,
  findByEmail,
  login,
  getUserById,
};
