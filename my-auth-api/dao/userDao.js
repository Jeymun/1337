// /src/dao/userDao.js
const User = require('../models/User');

class UserDao {
  async create(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async findById(userId) {
    return await User.findById(userId);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async update(userId, userData) {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  }

  async delete(userId) {
    return await User.findByIdAndDelete(userId);
  }
}

module.exports = new UserDao();
