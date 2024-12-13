// /src/config/index.js
require('dotenv').config();

module.exports = {
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
};
