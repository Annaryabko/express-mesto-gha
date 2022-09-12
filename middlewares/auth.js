const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/unauthorised');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'mysecret');
  } catch (err) {
    next(new UnauthorisedError('Для доступа к запрашиваемому ресурсу требуется аутентификация'));
    return;
  }
  req.user = payload;
  next();
};
