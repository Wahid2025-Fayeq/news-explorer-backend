require("dotenv").config();

const {
  PORT = 3001,
  MONGODB_URI = "mongodb://127.0.0.1:27017/news-explorer",
  JWT_SECRET = "dev-secret",
} = process.env;

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
};
