require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;


const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./config/passport');

const sessionRoutes = require('./routes/sessions');

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


app.use('/api/sessions', sessionRoutes);

mongoose
  .connect('mongodb://localhost:27017/your_database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error(err));


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
