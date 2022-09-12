const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { auth } = require('./middlewares/auth');
const { NOT_FOUND_ERROR } = require('./errors/statuscodes');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/error');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), login);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/https?:\/\/(www\.)*[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*#?/i),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(1),
    }).unknown(true),
  }),
  createUser,
);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена.' });
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
