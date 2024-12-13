const UserDao = require('../dao/userDao');
const UserDto = require('../dtos/userDto');
const MailService = require('../services/mailService');

class UserController {
  async create(req, res) {
    try {
      const { first_name, last_name, email, password, age } = req.body;
      
  
      const newUser = await UserDao.create({ first_name, last_name, email, password, age });

    
      await MailService.sendMail(email, 'Bienvenido a la plataforma', 'Gracias por registrarte.');

      
      const userDto = new UserDto(newUser);
      res.status(201).json(userDto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al crear el usuario' });
    }
  }
}

module.exports = new UserController();
const UserRepository = require('../repositories/userRepository');
const passport = require('passport');

app.get('/api/sessions/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await UserRepository.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

