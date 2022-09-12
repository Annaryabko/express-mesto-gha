const { FORBIDDEN_ERROR } = require('./statuscodes');
const ServerError = require('./servererror');

class ForbiddenError extends ServerError {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
