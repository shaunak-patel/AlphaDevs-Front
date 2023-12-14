require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || 1169;

module.exports.createSecretToken = (_id) => {
  process.env.JWT_SECRET = secretKey;
  return jwt.sign({ id: _id }, secretKey.toString(), { expiresIn: 5 * 60 });
};