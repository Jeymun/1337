const passport = require('passport');

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
  }
  next();
};

const isUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Acceso denegado. Solo usuarios pueden realizar esta acción.' });
  }
  next();
};

module.exports = { isAdmin, isUser };
