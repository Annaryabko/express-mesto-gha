const { UNAUTHORIZED } = require('./statuscodes');
const ServerError = require('./servererror');

class UnauthorisedError extends ServerError {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED;
  }
}

module.exports = UnauthorisedError;
