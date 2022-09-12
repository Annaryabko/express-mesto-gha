const { INTERNAL_SERVER_ERROR } = require('../errors/statuscodes');
const ServerError = require('../errors/servererror');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ServerError) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
  next();
};

module.exports = errorHandler;
