const { BAD_REQUEST_ERROR } = require('./statuscodes');
const ServerError = require('./servererror');

class BadRequestError extends ServerError {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST_ERROR;
  }
}

module.exports = BadRequestError;
