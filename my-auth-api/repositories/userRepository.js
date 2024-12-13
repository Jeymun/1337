
const UserDao = require('../dao/userDao');
const UserDto = require('../dtos/userDto');

class UserRepository {
  async createUser(userData) {
    const newUser = await UserDao.create(userData);
    return new UserDto(newUser);
  }

  async getUserById(userId) {
    const user = await UserDao.findById(userId);
    return new UserDto(user);
  }

  async getUserByEmail(email) {
    const user = await UserDao.findByEmail(email);
    return new UserDto(user);
  }

  async updateUser(userId, userData) {
    const updatedUser = await UserDao.update(userId, userData);
    return new UserDto(updatedUser);
  }

  async deleteUser(userId) {
    const deletedUser = await UserDao.delete(userId);
    return new UserDto(deletedUser);
  }
}

module.exports = new UserRepository();
