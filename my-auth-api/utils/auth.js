const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mySecretKey';

const generateJWT = (user) => {
  const payload = { userId: user._id, email: user.email };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = { generateJWT };
