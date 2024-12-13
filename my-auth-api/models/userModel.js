const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
});

// Verifica si el modelo 'User' ya está definido, si no lo está, lo define.
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
