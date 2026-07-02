const pool = require('../config/db');

const register = async (username, email, password) => {
    const result = await pool.query('insert into users (username, email, password) values ($1, $2, $3) returning user_id, username, email', [username, email, password]);
    return result;
}

const findByEmail = async (email) => {
    const result = await pool.query('select user_id from users where email = $1', [email]);
    return result;
}

const login = async (email, password) => {
    const result = await pool.query('select user_id from users where email = $1 and password = $2', [email, password]);
    return result;
}

module.exports = {
    register,
    findByEmail,
    login,
};