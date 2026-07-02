const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");

const register = async (username, email, password) => {

    const existingUser = await userModel.findByEmail(email);
    if (existingUser.rows.length > 0) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.register(username, email, hashedPassword);
    return result;
};

const login = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.login(email, hashedPassword);
    return result;
};

module.exports = {
    register,
    login,
};