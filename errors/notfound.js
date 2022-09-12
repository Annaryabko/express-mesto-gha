const { NOT_FOUND_ERROR } = require('./statuscodes');
const ServerError = require('./servererror');

class NotFoundError extends ServerError {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
