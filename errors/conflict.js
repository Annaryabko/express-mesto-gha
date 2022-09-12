const { CONFLICT_ERROR } = require('./statuscodes');
const ServerError = require('./servererror');

class ConflictError extends ServerError {
  constructor(message) {
    super(message);
    this.status = CONFLICT_ERROR;
  }
}

module.exports = ConflictError;
